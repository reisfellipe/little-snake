// ctx.fillStyle = "green";
// ctx.fillRect(300, 300, 50, 50);

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30;
const snake= [
    { x: 200, y: 200 },
    { x: 230, y: 200 },
]



const drawSnake = () => {
    ctx.fillStyle = "lightgreen";
    
    snake.forEach((position, index) => {

        if(index == snake.length - 1){
            ctx.fillStyle = "cadetblue"
        }

        ctx.fillRect(position.x,position.y,size,size)
    })
}

drawSnake();