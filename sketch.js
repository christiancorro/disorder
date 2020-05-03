let DIM = 35;
let CONCENTRIC = 5;
let concentricDIM = DIM;
let distFactor = 12;
let distortion = DIM / distFactor;
const minDIST = 1;
let maxDIST = 4;
const N = 17;
let update = false;
let showText = true;
let bg;
function setup() {
  createCanvas(900, windowHeight);
  bg = color(249, 242, 236);
  background(bg);

  strokeWeight(1.8);
  fill(255, 0);
  translate(240, 35);
  for (let x = 0; x < N * DIM; x += DIM) {
    for (let y = 0; y < N * DIM; y += DIM) {
      concentricDIM = DIM;
      //draw inner quads
      for (let i = 0; i < CONCENTRIC; i++) {
        drawQuad(x, y);
      }
    }
  }


}


function draw() {
  //17x17 quads
  if (update)
    background(249, 242, 236);
  fill(0);
  noStroke();
  textSize(24);
  text("(Dés)Ordres", 50, 70);
  textSize(13);
  text("Vera Molnár, 1974", 50, 90);
  if (showText) {
    textSize(18);
    text("distance " + round(maxDIST * 10) / 10 + "px", 50, 155);
    text("entropy " + round((1 / distFactor) * 10) / 10, 50, 175);
    textSize(14);
    text("[t] toggle tips \n[mouseX] circumcentric dist\n[mouseY] entropy\n[click] freeze", 50, 205);
  }

  translate(240, 35);
  fill(255, 0);
  if (update) {
    maxDIST = map(mouseX, 0, width, 1, 20);
    maxDIST = maxDIST < 0.7 ? 0.7 : maxDIST;
    distFactor = map(mouseY, 0, height, 10, 0.8);

    for (let x = 0; x < N * DIM; x += DIM) {
      for (let y = 0; y < N * DIM; y += DIM) {
        concentricDIM = DIM;
        //draw inner quads
        for (let i = 0; i < CONCENTRIC; i++) {
          drawQuad(x, y);
        }
      }
    }
  }

}
let seed = 0;
function drawQuad(x, y) {
  seed = random(0, 3);
  if (seed < 1) {
    stroke(177, 167, 156);
  } else if (seed >= 1 && seed < 2) {
    stroke(98, 87, 77);
  } else {
    stroke(161, 156, 147);
  }

  distortion = concentricDIM / distFactor;
  let r = new Rect(new Point(distort(0), distort(0)), new Point(distort(concentricDIM), distort(0)), new Point(distort(concentricDIM), distort(concentricDIM)), new Point(distort(0), distort(concentricDIM)));
  push();
  translate(x + DIM - concentricDIM / 2, y + DIM - concentricDIM / 2);
  r.update();
  pop();
  concentricDIM /= random(minDIST, maxDIST);
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor(p1, p2, p3, p4) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }

  // draws lines between points
  update() {
    quad(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y, this.p4.x, this.p4.y)
  }
}

function distort(value) {
  return random(value - distortion, value + distortion);
}

function mouseClicked() {
  update = !update;
}

function keyPressed() {
  if (key.toLowerCase() === "t") {
    showText = !showText;
  }
}
