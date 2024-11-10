const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const audio = new Audio('../assets/audios/audio.mp3');

const size = 30;
const snake= [
    { x: 240, y: 240 },
    { x: 270, y: 240 },
    { x: 300, y: 240 },
    { x: 330, y: 240 },
]


const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
}

const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`
}

let p = document.querySelector('p');
p.innerText = randomColor();

let h3 = document.querySelector("h3");
h3.innerText = randomPosition()

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId;

const drawFood = () => {

    const {x, y, color} = food;

    ctx.shadowColor = color
    ctx.shadowBlur = 10;
    ctx.fillStyle = food.color;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;
}

const drawSnake = () => {
    ctx.fillStyle = "green"
    
    snake.forEach((position, index) => {
        
        if(index == snake.length - 1){
            ctx.fillStyle = "greenyellow";
        }

        ctx.fillRect(position.x,position.y,size,size)
    })
}

const moveSnake = () => {

    if(!direction) return

    const head = snake[snake.length - 1];

    
    if(direction == "right" && direction !== "left"){
        snake.push({ x: head.x + size, y: head.y })
    }

    
    if(direction == "left" && direction !== "right"){
        snake.push({ x: head.x - size, y: head.y })
    }

    
    if(direction == "down" && direction !== "up"){
        snake.push({ x: head.x, y: head.y + size})
    }

    
    if(direction == "up" && direction !== "down"){
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#39393986";

    for(let i = 30; i < canvas.width; i += 30){
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
    
        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    
    }

}

drawGrid();

const checkEat= () => {
    const head = snake[snake.length - 1];

    if (head.x === food.x && head.y === food.y){
        snake.push(head)
        audio.play()

        let x = randomPosition();
        let y = randomPosition();

        while(snake.find((position) => position.x === x && position.y === y)){
            x = randomPosition();
            y = randomPosition();
    }

        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
}

const checkEdgeCollision = () => {
    const head = snake[snake.length -1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;
    const wallCollision = head.x < 0 || head.x > 570 || head.y < 0 || head.y > 570
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if(wallCollision || selfCollision){
        alert("Você perdeu!")
    }
}

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkEdgeCollision();

    loopId = setTimeout(() => {
        gameLoop();
    },150)
}

gameLoop();

document.addEventListener("keydown", ({key}) =>{
    if(key == "ArrowRight" && direction != "left") {
        direction = "right";
    }

    if(key == "ArrowLeft" && direction != "right") {
        direction = "left";
    }

    if(key == "ArrowUp" && direction != "down") {
        direction = "up";
    }

    if(key == "ArrowDown" && direction != "up") {
        direction = "down";
    }
})