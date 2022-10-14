
function calculateTip(value){
    
    let bill = parseFloat(document.getElementById('bill').value);
    let numberPeople = parseFloat(document.getElementById('numberPeople').value);
    
    let tip=document.getElementById('tipPerson');
    let total=document.getElementById('totalPerson');
    if(!numberPeople==0){
        let tipPerson= bill*(value/100)/numberPeople;
        let totalPerson= (bill+ bill*(value/100))/numberPeople;
        if(isNaN(tipPerson) || isNaN(totalPerson)){
            let error= document.getElementById('error');
            error.innerText="***You must enter bill amount and number of people before selecting tip%";
            error.style.color="red";
            error.addEventListener('mouseout',function(){
                reset();
            });
        }else{
            tip.innerText='$'+tipPerson.toFixed(2);
            total.innerText='$'+totalPerson.toFixed(2);
    
        }
    }else{
        let label = document.getElementById('numberPeople');
        label.style.border="solid 1px red";
        let label2 = document.getElementById('error2');
        label2.style.color="red";
        label2.style.fontSize="10px";
        label2.innerText="Can't be zero";
        
    }
    
}

//esta comparacion contra hsl no se como es... con nombres tipo == "red" funciona
function changeColor(button){
    
    if(button.style.backgroundColor== "hsl(183, 100%, 15%)"){
        button.style.backgroundColor="red";
    }else{
        button.style.backgroundColor="green";
    }
}
function reset(){
    let inputs= document.getElementsByTagName('input');
    let labels= document.getElementsByTagName('label');
    for(let i=0; i<inputs.length;i++){
        inputs[i].value='';
    }
    
    for(let i=0; i<labels.length;i++){
        labels[i].innerText='';
    }

    let label = document.getElementById('numberPeople');
    label.style.border="solid 1px hsl(189, 41%, 97%)";
}

let buttons = document.getElementsByTagName('button');

for (let i = 0; i < buttons.length -1; i++) {
    buttons[i].addEventListener('click',function(){
       calculateTip(buttons[i].value);
    });
}

buttons[5].addEventListener('click',function(){
    reset();
})

let custom = document.getElementById('custom');

custom.addEventListener('change',function(){
    calculateTip(parseFloat(custom.value));
})


// validacion
let bill = document.getElementById('bill');
let numberPeople = document.getElementById('numberPeople');

bill.addEventListener('keypress',function(e){
    if(!enterNum(e) && !enterDot(e)){
        e.preventDefault();
    }
        
 });
 numberPeople.addEventListener('keypress',function(e){
    if(!enterNum(e)){
        e.preventDefault();
    }     
 });
 custom.addEventListener('keypress',function(e){
    if(!enterNum(e) && !enterDot(e)){
        e.preventDefault();
    }     
 });

 function enterDot(e){
    let key= e.charCode;
    console.log(key);
    return key === 46;
 }
 function enterNum(e){
    let key= e.charCode;
    console.log(key);
     return key >= 48 && key <= 57;
 }