let field = document.createElement('div'); 
document.body.appendChild(field);
field.className='field'; 
for (let i=1; i < 10; i++){ // в цикле создаем div-ы для клеток и присваиваем им класс excel
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.className = 'excel';  
    excel.addEventListener('click', {handleEvent: click, a: i});
}
figure = true; // true - крестик, false - нолик
arr = [];
for (i = 0; i < 10; i++){
    arr[i] = i;
}
function click(){
    if (document.getElementsByClassName('excel')[this.a - 1].style.backgroundImage == ""){
    if (figure == true){
        document.getElementsByClassName('excel')[this.a - 1].style.backgroundImage = "url(/images/x.png";
        figure = false;
        arr[this.a - 1] = "x";
    }
    else {
        document.getElementsByClassName('excel')[this.a - 1].style.backgroundImage = "url(/images/o.png";
        figure = true; 
        arr[this.a - 1] = "o";
    } 
}
winTest();
}

function winTest (){
for (i = 0; i < 10; i+=3){ // проверка по горизонтали
    if (arr[i] == arr[i + 1] && arr[i] == arr[i+2]){
    alert(arr[i] + "-ки выиграли!!");
    return;
    }
}
    for (i = 0; i < 10; i++){ // проверка по вертикали
    if (arr[i] == arr[i + 3] && arr[i] == arr[i+6]){
    alert(arr[i] + "-ки выиграли!!");
    return;     
    }
}
    if ((arr[0] == arr[4] && arr[0]== arr[8]) ||(arr[2] == arr[4] && arr[2]== arr[6])) // проверка по горизонтали
        alert(arr[i] + "-ки выиграли!!");    
}


