let canvas = document.getElementById("myCanvas")
let context = canvas.getContext("2d")
let birdImage = new Image()
birdImage.src = "images/bird.png"
let background = new Image()
background.src = "images/background.png"
let pipeTop = new Image()
pipeTop.src = "images/pipeTop.png"
let pipeBot = new Image()
pipeBot.src = "images/pipeBottom.png"
let land = new Image()
land.src = "images/fg.png"
let gameOver = new Image()
gameOver.src = "images/gameOver.jpg"
let score = 0
let highScore = 0
sessionStorage.setItem("Score0", "0")
let bird = {
    x: canvas.width / 5,
    y: canvas.height / 2
}
let pipes = []
pipes[0] = {
    x: canvas.width + 100,
    y: 0
}
let pipeTopToPipeBot
let distanceBotTop = 90
// let randomPipes = {
//     x: canvas.width,
//     y: Math.floor(Math.random() * pipeTop.height - pipeTop.height)
// }


function play1() {
    // document.getElementById("reset").style.display = "none"
    context.drawImage(background, 0, 0, 400, 550);
    context.drawImage(birdImage, bird.x, bird.y)
    bird.y += 1.75
    for (let i = 0; i < pipes.length; i++) {
        pipeTopToPipeBot = pipeTop.height + distanceBotTop
        context.drawImage(pipeTop, pipes[i].x, pipes[i].y)
        context.drawImage(pipeBot, pipes[i].x, pipes[i].y + pipeTopToPipeBot)
        context.drawImage(land, 0, 450, 400, 100)
        context.fillStyle = "#090909"
        context.font = "35px Lobster"
        context.fillText("Score : " + score, 10, canvas.height - 35)
        context.fillStyle = "#090909"
        context.font = "25px Lobster"
        context.fillText("High Score : " + sessionStorage["Score" + (sessionStorage.length - 1)], 230, canvas.height - 40)
        moveLeft(i)


        if (pipes[i].x === canvas.width / 2) {

            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            })
        }
        // if (pipes[i].x + pipeTop.width === 0)
        //     pipes.splice(0, 1)
        if (pipes[i].x === bird.x) {
            score += 1
            musicPlay()
        }
        for (let j = 0; j < sessionStorage.length; j++) {
            if (sessionStorage["Score" + (sessionStorage.length - 1)] < score) {
                highScore = score
                sessionStorage.setItem("Score" + (j + 1), highScore)
            }
        }
        if (bird.y >= canvas.height - land.height ||
            bird.x + birdImage.width >= pipes[i].x && bird.x + 1 <= pipes[i].x + pipeTop.width + 2
            && (bird.y + 2 <= pipes[i].y + pipeTop.height   || bird.y + birdImage.height - 2.5 >= pipes[i].y + pipeTopToPipeBot)) {
            // alert("Game Over")
            musicPlay1()
            context.drawImage(gameOver, 0, 0, 400, 550)
            document.getElementById("reset").style.display = ""
            return
        }
    }
    requestAnimationFrame(play1)
}

function musicPlay() {
    document.getElementById('music').play();
    window.removeEventListener('keydown', musicPlay);
}
function musicPlay1() {
    document.getElementById('music1').play();
    window.removeEventListener('keydown', musicPlay);
}
function moveUp() {
    bird.y -= 40
}
function moveLeft(i){
    pipes[i].x -= 2
}
function restart() {
    location.reload()
    }
function draw() {
    context.drawImage(background, 0, 0, 400, 550)
}
function start() {
    play1()
    document.getElementById("fly").style.display = "none"

}

window.addEventListener('none', musicPlay)
document.addEventListener("keydown", moveUp)
document.getElementById('reset').addEventListener('click', play1);
