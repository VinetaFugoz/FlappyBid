const sprites = new Image();
sprites.src = "sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");
let telaAtiva = {};

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  gravidade: 0.05,
  velocidade: 0,
  atualiza() {
    flappyBird.velocidade += flappyBird.gravidade;
    flappyBird.y = flappyBird.y + flappyBird.velocidade;
  },
  desenhaFlappyBird() {
    desenha(flappyBird, 0, 0);
  },
};

const chao = {
  spriteX: 0,
  spriteY: 610,
  largura: 222,
  altura: 721,
  x: 0,
  y: canvas.height - 112,
  desenhaChao() {
    desenha(chao, 0, 0);
    desenha(chao, chao.largura);
  },
};

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenhaPlanoDeFundo() {
    contexto.fillStyle = "#70c5ce";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    desenha(planoDeFundo);
    desenha(planoDeFundo, planoDeFundo.largura);
  },
};

const telaDeInicio = {
  spriteX: 134,
  spriteY: 0,
  largura: 174,
  altura: 152,
  x: canvas.width / 2 - 174 / 2,
  y: 50,
  desenhaTelaDeInicio() {
    desenha(telaDeInicio);
  },
};

const Telas = {
  INICIO: {
    desenha() {
      planoDeFundo.desenhaPlanoDeFundo();
      chao.desenhaChao();
      flappyBird.desenhaFlappyBird();
      telaDeInicio.desenhaTelaDeInicio();
    },
    click() {
      mudaParaTela(Telas.JOGO)
    },
    atualiza() {},
  },
};

Telas.JOGO = {
  desenha() {
    planoDeFundo.desenhaPlanoDeFundo();
    chao.desenhaChao();
    flappyBird.desenhaFlappyBird();
  },
  atualiza() {
    flappyBird.atualiza();
  },
};

function desenha(objeto, largura = 0, altura = 0) {
  switch (objeto) {
    case flappyBird:
      objeto = flappyBird;
      break;
    case chao:
      objeto = chao;
      break;
    case planoDeFundo:
      objeto = planoDeFundo;
      break;
    default:
      objeto = telaDeInicio;
  }

  contexto.drawImage(
    sprites,
    objeto.spriteX,
    objeto.spriteY,
    objeto.largura,
    objeto.altura,
    objeto.x + largura,
    objeto.y + altura,
    objeto.largura,
    objeto.altura
  );
}

function mudaParaTela(novaTela) {
  telaAtiva = novaTela;
}

function loop() {
  telaAtiva.desenha();
  telaAtiva.atualiza();

  requestAnimationFrame(loop);
}

window.addEventListener("click", () => {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
})

mudaParaTela(Telas.INICIO);
loop();
