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
