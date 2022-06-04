function startGame() {
	class Player {
	  constructor(elem, top, left, isMobile, isChrome) {
	  	this.element = elem;
	  	this.top = top;
	  	this.left = left;
	  	this.windowHeight = window.innerHeight;
	  	this.windowWidth  = window.innerWidth;
	  	this.leftInterval;
	  	this.rightInterval;
	  	this.upInterval;
	  	this.downInterval;
	  	this.isMobile = isMobile;
	  	if (this.isMobile) {
	  		this.topConstraint = window.innerHeight / 3;
	  		this.bottomConstraint = window.innerHeight / 1.4;
	  	}
	  	this.isChrome = isChrome;
	  }		 

	  moveLeft(keydown) {
	  	if (keydown) {
	  		this.leftInterval = setInterval(() => {
	  			if (this.left > 75) {
			  		// this._left -= 15;
			  		this.left -= 2;
			  		this.element.style.left = (this.left) + "px";
			  	}
		  	}, 3);
	  	} else {
	  		clearInterval(this.leftInterval);
	  	}
	  }

	  moveRight(keydown) {
	  	if (keydown) {
	  		this.rightInterval = setInterval(() => {
	  		if (!this.isChrome) {
	  			if (this.left < this.windowWidth - 195) {
			  		this.left += 2;
			  		this.element.style.left = (this.left) + "px";
			  	}
	  		} else {
	  			if (this.left < this.windowWidth - 150) {
			  		this.left += 2;
			  		this.element.style.left = (this.left) + "px";
			  	}
	  		}
		  	}, 3);
	  	} else {
	  		clearInterval(this.rightInterval);
	  	}
	  }

	  moveUp(keydown) {
  		if (keydown) {
	  		this.upInterval = setInterval(() => {
	  		if (this.isMobile) {
	  			if(this.top > this.topConstraint) {
			  		this.top -= 2;
			  	    this.element.style.top = (this.top) + "px";
		  		}
	  		} else {
	  			if(this.top > this.windowHeight / 2 + 40) {
			  		this.top -= 2;
			  	    this.element.style.top = (this.top) + "px";
		  		}
	  		}
	  	}, 3);
	  	} else {
	  		clearInterval(this.upInterval);
	  	}
	  }

	  moveDown(keydown) {
	  	if (keydown) {
	  		this.downInterval = setInterval(() => {
	  		if (this.isMobile) {
	  			if (this.top < this.bottomConstraint) {
			  		this.top += 2;
			  		this.element.style.top = (this.top) + "px";
		  		}
	  		} else {
	  			if (this.top < this.windowHeight - 140) {
			  		this.top += 2;
			  		this.element.style.top = (this.top) + "px";
		  		}
	  		}
	  	}, 3);
	  	} else {
	  		clearInterval(this.downInterval);
	  	}
	  }

	}

	class Villain {
	  constructor(elem, top, left) {
	  	this.element = elem;
	  	this.top = top;
	  	this.left = left;
	  	this.windowHeight = window.innerHeight;
	  	this.windowWidth  = window.innerWidth;
	  	this.direction = "left";
	  }

	  moveVillain() {
  		setInterval(() => {
	  		if (this.direction === "left") {
	  			if (this.left > 100) {
	  				this.left -= 1;
	  				this.element.style.left = (this.left) + "px";
	  			} else {
	  				this.direction = "right";
	  			}
	  		} else {
	  			if (this.left < this.windowWidth - 150) {
	  				this.left += 1;
	  				this.element.style.left = (this.left) + "px";
	  			} else {
	  				this.direction = "left";
	  			}
	  		}
  		}, 1)
	  }

	   changeDirection() {
  		setInterval(() => {
  			let randNum =  Math.floor(Math.random() * 10) + 1;
			if (randNum > 7) {
				this.direction = (this.direction === "left") ? "right" : "left";
			}
  		}, 800);
	  }

	  shoot() {
	  	setInterval(() => {
	  		let newBullet = document.createElement("span");
	  		newBullet.style.top = (this.top + 50) + "px";
	  		newBullet.style.left = (this.left + 25) + "px";
	  		newBullet.classList.add("bulletStyle");
	  		document.getElementById("stage").appendChild(newBullet);
  		}, 1000);
	  }

	  moveBullets() {
	  	setInterval(() => {
	  		let bullets = document.querySelectorAll(".bulletStyle");
	  		for (let i = 0; i < bullets.length; i++) {
	  			let bulletTop = parseInt(bullets[i].style.top);
				bullets[i].style.top = (bulletTop + 1) + "px";
			}
  		}, 1);	
	  }

	  removeBullets() {
  		setInterval(() => {
	  		let bullets = document.querySelectorAll(".bulletStyle");
	  		for (let i = 0; i < bullets.length; i++) {
	  			if (parseInt(bullets[i].style.top) > this.windowHeight + 100) {
	  				bullets[i].remove();
	  			}
			}
  		}, 1000);
	  }

	}

	class GameStatus {
		constructor(player, bullets) {
		  this.player = player;
		  this.bullets = bullets;
		}

		checkStatus() {
			let windowReplaceCount = 0;
			setInterval(() => {
				let playerOffsetBottom = this.player.offsetTop + this.player.offsetHeight;
			    let playerOffsetRight = this.player.offsetLeft + this.player.offsetWidth;
			    let bulletOffsetBottom;
			    let bulletOffsetRight;

		  		for (let i = 0; i < this.bullets.length; i++) {
		  			bulletOffsetBottom = this.bullets[i].offsetTop + this.bullets[i].offsetHeight;
			   	 	bulletOffsetRight = this.bullets[i].offsetLeft + this.bullets[i].offsetWidth;

			   	 	if (!((playerOffsetBottom < this.bullets[i].offsetTop) ||
		             (this.player.offsetTop > bulletOffsetBottom) ||
		             (playerOffsetRight < this.bullets[i].offsetLeft) ||
		             (this.player.offsetLeft > bulletOffsetRight))) {
		             	let seconds = document.getElementById("seconds").textContent;
		             	let tens = document.getElementById("tens").textContent;
		             	if (windowReplaceCount === 0) {
		             		window.history.replaceState(null, "", window.location + "?gameOver" + "&score=" + seconds + ":" + tens);
		             		windowReplaceCount++;
		             	}
			   	 		window.location.reload(false);
			   	 	}
				}

  			}, 100);
		}
	}

	function disableTouchScreen() {
		window.addEventListener('touchmove', function (event) {
		  if (event.scale !== 1) { event.preventDefault(); }
		}, false);

		//Disable pinch zoom on document
	    window.addEventListener('touchstart', function (event) {
	      if (event.touches.length > 1) {
	        event.preventDefault();
	      }
	    }, false);

		//Disable double tap on document
	    let lastTouchEnd = 0;
	    window.addEventListener('touchend', function (event) {
	      let now = (new Date()).getTime();
	      if (now - lastTouchEnd <= 1000) {
	        event.preventDefault();
	      }
	      lastTouchEnd = now;
	    }, false);
	}

	function initPlayer() {
		let characterElem = document.querySelector("#character");

		let leftPos = window.innerWidth / 2 - 50;
		let topPos  = window.innerHeight / 1.3;
		let isMobile = false;

		if (window.innerWidth < 1200) {
			leftPos = window.innerWidth / 2 - 50;
			topPos  = window.innerHeight / 2;
			isMobile = true;
		}

		let isChrome = false;
		if (navigator.userAgent.match(/chrome|chromium|crios/i)) {
			isChrome = true;
		}

		characterElem.style.left = leftPos + "px";
		characterElem.style.top  = topPos + "px";

		let character = new Player(characterElem, topPos, leftPos, isMobile, isChrome);

		document.addEventListener('keydown', keyDown);
		document.addEventListener('keyup', keyUp);

		let active = [0, 0, 0, 0];

		function keyDown(e) {
			if (e.code == "ArrowUp") {
				if (active[0] === 0) {
					active[0] = 1;
					character.moveUp(true);
				}
			} else if (e.code == "ArrowDown") {
				if (active[1] === 0) {
					active[1] = 1;
					character.moveDown(true);
				}
			} else if (e.code == "ArrowLeft") {
				if (active[2] === 0) {
					active[2] = 1;
					character.moveLeft(true);
				}
			} else if (e.code == "ArrowRight") {
				if (active[3] === 0) {
					active[3] = 1;
					character.moveRight(true);
				}
			}
		}

		function keyUp(e) {
			if (e.code == "ArrowUp") {
				active[0] = 0;
				character.moveUp(false);
			} else if (e.code == "ArrowDown") {
				active[1] = 0;
				character.moveDown(false);
			} else if (e.code == "ArrowLeft") {
				active[2] = 0;
				character.moveLeft(false);
			} else if (e.code == "ArrowRight") {
				active[3] = 0;
				character.moveRight(false);
			}
		}

		let mobileButtons = document.querySelectorAll("[type=mobileMove]");

		for (let i = 0; i < mobileButtons.length; i++) {
			mobileButtons[i].addEventListener("touchstart", mouseDown, { passive: true});
			mobileButtons[i].addEventListener("touchend", mouseUp, { passive: true});
		}

		function mouseDown(e) {
			if (e.currentTarget.getAttribute("id") === "mobileUp") {
				character.moveUp(true);
			} else if (e.currentTarget.getAttribute("id") === "mobileDown") {
				character.moveDown(true);
			} else if (e.currentTarget.getAttribute("id") === "mobileLeft") {
				character.moveLeft(true);
			} else if (e.currentTarget.getAttribute("id") === "mobileRight") {
				character.moveRight(true);
			}
		}

		function mouseUp(e) {
			if (e.currentTarget.getAttribute("id") === "mobileUp") {
				character.moveUp(false);
			} else if (e.currentTarget.getAttribute("id") === "mobileDown") {
				character.moveDown(false);
			} else if (e.currentTarget.getAttribute("id") === "mobileLeft") {
				character.moveLeft(false);
			} else if (e.currentTarget.getAttribute("id") === "mobileRight") {
				character.moveRight(false);
			}
		}
	 }

	function initVillain() {
		let villainElem = document.querySelector("#villain");

		let leftPos = window.innerWidth / 2;
		let topPos  = window.innerHeight  / 5.5;
		
		villainElem.style.left = leftPos + "px";
		villainElem.style.top  = topPos + "px";

		let myVillain = new Villain(villainElem, topPos, leftPos);

		myVillain.moveVillain();
		myVillain.shoot();
		myVillain.moveBullets();
		myVillain.removeBullets();
		myVillain.changeDirection();

	}

	function initGameStatus() {
		let characterElem = document.querySelector("#character");
		let bullets = document.getElementsByClassName("bulletStyle");

		let gameStatus = new GameStatus(characterElem, bullets);

		gameStatus.checkStatus();
	}

	function initTimer() {
		let seconds = 00; 
		let tens = 00; 
		let appendTens = document.getElementById("tens")
		let appendSeconds = document.getElementById("seconds")
		let Interval;

		Interval = setInterval(startTimer, 10);

		function startTimer () {
		tens++; 

		if(tens <= 9){
		  appendTens.innerHTML = "0" + tens;
		}

		if (tens > 9){
		  appendTens.innerHTML = tens;
		  
		} 

		if (tens > 99) {
		  seconds++;
		  appendSeconds.innerHTML = "0" + seconds;
		  tens = 0;
		  appendTens.innerHTML = "0" + 0;
		}

		if (seconds > 9){
		  appendSeconds.innerHTML = seconds;
		}

		}
	}

	disableTouchScreen();
	initPlayer();
	initVillain();
	initGameStatus();
	initTimer();
}

