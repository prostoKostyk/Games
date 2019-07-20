canvas  = document.getElementById('canvas');   
ctx = canvas.getContext('2d');
canvas.width = 1300;
canvas.height = 600;
var lastTime;
playerSpeed = 200;
enemySpeed = 70;
clickJump = false;
PlayerStartX = 11;  // Начальная позиция игрока x
Floor = 471; // Земля
jumpHeigt = 180; // Высота прыжка игрока
var Islands = []; // массив островов
Islands[0] = {
x1: 300,
x2: 500,
y1: 330,
y2: 520,
}

function main() {         
    var now = Date.now();
    dt = (now - lastTime) / 1000.0;     
    update(dt);
    render();     
    lastTime = now;
    window.requestAnimationFrame(main);
}
function update(dt) {
    updateEntities(dt);
    handleInput(dt);
    enemyMove(dt);
};
resources.load([
    'img/terrain.png',
    'img/sprites.png',
    'img/sky.jpg',
    'img/island.png',
    'img/Player2.png',
    'img/enemy.png'
]);
resources.onReady(start);
 player = {
    pos: [PlayerStartX, Floor],    
    sprite: new Sprite('img/Player2.png', [0, 0], [109, 139], 6, [0]),// (url, pos, size, speed, frames, dir, once) 
    direction: "right",
    right: false,
    left: false, 
    rightSprite: new Sprite('img/Player2.png', [0, 0], [108, 139], 6, [1, 3, 5, 7 ]),
    leftSprite: new Sprite('img/Player2.png', [0, 134], [108, 139], 6, [5, 3, 1,0]),
    rightStopSprite:new Sprite('img/Player2.png', [0, 0], [108, 139], 6, [0]),
    leftStopSprite:new Sprite('img/Player2.png', [0, 134], [108, 139], 6, [0])
 }
 enemy = {
    pos: [440, Floor+50],    
    sprite: new Sprite('img/enemy.png', [85, 170], [71, 70], 6, [0]), // (url, pos, size, speed, frames, dir, once) 
    direction: "right",
    right: false,
    left: false, 
    rightSprite: new Sprite('img/enemy.png', [0, 3], [62, 70], 7, [0,1,2,3,4,5,6,7]),
    leftSprite: new Sprite('img/enemy.png', [0, 84], [62, 70], 7, [0,1,2,3,4,5,6,7]),
    rightStopSprite:new Sprite('img/enemy.png', [85, 166], [62, 70], 6, [0]),
    leftStopSprite:new Sprite('img/enemy.png', [0, 84], [62, 70], 6, [0])
}

island1X = 300;
island1Y = 451;
var island = {
    pos: [island1X, island1Y],  
    sprite: new Sprite('img/island.png', [0, 0], [162, 73], 6, [0])
}

function start() { 
    background = ctx.createPattern(resources.get('img/sky.jpg'), 'repeat');  // фон    
    terrainPattern = ctx.createPattern(resources.get('img/terrain.png'), 'repeat');  // земля
    lastTime = Date.now();
    main();    
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}

function updateEntities(dt) {  // Update the player sprite animation    
    player.sprite.update(dt); 
    island.sprite.update(dt);   
    enemy.sprite.update(dt); 
}
function render() {    
    ctx.fillStyle = background; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderEntity(island);     
    renderEntity(player);      
    renderEntity(enemy);    
};
function PlayerPosChange(x,y,player){
    player.pos[0]+=x; 
    player.pos[1]+=y; 
}
function isJumpDown(islandN, xPlayer, yPlayer){
 if (xPlayer > Islands[islandN].x1 && xPlayer < Islands[islandN].x2 && yPlayer == Islands[islandN].y1+1){
     return(false);
 }
 else {
     return(true);
 }
}
function IsDownFromIsland(islandN, xPlayer, yPlayer){
    if (xPlayer > Islands[islandN].x2 && yPlayer > Islands[islandN].y1-2 && yPlayer < Islands[islandN].y1+2){
        if(player.direction=="right"){
            PlayerPosChange(1,2,player); 
            }
            else{
                PlayerPosChange(-1,2,player); 
            }  
    }
}
a = 1;
function FigureMove(figure, action, speed){
    if (action == 'left')
    a = -1;    
    else if (action == 'right')
    a = 1;
    else a = 0;
    figure.pos[0] += speed * dt * a;    
    if (action=='left' && !figure.left){
    figure.sprite = figure.leftSprite;
    figure.left = true; 
    figure.right = false;  
    figure.direction = action; 
    return;
   }
   if (action=='right' && !figure.right){
    figure.sprite = figure.rightSprite;
    figure.direction = action;
    figure.left = false; 
    figure.right = true;   
    return;
   }
   if (action == 'stop'){
   if (figure.direction == "right")
   figure.sprite = figure.rightStopSprite; 
   if (figure.direction == "left")
   figure.sprite = figure.leftStopSprite;  
   figure.left = false; 
   figure.right = false; 
   return;
   }     
} 

function handleInput() {
   if(input.isDown('LEFT') || input.isDown('a')) {
        FigureMove(player, 'left', playerSpeed);
        player.right = false;
    }
   else if(input.isDown('RIGHT') || input.isDown('d')) {
        FigureMove(player, 'right', playerSpeed);
        player.left = false;
    }
    else 
    FigureMove(player, 'stop', playerSpeed);

    interval=10;
    if((input.isDown('Space')|| input.isDown('Up')) && !clickJump) {     
        g = false;
        clickJump = true;
        let timerId = setInterval(function() {
        if (player.pos[1] > Floor-jumpHeigt && g==false){
            if(player.direction=="right"){
            PlayerPosChange(1,-2,player);
            }
            else{ 
            PlayerPosChange(-1,-2,player);
            }
        }
        else 
        g = true;
        if (g && player.pos[1] < Floor && isJumpDown(0, player.pos[0]+80, player.pos[1])){
            if(player.direction=="right")
            PlayerPosChange(1,2,player);
            else
            PlayerPosChange(-1,2,player);
            
        }                  
          }, interval);     
          setTimeout(function() {
            clearInterval(timerId);
            clickJump = false;
          }, jumpHeigt * 10);  
    }
    if (player.pos[1] < Floor && clickJump == false){ 
        if (player.pos[0] < 240 || player.pos[0] > 422 ){
            PlayerPosChange(0, 5,player);
        }
     }
}

let f = 0;
function enemyMove() {
    sum =  player.pos[0] - enemy.pos[0];
    razn = enemy.pos[0] - player.pos[0];
    if ((razn < 200 && razn > 0 || sum < 200 && sum > 0) && enemy.pos[1] == player.pos[1] + 50 ){
        FigureMove(enemy, 'stop', enemySpeed);
        return;
    }
    f++;  
    if (f < 100){
    FigureMove(enemy, 'right', enemySpeed);
    return;
    }
    if (f < 200){
    FigureMove(enemy, 'left', enemySpeed);
    return;
    }
    f = 0;
}