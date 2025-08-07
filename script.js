const inputSlider = document.querySelector('[data-lengthSlider]')
const lengthDisplay = document.querySelector('[data-lengthNumber]')
const passwordDisplay = document.querySelector('[data-passwordDisplay]')
const copyBtn = document.querySelector('[data-copy]')
const copyMsg = document.querySelector('[data-copyMsg]')
const uppercaseCheck = document.querySelector('#uppercase')
const lowercaseCheck = document.querySelector('#lowercase')
const numbersCheck = document.querySelector('#numbers')
const symbolsCheck = document.querySelector('#symbols')
const indicator = document.querySelector('data-indicator')
const generateBtn = document.querySelector('.generateButton')
const allCheckBox = document.querySelector('input[type=checkbox]')
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
// set strength circle color to grey

// set password Length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

// sets password strength  
function setIndicator(color){
     indicator.style.backgroundColor = color;
    //  shadow
}

function getRndInteger(min,max){
   return  Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomInteger(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateSymbol(){
   let randNum = getRndInteger(0,symbols.length)
   return symbols.charAt(randNum)
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checkd) hasSym = true;

    if(hasUpper && hasLower && (hasNum||hasSym) && password.length >= 8 ){
        setIndicator('#0f0');
    }
    else if ((hasLower||hasUpper) && (hasSym || hasNum) && password.length>=6){
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
} 
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay,value);
        copyMsg.innerText = 'HTML';
    }
    catch(e){
        copyMsg.innerText = 'Failed';
    }
    copyMsg.classList.add('active')

    setTimeout( ()=>{
        copyMsg.classList.remove('active');
    },2000 )
}

inputSlider.addEventListener('input',(itr)=>{
    passwordLength = itr.target.value;
    handleSlider();
})

copyBtn.addEventListener('input',(itr)=> {
    if(passwordDisplay.value)
        copyContent();
})