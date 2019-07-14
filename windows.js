// JQuery elements
$(document).ready(function() {
  var grabbedFood = "";
  var score = 0;
  var customerIndex = []; //Customer Order of Appearance
  var customerPosition = [];
  var customerTime = [];
  var customerOrder = [];
  var currentLevel;

  //Initially sets score to 0
  updateScore(0);

  console.log("hellou");
  $("#btnStart").click(function() {
    hideStart();
  });
  $("#btnBackStart").click(function() {
    showStart();
  });
  $("#btnIntro").click(function() {
    showStart();
    popInFood("#frenchFries");
    popInFood("#baked");
    popInFood("#curly");
    popInFood("#jalapeno");
    randomizeCustomer();
  });
  $("#btnInfo").click(function() {
    showInfo();
  });
  $("#btnReset").click(function() {
    hideGameOver();
    hideStart();
  });
  $("#btnBack").click(function() {
    hideInfo();
    showStart();
  });
  $("#btnNext").click(function() {
    hideWinner();
    nextLevel();
  });

  // /***************************
  //  * Rules of the game
  //  ****************************/
  function showInfo() {
    $("#startWindow").attr("style", "visibility: hidden");
    $("#gameWindow").attr("style", "visibility:hidden");
    $("#infoScreen").attr("style", "visibility: visible");
    $("#infoMusic")[0].play();
  }

  function hideInfo() {
    $("#infoScreen").attr("style", "visibility: hidden");
    $("#startWindow").attr("style", "visibility: visible");
    $("#infoMusic")[0].currentTime = 0;
    $("#infoMusic")[0].pause();
  }

  /****************************************
   *Game start
   **************************************/
  function hideStart() {
    currentLevel = 1;
    console.log("this is level " + currentLevel);
    score = 0;
    $("#score").text(score);
    count = 15;
    countdown();
    console.log("Start");
    $("#startWindow").attr("style", "visibility: hidden");
    $("#gameWindow").attr("style", "visibility: visible");
    popInFood("#frenchFries");
    popInFood("#baked");
    popInFood("#curly");
    popInFood("#jalapeno");
    randomizeCustomer();

    $("#gameOver").attr("style", "visibility: hidden");

    //music
    $("#endMusic")[0].currentTime = 0;
    $("#endMusic")[0].pause();
    $("#bgnMusic")[0].play();

    ///// Reset the player position
    playerPosition();
  }
  /***********************
   * Timer
   *************************/
  //timer variable
  var time = 13;
  var count, t;

  //Display timer in game
  function displayTimer() {
    $("#timer").html(time);
    $("#timer2").html(time);
    $("#timer3").html(time);
  }

  //countdown
  function countdown() {
    displayTimer();
    console.log(count);
    if (count === 0) {
      stopCountdown();
      checkWinner();
      //time's up
    } else {
      count--;
      time = count;
      t = setTimeout(countdown, 1000);
    }
  }

  //Stop timer
  function stopCountdown() {
    clearTimeout(t);
    $("#timer").html("");
    $("#timer2").html("");
    $("#timer3").html("");
  }

  //check winner
  function checkWinner() {
    if (score < 50) {
      showGameOver();
    }
    if (score >= 50) {
      showWinner();
      currentLevel++;
      if (currentLevel === 2) {
        score = 0;
        count = 10;
      } else if (currentLevel === 3) {
        score = 0;
        count = 8;
      }
    }
  }

  /****************************
   * Player Move
   ***************************/

  var gameWidth = 900;
  var gameHeight = 600;

  var right = false;
  var left = false;
  var up = false;
  var down = false;

  var player = document.getElementById("player");

  ///////Player icon placement when new level starts

  function playerPosition() {
    player.speed = 15;
    player.style.visibility = "visible";
    console.log("player position ran");
  }

  console.log(player.vy);

  player.style.left = player.vx + "px";
  player.style.top = player.vy + "px";

  var moveTime = setInterval(movePlayer, 30);

  function movePlayer() {
    x = $(".draggable").offset();
    if (right) {
      player.style.left = player.offsetLeft + player.speed + "px";
      if (x) {
        $(".draggable").offset({
          left: x.left + player.speed
        });
      }
    }
    if (left) {
      player.style.left = player.offsetLeft - player.speed + "px";
      if (x) {
        $(".draggable").offset({
          left: x.left - player.speed
        });
      }
    }
    if (up) {
      player.style.top = player.offsetTop - player.speed + "px";
      if (x) {
        $(".draggable").offset({
          top: x.top - player.speed
        });
      }
    }
    if (down) {
      player.style.top = player.offsetTop + player.speed + "px";
      if (x) {
        $(".draggable").offset({
          top: x.top + player.speed
        });
      }
    }

    if (left || right) {
      var checkSrc = player.src.split("/").pop();
      console.log(player.src);
      console.log(player.src.split("/"));
      console.log(player.src.split("/").pop());
      if (checkSrc != "MainCursor.png") {
        player.src = "MainCursor.png";
      }
    }
    if (up || down) {
      var checkSrc2 = player.src.split("/").pop();
      console.log(player.src);
      console.log(player.src.split("/"));
      console.log(player.src.split("/").pop());
      if (checkSrc2 != "MainCursor.png") {
        player.src = "MainCursor.png";
      }
    } else if (!left && !right && !up && !down) {
      player.src = "MainCursor.png";
    }
  }
  document.addEventListener("keydown", function(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 39:
        player.className = "";
        right = true;
        break;

      case 37:
        player.className = "flip";
        left = true;
        break;

      case 38:
        up = true;
        break;

      case 40:
        down = true;
        break;
      case 32: //Spacebar to drag food
        dragFood();
        break;
    }
  });
  document.addEventListener("keyup", function(event) {
    switch (event.keyCode) {
      case 39:
        right = false;
        break;

      case 37:
        left = false;
        break;

      case 38:
        up = false;
        break;

      case 40:
        down = false;
        break;

      case 32:
        dropFood();
        break;
    }
  });

  /*******************************
   * Game Over Screen
   *******************************/
  //Show the game over screen

  function showGameOver() {
    stopCountdown();
    score = 0;
    $("#gameOver").attr("style", "visibility: visible");
    $("#nextLevel").attr("style", "visibility: hidden");
    $("#bgnMusic")[0].currentTime = 0;
    $("#bgnMusic")[0].pause();
    $("#stage2Music")[0].currentTime = 0;
    $("#stage2Music")[0].pause();
    $("#endMusic")[0].play();
    $(".customers").attr("style", "z-index: 50");
    $(".potatoes").attr("style", "z-index: 50");
    $(".potatoes").attr("style", "z-index: 50");
    $("#player").attr("style", "z-index: 60");
    $(".dialogue").attr("style", "z-index: 50");
  }

  function showWinner() {
    stopCountdown();
    $("#winner").attr("style", "visibility: visible");
    $("#nextLevel").attr("style", "visibility: hidden");
    $("#bgnMusic")[0].currentTime = 0;
    $("#bgnMusic")[0].pause();
    $("#stage2Music")[0].currentTime = 0;
    $("#stage2Music")[0].pause();
    $("#winnerMusic")[0].play();
    popAllFood();
    $(".customers").attr("style", "z-index: 50");
    $(".potatoes").attr("style", "z-index: 50");
    $(".potatoes").attr("style", "z-index: 50");
    $("#player").attr("style", "z-index: 60");
    $(".dialogue").attr("style", "z-index: 50");
    randomizeCustomer();
  }

  function nextLevel() {
    console.log("this is level " + currentLevel);
    $("#score2").text(score);
    countdown();
    console.log("Start");
    $("#nextLevel").attr("style", "visibility: visible");
    $("#startWindow").attr("style", "visibility: hidden");
    $("#gameOver").attr("style", "visibility: hidden");
    $("#winnerMusic")[0].pause();
    $("#winnerMusic")[0].currentTime = 0;
    $("#endMusic")[0].currentTime = 0;
    $("#endMusic")[0].pause();
    $("#stage2Music")[0].play();
    $(".customers").attr("style", "z-index: 150");
    $(".potatoes").attr("style", "z-index: 150");
    $("#player").attr("style", "z-index: 160");
    $(".dialogue").attr("style", "z-index: 150");
    popInFood("#frenchFries");
    popInFood("#baked");
    popInFood("#curly");
    popInFood("#jalapeno");
    randomizeCustomer();
    playerPosition();
  }

  function showStart() {
    $("#winner").attr("style", "visibility: hidden");
    $("#gameOver").attr("style", "visibility: hidden");
    $("#startWindow").attr("style", "visibility: visible");
    $("#winner").attr("style", "visibility: hidden");
    $("#winnerMusic")[0].currentTime = 0;
    $("#winnerMusic")[0].pause();
    popInFood("#frenchFries");
    popInFood("#baked");
    popInFood("#curly");
    popInFood("#jalapeno");
    randomizeCustomer();

    //stop all music
    $("#endMusic")[0].currentTime = 0;
    $("#endMusic")[0].pause();
    $("#bgnMusic")[0].currentTime = 0;
    $("#bgnMusic")[0].pause();
    $("#winnerMusic")[0].currentTime = 0;
    $("#winnerMusic")[0].pause();
  }

  function hideWinner() {
    $("#winner").attr("style", "visibility: hidden");
  }

  function hideGameOver() {
    $("#gameOver").attr("style", "visibility: hidden");
  }

  /*******************************
   * Random Customers
   *******************************/

  function randomizeCustomer() {
    //4 slots y 4 customers y 4 tiempos distintos
    customerIndex = ["#customer1", "#customer2", "#customer3", "#customer4"];
    customerPosition = ["0%", "25%", "50%", "75%"]; //Horizontal positions on the bar
    customerTime = [];
    customerOrder = ["#baked", "#frenchFries", "#jalapeno", "#curly"];
    //Generate the random order for customers
    randomizeArray(customerIndex);
    randomizeArray(customerPosition);
    randomizeArray(customerOrder);
    //Defines a time of appearance for each customer between 0 and 20 seconds
    for (var i = 1; i <= 4; i++) {
      customerTime.push(Math.floor(Math.random() * 1000));
    }
    popInCustomer(0);
    //starts the pop ins
    console.log("random customer order", customerTime);
    //generate the random position for each customer
  }

  function randomizeArray(myArray) {
    for (var i = myArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = myArray[i];
      myArray[i] = myArray[j];
      myArray[j] = temp;
    }
  }

  function popInCustomer(i) {
    if (i < customerIndex.length) {
      activeCustomer = customerIndex[i];
      $(activeCustomer).animate({
        left: customerPosition[i],
        duration: 2000
      });
      showOrder(customerOrder[i], customerPosition[i]);
      i++;
      setTimeout(function() {
        popInCustomer(i);
      }, customerTime[i]);
    }
  }

  function popOutCustomer(customer) {
    $(customer).animate({
      left: "-50%",
      duration: 2000
    });
  }
  // This animates the food order  to come into the screen
  function popInFood(potato) {
    $(potato).animate({
      bottom: "10%",
      duration: 2000
    });
  }
  //makes all the food pop back in
  function popAllFood() {
    popInFood("#frenchFries");
    popInFood("#baked");
    popInFood("#curly");
    popInFood("#jalapeno");
  }

  //returns the food back to its original position

  //This creates the order for customer and displays it in the screen
  function showOrder(potato, position) {
    $(potato + "_order").offset({
      left: x
    });
    $(potato + "_order")
      .hide()
      .css({
        left: position
      })
      .fadeIn(1500);
  }

  ///// function that checks
  function returnPotato(grabbedFood) {
    if (grabbedFood === "#baked") {
      $(grabbedFood).animate({
		left: "5%",
		top:"70%",
        duration: 100
      });
    } else if (grabbedFood === "#curly"){
		$(grabbedFood).animate({
			left: "27%",
			top:"70%",
			duration: 100
		  });
	}else if (grabbedFood === "#frenchFries"){
		$(grabbedFood).animate({
			left: "50%",
			top:"70%",
			duration: 100
		  });
	}else {
		$(grabbedFood).animate({
			left: "75%",
			top:"70%",
			duration: 100
		  });
	}
  }

  function dragFood() {
    grabbedFood = grabPotato();
    //If potato is grabbed (not undefined)
    if (grabbedFood) {
      $(grabbedFood).addClass("draggable");
    }
  }

  function dropFood() {
    $(".potatoes").removeClass("draggable"); // remove the draggable class from all food
    var custServed = serveCustomer();
    var points = 0;
    if (custServed) {
      //check if the served potato matches the customer food order
      i = customerIndex.indexOf(custServed);
      console.log("ORDER", grabbedFood, i, customerOrder[i], customerOrder);
      if (grabbedFood == customerOrder[i]) {
        points = calcPoints();
        updateScore(points, customerPosition[i]);

        ///return potato back to its original position
        returnPotato(grabbedFood);

        $(grabbedFood + "_order").animate({
          left: "-50%",
          duration: 300
        });
        popOutCustomer(custServed);
        $("#point")[0].play();
        randomizeCustomer();
      } else {
        points = calcPoints() * -1; //Points become negative due to food mismatch
        $(custServed).effect(
          "shake",
          {
            times: 2
          },
          300
        );
        updateScore(points, customerPosition[i]);
        $("#fail")[0].play();
      }
    }
  }

  function calcPoints() {
    switch (grabbedFood) {
      case "#baked":
        return 20;
        break;
      case "#frenchFries":
        return 5;
        break;
      case "#curly":
        return 10;
        break;
      case "#jalapeno":
        return 15;
        break;
    }
  }

  function updateScore(points, position) {
    score += points;
    $("#score").text(score);
    $("#score2").text(score);
    //Sets the points div initial position (hidden)
    $("#points").css({
      left: "-50%",
      top: 350,
      opacity: 1,
      display: "inline",
      visibility: "visible",
      "z-index": 100,
      position: "absolute",
      "font-size": "xx-large",
      "font-family": "sans-serif"
    });
    if (points > 0) {
      //win points
      $("#points").text("+" + points);
      $("#points").css({
        left: position,
        color: "greenYellow"
      });
      $("#points")
        .animate(
          {
            opacity: "0"
          },
          {
            queue: false,
            duration: 1000
          }
        )
        .hide(
          "scale",
          {
            percent: 1000
          },
          500
        );
    } else {
      //lose points
      $("#points").text("-" + points);
      $("#points").css({
        left: position,
        color: "crimson"
      });
      $("#points")
        .animate(
          {
            opacity: "0"
          },
          {
            queue: false,
            duration: 1000
          }
        )
        .hide(
          "scale",
          {
            percent: 1000
          },
          500
        );
    }
  }

  function grabPotato() {
    if (areColliding("#player", "#baked")) {
      return "#baked";
    } else if (areColliding("#player", "#frenchFries")) {
      return "#frenchFries";
    } else if (areColliding("#player", "#jalapeno")) {
      return "#jalapeno";
    } else if (areColliding("#player", "#curly")) {
      return "#curly";
    } else {
      return undefined;
    }
  }

  function serveCustomer(potato, customer) {
    if (areColliding(grabbedFood, "#customer1")) {
      return "#customer1";
    } else if (areColliding("#player", "#customer2")) {
      return "#customer2";
    } else if (areColliding("#player", "#customer3")) {
      return "#customer3";
    } else if (areColliding("#player", "#customer4")) {
      return "#customer4";
    } else {
      return undefined;
    }
  }

  function areColliding(el1, el2) {
    var x1 = $(el1).offset().left;
    var y1 = $(el1).offset().top;
    var h1 = $(el1).outerHeight(true);
    var w1 = $(el1).outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $(el2).offset().left;
    var y2 = $(el2).offset().top;
    var h2 = $(el2).outerHeight(true);
    var w2 = $(el2).outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }
}); //connected to ready(function)
