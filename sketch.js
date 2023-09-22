//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let wRaquete = 10;
let hRaquete = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;


//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente =0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let hit = false;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, wRaquete, 
      hRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  
  yRaquete = constrain(yRaquete, 0, 310);
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + wRaquete && 
      yBolinha - raio < yRaquete + hRaquete && 
      yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y){
  hit = collideRectCircle(x, y,wRaquete,hRaquete,
                              xBolinha,yBolinha,raio);
  if (hit){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - wRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar()
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 310);
  
  
  //if (keyIsDown(87)){
  //  yRaqueteOponente -= 10;
  //}
  //if (keyIsDown(83)){
  //  yRaqueteOponente += 10;
  //}
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16);
  fill(color(255, 140, 0));
  rect(230, 10, 40, 20);
  fill(255);
  text(meusPontos, 250, 26);
  fill(color(255, 140, 0));
  rect(330, 10, 40, 20);
  fill(255);
  text(pontosOponente, 350, 26);
}

function marcaPonto(){
  if (xBolinha > 592){
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha < 8){
    pontosOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}