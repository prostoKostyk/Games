canvas  = document.getElementById('canvas');   
ctx = canvas.getContext('2d');
canvas.width = 1300;
canvas.height = 600;
var lastTime;
var gameTime = 0;
var playerSpeed = 200;
clickRight = false;
clickLeft = false;
clickStop = false;
clickJump = false;
PlayerStartX = 11;  // Начальная позиция игрока x
PlayerFloor = 471; // Начальная позиция игрока y
PlayerDirection = "right"; // Направление игрока
jumpHeigt = 180;
var Islands = []; // массив островов
Islands[0] = {
x1: 300,
x2: 500,
y1: 330,
y2: 520,
}

function main() {         
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;     
    update(dt);
    render();     
    lastTime = now;
    window.requestAnimationFrame(main);
}
function update(dt) {
    gameTime += dt;
    updateEntities(dt);
    handleInput(dt);
};
resources.load([
    'img/terrain.png',
    'img/sprites.png',
    'img/sky.jpg',
    'img/island.png',
    'img/Player2.png'
]);
resources.onReady(start);
var player = {
    pos: [PlayerStartX, PlayerFloor],    
    sprite: new Sprite('img/Player2.png', [0, 0], [109, 139], 6, [0]) // (url, pos, size, speed, frames, dir, once) 
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

function direction(){
    if (PlayerDirection == "right"){
        player.sprite = new Sprite('img/Player2.png', [0, 0], [108, 139], 6, [1, 3, 5, 7 ]);
    } 
    else { 
        player.sprite = new Sprite('img/Player2.png', [0, 134], [108, 139], 6, [5, 3, 1,0]);
    }    
    clickLeft = true; clickRight = true; clickStop = true;
}
function updateEntities(dt) {  // Update the player sprite animation    
    player.sprite.update(dt); 
    island.sprite.update(dt);   
}
function render() {    
    ctx.fillStyle = background; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderEntity(island);     
    renderEntity(player);      
};
function PlayerPosChange(x,y){
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
        console.log("Вниз");
        if(PlayerDirection=="right"){
            player.pos[1]+=2;
            player.pos[0]+=1;
            }
            else{
                player.pos[1]+=2;
                player.pos[0]-=1;  
            }  
    }
}
function handleInput(dt) {
   if(input.isDown('LEFT') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
        PlayerDirection = "left";
        clickRight = false;
        if (!clickLeft){ // если clickLeft = false
            direction(); // clickLeft = true
        }
    }
   else if(input.isDown('RIGHT') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
        PlayerDirection = "right";
        clickLeft = false;
        if (!clickRight){
            direction();
        }
    }
    else if(PlayerDirection == "right"){
        clickRight = false;
        clickLeft = false;
        player.sprite = new Sprite('img/Player2.png', [0, 0], [108, 139], 6, [0]);      
    }
    else if(PlayerDirection == "left"){
        clickRight = false;
        clickLeft = false;
        player.sprite = new Sprite('img/Player2.png', [0, 134], [108, 139], 6, [7]);      
    }

    interval=10;
    if((input.isDown('Space')|| input.isDown('Up')) && !clickJump) {     
        g = false;
        clickJump = true;
        let timerId = setInterval(function() {
        if (player.pos[1] > PlayerFloor-jumpHeigt && g==false){
            if(PlayerDirection=="right"){
            PlayerPosChange(1,-2);
            }
            else{ 
            PlayerPosChange(-1,-2);
            }
        }
        else {g = true;}
        if (g && player.pos[1] < PlayerFloor && isJumpDown(0, player.pos[0]+80, player.pos[1])){
            if(PlayerDirection=="right"){
            PlayerPosChange(1,2);
            }
            else{
                PlayerPosChange(-1,2);
            }
        }                  
          }, interval);     
          // через 5 сек остановить повторы
          setTimeout(function() {
            clearInterval(timerId);
            clickJump = false;
          }, jumpHeigt * 10);  
    }
    if (player.pos[1] < PlayerFloor && clickJump == false){ 
        if (player.pos[0] < 240 || player.pos[0] > 422 ){
            PlayerPosChange(0, 5);
        }
     }
    

}