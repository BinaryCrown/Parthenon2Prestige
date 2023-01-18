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

const g = {
	// Government type stats here
	/* NAME		HAPPINESS	INTELLIGENCE	SPIRITUALITY	FREEDOM	SAFETY	GDPGROWTH	DEATH*/
	cenrep: 	[0.5,		0.5,			0.5,			0.5,	0.5,	0.5,		0.5],
	libconfed:	[0.6,		0.5,			0.6,			0.4,	0.4,	0.5,		0.5],
	feddem:		[0.5,		0.5,			0.5,			0.6,	0.4,	0.5,		0.5],
	demo:		[0.4,		0.5,			0.5,			0.6,	0.5,	0.5,		0.5],
	monarcy:	[0.5,		0.5,			0.6,			0.4,	0.5,	0.5,		0.5],
	hippie:		[0.5,		0.5,			0.7,			0.5,	0.4,	0.4,		0.5],
	capdict:	[0.5,		0.5,			0.5,			0.4,	0.5,	0.6,		0.5],
	libpolice:	[0.4,		0.5,			0.4,			0.6,	0.6,	0.5,		0.5],
	demrep:		[0.4,		0.5,			0.5,			0.7,	0.4,	0.5,		0.5],
	capstate:	[0.5,		0.4,			0.5,			0.5,	0.5,	0.6,		0.5],
	libstate:	[0.4,		0.4,			0.4,			0.7,	0.6,	0.5,		0.5],
	conserv:	[0.6,		0.4,			0.5,			0.4,	0.6,	0.5,		0.5],
	progressv:	[0.4,		0.6,			0.5,			0.6,	0.4,	0.5,		0.5],
	anarch:		[0.5,		0.5,			0.5,			0.8,	0.4,	0.5,		0.3],
	ucapstate:	[0.5,		0.5,			0.5,			0.3,	0.4,	0.8,		0.5],
	corpdict:	[0.4,		0.7,			0.5,			0.4,	0.3,	0.7,		0.5],
	fmcap:		[0.5,		0.4,			0.5,			0.3,	0.5,	0.8,		0.5],
	bendict:	[0.3,		0.6,			0.5,			0.6,	0.5,	0.5,		0.5],
	dict:		[0.5,		0.6,			0.5,			0.4,	0.5,	0.5,		0.5],
	demsoc:		[0.3,		0.7,			0.5,			0.7,	0.4,	0.4,		0.5],
	libpara:	[0.4,		0.8,			0.5,			0.7,	0.4,	0.3,		0.4],
	authdemoc:	[0.4,		0.5,			0.5,			0.6,	0.6,	0.4,		0.5],
	libsocdem:	[0.2,		0.9,			0.5,			0.8,	0.3,	0.3,		0.5],
	leftutop:	[0.5,		0.7,			0.5,			0.6,	0.4,	0.4,		0.4],
	authmob:	[0.4,		0.5,			0.5,			0.9,	0.5,	0.4,		0.3],
	totdict:	[0.5,		0.7,			0.5,			0.3,	0.5,	0.5,		0.5],
	comdict:	[0.5,		0.9,			0.5,			0.4,	0.4,	0.3,		0.5],
	commie:		[0.4,		0.7,			0.5,			0.7,	0.4,	0.3,		0.5],
	socdict:	[0.4,		1,				0.5,			0.4,	0.3,	0.4,		0.5],
	autoc:		[0.5,		0.8,			0.5,			0.1,	0.4,	0.7,		0.5],
	oligarch:	[0.4,		0.8,			0.5,			0.3,	0.4,	0.6,		0.5],
	plutoc:		[0.5,		0.5,			0.5,			0.5,	0.5,	0.5,		0.5],
	neoliberal:	[0.5,		0.2,			0.5,			0.6,	0.6,	0.7,		0.4],
	theoc:		[0.6,		0.5,			0.5,			0.4,	0.7,	0.3,		0.5],
	neoconserv:	[0.4,		0.3,			0.5,			0.7,	0.5,	0.7,		0.4],
	terrorist:  [0.5,		0.5,			0.5,			0.8,	0.7,	0.2,		0.3],
	colonial:	[0.3,		0.9,			0.5,			1,		0.4,	0.1,		0.3],
	technoc:	[0.4,		0.6,			0.4,			0.4,	0.5,	0.7,		0.5]
}

function statsFromGovtype (govtype) {
	return g[govtype];
}

class Nation {
	constructor(govprop, flags, resources, economy) {
		// govprop = [name, flag, government type, taxes, budget]
		// popstats = [happiness, intelligence, spirituality, freedom, safety, gdpgrowth, death]
		// flags = array of numbers encoding technologies, issues, etc. 
		// resources = [wood, stone, steel, food, wheat, matter, oil, energy, pp, qp, money]
		// economy = [gdp, industries]
		this.govprop = govprop;
		this.popstats = statsFromGovtype(govprop[2]);
		this.flags = flags;
		this.resources = resources;
		this.economy = economy;
	}
}

// taxes = [lowerclass, middleclass, upperclass, colony, corporate]
// corporate = [news, transport, clothes, food, pharma, oil, guns, tech, insurance, jewellery, gambling, drugs, brewing]
// budget = [ps, education, healthcare, infra, military, blackbudget]

function MakeNewNation(govprop) {
	return new Nation([govprop[0], govprop[1], govprop[2], [0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0]])
}