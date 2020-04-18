let tigger;
let tImg;
let dImg;
let bImg;
let bullets = [];
let soundClassifier;
let state = 'splash';
let score = 0;

function preload() {
  const options = {
    probabilityThreshold: 0.95
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  tImg = loadImage("assets/tigger.png");
  dImg = loadImage("assets/disney_forest.jpg");
  bImg = loadImage("assets/bullet.png");
}

function setup() {
  createCanvas(1300, 718);
  tigger = new Tigger();
  soundClassifier.classify(gotCommand);
  textAlign(CENTER);
  textSize(50);
}

function gotCommand(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == 'up') {
    tigger.jump();
  }

}

function gamePlay() {
  if (random(1) < 0.01) {
    bullets.push(new Bullet());
  }

  background(dImg);
  for (let b of bullets) {
    b.move();
    b.show();
    if (tigger.hits(b)) {
      console.log('game over');
      noLoop();
    }else if(b.x === 0){
      score++;
      console.log("score =" + score );
    }
  }

  tigger.show();
  tigger.move();

}


function splashScreen() {
  background(dImg);
  fill(0);
  strokeWeight(100);
  text('click to start', width / 2, height / 2);
}

function keyPressed() {
  if (key == ' ') {
    tigger.jump();
  }
}

function mousePressed(){
  switch (state) {
    case ('splash'):
    splashScreen();
    break;
    case ('gamePlay'):
    gamePlay();
    break;
    case ('youWon'):
    break;
    case ('youLose'):
    break;
  }
}
function splashScreenMousePressed(){
  state = 'gamePlay';
}

function draw() {
  switch (state) {
    case ('splash'):
    splashScreenMousePressed();
    break;
    case ('gamePlay'):
    gamePlay();
    break;
    case ('youWon'):
    break;
    case ('youLose'):
    break;
  }
}