function initWindow() {
	if (!navigator.userAgent.match(/chrome|chromium|crios/i)) {
		document.body.style.cssText = "position:fixed;top:0;bottom:0;left:24px;right:24px;";
	} 

	let highScore = "";
	(() => {
		let xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	      if (this.readyState == 4 && this.status == 200) {
	        if (this.responseText === "0") {
	        	alert("Error retrieving high score. Please refresh if you wish to try again")
	        } else {
	        	highScore = this.responseText;
	        }
	      }
	    };
	    xhttp.open("GET", "getHighScore.php", false);
	    xhttp.send();
	})();

	let url = window.location.href;
	let highScoreElem = document.getElementById("highScore");
	if (url.includes("gameOver")) {
		let params = new URLSearchParams(document.location.search);
		let score = params.get("score");
		window.history.replaceState(null, "", "https://johnfedak.com/projects/planeGame");
		let gameOverMessage = document.querySelector("#gameOverMessage");
		document.getElementById("finalScore").textContent = score;
		if (parseInt(score.replace(":", "")) > parseInt(highScore.replace(":", ""))) {
			(() => {
				let xhttp = new XMLHttpRequest();
			    xhttp.onreadystatechange = function() {
			      if (this.readyState == 4 && this.status == 200) {
			        if (this.responseText === "0") {
			        	alert("Error retrieving high score. Please refresh if you wish to try again")
			        }
			      }
			    };
			    xhttp.open("POST", "/projects/planeGame/newHighScore.php", false);
			    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			    xhttp.send("score=" + score);
			})();
			document.getElementById("newHighScore").style.display = "block";
			document.getElementById("gameOver").style.display = "none";
			highScoreElem.textContent = score;
			gameOverMessage.style.display = "block";
		} else {
			document.getElementById("gameOver").style.display = "block";
			document.getElementById("newHighScore").style.display = "none";
			highScoreElem.textContent = highScore;
			gameOverMessage.style.display = "block";
		}
		document.querySelector("#playAgain").addEventListener("click", () => {
			gameOverMessage.style.display = "none";
			startGame();
		});
	} else { 
		let welcomeMessage = document.querySelector("#welcomeMessage");
		welcomeMessage.style.display = "block";
		console.log(highScore);
		highScoreElem.textContent = highScore;
		document.getElementById("highScore").innerHTML = highScore;
		document.querySelector("#startGame").addEventListener("click", () => {
			welcomeMessage.style.display = "none";
			startGame();
		});
	}

}

initWindow();

