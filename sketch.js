/**
 * courtesy of this links
 * https://editor.p5js.org/BarneyCodes/sketches/UAETy7xKg
 */

function inkDroplet(x, y, radius, startingRadius, previousColour=null) {
  let minspeed = 4, maxspeed = 8;
  let maxSpeed = Math.floor(Math.random() * (maxspeed - minspeed) + minspeed);
  let alpha = map(radius, startingRadius, 0, 255, 0);

  let fillcol = sourceImg.get(x, y);
  fillcol[3] = alpha;

  if (previousColour != null) fillcol = (Math.random() > 0.9) ? fillcol : previousColour;

  if (radius > 0) {
    push();
    fill(fillcol);
    ellipse(x, y, 2 * radius, 2 * radius);
    pop();

    x += Math.random() - 0.5;
    y += map(radius, startingRadius, 0, maxSpeed, 0);

    inkDroplet(x, y, radius - 0.08, startingRadius, fillcol);
  }

}


let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_3.jpg";
let maskFile   = "mask_3.png";
let outputFile = "output_3.png";

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


let doLater = [];
function draw () {

  let min = 5, max = 10;
  let runtime = 10000;
  let repeats = 10;


  if (runtime > 0) {
    for(let i=0;i<runtime;i++) {
      let x = floor(random(sourceImg.width));
      let y = floor(random(sourceImg.height));
      let pix = sourceImg.get(x, y);
      let mask = maskImg.get(x, y);
      
      if(mask[0] > 128) {
        doLater.push([x, y]);
      }
      else {
        push();
          let fillcol = color(pix);
          colorMode(HSB, 100);

          fill(hue(fillcol), 0, brightness(fillcol));
          let pointSize = Math.random() * (15 - 10) + 10;
          ellipse(x, y, pointSize, pointSize);
        pop();
      }
    }

    for (let point of doLater) {
      let startingRadius = Math.random() * (max - min) + min;
      inkDroplet(point[0], point[1], startingRadius, startingRadius);
    }

    doLater = [];
  
    renderCounter++;
    if(renderCounter > repeats) {
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


/**
 * write some code to displace x by sine 
 * x + A * sine(something to do with y)
 * if it goes over the edges then just add or subtract 1920
 * 
 * or displace vertically
 */