let player;
let fruits = [];
let obstacles = [];
let city;
let score = 0;
let gameOver = false;
let gameStarted = false;
let showTitle = true;
let titleOpacity = 255;
let bgPosX = 0;  // Para o movimento de parallax no fundo

// Sons (certifique-se de carregar os sons apropriados)
let collectSound, hitSound, victorySound;
// Variáveis para a mensagem "Jogo da Elo"

function setup() {
  createCanvas(800, 400);
  player = createVector(100, height / 2);
  city = createVector(width - 100, height / 2);

  // Frutas
  for (let i = 0; i < 5; i++) {
    fruits.push(createVector(random(150, width - 150), random(50, height - 50)));
  }

  // Obstáculos
  for (let i = 0; i < 3; i++) {
    obstacles.push({
      pos: createVector(random(200, width - 200), random(height)),
      dir: random(1) > 0.5 ? 1 : -1
    });
  }
}

function draw() {
  background(180, 230, 200);
  drawBackground();
  drawCity();

  // Mensagem de abertura
  if (showTitle) {
    textAlign(CENTER);
    textSize(40);
    fill(255, 100, 0, titleOpacity);
    text("🎉 Jogo da Elo 🎉", width / 2, 60);
    titleOpacity -= 2; // Fade-out progressivo
    if (titleOpacity <= 0) {
      showTitle = false;
    }
  }

  if (gameOver) {
    textSize(32);
    fill(0);
    textAlign(CENTER);
    text("Fim de Jogo!  Voce Pontos: " + score, width/2, height/2);
    return;
  }

  // Mostrar jogador
  fill(216, 191, 216);
  ellipse(player.x, player.y, 30, 30);

  // Movimento de obstáculos
  for (let obs of obstacles) {
    rect(obs.pos.x, obs.pos.y, 40, 50);
    obs.pos.y += obs.dir * 2;

    if (obs.pos.y > height || obs.pos.y < 0) {
      obs.dir *= -1;
    }

    if (dist(player.x, player.y, obs.pos.x + 10, obs.pos.y + 25) < 25) {
      gameOver = true;
    }
  }

  // Frutas
  fill(220,20,60 );
  for (let i = fruits.length - 1; i >= 0; i--) {
    ellipse(fruits[i].x, fruits[i].y, 15, 15);
    if (dist(player.x, player.y, fruits[i].x, fruits[i].y) < 20) {
      fruits.splice(i, 1);
      score++;
    }
  }

  // Vitória
  if (player.x > city.x && fruits.length === 0) {
    textSize(28);
    fill(75,0,13);
    textAlign(CENTER);
    text("Vitória! Você conectou o campo à cidade!", width / 2, height / 2);
    noLoop();
    return;
  }

  // Instruções
  fill(100);
  textSize(14);
  textAlign(LEFT);
  text("Use SETAS para mover (← ↑ ↓ →) e colete as frutas!", 10, 20);
  text("Frutas: " + fruits.length + " | Pontos: " + score, 10, 40);
}

function drawCity() {
  fill(100, 10, 255);
  rect(city.x, city.y - 40, 40, 80);
  rect(city.x - 30, city.y - 60, 20, 100);
}

function drawBackground() {
  fill(60, 200, 100);
  rect(0, height - 100, width, 100);
  fill(50, 150, 50);
  textSize(18);
  text("Campo", 20, height - 20);
  fill(100, 100, 255);
  text("Cidade", width - 100, 30);
}

// Controle por teclado
function keyPressed() {
  if (!gameOver) {
    if (keyCode === UP_ARROW) player.y -= 20;
    if (keyCode === DOWN_ARROW) player.y += 20;
    if (keyCode === LEFT_ARROW) player.x -= 20;
    if (keyCode === RIGHT_ARROW) player.x += 20;
  }
}