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
const allCheckBox = document.querySelectorAll('input[type=checkbox]')
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
// set strength circle color to grey

// set password Length
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

// sets password strength  
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //  shadow
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomInteger() {
    return getRndInteger(0, 9);
}


function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateSymbol() {
    let randNum = getRndInteger(0, symbols.length)
    return symbols.charAt(randNum)
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checkd) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && password.length >= 8) {
        setIndicator('#0f0');
    }
    else if ((hasLower || hasUpper) && (hasSym || hasNum) && password.length >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

inputSlider.addEventListener('input', (itr) => {
    passwordLength = itr.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', (itr) => {
    if (passwordDisplay.value)
        copyContent();
})

function shufflePassword(array){
    // fisher Yates method
    for(let i = array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
    });

    // special condition 
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

generateBtn.addEventListener('click', () => {
    // none of the checkbox are selected
    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // to create new password
    console.log("starting the journey")

    // remove old password
    password = "";

    // putting values according to checkboxes

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    //  if(lowercaseCheckcaseCheck.checked){
    //     password += generateLowerCase();
    // }

    //  if(numbersCheck.checked){
    //     password += generateRandomInteger();
    // }

    //  if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomInteger);
    }
    if (symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }

    // let funcArr = [];
    // An empty array named funcArr is created.

    // It will hold functions(not values yet — actual functions).

        // for compulsory addition

      // let funcArr = [];
 // An empty array named funcArr is created.

// It will hold functions(not values yet — actual functions).

        // for compulsory addition

        for(let i = 0; i < funcArr.length; i++){
    password += funcArr[i]();
        }
    console.log("compulsory addition done ")
//     👉 funcArr[i]
// Accesses the function at index i in the array.

// 👉 funcArr[i]()
// Calls (executes) the function at index i.
// funcArr[i] gives you a function.
   
        // remaining addition

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRndInteger(0 , funcArr.length)
        password += funcArr[randIndex]();
    }
        console.log("remaining addition done")

    // shuffle password 

    password = shufflePassword(Array.from(password));
        console.log("shuffling  done")

    // show in Ui
    passwordDisplay.value = password;
        console.log("UI addition done")

    // calculate strength 

    calcStrength();
})


