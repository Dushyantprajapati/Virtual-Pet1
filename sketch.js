
var dog,dogHappy,database,foodS,foodStock,boneImage;

function preload(){
   dogImage = loadImage("Dog.png");
   dogHappy = loadImage("DogHappyIMG.png");
   boneImage = loadImage("bone.png");
 }

function setup() {
  database = firebase.database();
  createCanvas(700,600);
foodStock=20;
  dog = createSprite(width/2,300,10,10);
  dog.addImage("Dog",dogImage);
  dog.scale = 0.22;

  bone = createSprite(400,40,10,10);
  bone.addImage("bone",boneImage);
  bone.scale = 0.30;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(rgb(156,215,150));

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("Dog",dogHappy);
  }else{
    dog.addImage("Dog",dogImage);
  }

  if(keyWentDown(UP_ARROW)){
    dog.addImage("Dog",dogHappy);
  }

  drawSprites();
  textSize(30);
  fill("blACk");
  text("Food Stock : "+foodS,80,50);
  textSize(30);
  text("Press Up Arrow Key To Feed Dog  'Dragon Bone'!  ",15,470);
}


function readStock(data){
    foodS = data.val(); 
}

function writeStock(x){
  
  if(x<=0){
    x = 0;
  } else{
    x = x-1;
  }

    database.ref('/').update({
    Food:x
    })
}
