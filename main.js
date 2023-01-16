let time = 0;
let isTicking = false;

let wood = 0;
let stone = 0;

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

function FormatTons(x) {
	if (x >= 1) {
		return x + "tons"
	}
	else {
		if (x >= 0.001) {
			return x*1000 + "kilograms"
		}
		else {
			return x*1000000 + "grams"
		}
	}
}

let timeDisplay = document.getElementById("timeDisplay");
let stoneDisplay = document.getElementById("stoneDisplay");
let woodDisplay = document.getElementById("woodDisplay");

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

function GiveResources(years) {
	wood += years;
	stone += years;
	woodDisplay.innerText = FormatTons(wood);
	woodDisplay.innerText = FormatTons(stone);
}

// Update the text containing current time

function tick(/*nation,nstats*/) {
	GetTime();
	GiveResources(1/365);
};

for (let i = 0; i < 1000; i++) {
	tick();
}