let countdown, counter = 0;

function skip_button() {
	let buttonList = document.querySelector(".buttons-container");
	let button = document.createElement("button");
	let img = document.createElement("img");
	button.className = "skip-button";
	img.src = "./assets/skip-forward.svg";
	img.alt = "skip button";
	button.appendChild(img);
	buttonList.appendChild(button);
}

document.querySelector(".start-button").addEventListener("click", function() {
	let startButton = document.querySelector(".start-button");
	let timer = document.querySelector(".pomodoro-timer");
	let skipButton = document.querySelector(".skip-button");

	if (startButton.innerHTML === "PAUSE") {
		skipButton.remove();
		clearInterval(countdown);
		startButton.innerHTML = "START";
		return;
	}
	
	if (skipButton == null)
		skip_button();
	startButton.innerHTML = "PAUSE";
	let sec = timer.innerHTML.slice(3);
	let min = timer.innerHTML.slice(0, 2);
	let breakInterval = document.querySelector(".input-lb").value;

	countdown = setInterval(function() {
		if (sec == "00") {
			if (min == "00") {
				let dataTime = document.querySelector(".pomodoro-timer").getAttribute("data-time");
				let modeButtons = document.querySelectorAll(".mode button");
				let rington = new Audio("./assets/ringtone.mp3");

				rington.play();
				counter++;

				if (breakInterval === "1") {
					if (dataTime === "25:00") {
						updateTimer("15:00", "long break");
						modeButtons.forEach(btn => {
							btn.classList.remove("active");
							if (btn.classList.contains("long-break-button")) {
								btn.classList.add("active");
							}
						});
						showNotification("Time for a long break!");
					} else {
						updateTimer("25:00", "pomodoro");
						modeButtons.forEach(btn => {
							btn.classList.remove("active");
							if (btn.classList.contains("pomodoro-button")) {
								btn.classList.add("active");
							}
						});
						showNotification("Back to work with a pomodoro!");
					}
				} else {
					if ((counter == (breakInterval * 2 - 1)) && counter != 1) {
						counter = 0;
						updateTimer("15:00", "long break");
						modeButtons.forEach(btn => {
							btn.classList.remove("active");
							if (btn.classList.contains("long-break-button")) {
								btn.classList.add("active");
							}
						});
						showNotification("Time for a long break!");
					}
					else if (dataTime === "25:00") {
						updateTimer("05:00", "short break");
						modeButtons.forEach(btn => {
							btn.classList.remove("active");
							if (btn.classList.contains("short-break-button")) {
								btn.classList.add("active");
							}
						});
						showNotification("Time for a short break!");
					} else if (dataTime === "05:00") {
						updateTimer("25:00", "pomodoro");
						modeButtons.forEach(btn => {
							btn.classList.remove("active");
							if (btn.classList.contains("pomodoro-button")) {
								btn.classList.add("active");
							}
						});
						showNotification("Back to work with a pomodoro!");
					} else if (dataTime === "15:00") {
						updateTimer("25:00", "pomodoro");
						modeButtons.forEach(btn => {
							btn.classList.remove("active");
							if (btn.classList.contains("pomodoro-button")) {
								btn.classList.add("active");
							}
						});
						showNotification("Back to work with a pomodoro!");
					} else 
						clearInterval(countdown);
				}
				if (skipButton != null)
					skipButton.remove();
				if (document.querySelector(".switch").attributes.checked.value == "true")
					document.querySelector(".start-button").click();
				return;
			}
			min -= 1;
			sec = 59;
		} else
			sec--;
		if (String(min).length < 2)
			min = "0" + min;
		else if (String(sec).length < 2)
			sec = "0" + sec;
		timer.innerHTML = min + ":" + sec;
		document.title = `(${timer.innerHTML}) Pomodoro`;
	}, 1000);
});

document.addEventListener("keydown", function (event) {
	if (event.ctrlKey == true && event.altKey == true && event.code == "Space") {
		event.preventDefault(); //default hnaya hiya scroll down
		document.querySelector(".start-button").click();
	} else if (event.ctrlKey == true && event.altKey == true && event.code == "KeyR") {
		event.preventDefault();
		document.querySelector(".reset-button").click();
	}
})


