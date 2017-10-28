/* data assignments */

const cheats = {
	showCeruTarget: false
};

// game phase durations
const phases = [
	//scatter chase
	10,     15,
	10,     20,
	7.5,    20,
	5,
];

// game states
const WAIT = null;
const PAUSE = 0;
const ACTIVE = 1;
const OVER = 2;

// messages
const GETREADY = 0;
const GAMEOVER = 1;

// shifts for x and y for given direction value
const sin = [0, 0, 0, -1, 1];
const cos = [0, -1, 1, 0, 0];

// directions
const STILL = 0;
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;
const opposite = [STILL,RIGHT,LEFT,DOWN,UP];
const turn = [STILL,UP,DOWN,RIGHT,LEFT];

// key codes
const KEYUP = 38;
const KEYDOWN = 40;
const KEYRIGHT = 39;
const KEYLEFT = 37;
const KEYSPACE = 32;
// cheatkeys
const KEYCTRL = 17;
const KEYC = 67;

// factor of map to shadow canvas upscale
const shdScl = 3;

// Ceru modes
const SCATTER = 0;
const CHASE = 1;
const HOMECOMING = 2;

// Ceru AI
const Targeting = {
	red:    () => Player.blk,
	pink:   () => {
		let pos = Player.blk.pos;

		pos.x = Math.max(pos.x + cos[Player.direction]*4, 0);
		pos.y = Math.max(pos.y + sin[Player.direction]*4, 0);

		return {pos};
	},
	blue:   () => {
		let srcpos = Ceru[0].blk.pos;
		let plrpos = Player.blk.pos;
		let x = Math.min(Math.max(plrpos.x + (plrpos.x - srcpos.x), 0), Width-1);
		let y = Math.min(Math.max(plrpos.y + (plrpos.y - srcpos.y), 0), Height-1);

		return {pos: {x, y}};
	},
	orange: () => {
		let srcpos = Ceru[3].blk.pos;
		let plrblk = Player.blk;

		if (Math.pow(srcpos.x-plrblk.pos.x, 2) + Math.pow(srcpos.y-plrblk.pos.y, 2) > 64)
			return plrblk;
		else
			return Ceru[3].homeblk
	}
};
Object.freeze(Targeting);


Object.defineProperty(Map, 'totalDots', {
	value: map => map.reduce((prev, curr) => prev + curr.filter(blk => blk === PILL || blk === DOT).length, 0)
});
Object.freeze(Map);

// sprite addressing
const sprites = new Image();
sprites.src = 'image/sprites.png';
const numbers = new Image();
numbers.src = 'image/numbers.png';

const Width = Map[0].length;
const Height = Map.length;
const walls = [], outcorners = [], incorners = [];
const floor = [0,0];
const vantage = [172, 204];
const road = [144,32];
const lava = [160,32];
const darkFloor = [0,16];           //█
walls[LEFT] = [16,0];               //▌
walls[RIGHT] = [32,0];              //▐
walls[UP] = [48,0];                 //▀
walls[DOWN] = [64,0];               //▄
incorners[LEFT] = [];
incorners[LEFT][UP] = [80,0];       //╔
incorners[LEFT][DOWN] = [96,0];     //╚
incorners[RIGHT] = [];
incorners[RIGHT][UP] = [112,0];     //╗
incorners[RIGHT][DOWN] = [128,0];   //╝
outcorners[LEFT] = [];
outcorners[LEFT][UP] = [144,0];     //┌
outcorners[LEFT][DOWN] = [160,0];   //└
outcorners[RIGHT] = [];
outcorners[RIGHT][UP] = [176,0];    //┐
outcorners[RIGHT][DOWN] = [192,0];  //┘

const extraLifeThreshold = 10000;
// updateable GUI indicators
const uFields = ['lives', 'score', 'coins', 'level'];
const crossingMargins = [
	// <-> powePill off/on
	// ^v player/ceru
	[4.5  ,6],
	[1.5,0.5]
];
// list of potential locations for bars
const barred = {
	v: [],
	h: []
};
// future vantage points
const vants = [
	[{x:6,y:27}, {x:6,y:28}],
	[{x:13,y:8}, {x:14,y:8}]
];
Object.freeze(vants);

const keyboard = {
	pressSpace: false,
	pressCTRL: false,
	pressC: false,

	buttonsUp: false
};

// animation system
var requestID;
var animDivisor = 0;
var animFrame = 1;

var gSeed = 0;

