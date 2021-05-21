
// Note the capital 'C'
const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('../../commands/moderation/set-welcome')

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    // Async function
    // Destructure the guild property from the member object
    const { guild } = member
    // Access the channel ID for this guild from the cache
    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    // Create a canvas and access the 2d context
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')
    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage(
      path.join(__dirname, '../../wbg.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)



    // Display user text
    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '30px Lilita One'
    let text = `Welcome ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 55 + 128)
    // Display member count
    ctx.font = '25px Lilita One'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 95 + 128)

    
        // Pick up the pen
        ctx.beginPath();
        // Start the arc to form a circle
        ctx.arc(350, 90, 60, 0, Math.PI * 2, true);
        // Put the pen down
        ctx.closePath();
        // Clip off the region
        ctx.clip();

        
        // Load the user's profile picture and draw it
        const pfp = await Canvas.loadImage(
          member.user.displayAvatarURL({
            format: 'png',
          })
        )
        x = canvas.width / 2 - pfp.width / 2 +4
        y = 30
        ctx.drawImage(pfp, x, y, 120, 120)


    // Attach the image
    const attachment = new MessageAttachment(canvas.toBuffer())
  
    //KC Only
    if (channelId === '743530164041809932') {
      const targetChannelID = '698580298182688809' //Rules
      const targetChannelID2 = '805737859881369650' //Info
      channel.send(`Welcome, <@${member.id}> to Kingdoms Crusade! Make sure you read ${member.guild.channels.cache.get(targetChannelID).toString()} and ${member.guild.channels.cache.get(targetChannelID2).toString()}!`, attachment)
    } else {

    //Send message
    channel.send(`Welcome, <@${member.id}>!`, attachment)
    }
  })
}