function setup() {
    createCanvas(innerWidth -20, innerHeight -40);
}
  
let number1 = 0;
let number2 = 0;
let numOfBoxes1 = 0;
let numOfBoxes2 = 0;
let onethBlockOffset = 0;
let displayWidth = 30;
let isMove = false;

function moveBoxes(){
    isMove = true;
}
function drawBoxes(){
    onethBlockOffset = 0;
    number1 = document.getElementById("firstNumber").value;
    numOfBoxes1 = Math.ceil10(number1, 1)
    number2 = document.getElementById("secondNumber").value;
    numOfBoxes2 = Math.ceil10(number2, 1)
}


function draw() {
    background(220);
    if(isMove){
        onethBlockOffset += 10;
        if(onethBlockOffset >= 600){
            isMove = false;
        }
    }    
    stroke('purple'); // Change the color
    strokeWeight(5); // Make the points 10 pixels in size

    let displayHeight = 20;
    let radius = 10;
    for(let i = 0; i < numOfBoxes1; i++){
        fill(256);
        radius = 10;
        if(1 < i && i % 10 == 0){
            displayHeight += 50;
            displayWidth = 30;
        }
        if ( i % 5 == 4) {
            //no round edge
            radius = 0;
        }
        if (i < number1){
            fill('purple');
        }
        // ToDo: 繰り上がりのある1の位の計算をアニメーションで
        // todo: 50の時に10個まとめて動いてしまう
        if(numOfBoxes1 - i <= 10 && number1 % 10 != 0){
            square(onethBlockOffset + displayWidth + ((i % 10) * 50), displayHeight, 40, radius);
        }else{
            square(displayWidth + ((i % 10) * 50), displayHeight, 40, radius);
        }
    }
    
    displayHeight += 50;

    stroke('blue'); // Change the color
    strokeWeight(5); // Make the points 10 pixels in size

    for(let i = 0; i < numOfBoxes2; i++){
        fill(256);
        radius = 10;
        if(1 < i && i % 10 == 0){
            displayHeight += 50;
            displayWidth = 30;
        }
        if ( i % 5 == 4) {
            //no round edge
            radius = 0;
        }
        if (i < number2){
            fill('blue');
        }
        if(numOfBoxes2 - i <= 10 && number2 % 10 != 0){
            square(onethBlockOffset + displayWidth + ((i % 10) * 50), displayHeight, 40, radius);
        }else{
            square(displayWidth + ((i % 10) * 50), displayHeight, 40, radius);
        }
    }

}

//https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil

(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
      // If the exp is undefined or zero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // If the value is not a number or the exp is not an integer...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Shift
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
  
    // Decimal round
    if (!Math.round10) {
      Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
      };
    }
    // Decimal floor
    if (!Math.floor10) {
      Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
      };
    }
    // Decimal ceil
    if (!Math.ceil10) {
      Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
      };
    }
  })();