/**
 * courtesy of this video:
 * https://www.youtube.com/watch?v=F2Jc-UqOFSo
 */
class InkBleed {
  constructor(x, y, r, min=3, max=6) {
    this.x = x;
    this.y = y;
    this.startRadius = r;
    this.maxSpeed = Math.random() * (max - min) + min;
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

  let run = false;

  if (run) {
  
    for(let i=0;i<7000;i++) {
      let x = floor(random(sourceImg.width));
      let y = floor(random(sourceImg.height));
      let pix = sourceImg.get(x, y);
      let mask = maskImg.get(x, y);
      fill(pix);
      if(mask[0] > 128) {
        let pointSize = 15;
        ellipse(x, y, pointSize, pointSize);
      }
      else {
        let pointSize = 10;
        rect(x, y, pointSize, pointSize);    
      }
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
