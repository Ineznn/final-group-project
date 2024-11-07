let Blocks = [];
let movingBlocks = [];
let smallBlockSize;
let song, analyser;

function preload() {
  // Let's load the sound file in preload
  song = loadSound("assets/Two_Cigarettes_Please.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Drawing canvas as window size
  analyser = new p5.Amplitude(); // Create a new Amplitude analyser, this will analyse the volume of the song
  analyser.setInput(song); // Connect the input of the analyser to the song
  let button = createButton('Play/Pause'); // Add a button for play/pause
  button.position((width - button.width) / 2, height - button.height - 20); // Set the position of the button to the bottom centre
  button.mousePressed(play_pause); // Run the function play_pause when the button is pressed
  initializeBlocks(); // Draw different coloured blocks as buildings, roads, pavements, zebra crossings.
  generateMovingBlocks(); // Generate small moving blocks to simulate cars
}

function draw() {
  drawBlocks();
  updateMovingBlocks();
}

// I want the song to play once, so I use song.play()
function play_pause() {
  if (song.isPlaying()) {
    song.pause(); // Pause the music
  } else {
    song.loop(); // Loop the music
  }
}

// Allow output images to automatically adjust to changes in window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  Blocks = []; // Clear the original Blocks array at each window adjustment 
  movingBlocks = []; // Clear the moving blocks array as well
  initializeBlocks();
  generateMovingBlocks();
}