function updateTimer(time, title) {
	let pomoTitle = document.querySelector(".pomodoro-timer");
	let skipButton = document.querySelector(".skip-button");

	if (skipButton != null)
		skipButton.remove();
	pomoTitle.innerHTML = time;
	pomoTitle.setAttribute("data-time", time);
	clearInterval(countdown);
	document.querySelector(".start-button").innerHTML = "Start";
	document.title = `(${time}) ${title}`;

	if (title == "short break")
		document.body.style.backgroundColor = "#4c9196";
	else if (title == "long break")
		document.body.style.backgroundColor = "#4d7fa2";
	else
		document.body.style.backgroundColor = "#c15c5c";
}

document.querySelector(".mode").addEventListener("click", function(event) {
	let button = event.target;
	let time = button.getAttribute("data-duration");
	let title = button.innerHTML;

	updateTimer(time, title);

	document.querySelectorAll(".mode button").forEach(btn => {
		btn.classList.remove("active");
	});
	button.classList.add("active");

	let skipButton = document.querySelector(".skip-button");
	if (skipButton != null)
		skipButton.remove();
})

document.querySelector(".reset-button").addEventListener("click", function() {
	let pomoTitle = document.querySelector(".pomodoro-timer");
	clearInterval(countdown);
	pomoTitle.innerHTML = pomoTitle.getAttribute("data-time");
	document.querySelector(".start-button").innerHTML = "Start";
	if (document.querySelector(".skip-button") != null)
		document.querySelector(".skip-button").remove();
})

document.addEventListener("click", function(event) {
    let time = document.querySelector(".pomodoro-timer");

    if (event.target.alt === "skip button") {
        let dataTime = time.getAttribute("data-time");
        let modeButtons = document.querySelectorAll(".mode button");
		let skipButton = document.querySelector(".skip-button");
		let breakInterval = document.querySelector(".input-lb").value;

		if (skipButton != null)
			skipButton.remove();

		counter++;
		if (breakInterval === "1") {
			if (dataTime === "25:00") {
				updateTimer("15:00", "long break");
				modeButtons.forEach(btn => {
					btn.classList.remove("active");
					if (btn.classList.contains("long-break-button")) {
						btn.classList.add("active");
					}
				});
				showNotification("Time for a long break!");
			} else {
				updateTimer("25:00", "pomodoro");
				modeButtons.forEach(btn => {
					btn.classList.remove("active");
					if (btn.classList.contains("pomodoro-button")) {
						btn.classList.add("active");
					}
				});
				showNotification("Back to work with a pomodoro!");
			}
		} else {
			if ((counter == (breakInterval * 2 - 1)) && counter != 1) {
				counter = 0;
				updateTimer("15:00", "long break");
				modeButtons.forEach(btn => {
					btn.classList.remove("active");
					if (btn.classList.contains("long-break-button")) {
						btn.classList.add("active");
					}
				});
				showNotification("Time for a long break!");
			}
			else if (dataTime === "25:00") {
				updateTimer("05:00", "short break");
				modeButtons.forEach(btn => {
					btn.classList.remove("active");
					if (btn.classList.contains("short-break-button")) {
						btn.classList.add("active");
					}
				});
				showNotification("Time for a short break!");
			} else if (dataTime === "05:00") {
				updateTimer("25:00", "pomodoro");
				modeButtons.forEach(btn => {
					btn.classList.remove("active");
					if (btn.classList.contains("pomodoro-button")) {
						btn.classList.add("active");
					}
				});
				showNotification("Back to work with a pomodoro!");
			} else if (dataTime === "15:00") {
				counter--;
				updateTimer("25:00", "pomodoro");
				modeButtons.forEach(btn => {
					btn.classList.remove("active");
					if (btn.classList.contains("pomodoro-button")) {
						btn.classList.add("active");
					}
				});
				showNotification("Back to work with a pomodoro!");
			} else 
				clearInterval(countdown);
		}

		if (document.querySelector(".switch").attributes.checked.value == "true")
			document.querySelector(".start-button").click();
    }

    let slider = event.target;
    let sliderParent = slider.parentNode;

	if (slider.className == "slider round") {
        if (sliderParent.attributes.checked.value == "true")
            sliderParent.setAttribute("checked", "false");
        else
			sliderParent.setAttribute("checked", "true");
    }
});

function requestNotificationPermission() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Permission granted.");
            } else {
                console.log("Permission denied.");
            }
        });
    }
}
requestNotificationPermission();

function showNotification(title) {
    if (Notification.permission === "granted") {
        new Notification(title, {
            icon: "./assets/tomato-svgrepo.svg",
			tag: "dup",
        });

		notification.onclick = function () {
            window.focus();
            this.close();
        };
    } else {
        console.log("Permission not granted.");
    }
}
