let tigger;
let tImg;
let bImg;
let sImg;
let stumps = [];
let soundClassifier;

function preload() {
  const options = { probabilityThreshold: 0.95 };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  tImg = loadImage("assets/tigger.png");
  bImg = loadImage("assets/disney_forest.jpg");
  sImg = loadImage("assets/tree_stump.png");
}

function setup() {
  createCanvas(1300, 718);
  tigger = new Tigger();
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results){
  if(error){
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if(results[0].label == 'up'){
    tigger.jump();
  }

}
function keyPressed() {
  if (key == ' ') {
    tigger.jump();
  }
}

function draw() {
  if (random(1) < 0.01) {
    stumps.push(new Stump());
  }

  background(bImg);
  for (let s of stumps) {
    s.move();
    s.show();
    if(tigger.hits(s)){
      console.log('game over');
      noLoop();
    }
  }

  tigger.show();
  tigger.move();


}
