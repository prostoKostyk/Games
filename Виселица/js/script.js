var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Рисование петли 
function petlya (){
    ctx.strokeStyle = "red";
    ctx.lineWidth = "2";
    ctx.beginPath();
    ctx.moveTo(150, 130);ctx.lineTo(150, 10); ctx.lineTo(40, 10); ctx.lineTo(40, 40); ctx.moveTo(10, 130); ctx.lineTo(190, 130);ctx.moveTo(135, 130);ctx.lineTo(150, 115);ctx.lineTo(165, 130);ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.lineWidth = "2";
 }
    // Рисование человечка 
function drawCircle(coord){ // круг (голова)    
    ctx.beginPath();
    ctx.arc(coord.x, coord.y, coord.radius, 0, Math.PI * 2, false);
    ctx.stroke();
    }

drawCoord = []; 
drawCoord[5] = { // объект для круга 
   x:40,
   y:50,
   radius:10
}
function drawLine(coord){ //линии
    ctx.beginPath();
    ctx.moveTo(coord.x1, coord.y1);
    ctx.lineTo(coord.x2, coord.y2);
    ctx.stroke();
    }
function LineDraw (x1, y1, x2, y2){ // конструктор объектов для линий
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}
drawCoord[4] = new LineDraw(40, 60, 40, 90); // тело
drawCoord[3] = new LineDraw(40, 60, 30, 75); // левая рука
drawCoord[2] = new LineDraw(40, 60, 50, 75); // правая рука
drawCoord[1] = new LineDraw(40, 90, 30, 105); // левая нога
drawCoord[0] = new LineDraw(40, 90, 50, 105); // правая нога

words = ["слово", "массив", "объект", "функция"];
wordArrAnswer = [];  // массив букв ответа
abc = "йцукенгшщзхъфывапролджэячсмитьбюё";
NewGame ();
bar = document.getElementById("bar");
EndGame = false;
function NewGame (){ // новая игра
EndGame = false; 
bar.textContent=""; 
ctx.clearRect(0, 0, 200, 200); // очистка canvas
select(); 
word = words[Math.floor(Math.random()*words.length)]; // выбираем рандомное слово
console.log("Слово: " + word); 
schet = 6; // количество попыток
right = false; 
let place = document.getElementById("div");
place.textContent = "";
for (i = 0; i < word.length; i++){
 wordArrAnswer[i] = " _ ";
 place.textContent += wordArrAnswer[i];
}
petlya();
}
function answerCheck (){ // проверка есть ли такая буква 
    answer = (document.getElementById("text").value).toLowerCase(); 
    if (schet > 0 && abcCheck(answer) && answer!="" && EndGame == false){ // проверка есть ли ещё попытки и русская ли буква
    place = document.getElementById("div"); 
    place.textContent = "";
    for (i = 0; i < word.length; i++){
        if (word[i] == answer){
        wordArrAnswer[i] = answer;
        document.getElementById("text").value = "";
        right = true;
        bar.textContent="";
        }
        place.textContent += " " + wordArrAnswer[i] + " ";
        select();
       }
       for (i = 0; i < word.length; i++){ // проверка угадано ли все слово
           if (wordArrAnswer[i] !== word[i])
           break;
           if (i == word.length-1){
           EndGame = true;
           bar.textContent="Победа!!!";
           }
       }
       if (!right)
       notRight();
       right = false;
       select(); 
       document.getElementById("text").value = "";
}
}
function notRight(){
    schet--;
    if (schet == 5)
    drawCircle(drawCoord[5]);
    else
    drawLine(drawCoord[schet]);
    if (schet > 0){
    if (schet > 4 ){
    bar.textContent = "Буквы "+ (document.getElementById("text").value).toUpperCase()+" нет, у тебя осталось "+ schet +" попыток";
    return;}
    if (schet > 1 )
    bar.textContent = "Буквы "+ (document.getElementById("text").value).toUpperCase()+" нет, у тебя осталось "+ schet +" попытки";
    else 
    bar.textContent = "Буквы "+ (document.getElementById("text").value).toUpperCase()+" нет, у тебя осталось "+ schet +" попытка";
    }
    else {
    place.textContent = word;
    bar.textContent = "Игра окончена, правильное слово:";
    }
}
function abcCheck(answer){ // проверка русская ли буква
    for (i = 0; i < abc.length; i++){
        if (answer == abc[i])
            return true;
    }
    bar.textContent = "Введи русскую букву";
    return false;
}
function select(){
    document.getElementById('text').select();
}