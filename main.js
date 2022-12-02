let time = 0;
let isTicking = false;
let isPaused = false;

// Convert days to Y+M+D

function DtoYMD(days) {
	if (days == 0) {
		return "0 days";
	}
	var years = Math.floor(days / 360);
    var months = Math.floor(days % 360 / 30);
    var days = Math.floor(days % 360 % 30);
    var yearsDisplay = years > 0 ? years + (years == 1 ? " year, " : " years, ") : "";
    var monthsDisplay = months > 0 ? months + (months == 1 ? " month, " : " months, ") : "";
    var daysDisplay = days > 0 ? days + (days == 1 ? " day" : " days") : "";
    var result = yearsDisplay + monthsDisplay + daysDisplay;
    if (result.slice(-1) == ",") {
    	result = result.slice(0,-1);
    }
    if (result.slice(-1) == ",") {
    	return result.slice(0,-1);
    }
    return result; 
}

let timeDisplay = document.getElementById("timeDisplay");

// Increment time counter by one after a second, and change the text containing the time: 1 IRL second = 1 day in-game
function GetTime() {
	if (isTicking) {
		setTimeout(function(){GetTime()},50);
	}
	else {
		isTicking = true;
		setTimeout(() => {time++; isTicking = false; timeDisplay.innerText = DtoYMD(Math.floor(time/12));}, 100);
	}
}

// Compute population growth

class Nation {
	constructor (initpop, popgrowth) {
		this.population = initpop;
		this.population_growth = popgrowth;
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let popDisplay = document.getElementById("popDisplay");

Nation.prototype.GetNewPop = function() {
	this.population *= (Math.E)**this.population_growth;
	popDisplay.innerText = numberWithCommas(this.population);
}

// Update the text containing current time

function tick(nation) {
	GetTime();
	nation.GetNewPop();
};

let nation = new Nation(100,1); 
popDisplay.innerText = numberWithCommas(nation.population);

for (let i = 0; i < 1000; i++) {
	tick(nation);
}