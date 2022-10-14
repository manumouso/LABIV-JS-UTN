var counter=0;
let feedback=false;

function fetchShortLink(url){

    return fetch('https://api.shrtco.de/v2/shorten?url='+url)
    .then(response=>response.json())
    .then(json=>{
        return Promise.resolve(json);
    });
}

async function getShortLink(){
    try{
        let input=document.getElementById('shortLink').value;  
        let response= await fetchShortLink(input);
        
        if(response.ok){
            if(feedback===true){
                cleanFeedback();
            } 
            
            createRow(response.result.full_short_link,input);
            saveRow(response.result.full_short_link,input);
        }else{
            invalidFeedback();
        }
    }catch(error){
        console.log(error);
    }
}


let button4 = document.getElementById('btn4');

button4.addEventListener('click',function(){
    getShortLink();
});

function copyToClipboard(button){
   
    let buttons= document.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        if(btn.innerText==='Copied!'){
            btn.style.backgroundColor='#0dcaf0';
            btn.innerText='Copy';
            
        }
    }
    navigator.clipboard.writeText(document.getElementById(button.code).innerText);
    button.style.backgroundColor='hsl(257, 27%, 26%)';
    button.innerText='Copied!';
}

function invalidFeedback(){
    let label=document.getElementById('shortLink');
    label.style.border='solid 2px red';
    let invalid=document.getElementsByClassName('invalid-feedback');
    invalid[0].className='invalid-feedback myWarning';
    feedback=true;
}

function cleanFeedback(){
    let invalid=document.getElementsByClassName('invalid-feedback');
    invalid[0].className='invalid-feedback clean';
    let label=document.getElementById('shortLink');
    label.style.border='none';
    feedback=false;
}

function createRow(full_short_link,input){
    
    let parent = document.getElementById('result');
        
    let row= document.createElement('div');
    let column1 = document.createElement('div');
    column1.innerText=input;
    
    let div2 =document.createElement('div');
    div2.id='text'+counter;
    div2.style.color='#0dcaf0';
    div2.innerText=full_short_link;
               
                       
    let button = document.createElement('button');
    button.className='btn btn-info';
    button.style.color="white";
    button.innerText="Copy";
    button.code=div2.id;
    button.addEventListener('click',function(){
        copyToClipboard(this);
    });
    let div3= document.createElement('div'); 
    div3.appendChild(button);        
    
    let column2=document.createElement('div');
    column2.className='flex';
    column2.appendChild(div2);
    column2.appendChild(div3);

    row.className='result';
    row.append(column1);
    row.append(column2);
            
    parent.appendChild(row);
    counter++;
}

function saveRow(full_short_link,input){

    sessionStorage.setItem(input,full_short_link);
    
}

window.addEventListener('load',function(){

    for(let i=0; i< sessionStorage.length;i++){
        
        let userInput = sessionStorage.key(i);
        let shortLink = sessionStorage.getItem(userInput);
        if(userInput!='IsThisFirstTime_Log_From_LiveServer'){
            createRow(shortLink,userInput);
        }
    }
});