let feedback=false;
let keepPlaying=true;
let sameTurn=true;

let button1 = document.getElementById('btn1');
button1.addEventListener('click',function(){
    startGame();
});

function startGame(){
    let player1 = document.getElementById('player1').value;
    let player2 = document.getElementById('player2').value;
    if(player1==='' || player2===''){
        invalidFeedback(player1,player2);
        return ;
    }
    if(feedback){
        cleanFeedback();
    }
    let start = document.getElementsByClassName('start')[0];
    start.className='hide';

    let gameSection= document.getElementById('gameSection');
    gameSection.className='show';
    let name1= document.getElementById('name1');
    let name2= document.getElementById('name2');
    name1.innerText=player1;
    name2.innerText=player2;

    let turn= document.getElementById('turn');
    turn.innerText= document.getElementById(getRandomPlayer()).innerText+"'s";
    play(turn);
}

function play(turn){
    countdown();
    let playerName= turn.innerText.split("'")[0];
    let playable=true;
    let turnX=true;
    let rectangles=document.getElementsByClassName('rectangle');
    for (let i = 0; i < rectangles.length; i++) {
        rectangles[i].isEmpty=true;
        rectangles[i].addEventListener('click',function(){
            if(!playable)
                return;
            if(!keepPlaying)
                return;
            if(!rectangles[i].isEmpty)
                return;
            if(turnX){
                drawX(rectangles[i],i);
                rectangles[i].value='X';
                turnX=false;
            }else{
                drawO(rectangles[i],i);
                rectangles[i].value='O';
                turnX=true;
            }
            rectangles[i].isEmpty=false;
            playable=checkState(rectangles,playerName);
            if(!playable)
                return;
            playerName=changeTurn(playerName);
           
        });
        
    }    
}

function comboIsComplete(rectangles,i,j,x){
    if(rectangles[i].isEmpty)
        return false;
    if(rectangles[j].isEmpty)
        return false;
    if(rectangles[x].isEmpty)
        return false;
    return rectangles[i].value===rectangles[j].value && rectangles[i].value===rectangles[x].value;
}



function checkState(rectangles,playerName){
    let combos=[
        {value:[0,1,2]},
        {value:[3,4,5]},
        {value:[6,7,8]},
        {value:[0,3,6]},
        {value:[1,4,7]},
        {value:[2,5,8]},
        {value:[0,4,8]},
        {value:[2,4,6]}    
    ];
    for (let i = 0; i < combos.length; i++) {
        if(comboIsComplete(rectangles,combos[i].value[0],combos[i].value[1],combos[i].value[2])){
            createRow(playerName);
            keepPlaying=false;
            createRestartButton();
            return false;
        }
    }
    let filledRectangles=0;
    for (let j = 0; j< rectangles.length; j++) {
      if(!rectangles[j].isEmpty){
        filledRectangles++;
      }
    }
    if(filledRectangles===rectangles.length){
        createRow();
        keepPlaying=false;
        createRestartButton();
        return false;
    }
    return true;
}

function changeTurn(playerName){
    sameTurn=false;
    let name1= document.getElementById('name1').innerText;
    let name2= document.getElementById('name2').innerText;
    let turn= document.getElementById('turn');
    if(playerName===name1){
        turn.innerText=name2+"'s";
        return name2;
    }else{
        turn.innerText=name1+"'s";
        return name1;
    }

}

function drawX(rectangle,i){
    let img=document.createElement('img');
    img.className='image';
    img.src='images/cross.svg';
    rectangle.appendChild(img);
   
}

function drawO(rectangle,i){
    let img=document.createElement('img');
    img.className='image';
    img.src='images/circle.svg';
    rectangle.appendChild(img);
       
}

function getRandomPlayer() {
    
    return 'name'+(Math.floor(Math.random()*2)+1);

}
function invalidFeedback(player1,player2){
    if(player1===''){
        let input=document.getElementById('player1');
        input.style.border='solid 2px red';
        input.placeholder='Please enter a name';
        feedback=true;
    }
    if(player2===''){
        let input=document.getElementById('player2');
        input.style.border='solid 2px red';
        input.placeholder='Please enter a name';
        feedback=true;
    }
}

function cleanFeedback(){
    let input1=document.getElementById('player1');
    input1.style.border='solid 1px rgb(133, 133, 133)';
    let input2=document.getElementById('player2');
    input2.style.border='solid 1px rgb(133, 133, 133)';
    feedback=false;
}
let button3 = document.getElementById('btn3');
button3.addEventListener('click',function(){
    if(button3.innerText==='Show Results'){
        showResults();
        button3.innerText='Hide Results';
    }else{
        hideResults();
        button3.innerText='Show Results';
    }
});

function showResults(){
    let results =document.getElementById('result');
    results.className='results';
    
}

function hideResults(){
    let results =document.getElementById('result');
    results.className='hide';
}

function createRow(playerName){
    let name1= document.getElementById('name1').innerText;
    let name2= document.getElementById('name2').innerText;
    let parent = document.getElementById('result');
    let row= document.createElement('div');
    row.className='row';
    if(playerName===undefined){
        row.innerText=name1+' vs. '+name2+': DRAW';
        saveRow(row.innerText);
        
    }else{
        row.innerText=name1+' vs. '+name2+': WINNER: '+playerName;
        saveRow(row.innerText);
        
    }
    parent.appendChild(row);
}

function showResult(result){
    let parent = document.getElementById('result');
    let row= document.createElement('div');
    row.className='row';
    row.innerText=result;
    parent.appendChild(row);
}


function saveRow(result){
    let index= parseInt(localStorage.getItem('index'));
    index+=1;
    localStorage.setItem(index,result);
    localStorage.setItem('index',index);
    
}

window.addEventListener('load',function(){
    //this.localStorage.clear();
    if(this.localStorage.length===0){
        this.localStorage.setItem('index',0);
    }

    for(let i=0; i< localStorage.length;i++){
        if(localStorage.key(i)!=='index'){
            let key = localStorage.key(i);
            let result = localStorage.getItem(key);
            showResult(result);
        
        }
    }
    
    
});

let button2= document.getElementById('btn2');
button2.addEventListener('click',function(){
    giveUp(); 
});


function giveUp(){
    if(!keepPlaying)
        return;
    let name1= document.getElementById('name1').innerText;
    let name2= document.getElementById('name2').innerText;
    let turn= document.getElementById('turn');
    let playerName= turn.innerText.split("'")[0];

    if(playerName===name1){
        createRow(name2);
    }else{
        createRow(name1);
    }
    createRestartButton();
    keepPlaying=false;
    
}


function createRestartButton(){
    let parent = document.getElementsByClassName('buttons')[0];
    let button4 = document.createElement('button');
    button4.id='btn4';
    button4.className='btn btn-warning';
    button4.innerText='Restart';
    button4.style.color='white';
    button4.addEventListener('click',function(){
        
        document.location.reload(true);

    });
    parent.appendChild(button4);
}

function startTimer(duration, display) {
    let timer = duration;
    let minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if(!keepPlaying)
            return;
        if (--timer < 0 && sameTurn) {
            timer = duration;
            if(display.textContent==='00:00'){
                giveUp();
                timer=0;
            }
        }
        if(!sameTurn){
            timer=duration;
            sameTurn=true;
        }
    }, 989);
}

function countdown(){
    let thirtySec = 60 * 1/2;
    let display = document.getElementById('countdown');
    startTimer(thirtySec, display);
}
