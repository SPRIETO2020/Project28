const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;

var tree, stone, ground, launcher;
var mango1, mango2, mango3, mango4, mango5;
var world, boy;
var launchingForce=100;

function preload(){
	boy = loadImage("images/boy.png");
}

function setup() {
	createCanvas(1300, 600);
	engine = Engine.create();
	world = engine.world;

	stone = new Stone(235,420,30); 

	mango1 = new Mango(1100,90,30);
  mango2 = new Mango(1180,170,30);
	mango3 = new Mango(1010,140,30);
	mango4 = new Mango(950,200,30);
	mango5 = new Mango(1100,190,30);

	tree = new Tree(1050,580);
	ground = new Ground(width/2, 600, width, 20);
  launcher = new Launcher(stone.body, {x:235,y:420})
  
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1300,
      height: 600,
      wireframes: false
    }
  });
	
	Engine.run(engine);
}

function draw() {
  background(230);
  image(boy ,200,360,200,300); 

  ground.display();
  tree.display();
  stone.display();
  launcher.display();

  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();

  detectollision(stone, mango1);
  detectollision(stone, mango2);
  detectollision(stone, mango3);
  detectollision(stone, mango4);
  detectollision(stone, mango5);
}

function mouseDragged() {
	Matter.Body.setPosition(stone.body, {x:mouseX, y:mouseY}) 
}

function mouseReleased() {
	launcher.fly();
}


function detectollision(stone, mango) {
  mangoBodyPosition = mango.body.position
  stoneBodyPosition = stone.body.position
  
  var distance=dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y)
  	if(distance<=mango.r+stone.r) {
  	  Matter.Body.setStatic(mango.body,false);
    }
}