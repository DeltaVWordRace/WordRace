/* global words */
'use strict';
var userInput = '';
var currentPlayer = null;
var player;
var displayWords = [];
var wordCount = 0;

//Hides the word input form (until a username is entered)
document.getElementById("inputWords").style.display = "none";

//Event listeners added
var usersName = document.getElementById('inputUserName');
usersName.addEventListener('submit', handleUserName);
var inputField = document.getElementById('inputWords');
inputField.addEventListener('submit', handleInputWords);

var harcoreChk;

// Validates words against words.js file and displayWords arr then adds scores to the user object
function wordsValidate() {
  if (currentPlayer === null) {
    return;
  }
  if (displayWords.includes(userInput.toLowerCase())) {
    alert('You already used that word... no points');
    return false;
  }
  else if (words.includes(userInput.toLowerCase())) {
    player.score += 50;
    for (var i = 3; i < userInput.length; i++) {
      player.score += 25;
    }
    return true;
  } else {
    alert('That\'s not one of the 1000 most common words... no points');
    return false;
  }
}

// Event handler that takes in username, changes it to UpperCase, and displays it
function handleUserName(event) {
  event.preventDefault();
  harcoreChk = document.getElementById('chkHardcore');
  var userNameInput = document.getElementById('username');
  var userName = userNameInput.value;
  userName = userName.toUpperCase();
  // console.log(player);
  // if (player[userName] === undefined) {
  //   player[userName] = 0;
  // }
  player = new Player(userName,0);
  currentPlayer = userName;
  document.getElementById("inputUserName").style.display = "none";
  document.getElementById("inputWords").style.display = "block";
}

// Event handler pushes words to arr and prints them on screen
function handleInputWords(event) {
  event.preventDefault();
  var form2 = document.getElementById('inputWords');
  var wordInput = document.getElementById('wordInput');
  userInput = wordInput.value;
  userInput = userInput.toLowerCase();
  wordCount++;
  if (!harcoreChk.checked || compareLastWord(userInput)){
    if(wordsValidate()){
      displayWords.push(userInput);
    }
  }
  if (wordCount === 5) {
    userFinish();
  }
  form2.reset();
  var placeHolder = document.getElementById('placeHolder');
  placeHolder.innerHTML = '';
  for (var i = displayWords.length-1; i >= displayWords.length-1; i--) {
    var wordList = document.createElement('span');
    wordList.textContent = displayWords[i];
    placeHolder.appendChild(wordList);
  }
}

// Function ends a game round and resets user form for multiple players
function userFinish() {
  displayWords = [];
  //localStorage.setItem('users', JSON.stringify(player));
  saveToLocalStorage();
  var form = document.getElementById('inputUserName');
  var form2 = document.getElementById('inputWords');
  form.reset();
  form2.reset();
  alert('Your turn is over. Your score was ' + player[currentPlayer]);
  wordCount = 0;
  document.getElementById("inputWords").style.display = "none";
  document.getElementById("inputUserName").style.display = "block";
}

function compareLastWord(newWord){
  var lastWord = displayWords[displayWords.length-1];
  var lastChar = lastWord.substring(lastWord.length-1,lastWord.length);
  var fistChar = newWord.substring(0,1);
  if(lastChar === fistChar){
    return true;
  }else{
    if(harcoreChk){
      alert('last letter and first letter do not match!');
    }
    return false;
  }
}

function Player (name, score) {
  this.name = name;
  this.score = score;
}

function saveToLocalStorage() {
  localStorage.setItem('score',JSON.stringify(player.score));
  localStorage.setItem('name',JSON.stringify(player.name));
}

// Event listeners added
var usersName = document.getElementById('inputUserName');
usersName.addEventListener('submit', handleUserName);
var userInput = document.getElementById('inputWords');
userInput.addEventListener('submit', handleInputWords);
