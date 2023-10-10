/**
 * courtesy of this link
 * https://editor.p5js.org/BarneyCodes/sketches/UAETy7xKg
 * 
 * recursion my beloved
 */
function inkDroplet(x, y, radius, startingRadius, decrement, carryColor=null) {
  // Init vars
  let minspeed = 4, maxspeed = 8;
  let maxSpeed = Math.floor(Math.random() * (maxspeed - minspeed) + minspeed);
  let alpha = map(radius, startingRadius, 0, 127, 0);

  // Init colours
  colorMode(RGB);
  let fillcol = sourceImg.get(x, y);
  fillcol[3] = alpha;

  // Greyscale the colour if this mode is set
  if (carryColor === "greyscale") {
    colorMode(HSB, 100);
    fillcol = [hue(fillcol), 0, brightness(fillcol), Math.random() * 8];
  }
  // 10% chance to pick up a new colour instead of using the previous colour
  else if (carryColor !== null) { 
    fillcol = (Math.random() > 0.9) ? fillcol : carryColor;
  }

  // recursively draw while the radius is greater than 0
  if (radius > 0) {
    push();
    
    fill(fillcol);
    ellipse(x, y, 2 * radius, 2 * radius);
    pop();

    // offset x and y 
    x += Math.random() - 0.5;
    y += map(radius, startingRadius, 0, maxSpeed, 0);

    inkDroplet(x, y, radius - decrement, startingRadius, decrement, (carryColor === "greyscale") ? "greyscale" : fillcol);
  }
}

let sourceImg = null;
let maskImg = null;
let renderCounter = 0;

const SAVE = false;
const FILE_NUM = "6";

// change these three lines as appropiate
let sourceFile = "input_" + FILE_NUM + ".jpg";
let maskFile   = "mask_" + FILE_NUM + ".png";
let outputFile = "output_" + FILE_NUM + ".png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  // background(170, 170, 170);
  image(sourceImg, width/2, height/2, width, height);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

let doLater = [];
function draw () {

  let min = 5, max = 8; // min and max radius sizes
  let runtime = 10000;
  let repeats = 1;

  if (runtime > 0) {
    for(let i=0;i<runtime;i++) {
      let x = floor(random(sourceImg.width));
      let y = floor(random(sourceImg.height));
      let mask = maskImg.get(x, y);
      
      if(mask[0] > 128) {
        doLater.push([x, y]);
      }
      else {
        let rad = Math.random() * (max - min + 2) + min;
        inkDroplet(x, y, rad, rad, 0.13, "greyscale");
      }
    }

    // Draws the ink droplets last so that the effect (utlimately) is not obfuscated
    for (let point of doLater) {
      let startingRadius = Math.random() * (max - min) + min;
      inkDroplet(point[0], point[1], startingRadius, startingRadius, 0.08);
    }
    doLater = [];
  
    renderCounter++;
    if(renderCounter > repeats) {
      console.log("Done!")
      noLoop();
      if (SAVE) saveArtworkImage(outputFile);
    }
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
