var main;
var bkground;
var enemies;
var arrowGroup;
var health = 3;
var gameState = "PLAY";
var enemys = [];
var score = 0;
var enemy1Img,mainImg,enemy2Img;
var hArrowImg,vArrowImg;
var darkImg;
var lightBG;

function preload(){
    enemy1Img = loadImage("skeleton.png");
    mainImg = loadImage("knight2-removebg-preview.png");
    enemy2Img = loadImage("goblin-removebg-preview.png");
    hArrowImg = loadImage("arrowNoBG.png");
    vArrowImg = loadImage("upwards_arrow-removebg-preview.png");
    darkImg = loadImage("Dark-removebg-preview.png");
    lightBG = loadImage("bkground.jpg");
}
function setup(){
    //bkground = createSprite(1200,600);
    //bkground.addImage("grassy",lightBG);

    enemies = createGroup();
    arrowGroup = createGroup();

    main = createSprite(100,520,50,50);
    main.addImage("knight",mainImg);
    main.scale = 0.5;
}
function draw() {
    createCanvas(1200,600);
    background(lightBG);



  drawSprites();
  textSize(20);
  text("HP: "+health,330,35);
  text("Score: "+score,30,30);
  
  if(gameState == "PLAY"){

    
    

    if(keyDown(RIGHT_ARROW)){
      main.x = main.x + 10;
      
      //playSound("sound://category_movement/footstep_on_gravel_3.mp3");
    }
  
    if(keyDown(LEFT_ARROW)){
      main.x = main.x - 10;
      
      //playSound("sound://category_movement/footstep_on_gravel_3.mp3");
    }
  
    if(keyWentUp("space")){
      var temp_arrow = spawnArrows();
      temp_arrow.addImage("right", hArrowImg);
      temp_arrow.x = main.x;
      //playSound("sound://category_slide/arrow_whoosh.mp3");
    }
    
    if(keyWentUp("x")){
      var upwardArrow = spawnVertArrows();
      upwardArrow.addImage("up", vArrowImg);
      upwardArrow.x = main.x;
      //playSound("sound://category_slide/arrow_whoosh.mp3");
    }
    
    spawnEnemy();
  
    if(enemies.isTouching(arrowGroup)){
        enemies.destroyEach();
        arrowGroup.destroyEach();
        score += 5;
        //playSound("sound://category_achievements/lighthearted_bonus_objective_1.mp3");
    }
      
    if(enemies.isTouching(main)){
      enemies.destroyEach();
      health -= 1;
      if(health > 0){
        //playSound("sound://category_hits/8bit_splat.mp3");
      }
      if(health <= 0){
        gameState = "END";
        //playSound("sound://category_alerts/vibrant_game_life_lost_1.mp3");
      }
  }
    
 }
 
 if(gameState == "END"){
   main.addImage("necro",darkImg);
   main.setImage("necro",darkImg);
   main.x = 600;
   textSize(60);
   text("Game Over!",500,125);
   text("Click Space to Restart",500,195);
   //bkground.setAnimation("cave_1");
   if(keyDown("space")){
     gameState = "PLAY";
     main.setImage("knight",mainImg);
     //bkground.setAnimation("background_landscape04_1");
     health = 3;
     main.x = 100;
   }
   
 }
  
}

function spawnEnemy(){
  if(frameCount%(Math.round(random(60,120))) == 0){
    var enemy = createSprite(1135,520,50,50);
    enemy.addImage("skeleton", enemy1Img);
    enemy.scale = 0.3;
    enemy.velocityX = random(-5,-3);
    enemies.add(enemy);
    enemys.push(enemy);
  }
  
  if(frameCount%(Math.round(random(180,240))) == 0){
    var enemy2 = createSprite(random(25,1175),20,50,50);
    enemy2.addImage("goblin", enemy2Img);
    enemy2.scale = 0.5;
    enemy2.velocityY = random(7,10);
    enemies.add(enemy2);
  }
}

function spawnArrows(){
  var arrow = createSprite(main.x+10,520,50,50);
  //arrow.x = 100;
  arrow.scale = 0.1;   
  arrow.velocityX = 5;
  arrowGroup.add(arrow);
  return arrow;
}

function spawnVertArrows(){
  var arrow1 = createSprite(main.x,main.y-10,50,50);
  arrow1.scale = 0.1;
  arrow1.velocityY = -5;
  arrowGroup.add(arrow1);
  return arrow1;
}