// elements
var container = window.idCenter;
var startBtn = window.idStart;
var japariBtn = window.idJapari;
var leftPanel = window['left-panel'];
var canvas = window.idGame;
var shadowCtx = window.idShadow.getContext('2d');
var floorCtx = window.idFloor.getContext('2d');
var mapCtx = window.idMap.getContext('2d');
var context = canvas.getContext('2d');
var offscreenCtx = document.createElement('canvas').getContext('2d');
var ssCtx = document.createElement('canvas').getContext('2d');
var dotCtx = document.createElement('canvas').getContext('2d');
mapCtx.imageSmoothingEnabled= false;
context.fillStyle = "#000000";
context.imageSmoothingEnabled= true;
shadowCtx.imageSmoothingEnabled= true;
dotCtx.imageSmoothingEnabled= false;
ssCtx.imageSmoothingEnabled= false;
offscreenCtx.canvas.width = Width*shdScl;
offscreenCtx.canvas.height = Height*shdScl;
offscreenCtx.rect(1,0,offscreenCtx.canvas.width-2,offscreenCtx.canvas.height);
offscreenCtx.clip();
ssCtx.canvas.width = 8*120;
ssCtx.canvas.height = 8*4;
dotCtx.canvas.width = 8*Width;
dotCtx.canvas.height = 8*Height;

// events
var move = LEFT;
var messageTimer;
var display = [];

// entities
var Game = {
	japariMode: false,
	state: OVER,
	score: 0,
	level: 0,
	lives: 3,
	frame: 0,
	ceruMode: SCATTER,
	extrascore: 0,
	// speeds per level
	playerSpeed: [1.7, 1.9, 2.1, 2.0],
	ceruSpeed: [1.6, 1.7, 1.9, 2.0],
	coins: 0,
	enableLava: false,
	get scoreTo1Up() {return (this.score % extraLifeThreshold)/extraLifeThreshold},
	lq: false
};

var Player = {
	x: 0,
	y: 0,
	isStill: 1,
	multikill: 1
};

var Coin = {
	pos: [
		{x:13.5,y:17},
		{x:13.5,y:11}
	],
	get x(){return Coin.pos[Coin.which-1].x*16-2},
	get y(){return Coin.pos[Coin.which-1].y*16-2},
	showcounter: 0,
	which: 0,
	enableThird: false,
	score: (level) => {
		return Math.round(
			Math.max(
				Math.min(
					2.15*Math.pow(level,3) - 22.35*Math.pow(level,2) + 144.1*level - 34
					, 5000)
				, 100)
		)
	}
};
Object.defineProperty(Coin, 'score', {
	writable: false,
	configurable: false
});

var Ceru = [];
['red', 'pink', 'blue', 'orange'].forEach((name,i) => {
	Ceru.push(
		{
			name,
			x: 0,
			y: 0,
			olddirection: 0,
			direction: LEFT,
			state: HOMECOMING,
			powerpillTimer: 0,
			hometimer: 0,
			reverse: false,
			targetblk: {pos:{x:0,y:0}},
			get homeblk() {return window['findBlk']([25, 2, 867, 840][i])},
			get isEye() {return this.state === HOMECOMING && !this.hometimer},
			homedelay: 1+i/3
		}
	);
});
Object.defineProperty(Ceru, 'score', {
	value: 200,
	writable: false,
	configurable: false
});

var Summons = {
	Kaban: {
		disabled: true,
		active: false,
		count: 0,
		call: ()=>window.yoroshiku,
		leave: ()=>window.ikimasune,
		cooldown: 12*60,
		timer: 15*60,
		get blocked() {return this.cooldownT > 0 || !(Game.score >= this.price && Game.coins >= 1)},
		get hint() {
			if (this.active) {
				return "Kaban's wit: reveal the map for a while"
			}
			if (this.disabled) {
				return `You need ${this.pickup.name} for summoning`
			} else if (this.blocked) {
				return (this.cooldownT > 0) ? 'Wait till she rests' :
					(Game.score < this.price) ? 'Not enough points' :
						(Game.coins < 1) ? 'Not enough coins' : '';
			} else {
				return `Price: \n 1 Coin,\n ${this.price} points`;
			}
		},
		price: 800,

		pickup: {
			name: 'the hat',
			pos: [],
		    get x(){return this.pos[this.which].x*16-8},
		    get y(){return this.pos[this.which].y*16},
			which: 0,
			max: 1,
			sprt: [208,64],
			size: [32,16],
			score: 200,
			delay: 15*60,
			found: 0
		}
	},
	Serval: {
		disabled: true,
		active: false,
		count: 0,
		call: ()=>window.sugoi,
		leave: ()=>window.myamya,
		cooldown: 10*60,
		timer: null,
		get blocked() {return this.cooldownT > 0 || !(Game.score >= this.price && Game.coins >= 1)},
		get hint() {
			if (this.active) {
				return "Serval's strength: fight off one cerulean attack per japariman collected"
			}
			if (this.disabled) {
				return `You need ${this.pickup.name} for summoning`
			} else if (this.blocked) {
				return (this.cooldownT > 0) ? 'Wait till she rests' :
					(Game.score < this.price) ? 'Not enough points' :
						(Game.coins < 1) ? 'Not enough coins' : '';
			} else {
				return `Price: \n 1 Coin,\n ${this.price} points`;
			}
		},
		price: 800,

		pickup: {
			name: 'a japariman',
			pos: [],
			get x(){return this.pos[this.which].x*16-2},
			get y(){return this.pos[this.which].y*16-2},
			which: 0,
			max: 2,
			sprt: [192,64],
			size: [16,16],
			score: 100,
			delay: 12*60,
			found: 0
		}
	}
};