function initializeBlocks() {
  smallBlockSize = 0.02 * min(windowWidth, windowHeight);
  // Simulate roads, buildings and pavements with blocks 
  // Yellow blocks simulate city roads, and set its isRoad to true
  Blocks.push(new Block(0, 2 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 6 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(3 * smallBlockSize, 12 * smallBlockSize, 23 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 17 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 20 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 26 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 30 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 39 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(0, 46 * smallBlockSize, 48 * smallBlockSize, smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(3 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(6 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, 46 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(11 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(26 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(28 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(40 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));
  Blocks.push(new Block(46 * smallBlockSize, 0, smallBlockSize, 48 * smallBlockSize, color(230, 205, 40), true));

  // Yellow blocks simulate buildings
  Blocks.push(new Block(7 * smallBlockSize, 7 * smallBlockSize, 4 * smallBlockSize, 4 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(8 * smallBlockSize, 26 * smallBlockSize, 2 * smallBlockSize, 4 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(7 * smallBlockSize, 31.8 * smallBlockSize, 5 * smallBlockSize, 3 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(20 * smallBlockSize, 21 * smallBlockSize, 3 * smallBlockSize, 5 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(20 * smallBlockSize, 27 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(41 * smallBlockSize, 9 * smallBlockSize, 5 * smallBlockSize, 4 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(41 * smallBlockSize, 22 * smallBlockSize, 5 * smallBlockSize, 3 * smallBlockSize, color(230, 205, 40)));

  // blue blocks simulate buildings
  Blocks.push(new Block(4 * smallBlockSize, 13 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(4 * smallBlockSize, 36 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(14 * smallBlockSize, 21 * smallBlockSize, 4 * smallBlockSize, 5 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(31 * smallBlockSize, 31 * smallBlockSize, 5 * smallBlockSize, 8 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(41 * smallBlockSize, 13 * smallBlockSize, 3 * smallBlockSize, 2.5 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(43 * smallBlockSize, 42 * smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(10 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(70, 100, 190)));
  Blocks.push(new Block(18 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(70, 100, 190)));

  // red blocks simulate buildings
  Blocks.push(new Block(7 * smallBlockSize, 21 * smallBlockSize, 4 * smallBlockSize, 3 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(8 * smallBlockSize, 40 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(8 * smallBlockSize, 44 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(22 * smallBlockSize, smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(34 * smallBlockSize, 19 * smallBlockSize, 4 * smallBlockSize, smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(34 * smallBlockSize, 21 * smallBlockSize, 4 * smallBlockSize, 5 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(31 * smallBlockSize, 33 * smallBlockSize, 5 * smallBlockSize, 4 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(41 * smallBlockSize, 10 * smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(42 * smallBlockSize, 35 * smallBlockSize, 3 * smallBlockSize, 3 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(12 * smallBlockSize, 42 * smallBlockSize, 4 * smallBlockSize, 4 * smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(3 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(160, 55, 45)));
  Blocks.push(new Block(6 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(160, 55, 45)));

  // Grey blocks simulate buildings
  Blocks.push(new Block(8 * smallBlockSize, 9 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(8 * smallBlockSize, 42 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(13 * smallBlockSize, 43 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(20 * smallBlockSize, 23 * smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(20 * smallBlockSize, 26 * smallBlockSize, 3 * smallBlockSize, 1.3 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(34 * smallBlockSize, 18 * smallBlockSize, 4 * smallBlockSize, 1.3 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(35 * smallBlockSize, 20 * smallBlockSize, 2.5 * smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(35 * smallBlockSize, 23 * smallBlockSize, 2.3 * smallBlockSize, 2 * smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(8 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(13 * smallBlockSize, 12 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));

  // Grey blocks simulate pavements and zebra crossings
  Blocks.push(new Block(2 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(10 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(12 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(26 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(30 * smallBlockSize, 2 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));

  Blocks.push(new Block(smallBlockSize, 6 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(18 * smallBlockSize, 6 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));
  Blocks.push(new Block(32 * smallBlockSize, 6 * smallBlockSize, smallBlockSize, smallBlockSize, color(200, 200, 200)));

  // Add extra blocks
  Blocks.push(new Block(32 * smallBlockSize, 34 * smallBlockSize, 3 * smallBlockSize, 2 * smallBlockSize, color(230, 205, 40)));
  Blocks.push(new Block(15 * smallBlockSize, 22 * smallBlockSize, 2 * smallBlockSize, 2 * smallBlockSize, color(230, 205, 40)));
}

// Additional code for buildings and pavements as per the original setup
// ... (omitted for brevity)

// Create a class with each block (buildings, roads) as a separate object for management and drawing
class Block {
  constructor(x, y, w, h, c, isRoad = false) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.isRoad = isRoad; // Checks if blocks are road blocks, defaults to false
  }

  display() {
    noStroke();
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
  }
}

// Clear the canvas background and generate all blocks
function drawBlocks() {
  // Setting the canvas background color
  background(240, 240, 235);
  for (let i = 0; i < Blocks.length; i++) {
    Blocks[i].display();
  }
  for (let i = 0; i < movingBlocks.length; i++) {
    movingBlocks[i].display();
  }
}

// Generate small moving blocks to simulate cars
function generateMovingBlocks() {
  for (let i = 0; i < Blocks.length; i++) {
    if (Blocks[i].isRoad) {
      let numSmallBlocks = 5; // Each road generates five moving blocks
      for (let t = 0; t < numSmallBlocks; t++) {
        let x = Blocks[i].x + Math.floor(random(0, Blocks[i].w / smallBlockSize)) * smallBlockSize;
        let y = Blocks[i].y + Math.floor(random(0, Blocks[i].h / smallBlockSize)) * smallBlockSize;
        let speed = random(0.1, 0.9); // Random speed for each car
        let direction = random() > 0.5 ? 1 : -1; // Random direction (left or right or up or down based on road orientation)
        let colorSmallBlock = random() > 0.5 ? color(160, 55, 45) : color(70, 100, 190);// assign blue or red colour randomly to the smallblocks
        movingBlocks.push(new MovingBlock(x, y, smallBlockSize, smallBlockSize, colorSmallBlock, speed, direction, Blocks[i]));
      }
    }
  }
}

// Create a class for moving blocks
class MovingBlock extends Block {
  constructor(x, y, w, h, c, speed, direction, parentBlock) {
    super(x, y, w, h, c);
    this.speed = speed;
    this.direction = direction;
    this.parentBlock = parentBlock; // Reference to the road block to restrict movement within it
  }

  update() {
    if (this.parentBlock.w > this.parentBlock.h) {
      // Horizontal movement for horizontal roads
      this.x += this.speed * this.direction;
      // Keep the moving block within the bounds of the parent road block
      if (this.x > this.parentBlock.x + this.parentBlock.w) {
        this.x = this.parentBlock.x;
      }
      if (this.x < this.parentBlock.x) {
        this.x = this.parentBlock.x + this.parentBlock.w;
      }
    } else {
      // Vertical movement for vertical roads
      this.y += this.speed * this.direction;
      // Keep the moving block within the bounds of the parent road block
      if (this.y > this.parentBlock.y + this.parentBlock.h) {
        this.y = this.parentBlock.y;
      }
      if (this.y < this.parentBlock.y) {
        this.y = this.parentBlock.y + this.parentBlock.h;
      }
    }
  }

  display() {
    this.update();
    super.display();
  }
}

// Update all moving blocks
function updateMovingBlocks() {
  for (let i = 0; i < movingBlocks.length; i++) {
    movingBlocks[i].update();
  }
}
