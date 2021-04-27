var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var score = 0;

var turn=0;
 
var particles;
var particlesState="end";
var plinkos=[];
var divisions=[];

var divisionHeight=300;
var score =0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
      plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
      plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
      plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
      plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  noStroke();
  fill("white");
  textSize(20);
  text("Score: "+score,650,50)
 //text("Score : "+score,20,30);
  Engine.update(engine);


  fill("yellow");
  rectMode(CENTER);
  rect(width/2,480,width,10);

  text("500",575,600)
  text("500",665,600)
  text("500",740,600)

  text("200",575-550,600)
  text("200",665-560,600)
  text("200",740-560,600)

  text("100",575-235,600)
  text("100",665-245,600)
  text("100",740-245,600)
  text("100",740-480,600)

  if(particles){
    if(particlesState!="game over"){
      particles.display();
    }
    if(turn>4){
      particlesState="game over";
      textSize(80);
      // textMode(CENTER);
      text("GAME OVER",width/2-300,height/2-20);
    }

    if(particles.body.position.y>500&&particlesState=="fall"){
      var posX=particles.body.position.x;
      if(posX<565&&posX>245){
        score+=100;
      }
      if(posX<245&&posX>0){
        score+=200;
      }
      if(posX<width&&posX>564){
        score+=500;
      }
      particlesState="end";
      turn++;

    }
  }
  
 
  if(particlesState!="game over"){
    for (var i = 0; i < plinkos.length; i++) {
      plinkos[i].display();
    }
    
    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();
    }
  }
}

function mousePressed(){
  if(particlesState == "end"&&turn<5){
    particles=new Particle(random(200,width-200),-20,10);
    particlesState = "fall";
  }
}