window.addEventListener("keydown", function (event) {
	switch (event.keyCode) {
		case KEYUP:
		case 'W'.charCodeAt(0):
			move = UP;
			event.preventDefault();
			break;
		case KEYDOWN:
		case 'S'.charCodeAt(0):
			move = DOWN;
			event.preventDefault();
			break;
		case KEYLEFT:
		case 'A'.charCodeAt(0):
			move = LEFT;
			event.preventDefault();
			break;
		case KEYRIGHT:
		case 'D'.charCodeAt(0):
			move = RIGHT;
			event.preventDefault();
			break;
		case KEYSPACE:
		case 96:    // Num.0
			keyboard.pressSpace = true;
			event.preventDefault();
			break;
		case KEYCTRL:
			keyboard.pressCTRL = true;
			break;
		case KEYC:
			keyboard.pressC = true;
			break;
		case '1'.charCodeAt(0):
		case '2'.charCodeAt(0):
		case 97:  //numpad
		case 98:
			summon(Object.keys(Summons)[event.key-1]);
			break;
	}
}, false);
window.addEventListener("keyup", function (event) {
	switch (event.keyCode) {
		case KEYSPACE:
		case 96:
			keyboard.pressSpace = false;
			break;
		case KEYCTRL:
			keyboard.pressCTRL = false;
			break;
		case KEYC:
			keyboard.pressC = false;
			break;
	}
}, false);

startBtn.onclick = function () {
	keyboard.pressSpace = !keyboard.pressSpace;

	requestAnimationFrame(()=> keyboard.pressSpace = !keyboard.pressSpace);
};

for (friend in Summons) {
	document.getElementById(friend).onclick = function(event) {
		summon(event.target.parentNode.id);
	}
}

japariBtn.onchange = function () {
	Game.japariMode = this.checked;
	window.leftSide.classList.toggle('slide');
	localStorage.japariMode = Game.japariMode;

	document.querySelector('img.japari').classList.toggle('hidden');
	document.querySelector('img.summons').classList.toggle('hidden');
	document.title = `${this.checked ? 'Japari' : ''} PARKMAN`;

	updateSGui(Summons, true);
};
japariBtn.checked = false;

window.idLq.onchange = function () {
	Game.lq = this.checked;
};
Game.lq = window.idLq.checked;


window.addEventListener('load', ()=>{
	window.youkoso.volume=0.35;
	window.youkoso.addEventListener("timeupdate", function() {
		if(this.currentTime >= 1.8 && !Game.japariMode) {
			this.pause();
		}
	});

	window.step.volume=0.0;
	window.step0.volume=0.0;
	window.step.play();  window.step0.play();
	window.sandstar.currentTime = 0.35;
	window.sandstar.volume = 0.3;
	window.sandstar0.volume = 0.3;
	window.setTimeout(()=>{
		window.step.volume=0.15;
		window.step0.volume=0.15;
	},1000);
	window.lava.volume=0.3;
	window.msg.volume=0.1;
	window.cerubreak.volume=0.2;
	window.chase.volume=0.3;
	window.coinda.volume=0.3;
	window.over.volume=0.35;
	window.kuso.volume=0.4;
	window.pill.volume=0.3;
	window.sugoi.volume=0.4;
	window.myamya.volume=0.4;
	window.ikimasune.volume=0.3;
	window.yoroshiku.volume=0.3;
	window.uh.volume=0.4;
	window.win.volume=0.4;

	if (localStorage.japariMode === 'true')
		japariBtn.click();
});

{
	let lastHeight;
	let delayed = false;

	window.onresize = function (){
		if (delayed) return;

		delayed = true;

		requestAnimationFrame(()=>{
			var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			if (width <= window.idGame.clientWidth + leftPanel.clientWidth*2) {
				leftPanel.style.marginLeft =
					Math.max(-leftPanel.clientWidth, (width - (window.idGame.clientWidth + leftPanel.clientWidth*2))/2) +'px';
			} else if (leftPanel.style.marginLeft != "0px") {
				leftPanel.style.marginLeft = 0;
			}

			if (height === lastHeight) {
				delayed = false;
				return;
			}

			container.style.width = `${Math.floor(height*canvas.width/canvas.height)}px`;
			lastHeight = height;
			delayed = false;
		});
	};

	let isBlink = (
		(!!window.chrome && !!window.chrome.webstore) ||        //is Chrome
		((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) //is chrOpera
	) && !!window.CSS;
	var isGecko = !isBlink && typeof InstallTrigger !== 'undefined';
}