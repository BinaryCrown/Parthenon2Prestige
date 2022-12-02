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

// Get population growth value

function erf(x) {
    // constants
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var p  =  0.3275911;

    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);
    var t = 1.0/(1.0 + p*x);
    var y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-x*x);
    return sign*y;
}

function clamp(x) {
	// Order-preserving bijection R -> (0,1)
	return (erf(x)+1)/2
}

function PopGrowth(happiness, education, freedom) {
	// happiness, education, freedom are values from 0 to 1
	let tv = happiness*education+1-(2*freedom-0.5)^2;
	let diff = tv - Math.abs(tv - happiness*education);
	return clamp(happiness*education - diff);
}

// If civil liberties are too high or too low, population may not grow as fast.

// Compute population growth

class Nation {
	constructor (initpop, happiness, education, freedom) {
		this.population = initpop;
		this.population_growth = PopGrowth(happiness, education, freedom);
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

let nation = new Nation(100,1,1,0.75); 
popDisplay.innerText = numberWithCommas(nation.population);

for (let i = 0; i < 1000; i++) {
	tick(nation);
}