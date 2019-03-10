/*this script display a 
greeting to the user based on the 
current time */

var today;
today = new Date(); //each line as a statement
var hourNow = today.getHours();
var number = 2.5; //64 bit float number; 
var hour_Now; 
var greeting = "this is a message";
greeting = 'this is another message';
var num2 = hour_Now; // error message in console

var b1 = hourNow>18; // 14 < 18 this is false 
var b2 = hourNow > 12; // this one returns true; 
var username = "Somebody";

//comparing hourNow with 18, 12, 6 to determine the greeting message. 
if (hourNow > 18) {
	greeting = "Good Evening!";
} else if (hourNow > 12) {
	greeting = "Good Afternoon!";
} else if (hourNow > 6) {
	greeting = "Good Morning!";
} else {
	greeting = "Go to Sleep!";
}

var el1 = document.getElementById('username');
var el2 = document.getElementById('greeting');
el1.textContent = username;
el2.textContent = greeting;

//document.write("<h1>"+greeting+"</h1>"); //<h3>go to sleep</h3>
