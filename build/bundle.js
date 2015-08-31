(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var myModule = require('./my_module.js');

// client.js

window.onload = function ( ) {

  function onClickHint(event) {

      event.preventDefault();

      // change display from "none" to "block"
      // ... on the <p> element inside the <li>

      console.log(this.childNodes[2].nodeName);

      var i = 0;
      while( i < this.childNodes.length &&
             this.childNodes[i].nodeName != 'P') {
        i++;
      }

      if (this.childNodes[i].className == "hints_display_none") {
        this.childNodes[i].className = "hints_display_block";
      } else {
        this.childNodes[i].className = "hints_display_none";
      }

  };

  var temp = myModule();

  console.log(myModule());

  alert("from my_module.js " + myModule());

  //grab element
  var myLi = document.getElementById("hint1");

  // create AddEventListner to act when hint link is clicked
  // myHint.addEventListener("click", function(event) {

  //     event.preventDefault();

  //     // change display from "none" to "block"
  //     myHint.className = "hints_display_block";

  // }, false);

  myLi.onclick = onClickHint;

  myLi = document.getElementById("hint2");

  myLi.onclick = onClickHint;

  myLi = document.getElementById("hint3");

  myLi.onclick = onClickHint;



}

},{"./my_module.js":2}],2:[function(require,module,exports){
'use strict';

module.exports = function() {
  return "Hello World";
}

},{}]},{},[1,2]);
