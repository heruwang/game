class Stump {

  constructor() {
    this.r = 100;
    this.x = width;
    this.y = height - this.r;
  }

  move() {
    this.x -= 6;
  }

  show() {
    image(sImg, this.x, this.y, this.r, this.r);
    fill(255, 50);         
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.r, this.r);
  }
}
