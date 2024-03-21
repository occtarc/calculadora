const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equal = document.getElementById("igual");
const point = document.getElementById("decimal");
const clear = document.getElementById("clear");
const delet = document.getElementById("delete");
const lastOperation = document.querySelector(".last-operation");
const currentNumber = document.getElementById("current-number");
const signo = document.getElementById("sign");
let numeroA, numeroB, operador, resultado;

numbers.forEach((num) => {
    num.addEventListener("click", () => agregarNumero(num.textContent));
})

operators.forEach((operador) => {
    operador.addEventListener("click", () => establecerOperacion(operador.textContent));
})

equal.addEventListener("click", () => {
    if(currentNumber.textContent === ''){
        return;
    }
    if(lastOperation.textContent === ''){
        return;
    }
    numeroB = currentNumber.textContent;
    realizarOperacion(numeroA, operador, numeroB);
    if(operador === ''){
        return;  // Caso para detener la ejecucion cuando la division es entre 0
    }
    currentNumber.textContent = resultado;
    numeroA = currentNumber.textContent; 
    signo.textContent = '=';
    lastOperation.textContent = ''; 
})

point.addEventListener("click", () => {
    if(currentNumber.textContent.length > 10){
        return;
    }
    if(currentNumber.textContent.includes(".")){
        return;
    }
    if(currentNumber.textContent === ''){
        return;
    }else{
        currentNumber.textContent += point.textContent;
    }
})

clear.addEventListener("click", limpiarCalculadora);

delet.addEventListener("click", limpiarDigito);

function agregarNumero (num){
    if(currentNumber.textContent.length > 10){
        return;
    }
    if(currentNumber.textContent === '0' || currentNumber.textContent === ''){
        currentNumber.textContent = num;
    }else{
        currentNumber.textContent += num;
    }
}

function establecerOperacion (operator) {
    if(signo !== '' && signo !== '=' && currentNumber.textContent === ''){
        operador = operator; 
        signo.textContent = operador;
        return;
        //Caso en el q se ingresa un numero, un operador y luego se cambia el operador
    }
    if(/[+-x÷]/.test(operator) && currentNumber.textContent !== '' && lastOperation.textContent !== ''){
        numeroA = lastOperation.textContent;
        numeroB = currentNumber.textContent;
        realizarOperacion(numeroA,operador,numeroB);
        operador = operator;
        signo.textContent = operador;
        lastOperation.textContent = resultado;
        currentNumber.textContent = '';
        numeroA = lastOperation.textContent;
        return;
        //Caso en el q se ingresa un numero, un operador, otro numero y otro operador, sin ingresar igual
    }
    numeroA = currentNumber.textContent;
    operador = operator;
    signo.textContent = operador;
    lastOperation.textContent = `${numeroA}`;
    currentNumber.textContent = '';
}

function realizarOperacion (numA, operador, numB){
    numA = +numA;
    numB = +numB;
    if(operador === '÷' && numB === 0){
       limpiarCalculadora();
       alert("No se puede dividir por 0");
       return; 
    }
    switch (operador) {
        case "+":
            resultado = suma(numA,numB);
            break;
        case "-":
            resultado = resta(numA,numB);
            break;
        case "x":
            resultado = multiplicacion(numA,numB);
            break;
        case "÷":
            resultado = division(numA,numB);
            break;
    }
    numeroB = '';
}
function suma (numA, numB) {
    return Math.round((numA + numB) * 1000) / 1000;
}
function resta (numA, numB) {
    return Math.round((numA - numB) * 1000) / 1000;
}
function multiplicacion (numA, numB) {
    return Math.round((numA * numB) * 1000) / 1000;
}
function division (numA, numB) {
    return Math.round((numA / numB) * 1000) / 1000;
}

function limpiarCalculadora (){
    lastOperation.textContent = '';
    currentNumber.textContent = 0;
    signo.textContent = '';
    numeroA = '';
    numeroB = '';
    operador = '';
}

function limpiarDigito (){
    currentNumber.textContent = currentNumber.textContent.slice(0,-1);
}
