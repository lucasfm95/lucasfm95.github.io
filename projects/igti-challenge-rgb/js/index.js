var inputRedRange = null;
var inputGreenRange = null;
var inputBlueRange = null;


window.addEventListener("load", start);

function start() {
    inputRedRange = document.querySelector("#ipt-red-range");
    inputRedRange.addEventListener("input", eventInputRedRange);
    inputRedRange.value = 0;

    inputGreenRange = document.querySelector("#ipt-green-range");
    inputGreenRange.addEventListener("input", eventInputGreenRange);
    inputGreenRange.value = 0;

    inputBlueRange = document.querySelector("#ipt-blue-range");
    inputBlueRange.addEventListener("input", eventInputBlueRange);
    inputBlueRange.value = 0;

    setColorRgb();
}

function eventInputRedRange() {
    let inputRed = document.querySelector("#ipt-red");
    inputRed.value = inputRedRange.value;
    setColorRgb();
}

function eventInputGreenRange() {
    let inputGreen = document.querySelector("#ipt-green");
    inputGreen.value = inputGreenRange.value;
    setColorRgb();
}

function eventInputBlueRange() {
    let inputBlue = document.querySelector("#ipt-blue");
    inputBlue.value = inputBlueRange.value;
    setColorRgb();
}

function setColorRgb() {
    let divColor = document.querySelector("#item-rgb");

    let red = inputRedRange.value;
    let green = inputGreenRange.value;
    let blue = inputBlueRange.value;

    divColor.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}