 const resultElement = document.getElementById('result');
 const lengthElement = document.getElementById('length');
 const uppercaseElement = document.getElementById('uppercase');
 const lowercaseElement = document.getElementById('lowercase');
 const numbersElement = document.getElementById('numbers');
 const symbolsElement = document.getElementById('symbols');
 const generateElement = document.getElementById('generate');
 const clipboardElement = document.getElementById('clipboard');
 
 
 
 const randomFunc = {
     lower: getRandomLower,
     upper: getRandomUpper,
     number: getRandomNumber,
     symbol: getRandomSymbol
 }

 clipboardElement.addEventListener('click', () =>{
     const textarea = document.createElement('textarea');
     const password = resultElement.innerText; 

     if(!password){
         return
     }

     textarea.value = password;
     document.body.appendChild(textarea);
     textarea.select() //select everything in the text area
     document.execCommand('copy');
     textarea.remove();
     alert('Password is copied to clipboard');
 })


 generateElement.addEventListener('click', () =>{
     const length = +lengthElement.value //the + sign will convert the value generated from string to number
     const hasLower = lowercaseElement.checked; //check if value includes lower case (boolean)
     const hasUpper  = uppercaseElement.checked;
     const hasNumber = numbersElement.checked;
     const hasSymbol = symbolsElement.checked;

     resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
 })

 function generatePassword(lower, upper, number, symbol, length){
     let generatedPassword = '';
     const typesCount = lower + upper + number + symbol;

     //we created an array that displays if generated values comply to the required variables. However, we want to filter such that we are only able to see the 'true' values
     const typesArray = [{lower}, {upper}, {number}, {symbol}].
     filter(item => Object.values(item)[0]) //filter out anything that has false as a value
     //console.log(typesArray)

     //If nothing is checked, we don't want to do anything
     if(typesCount === 0){
         return ''
     }
     //generate the password
     for(let i = 0; i < length; i += typesCount){
         typesArray.forEach(type =>{
             const funcName = Object.keys(type)[0];
             //console.log(funcName)
             generatedPassword += randomFunc[funcName]()
         })

     }
     const finalPassword = generatedPassword.slice(0, length);
     return finalPassword;
 }
 
 
//funtion to return lower case letters
function getRandomLower(){
    //string from charcode returns a string created from the specified sequence of UTF-16 code units
    return String.fromCharCode(Math.floor(Math.random()*26) + 97)
}


//funtion to return upper case letters
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 65)
}
//console.log(getRandomUpper())

//funtion to return numbers
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10) + 48)
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)]
}