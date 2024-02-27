//Clock Variables

let font;
let points = [];
let xPos = (screen.width/5) + 50; 
let yPos = screen.height/2 + 50; 
let fontSize = 150; 

//Game of Life Variables

let cols; 
let rows; 
let size = 10;
let grid = [];
let clock = [];
let distanceFromPoints = 10;

//Color Variables
let hueVal = 0;

function preload() {
  font = loadFont("fonts/Nunito.ttf");
}

function setup() {
  createCanvas(screen.width, screen.height);
  colorMode(HSB, 255); 
  cols = width/size;
  rows = height/size;
  
  for(let i = 0; i < cols; i++) {
    grid[i] = [];
    clock[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
      clock[i][j] = 0;
    }
  }
  
}

function draw() {
  background(0); //Canvas Color 
  
  let h_msg = doubleDigits(hour()); //Hour
  let m_msg = doubleDigits(minute()); //Minute 
  let s_msg = doubleDigits(second()); //Second
  
  msg = h_msg + " : " + m_msg + " : " + s_msg; //Printing Clock
  
  points = font.textToPoints(msg, xPos, yPos, fontSize);

  
  for(let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
      let x = i*size;
      let y = j*size;
      
      for(let k = 0; k < points.length; k++){
        let distance = dist(points[k].x, points[k].y, x, y);
        
        if (distance < distanceFromPoints){
          grid[i][j] = 1;
          clock[i][j] = 1;
        }
      }
      
      noFill();
      if(grid[i][j] == 1){
        stroke(255);
      } else {
        noStroke();
      }
      
      rect(i*size, j*size, size, size);
      
      if(clock[i][j] == 1){
        fill(hueVal, 255, 255);
        stroke(0);
      } else {
        noStroke();
      }
      
      rect(i*size, j*size, size, size);
      clock[i][j] = 0;
    }
  }
  
  //drawPoints();
  
  let nextGen = [];
  for(let i = 0; i < cols; i++) {
    nextGen[i] = [];
    for (let j = 0; j < rows; j++) {
      let n = neighboringStates(grid, i, j)
      if(grid[i][j] == i && n < 2){
        nextGen[i][j] = 0;
      } else if (grid[i][j] == 1 && (n == 2 || n == 3)){
        nextGen[i][j] = 1;
      } else if (grid[i][j] == 1 && n > 3) {
        nextGen[i][j] = 0;     
       } else if (grid[i][j] == 0 && n == 3){
         nextGen[i][j] = 1;  
       } else {
         nextGen[i][j] = grid[i][j]; 
       }
    }
  }
  
  grid = nextGen;
  
  if(hueVal > 255){
    hueVal = 0;
  }
  hueVal += 5;
}

function drawPoints(){
  print(points);
  fill(0);
  for (let i = 0; i < points.length; i++){
    ellipse(points[i].x, points[i].y, 10, 10); 
  }
}


function neighboringStates(grid, x, y){
  
  let sum = 0;
  for (let i = -1; i < 2; i++){
    for (let j = -1; j < 2; j++){
      let xIndex = (x + i + cols) % cols;
      let yIndex = (y + j + rows) % rows;
      sum += grid[xIndex][yIndex];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function doubleDigits(integer) {
  
  let intToString = integer.toString();
  let msg;
  
  if (intToString.length == 1) {
    msg = "0" + intToString;
  } else {
    msg = intToString;
  }
  
  return msg;
}
