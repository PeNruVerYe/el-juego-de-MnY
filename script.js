const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake = [{x: 10, y: 10}];
let dir = {x: 1, y: 0};
let apple = placeApple();
let score = 0;
let running = true;

function randomPos() {
  return { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
}

function placeApple() {
  let p;
  do { p = randomPos(); } while (snake.some(s => s.x === p.x && s.y === p.y));
  return p;
}

function collision(pos, arr) {
  return arr.some(s => s.x === pos.x && s.y === pos.y);
}

function loop() {
  if (!running) return;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  if (head.x < 0) head.x = cols - 1;
  if (head.x >= cols) head.x = 0;
  if (head.y < 0) head.y = rows - 1;
  if (head.y >= rows) head.y = 0;
  if (collision(head, snake)) { running = false; drawGameOver(); return; }
  snake.unshift(head);
  if (head.x === apple.x && head.y === apple.y) { score++; apple = placeApple(); }
  else snake.pop();
  draw();
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ff69b4';
  snake.forEach(s => ctx.fillRect(s.x * scale, s.y * scale, scale - 1, scale - 1));
  ctx.fillStyle = '#f00';
  ctx.fillRect(apple.x * scale, apple.y * scale, scale - 1, scale - 1);
  ctx.fillStyle = '#fff';
  ctx.font = '16px sans-serif';
  ctx.fillText('Score: ' + score, 10, 20);
}

function drawGameOver() {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = '16px sans-serif';
  ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 20);
}

window.addEventListener('keydown', e => {
  const key = e.key;
  if (key === 'ArrowUp' && dir.y === 0) { dir = {x:0,y:-1}; }
  else if (key === 'ArrowDown' && dir.y === 0) { dir = {x:0,y:1}; }
  else if (key === 'ArrowLeft' && dir.x === 0) { dir = {x:-1,y:0}; }
  else if (key === 'ArrowRight' && dir.x === 0) { dir = {x:1,y:0}; }
  else if (key === ' ') { if (!running) reset(); }
});

function reset() {
  snake = [{x:10,y:10}];
  dir = {x:1,y:0};
  apple = placeApple();
  score = 0;
  running = true;
}

setInterval(loop, 100);
