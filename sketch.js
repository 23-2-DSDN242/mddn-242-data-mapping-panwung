/**
 * courtesy of this video:
 * https://www.youtube.com/watch?v=F2Jc-UqOFSo
 * https://editor.p5js.org/BarneyCodes/sketches/UAETy7xKg
 */
class Drip {
  constructor(r) {
    this.radius = r;
    this.startR = r;
    this.maxSpeed = Math.floor(Math.random() * (6  - 3) + 3);
  }
  
  draw(x, y, col) {
    let a = map(this.radius, this.startR, 0, 255, 0);
    col[3] = a;
    
    if (this.radius > 0) {
      push();
      fill(col);
      
      ellipse(x, y, this.radius * 2, this.radius * 2);
      pop();
      
      this.radius -= 0.05;
      x += random(-0.5, 0.5);
      y += map(this.radius, this.startR, 0, this.maxSpeed, 0);
      
      this.draw(x, y, col);
      
    }
  }
}



let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_1.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  // background(255, 0, 0);
  image(sourceImg, width/2, height/2, width, height);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}



function draw () {

  let runtime = 7000;
  let dripArray = [];


  if (runtime > 0) {
    for(let i=0;i<runtime;i++) {
      let x = floor(random(sourceImg.width));
      let y = floor(random(sourceImg.height));
      let pix = sourceImg.get(x, y);
      let mask = maskImg.get(x, y);
      fill(pix);
      if(mask[0] > 128) {
        dripArray.push([x, y, pix]);
      }
      else {
        let pointSize = 10;
        ellipse(x, y, pointSize, pointSize);    
      }
    }
  
    for (let i=dripArray.length -1; i >= 0; i--) {
      new Drip(random(5, 10)).draw(dripArray[i][0], dripArray[i][1], dripArray[i][2]);
      dripArray.splice(i, 1);
    }

    renderCounter = renderCounter + 1;
    if(renderCounter > 10) {
      console.log("Done!")
      noLoop();
      // uncomment this to save the result
      // saveArtworkImage(outputFile);
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
