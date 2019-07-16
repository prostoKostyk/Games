let field = document.createElement('div'); // создаем div для поля
document.body.appendChild(field);
field.className='field'; // присваиваем этому div класс field
schet = 0;
LoseFlag = false;  
let fieldSize = 10; //ширина и высота поля
for (let i=1; i < (fieldSize*10)+1; i++){ // в цикле создаем div-ы для клеток и присваиваем им класс excel
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.className='excel';    
}

excel = document.getElementsByClassName("excel");    
//Координаты для всех клеток задаем как атрибуты 
let x = 1;
let y = fieldSize; 
for (let i=0; i<excel.length; i++){
    if (x>fieldSize){
        x=1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++;
}

function generateSnake () { // рандомное задание начальных координат
    let posX = Math.round(Math.random()* (fieldSize-3) + 3); //(максимальное значение - минимальное значение) + минимальное значение
    let posY = Math.round(Math.random()* (fieldSize-1) + 1);
    return [posX, posY]; // функция возвращает массив с двумя значениями
}

let coordinates = generateSnake(); //coordinates[0] = x; coordinates[1] = y
// создаем массив snakeBody, в котором 1-е значение - div головы змеи, а 2 и 3 - div тела
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), 
// через querySelector ищем элементы с заданными атрибутами и кладем в массив
document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')
]; 


function classesToSnake(){ //добавление классов голове и телу змеи
for (let i=1; i<snakeBody.length; i++){
    snakeBody[i].classList.add('snakeBody'); // добавляем div-ам тела змеи класс snakeBody
}
snakeBody[0].classList.add('snakeHead'); // добавляем div-ам головы змеи класс snakeHead
}
classesToSnake();

let mouse = document.querySelector('[posX = "' + '1' + '"][posY = "' + '1' + '"]');; // еда 
let mouseCoordinates
function createMouse (){ // добавление еды
    function generateMouse () { // рандомное задание начальных координат еды
        let posX = Math.round(Math.random()* (fieldSize-3) + 3); //(максимальное значение - минимальное значение)+ минимальное значение
        let posY = Math.round(Math.random()* (fieldSize-1) + 1);
        return [posX, posY];
    }
    mouse.classList.remove('mouse');
    mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    while (mouse.classList.contains('snakeBody')){ // если среди классов div-a с едой есть класс змеи, то задаем координаты еды заново
    mouseCoordinates = generateMouse(); 
    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    }
    mouse.classList.add('mouse'); // добавляем к div еды класс еды
}
createMouse ();  

let direction = 'right';
function move() { // движение змеи     
    headCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')]; // берем координаты головы змеи
    loseCheck(); 
    if (LoseFlag  == false){
    snakeBody[0].classList.remove('snakeHead'); // удаляем у div-a головы класс snakeHead
    snakeBody[snakeBody.length-1].classList.remove('snakeBody'); // удаляем у последненего div-a тела класс snakeBody
    snakeBody.pop(); // удаляем последний элемент массива   
    eat ();     
    if (direction == "right"){
    if (headCoordinates[0] < fieldSize){ // если голова не ушла дальше конца поля
        // через метод unshift добавляем в начало массива
        snakeBody.unshift(document.querySelector('[posX = "' + (+headCoordinates[0] + 1) + '"][posY = "' + headCoordinates[1] + '"]'));
                   
    }   else // если голова ушла дальше конца поля, то 
    {           
        snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + headCoordinates[1] + '"]')); 
    }
      
} else if (direction == "left"){
    if (headCoordinates[0] > 1){         
        snakeBody.unshift(document.querySelector('[posX = "' + (+headCoordinates[0] -1) + '"][posY = "' + headCoordinates[1] + '"]'));
           
    }   else 
    {           
        snakeBody.unshift(document.querySelector('[posX = "'+ fieldSize+ '"][posY = "' + headCoordinates[1] + '"]')); 
    }    
} 
else if (direction == "up"){
    if (headCoordinates[1] < fieldSize){         
        snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0] + '"][posY = "' + (+headCoordinates[1]+1) + '"]'));
               
    }   else 
    {         
        snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0] + '"][posY = "1"]')); 
    }    
} 
else if (direction == "down"){
    if (headCoordinates[1] > 1){         
        snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0] + '"][posY = "' + (headCoordinates[1]-1) + '"]'));
    } else 
    {         
        snakeBody.unshift(document.querySelector('[posX = "' + headCoordinates[0] + '"][posY = "'+ fieldSize+ '"]')); 
    }    
}
classesToSnake();// присваиваем классы div-ам змеи
    }
    else {
        console.log("that's all")
    }
}
let interval = setInterval(move, 300); // запуск функции move с интревалами 300 мм
function eat (){
    if (headCoordinates[0] == mouseCoordinates[0] && headCoordinates[1] == mouseCoordinates[1]){ // 
        snakeBody.push(document.querySelector('[posX = "' + (headCoordinates[0]) + '"][posY = "' + (headCoordinates[1]) + '"]'));            
            createMouse (); 
            schet+=1;
            document.getElementById('schet').textContent="Счет: " + schet;     
    } 
}
function loseCheck (){
    head = document.querySelector('[posX = "' + headCoordinates[0] + '"][posY = "' + headCoordinates[1] + '"]');  
    if (head.classList.contains('snakeBody')){
           LoseFlag = true;  
           document.getElementById('lose').textContent="Ты проиграл";       
    }
}
window.addEventListener('keydown', function(e){
    if (e.keyCode == 37 && direction != "right"){ 
        direction = "left";
    }
    if (e.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    if (e.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    if (e.keyCode == 40 && direction != "up"){
        direction = "down";
    }
})
