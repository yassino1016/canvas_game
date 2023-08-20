const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const carImage = new Image();
carImage.src = 'car.png';
const treeImage = new Image();
treeImage.src = 'tree.png'; 
const endImage = new Image();
endImage.src = 'end.png';

const carWidth = 50;
const carHeight = 60;
const treeWidth = 30;
const treeHeight = 30;
const endWidth = 70;
const endHeight = 10;

const car = {
  x: 0,
  y: 40,
  speed: 2,
};

const trees = [
  { x: 50, y: 0 },
  { x: 150, y: 0 },
  { x: 250, y: 0 },
  { x: 350, y: 0 },

  { x: 50, y: 100 },
  { x: 150, y: 100 },
  { x: 250, y: 100 },
  { x: 350, y: 100 },

  { x: 250, y: 200 },
  { x: 350, y: 200 },
];

const end = {
  x: 285,
  y: 270,
};
let gameOver = false;
function updateGameArea() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw trees
  trees.forEach(tree => {
    context.drawImage(treeImage, tree.x, tree.y, treeWidth, treeHeight);
  });


  // Draw the car
    context.drawImage(carImage, car.x, car.y, carWidth, carHeight);


  // Draw the end
  context.drawImage(endImage, end.x, end.y, endWidth, endHeight);


    if (
      car.x < end.x + endWidth &&
      car.x + carWidth > end.x &&
      car.y < end.y + endHeight &&
      car.y + carHeight > end.y
    ) {
      alert('You reached the end!');
      gameOver = true; 
      return;
    }
  
  
    trees.forEach(tree => {
      if (
        car.x < tree.x + treeWidth &&
        car.x + carWidth > tree.x &&
        car.y < tree.y + treeHeight &&
        car.y + carHeight > tree.y
      ) {
        gameOver = true; 
        alert('Game Over - You hit a tree!');
        return; 
        
      }
    });
  
    if (!gameOver) {
      requestAnimationFrame(updateGameArea);
      
    }
  }
  

  const keys = {};
  
  document.addEventListener('keydown', (event) => {
    if (!gameOver) { 
      keys[event.key] = true;
    }
  });
  
  document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
  });
  
  function moveCar() {
    if (!gameOver) { // Only move the car if the game is not over
      if (keys.ArrowUp && car.y > 0) car.y -= car.speed;
      if (keys.ArrowDown && car.y < canvas.height - carHeight) car.y += car.speed;
      if (keys.ArrowLeft && car.x > 0) car.x -= car.speed;
      if (keys.ArrowRight && car.x < canvas.width - carWidth) car.x += car.speed;
  
      setTimeout(moveCar, 10);
    } else {
      
      car.x = 50;
      car.y = 0;
    }
  }
  
  moveCar(); 
  updateGameArea();