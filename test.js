var myGif = GIF();
myGif.load("images/flap.gif")
const ctx = canvas.getContext("2d");
ctx.drawImage(myGif.image,0,0)
ctx.drawImage(myGif.frames[0].image,0,0)
