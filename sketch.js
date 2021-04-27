let number1Boxes = [];
let number1 = 0;
let number2Boxes = [];
let number2 = 0;
let appMode = "display"; // display, moveOnes, calcOnes, CalcTens

function setup() {
    createCanvas(innerWidth -20, innerHeight -40);
}

function drawBoxes(){
    number1Boxes = [];
    number2Boxes = [];
    appMode = "display";
    number1 = document.getElementById("firstNumber").value;
    // Create object
    for (let i = 0; i < Math.ceil10(number1,1); i++) {
        number1Boxes.push(new Rectangle(i, number1));
    }
    number2 = document.getElementById("secondNumber").value;
    // Create object
    for (let i = 0; i < Math.ceil10(number2,1); i++) {
        number2Boxes.push(new SecondRectangle(i, number2));
    }
}

function moveBoxes(){
    appMode = "moveOnes";
    // 移動対象のマスにゴールを設定する
    for (let i = 0; i < number1Boxes.length; i++) {
        if(!number1Boxes[i].isRoundNum){
            number1Boxes[i].goalX = number1Boxes[i].goalX;
            number1Boxes[i].goalY = 30;
        }
    }
    for (let i = 0; i < number2Boxes.length; i++) {
        if(!number2Boxes[i].isRoundNum){
            number2Boxes[i].goalX = number2Boxes[i].goalX;
            number2Boxes[i].goalY = 70;
        }
    }
}
function calcOnes(){
    let num1Frac = number1%10;
    let num2Frac = number2%10;
    let timeout = 1;
    console.log(num1Frac + num2Frac);

    if (num1Frac + num2Frac < 10) { 
        for(let i = 0; i < num2Frac; i++){
            setTimeout(function(){
                number1Boxes[Number(number1) + i].isEmpty = false;
                number1Boxes[Number(number1) + i].color = "blue";
    
                number2Boxes[Number(number2) - i -1].isEmpty = true;
    
            }, timeout*1000);
            timeout++;
        }
        if(num1Frac + num2Frac <= 10){
            setTimeout(function(){
                number2Boxes.splice(number2Boxes.length -10);
                }, timeout*1000);    
        }
        
        return;
    }
    for(let i = 0; i < 10 - num1Frac; i++){
        setTimeout(function(){
            number1Boxes[Number(number1) + i].isEmpty = false;
            number1Boxes[Number(number1) + i].color = "blue";
            number2Boxes[Number(number2) - i -1].isEmpty = true;
            }, timeout*1000);
        timeout++;
    }
    if(num1Frac + num2Frac <= 10){
        setTimeout(function(){
            number2Boxes.splice(number2Boxes.length -10);
            }, timeout*1000);    
    }

    for(let i = 0; i < 10; i++){
        let box = number1Boxes[number1Boxes.length-i-1];
        setTimeout(function(){
            box.goalX = box.x - 370;
            }, timeout*1000);
    }
    //もし両方5以上なら、1~5までを紫にして、ゴールに移動する
        //残りの枠は並べ直す
    //もし足して10以上なら、上の空白を色塗りして、ゴールに移動する

}
function draw() {
    background(50, 89, 100);
    for (let i = 0; i < number1Boxes.length; i++) {
        number1Boxes[i].move();
        number1Boxes[i].display();
    }
    for (let i = 0; i < number2Boxes.length; i++) {
        number2Boxes[i].move();
        number2Boxes[i].display();
    }

}
    

class Rectangle {
    constructor(seq, number1) {
        this.seq = seq;
        this.isEmpty = seq >= number1;
        this.isRoundNum = (Math.ceil10(seq + 1,1) <= number1);
        if(this.isRoundNum){
            this.x = 30 + ((seq)%10)*34;
            this.y = 110 + Math.floor((seq)/10)*40;
        }else{
            this.x = 400 + ((seq)%10)*34;
            this.y = 110;
        }
        this.goalX = this.x;
        this.goalY = this.y;
        this.color = "red";
    }

    move() {
        if (this.goalX != this.x){
            if(this.goalX > this.x){
                this.x += 2;
            }else{
                this.x -= 2;
            }
        }
        if(this.goalY != this.y){
            if(this.goalY >this.y){
                this.y += 2;
            }else{
                this.y -= 2;
            }
        }
    }
  
    display() {
        if(!this.isEmpty){
            fill(this.color);  
        }else{
            fill("white");
        }
        if((this.seq + 1)%5 == 0){
            square(this.x, this.y, 32,0);
        }else{
            square(this.x, this.y, 32,8);
        }
        fill("black");
        textSize(18);
        if(appMode === "display"){
            text(this.seq + 1, this.x + 4, this.y +20);
        }else if(appMode === "moveOnes"){
            text((this.seq%10)+1, this.x + 4, this.y +20);
        }
    }
  }

class SecondRectangle {
    constructor(seq, number2) {
        this.seq = seq;
        this.isEmpty = seq >= number2;
        this.isRoundNum = (Math.ceil10(seq + 1,1) <= number2);
        if(this.isRoundNum){
            this.x = 30 + ((seq)%10)*34;
            this.y = 410 + Math.floor((seq)/10)*40;
        }else{
            this.x = 400 + ((seq)%10)*34;
            this.y = 410;
        }
        this.goalX = this.x;
        this.goalY = this.y;
        this.color = "blue";
    }

    move() {
        if (this.goalX != this.x){
            if(this.goalX > this.x){
                this.x += 2;
            }else{
                this.x -= 2;
            }
        }
        if(this.goalY != this.y){
            if(this.goalY >this.y){
                this.y += 2;
            }else{
                this.y -= 2;
            }
        }
    }

    display() {
        if(!this.isEmpty){
            fill(this.color);    
        }else{
            fill("white");
        }
        if((this.seq + 1)%5 == 0){
            square(this.x, this.y, 32,0);
        }else{
            square(this.x, this.y, 32,8);
        }
        fill("black");
        textSize(18);
        if(appMode === "display"){
            text(this.seq + 1, this.x + 4, this.y +20);
        }else if(appMode === "moveOnes"){
            text((this.seq%10)+1, this.x + 4, this.y +20);
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