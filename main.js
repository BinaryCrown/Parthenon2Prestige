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

// Convert tons to tons, kg and g

function RoundToHundredth(x){
	let y = x*100;
	y = Math.round(y);
	return y/100;
}

function FormatTons(x) {
	if (x >= 1) {
		return RoundToHundredth(x) + " tons"
	}
	else {
		if (x >= 0.001) {
			return RoundToHundredth(x*1000) + " kilograms"
		}
		else {
			return RoundToHundredth(x*1000000) + " grams"
		}
	}
}

let timeDisplay = document.getElementById("timeDisplay");
let stoneDisplay = document.getElementById("stoneDisplay");
let woodDisplay = document.getElementById("woodDisplay");

// Increments time and gives resources
function tick() {
	if (isTicking) {
		setTimeout(function(){tick()},50);
	}
	else {
		isTicking = true;
		setTimeout(() => {
			time += 12;
			wood += 1/365;
			stone += 1/365;
			isTicking = false;
			timeDisplay.innerText = DtoYMD(Math.floor(time/12));
			woodDisplay.innerText = FormatTons(wood);
			stoneDisplay.innerText = FormatTons(stone);
		}, 100);
	}
}

for (let i = 0; i < 1000; i++) {
	tick();
}