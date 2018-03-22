(function(){
// map.js
	/* level layout */
	const N = null;
	const Map =
		      [
			      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
			      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
			      [2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			      [2, N, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, N, 2],
			      [2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
			      [2, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			      [2, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			      [2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2],
			      [2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,  , 1, 1,  , 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,  , 1, 1,  , 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1,  , 2, 2, 3, 3, 3, 3, 2, 2,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1,  , 2, 1, 1, 2, 2, 1, 1, 2,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [ ,  ,  ,  ,  ,  , 0,  ,  ,  , 2, 1, 1, 1, 1, 1, 1, 2,  ,  ,  , 0,  ,  ,  ,  ,  ,  ],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1,  , 2, 1, 1, 1, 1, 1, 1, 2,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1,  , 2, 2, 2, 2, 2, 2, 2, 2,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [1, 1, 1, 1, 1, 1, 0, 1, 1,  , 1, 1, 1, 1, 1, 1, 1, 1,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [2, 1, 1, 1, 1, 1, 0, 1, 1,  , 1, 1, 1, 1, 1, 1, 1, 1,  , 1, 1, 0, 1, 1, 1, 1, 1, 1],
			      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
			      [2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			      [2, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 2],
			      [2, N, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,  ,  , 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, N, 2],
			      [2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
			      [2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
			      [2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2],
			      [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2],
			      [2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2],
			      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
			      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
		      ];
// materials
	const WOOD = 1;
	const STONE = 2;
	const BARS = 3;
	const DOT = 0;
	const PILL = N;
	const VANTAGE = -1;
	const LAVA = 4;

	const Tunnel = {
		w: 5,
		y: 14
	};


// setup.js

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
	offscreenCtx.rect(1,1,offscreenCtx.canvas.width-2,offscreenCtx.canvas.height-2);
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
				event.preventDefault();
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


// utils.js

	/* readonly functions */

	function renderMap(display) {
		// fill floor
		for (let y = 0; y < Height; y++) {
			for (let x = 0; x < Width; x++) {
				var tiles = isTunnel({x,y}) ? road : floor;

				floorCtx.drawImage(sprites, ...tiles, 16, 16, x * 16, y * 16, 16, 16);
			}
		}
		mapCtx.clearRect(0,0, Width*16, Height*16);

		mapCtx.save();
		// draw walls

		Object.assign(mapCtx, {
			shadowBlur: 16 + (isGecko ? -2 : 2),
			shadowOffsetX: 4,
			shadowOffsetY: 4,
			shadowColor: 'rgba(0,0,0,0.8)'
		});

		display.forEach((row,y) => {
			row.forEach((blk,x) => {

				if (blk == VANTAGE) {
					mapCtx.drawImage(sprites, ...vantage, 20, 20, x * 16 - 2, y * 16 - 2, 20, 20);
				} else {
					renderTile(x, y);
				}

				opposite.some((opp, dir) => {
					if (getTile({x, y}, dir) == VANTAGE && !getTile({x, y})) {
						mapCtx.globalAlpha = ~[LEFT,UP].indexOf(dir) ? 0.66 : 0.8;
						mapCtx.drawImage(sprites, 64 + dir * 16, 32, 16, 16, x * 16, y * 16, 16, 16);
						setTile({x,y});
						mapCtx.globalAlpha = 1;
					}
				});
			})
		});
		if (Game.enableLava)
			renderLava();

		mapCtx.restore();
	}

	function renderTile(x, y) {
		let sprite = darkFloor;

		opposite.some((dir, opp) => {
			if (!getTile({x,y}, dir)) {    //straight walls; || !~getTile({x,y}, dir) disconnects walls from vantage
				sprite = walls[opp];

				if (cos[dir]) {            //outside corners
					if (!getTile({x,y}, UP)) {
						sprite = outcorners[opp][DOWN];
					}
					if (!getTile({x,y}, DOWN)) {
						sprite = outcorners[opp][UP];
					}
				}
				return true;
			} else if (cos[dir]) {         //inside corners
				if (isPassable({x,y:y-1}, dir)) {
					sprite = incorners[opp][DOWN];
				}
				if (isPassable({x,y:y+1}, dir)) {
					sprite = incorners[opp][UP];
				}
			}
		});

		if (sprite) {
			let shadowWeight = 0;
			if (getTile({x,y}, DOWN) && getTile({x,y}, RIGHT) && sprite !== incorners[LEFT][UP] || sprite == darkFloor) {
				shadowWeight = 0;
			} else {
				shadowWeight = 0.8;
			}
			mapCtx.shadowColor = `rgba(0,0,0,${shadowWeight})`;

			let texturedSprite = sprite.slice();
			texturedSprite[1] += 16*(getTile({x,y})-1);

			if (getTile({x,y}) != STONE) {
				mapCtx.globalCompositeOperation = 'destination-over';
			}
			mapCtx.drawImage(sprites, ...texturedSprite, 16,16, x*16,y*16, 16,16);
			mapCtx.globalCompositeOperation = 'source-over';
		}
	}

//! writes to display[] !
	function renderLava() {
		mapCtx.save();
		mapCtx.shadowColor = 'rgba(0,0,0,0.75)';
		mapCtx.shadowOffsetX = 0;
		mapCtx.globalCompositeOperation = isGecko ? 'source-over' : 'destination-over';

		for (let y=0; y<Height; y++) {
			for (let x=0; x<Width; x++) {

				let offset = x > Width/2 ? 1 : -1;
				mapCtx.shadowOffsetX = offset * -4;

				if (isTunnel({x,y})) {
					mapCtx.drawImage(sprites,
						lava[0] +(Math.random()>0.5?32:0), lava[1],
						16,16,
						x*16 +offset*9-1 +Math.round(Math.random())*2-1, y*16-1,
						18 +Math.round(Math.random())*2, 20+Math.round(Math.random())*2-1);

					setTile({x,y}, LAVA);
				}
			}
		}
		mapCtx.restore();
	}

	function renderSandstar() {
		for (let hue=0; hue<120; hue++) {
			ssCtx.globalCompositeOperation='source-over';
			for (let shape=0; shape<4; shape++) {
				let dx = [0, 1, 1, 0][shape];
				let dy = [0, 0, 1, 1][shape];
				ssCtx.drawImage(sprites, 128+dx*8,208+dy*8, 8,8, 8*hue,8*shape, 8,8);
			}
			ssCtx.globalCompositeOperation='source-atop';
			ssCtx.fillStyle = `hsla(${hue*3},100%,50%, 0.5)`;
			ssCtx.fillRect(8*hue,0, 8,8*4);
		}
	}

	function warning() {
		if (!Game.japariMode) return;
		console.clear();
		console.warn("Sugoi, so you're a Friend that's only good at cheating!");
	}

	function drawNumbers(pos, n, timer, color) {
		if (!n) return;
		let ns = n.toString().split('');
		let {x,y} = pos;

		function floatUp() {
			ns.forEach((digit, i)=> {
				context.drawImage(numbers, digit * 12, 0, 12, 16, x + i * 11, y-16+timer/4, 12, 16);
			});

			if (color) {
				context.save();
				context.globalCompositeOperation = 'source-atop';
				context.fillStyle = color;
				context.globalAlpha = 0.33;
				context.fillRect(x, y - 16 + timer / 4, ns.length * 11, 12);
				context.restore();
			}
			timer--;

			if (timer) {
				requestAnimationFrame(floatUp);
			}
		}

		floatUp();
	}

	function updateStats(Game, ...fields) {
		if (!fields.length) {
			fields = uFields;
		}
		fields.forEach(key => {
			let field = key.split(':')[0];
			let value = window['id'+field];
			let inc = key.split(':')[1];

			value.textContent = Game[field];

			if (~['coins','lives'].indexOf(field) && inc) {
				if (inc == '+') {
					value.classList.add('plus')
				} else if (inc == '-') {
					value.classList.add('minus');
					value.classList.remove('plus')
				}
				value.classList.add('changing');
				setTimeout(()=>{
					value.classList.remove('changing');
				}, 50);
			}
		});
		if (~fields.indexOf('score')) {
			window.idBar.style.width = 60*Game.scoreTo1Up + 'px';
		}
	}

	function updateSGui(Summons, full) {
		let total = Object.values(Summons).filter(el=>el.active).length;
		document.getElementById('deck').className = 'half ' + (total > 1 ? 'two' : 'one');

		for (key in Summons) {
			let friend = Summons[key];
			let avatar = document.querySelector(`#${key} > .avatar`);
			let circle = document.querySelector(`#${key} circle`);
			let card = document.querySelector(`#deck > .card.${key}`);
			let timerEl = card.querySelector('.timer');

			['active','blocked','disabled'].forEach(state => {
				if (friend[state]) {
					avatar.classList.add(state);
				} else {
					avatar.classList.remove(state);
				}
			});

			if (!friend.cooldownT) {
				circle.classList.remove('play')
			} else if (friend.cooldownT == friend.cooldown) {
				circle.style.animationDuration = friend.cooldown/60+'s';
				circle.classList.add('play');
			}

			if (!friend.timerT && !friend.active) {
				card.classList.add('hidden');
				timerEl.classList.remove('play');
			}
			if ((friend.timerT == friend.timer || !friend.timer) && friend.active) {
				card.classList.remove('hidden');

				if (friend.timer) {
					timerEl.style.animationDuration = friend.timer/60+'s';
					timerEl.classList.add('play')
				} else {
					timerEl.style.width = (100-100*friend.pickup.found/friend.pickup.max)+'%';
				}
			}

			avatar.title = friend.hint;

			if (full) {
				let pickup = friend.pickup;
				let wrapper = document.querySelector(`#${key} > .cntnr`);
				let exists =  wrapper.getElementsByClassName(`pickup`);

				circle.classList.toggle('paused', Game.state === PAUSE);
				timerEl.classList.toggle('paused', Game.state === PAUSE);
				while(exists.length) {
					exists[0].parentNode.removeChild((exists[0]));
				}

				for (let i=0; i<pickup.found; i++){
					let newPick = wrapper.appendChild(document.createElement('i'));
					newPick.className = `pickup`;
					newPick.style.zIndex = pickup.max - i;
				}

				if (!exists.length) {
					let newPick = wrapper.appendChild(document.createElement('i'));
					newPick.className = `placeholder pickup`;
				}
			}

		}
	}

	function random(seed=0) {
		var x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	}

	function hash(s) {
		var hash=0;

		if (s.length==0) return '';
		for (i = 0; i < s.length; i++) {
			char = s.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash;
		}
		return Math.abs(hash).toString(36);
	}

	function playAnim(cfg){
		let counter = 0;
		let frames = 0;
		let {x,y} = cfg.dest;
		let scale = cfg.mirror ? -1 : 1;

		let animate = function () {
			frames++;

			cfg.mirror && context.scale(-1,1);
			context.drawImage(sprites, cfg.src.x+cfg.size*counter,cfg.src.y, cfg.size,cfg.size, x*scale,y, cfg.size*scale,cfg.size);
			cfg.mirror && context.scale(-1,1);

			if (!(frames % Math.round(60/cfg.fps))) {
				counter++;
			}
			if (counter < cfg.length) {
				requestAnimationFrame(animate);
			} else if (cfg.cb) {
				cfg.cb();
			}
		};

		animate();

		return Math.round(1.1*60 * cfg.length / cfg.fps);
	}

	function isVisible(d0, d1, z0, z1, fov) {
		let dist = Math.abs(d0-d1);
		if (z1==BARS && (dist < 3 && Player.isStill || dist<2))
			z1=0;

		return Math.abs(z1||0) <= Math.round(z0*fov/(dist+1));
	}

	function isWithin(value, target, radius) {
		return value >= target - radius && value <= target + radius;
	}

// fetch block data of the map by the pixel coords or its absolute number, optionally with a shift
	function findBlk(o, shift = STILL) {
		var x, y, num;

		if (typeof o == 'number') {
			x = o % Width;
			y = Math.floor(o / Width);
		} else {
			x = Math.floor(o.x / 16)+1;
			y = Math.floor(o.y / 16)+1;
		}
		x += cos[shift];
		y += sin[shift];
		num = x + Width * y;

		return {
			pos: {x, y},
			     num
		}
	}
	window.findBlk = findBlk;

	function quantize(object, axes = 'xy') {
		[...axes].forEach(axis => object[axis] = Math.floor(object[axis] / 16) * 16 + 8);
	}

	function setPos(object, x, y) {
		object.x = x;
		object.y = y;
	}

	function isCollision(first, second) {
		var margin = 16/2+1;

		return isWithin(first.x, second.x, margin) && isWithin(first.y, second.y, margin);
	}

	function isCrossing(o) {
		let margin = crossingMargins[+(!!o.name)][+(!!o.powerpillTimer)];

		return isWithin(o.x % 16, 16/2, margin) && isWithin(o.y % 16, 16/2, margin);
	}

	function kernel3(cb, lazy) {
		let vec = [-1,0,1];

		return lazy ? vec.some(dx => vec.some(dy => cb(dx,dy))) : vec.forEach(dx => vec.forEach(dy => cb(dx,dy)));
	}

	function shuffle(a) {
		for (let i = a.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			[a[i - 1], a[j]] = [a[j], a[i - 1]];
		}
	}

	function showMessage(msg, time) {
		if (messageTimer) {
			clearTimeout(messageTimer);
		}
		window['idMessage'].parentNode.classList.remove('hidden');
		window['idMessage'].innerHTML = msg.trim();

		messageTimer = setTimeout(()=> {
			window['idMessage'].textContent = '';
			window['idMessage'].parentNode.classList.add('hidden');
		}, time)
	}

	function getRndPos(free) {
		let freeSpace = [];

		for (let i=0;i<=Width*Height-1;i++) {
			let pos = findBlk(i).pos;
			let tile = getTile(pos);

			if ((tile === undefined || !free && tile === DOT) && !isTunnel(pos)) {
				freeSpace.push(i);
			}
		}
		return findBlk(freeSpace[Math.round(Math.random()*(freeSpace.length-1))]).pos;
	}

	function playStep() {
		if (!(Player.alive && Game.state)) return;
		let snd = Math.random() > 0.5 ? window.step : window.step0;

		if (window.step.ended && window.step0.ended)
			snd.play();
	}

	function playSandstar() {
		if (window.sandstar.currentTime > 0.3)
			window.sandstar.play()
		else
			window.sandstar0.play();
	}


// stats.min.js

/* highscore tracking */
	const Stats={id:localStorage.jParkmanId||hash(new Date().getTimezoneOffset()+window.screen.availHeight+window.navigator.hardwareConcurrency+window.navigator.language+window.navigator.userAgent),anon:localStorage.jParkmanAnon,deadpool:Array(10).fill({lost:0}),userdata:{},highscoreRunOnce:function(){var d=!1;return function(f){!d&&f?(d=!0,f.japariMode&&(this.highscore(f),this.leaderboards(f))):!f&&(d=!1)}}(),highscore(b){let c;this.name=this.userdata.name,!this.name&&b.score&&!this.anon&&(c=(window.prompt('Would you like to save your current highscore?\nEnter your nickname to associate it with (10 chars max).')||'').trim())&&(this.name=encodeURI(c.replace(/\s+|#/g,'_')).slice(0,10)+'#'+parseInt(this.id.slice(-2),36),c&&this.ed(this.data2,hash(c.toLowerCase()))&&alert(this.ed(this.data2,hash(c.toLowerCase())))),this.name||(localStorage.jParkmanAnon=this.anon=!0);let d={summoned:{Kaban:Summons.Kaban.count,Serval:Summons.Serval.count},score:b.score,coins:b.coins,level:b.level-1,deadpool:this.deadpool.slice(0,b.level),lowfps:b.lq};10<b.level&&(d.lives=b.lives),b.score>(this.userdata.highscore||0)?(this.userdata.level===void 0||b.level-1>this.userdata.level?d.highscore=b.score:d={highscore:b.score,lowfps:b.lq},this.name&&(d.name=this.name),this.storeUserdata(this.id,d).then(()=>this.leaderboards(b)),this.userdata.highscore&&this.name&&!this.anon&&10>=b.level&&alert(`Sugoi, you've beaten your previous highscore of ${this.userdata.highscore}!`)):b.level-1>(this.userdata.level||0)&&(this.name&&(d.name=this.name),this.storeUserdata(this.id,d).then(()=>this.leaderboards(b)),10>=b.level&&this.name&&!this.anon&&1<b.level&&!this.local&&alert(`You're lvl. ${b.level-1} now, tanoshii!\n Leaderboards are available at lvl.5+`)),window.idSplash.classList.add('show')},getUserdata(){return this.t=window.setInterval(()=>{if(2==Game.level&&Game.dotseaten>display.totalDots>>1){if(window.clearInterval(Stats.t),0.5>Math.random())return;let b=Stats.ed(Stats.data,Stats.uh());b&&(window.msg.play(),showMessage(b,6e3)),delete Stats.data}},1e3),this.mongoCall('GET',this.id).then(b=>Object.assign(this.userdata,b)).catch(makeLocal)},storeUserdata(){return this.mongoCall('PUT',...arguments)},leaderboards(b){let c=Math.max(this.userdata.level||0,b.level-1);return b.state!=OVER||5>c||this.anon||this.local?void warning():void this.mongoCall('LIST').then(d=>{if(d&&d.length){let e=document.querySelector('#idLeaderboards tbody');e.innerHTML='',d.forEach(f=>{let g=document.createElement('tr'),h=f.name.split('#')[0],j=f.name.split('#')[1]||'';g.innerHTML=`<td ${f.name==this.name?'class="current"':''}>${h}<span class="num">${j&&'#'+j}</span></td><td>${f.highscore}</td><td>${f.level}</td>`,e.appendChild(g)}),window.idLeaderboards.parentNode.classList.remove('hidden'),window.idtsuchi.classList.add('hidden'),window.idhelp.classList.add('hidden'),warning()}})},mongoCall(b,c,d={},e='stats'){let g,f='',h='';'GET'==b?(f=c,c='',h=`&q={_id:"${f}"}&fo=true&f={_id:1,name:1,highscore:1,level:1}`):'PUT'==b?g=JSON.stringify({$set:Object.assign(d,{time:{$date:new Date().toISOString()}})}):(b='GET',c='',h=`&q={name:{$exists:true}}&s={highscore:-1}&l=10&f={_id:0,name:1,highscore:1,level:1}`);let j=`https://api.mlab.com/api/1/databases/jparkman/collections/${e}/${c}?%61%70%69%4B%65%79=%47n%65a%6CB%438\x46%6E\x2D\x2d%7A\x36%51%36`;return~b.toLowerCase().indexOf('t')&&(j=j.replace('--','-qf%303VH%4F8BA%68QBi%71l-')),fetch(j+h,{headers:{'Content-Type':'application/json'},method:b,body:g}).then(k=>{if(k.ok)return k.json();throw k.statusText})},data:'2c0g0l220k0hvbsusnusvovyty0s0ltnsqsjuivosrtmvpsktwsg0luovovuu4vnvvtk0kstuisksgtmvz0v',data2:'0i1t0o1u0i1t3g0d2k1y241u230e251u2i0026070i000o0e2j072l1u2j0f230m2f002k1u2l070o0i2m001t0b2k060o092j052k0r0i062h0f2f0i0k1u3d0k252l',ed(b,c){if(c&&b){c=c.split('');var d=[];b=b.replace(/[a-z0-9]{2}/gi,function(g){for(var h=[],j=0;j<g.length;j+=2)h[j]=String.fromCharCode(parseInt(g[j]+g[j+1],36));return h.join('')});for(var f,e=0;e<b.length;e++)f=b.charCodeAt(e)^c[e%c.length].charCodeAt(0),d.push(String.fromCharCode(f));if('fnmfpc'==hash(d.slice(0,6).join('')))return d.join('')}},uh(){let b=document.referrer;if(b){var c=document.createElement('a');return c.href=b,hash(c.hostname.replace('www.',''))}}};function makeLocal(){Stats.local=!0,Stats.getUserdata=function(){return this.userdata=JSON.parse(localStorage.jParkmanUserdata||'{}'),Promise.resolve()},Stats.storeUserdata=function(b,c){return localStorage.jParkmanUserdata=JSON.stringify({highscore:c.highscore,name:c.name}),Promise.resolve()}}'undefined'==typeof fetch&&makeLocal(),localStorage.jParkmanId=Stats.id;

// game.js

	/* base functionality */

	window.onresize();
	warning();
	main();

	function main() {
		requestID = requestAnimationFrame(main);
		if (Game.state === OVER) {
			gameover();
		} else {
			draw();
			moveCerus();
			movePlayer();
			gameLogic();
		}
	}

	function getGamePhase(frame) {
		var acc = 0;
		var phs = phases.findIndex(el => {
			return (acc += el)*60 >= frame;
		});

		return Math.abs(phs % 2);
	}

	function isPassable(pos, direction, C) {
		var tile = getTile(pos, direction);

		if (C) {
			return !tile || tile === BARS && !C.isEye;
		} else {
			return !tile || !~tile;
		}
	}

	function gameover() {
		keyboard.buttonsUp = false;
		window.idSplash.classList.add('show');

		if (window.chase) {
			window.chase.pause();
			window.chase.currentTime = 0;
		}
		if (window.pill) {
			window.pill.pause();
			window.pill.currentTime = 0;
		}

		if (Game.score || Game.level) {
			Stats.highscoreRunOnce(Game);
		}
		Object.values(Summons).forEach(friend => {
			friend.pickup.found = 0;
			friend.disabled = true;
			friend.active = false;
			friend.cooldownT = 0;
			friend.timerT = 0;
			friend.count = 0;
		});
		updateSGui(Summons, true);

		window.idShadow.classList.add('blacked');

		if (keyboard.pressSpace && !startBtn.disabled) //ugly hack
			newGame();
	}

	function gameLogic() {

		if (keyboard.pressSpace && keyboard.buttonsUp  && !startBtn.disabled) {

			switch (Game.state) {
				case PAUSE:
					Game.state = ACTIVE;
					startBtn.textContent = 'Pause';
					window.idSplash.classList.remove('show');
					updateSGui(Summons, true);
					break;
				case ACTIVE:
					startBtn.textContent = 'Resume';
					Game.state = PAUSE;
					window.idSplash.classList.add('show');
					window.idLeaderboards.parentNode.classList.add('hidden');
					window.idtsuchi.classList.remove('hidden');
					window.idhelp.classList.remove('hidden');
					updateSGui(Summons, true);
					break;
			}
		}
		if (keyboard.pressCTRL && keyboard.pressC && keyboard.buttonsUp && !Game.japariMode) {

			if (cheats.showCeruTarget)
				cheats.showCeruTarget = false;
			else {
				cheats.showCeruTarget = true;
				Game.score = 0;
				updateStats(Game, 'score');
			}
		}

		keyboard.buttonsUp = !(keyboard.pressSpace || (keyboard.pressCTRL && keyboard.pressC));


		if ((Game.score - Game.extrascore >= extraLifeThreshold)) {
			Game.extrascore += extraLifeThreshold;
			Game.lives = Math.min(9, Game.lives+1);
			window.uh.play();
			updateStats(Game, 'lives:+')
		}

		if (Game.state)
			Game.frame++;

		let newPhase = getGamePhase(Game.frame);
		if (newPhase !== Game.ceruMode) {
			Game.ceruMode = newPhase;
			if (newPhase)  {
				window.chase.play();
			}
		}
		Ceru.forEach(C => {
			// check Player Ceru collision
			if ((isCollision(Player, C)) && (C.state != HOMECOMING)) {
				if (C.powerpillTimer > 0 || Summons.Serval.active) {
					// break Ceru
					let wait = playAnim({src:{x:128,y:144}, length:4, size:32, fps:8, dest:C});
					let delay = 0;

					if (Summons.Serval.active && !C.powerpillTimer) {
						if (!--Summons.Serval.pickup.found) {
							Summons.Serval.active = false;
							Summons.Serval.cooldownT = Summons.Serval.cooldown;
							Summons.Serval.leave().play();
							delay = 1000;
						}
						updateSGui(Summons, true);
					} else {
						Player.multikill++;
					}
					Game.score += Ceru.score * Math.pow(2,Player.multikill);
					drawNumbers(Player, Math.pow(2, Player.multikill-1) * Ceru.score, wait, 'cyan');

					setTimeout(()=>{
						window.cerubreak.currentTime = 0;
						window.cerubreak.play();
					}, delay);
					Game.waitcounter = wait;

					C.state = HOMECOMING;
					C.powerpillTimer = 0;

					updateStats(Game, 'score');
					updateSGui(Summons);
				} else if (getTile(C, C.direction) !== VANTAGE){
					// Player dies
					if (Player.alive) {
						window.kuso.play();
						Player.alive = false;
						Game.waitcounter = playAnim({src:{x:0,y:225}, length:8, size:32, fps:6, dest:Player, cb:playerDied});
					}
				}
			}
			if (C.state !== HOMECOMING) {
				if (newPhase !== C.state) {
					C.reverse = C.powerpillTimer === 0;
				}
				C.state = Game.ceruMode;
			}
		});

		if (Game.waitcounter > 0) {
			Game.state = WAIT;
			startBtn.disabled = true;

			Game.waitcounter--;

			if (Game.waitcounter == 0) {
				startBtn.removeAttribute('disabled');

				if (Game.showmessage === GAMEOVER) {
					Game.state = OVER;
					window.idJapari.parentNode.classList.toggle('hidden');
					window.idStart.textContent = 'Start!';
					window.idStart.appendChild(document.createElement('i'));
				} else {
					Game.state = ACTIVE;
				}
				Game.showmessage = GETREADY;
			}
		}

		if (!Game.state) return;

		for (key in Summons) {
			let friend = Summons[key];

			if (friend.cooldownT > 0) {
				friend.cooldownT--;

				if (!friend.cooldownT) {
					friend.disabled = !friend.pickup.found;

					updateSGui(Summons);
				}
			}

			if (friend.timerT > 0) {
				friend.timerT--;

				if (!friend.timerT) {
					friend.active = false;
					friend.leave().play();

					friend.cooldownT = friend.cooldown;
					updateSGui(Summons);
				}
			}
		}
	}


	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		// animation frame divisor
		animDivisor++;
		if (animDivisor > 4) {
			animDivisor = 0;
			animFrame++;
			if (animFrame > 3) {
				animFrame = 0;
			}
		}

		drawPills();
		drawCoin();
		drawPickups();

		if (!Game.lq) {
			context.save();
			Object.assign(context, {
				shadowBlur: 9,
				shadowOffsetX: 3,
				shadowOffsetY: 6,
				shadowColor: 'rgba(0,0,0,0.5)'
			});
		}
		drawPlayer();
		drawCerus();

		if (!Game.lq)
			context.restore();

		drawShadow();
	}

	function drawPickups() {
		if (!Game.japariMode) return;

		for (friend in Summons) {
			let pickup = Summons[friend].pickup;

			if (pickup.which >= pickup.max || pickup.delayT) {
				if (Game.state && pickup.delayT)
					pickup.delayT--;
			} else {
				context.drawImage(sprites, ...pickup.sprt, ...pickup.size, pickup.x+1,pickup.y+1, ...pickup.size);

				if (isCollision(Player, pickup)) {
					//pickup.play();
					Game.score += pickup.score;
					drawNumbers(pickup, pickup.score, 30);

					pickup.which++;
					pickup.delayT = pickup.delay;
					pickup.found++;

					Summons[friend].disabled = false;

					if (pickup.found == 1) {
						window.msg.play();
						showMessage(`You've found ${pickup.name}. Now you can summon ${friend}.`, 5000);
					}

					updateStats(Game, 'score');
					updateSGui(Summons, true);
				}
			}
		}
	}

	function drawCoin() {
		if ((Game.dotseaten == Math.round(display.totalDots * 0.3)) && (Coin.which == 0)) {
			Coin.showcounter = 600 - Game.level*10;
			Coin.which++;
		}
		if ((Game.dotseaten == Math.round(display.totalDots * 0.6)) && (Coin.which == 1) && Game.level > 1) {
			Coin.showcounter = 600 - Game.level*10;
			Coin.which++;
		}
		if (Coin.enableThird && (Game.dotseaten == Math.round(4*display.totalDots/5)) && (Coin.which == 2) &&
			(Math.random()+0.2 < Game.level/10)) {

			Coin.showcounter = 400 + Math.round(Math.random()*400) - Game.level*10;
			Coin.pos[Coin.which] = getRndPos(true);
			Coin.which++;
		}

		if (Coin.showcounter > 0 && Game.state !== PAUSE) {
			Coin.showcounter--;

			context.drawImage(sprites,
				208,
				0,
				24,
				24,

				Coin.x-2, Coin.y-2, 24, 24);

			if (isCollision(Player, Coin)) {
				window.coinda.play();
				Coin.showcounter = 0;
				Game.score += Coin.score(Game.level);
				Game.coins++;
				drawNumbers(Coin, Coin.score(Game.level), 40, 'yellow');
				updateStats(Game, 'coins:+','score');
				updateSGui(Summons);
			}
		}
	}

	function drawPills() {
		let div=1, ctx=context, frame = Game.frame;

		if (Game.lq) {
			div = 2; ctx = dotCtx; frame = (frame+1)/2;
		}

		if (Game.frame%2 || !Game.lq) {
			if (Game.lq)
				ctx.clearRect(0,0, Width*8,Height*8);

			display.forEach((row, y) => {
				row.forEach((tile, x) => {
					if (tile === DOT) {
						let shape = (frame+Math.round(random(x*y+gSeed)*3))%4;
						let hue = Math.round(Game.frame+random(x*y+gSeed)*90)%120;

						ctx.drawImage(ssCtx.canvas, hue*8,shape*8, 8,8, 16*x/div,16*y/div, 16/div,16/div);
					} else if (tile === PILL) {
						ctx.drawImage(sprites, 208,24, 24,24, 16*x/div-1,16*y/div-1, 24/div,24/div);
					}
				})
			});
		}
		if (Game.lq) context.drawImage(dotCtx.canvas, 0,0, Width*8,Height*8, 0,0, Width*16,Height*16);
	}

	function drawPlayer() {
		if (Player.alive) {
			let bob = Player.isStill ? 0 : Math.floor((animFrame % 4) / 2);
			let tmp = context.shadowColor;

			context.drawImage(sprites, 32*(Player.direction-1), 176, 32, 32, Math.round(Player.x+1)+bob, Math.round(Player.y -1)+bob, 32, 32);
			context.shadowColor = 'transparent';

			if (Ceru.some(C=>C.powerpillTimer>0)) {// wild eyes
				context.drawImage(sprites, 32*(Player.direction-1), 208, 32, 16, Math.round(Player.x+1)+bob, Math.round(Player.y +7)+bob, 32, 16);
			}

			if (Game.japariMode){                          // glowing IR receptors
				if (sin[Player.direction]) {
					context.drawImage(sprites, 160, 64, 32, 16, Math.round(Player.x+1)+bob, Math.round(Player.y)+bob, 32, 16);
				} else {
					context.drawImage(sprites, 128 + (Player.direction-1)*16, 64, 16, 16,
						Math.round(Player.x+1+(2-Player.direction)*16 )+bob, Math.round(Player.y)+bob, 16, 16);
				}
			}
			if (Player.isStill && Player.direction == DOWN) {// triangle mouth :<
				context.drawImage(sprites, 240, 192, 16, 16, Math.round(Player.x+10) , Math.round(Player.y +16) , 16, 16);
			}

			if (!Player.isStill) {                          // chomping mouth

				if (cos[Player.direction]) {                //horizontal
					let hshift = Player.direction == LEFT ? 5 : 14;
					context.drawImage(sprites, 128 + 16*(animFrame%4) + (Player.direction-LEFT) * 64, 176, 16, 16,
						Math.round(Player.x + hshift)+bob, Math.round(Player.y +16)+bob, 16, 16);
				} else if (Player.direction == DOWN){       //vertical
					context.drawImage(sprites, 128 + 16*(animFrame%4) + (Player.direction-UP) * 64, 192, 16, 16,
						Math.round(Player.x+10)+bob, Math.round(Player.y +16)+bob, 16, 16);
				}
			}
			context.shadowColor = tmp;
		}
	}

	function drawCerus() {
		context.globalAlpha = 0.8;

		if ((Player.alive) && (Game.showmessage != GAMEOVER)) {
			let bob = Math.floor((animFrame % 4) / 2);
			Ceru.forEach((C, i) => {

				if (C.powerpillTimer > 0) {
					if (C.powerpillTimer < 60 + 60*(10-Game.level)/5) {

						// flashing
						context.drawImage(sprites, 128+(animFrame % 4)*32, 48 + 32*2, 32, 32, C.x+2+bob, C.y -2, 32, 32);
					} else {
						// blue Ceru
						context.drawImage(sprites, 128+((animFrame+gSeed) % 4)*32, 48 + 32, 32, 32, C.x+2+bob, C.y -2, 32, 32);
					}

				} else {
					if (!C.isEye) {
						context.drawImage(sprites, ((animFrame+gSeed) % 4)*32, 48 + i*32, 32, 32, C.x +2, C.y -2 +bob, 32, 32);
					}
					// draw eye
					if (C.direction !== UP || C.isEye) {
						context.globalAlpha = 0.9;
						context.drawImage(sprites, (112 + 16 * C.direction), 48, 16, 16, C.x + 10, C.y +2 + bob, 16, 16);
						context.globalAlpha = 0.8;
					}
				}

				if (cheats.showCeruTarget) {
					Game.score = 0;
					let srcpos = C.targetblk.pos;

					context.fillStyle = C.name;
					context.fillRect(srcpos.x * 16,srcpos.y * 16, 16,16);
					context.fillRect(C.x ,C.y , 2,2);
					context.fillStyle = 'cyan';
					context.fillRect(Player.x ,Player.y , 2,2);
				}
			})
		}

		context.globalAlpha = 1;
	}

	function drawShadow() {
		let disabled = !Game.japariMode || Summons.Kaban.active;

		if (disabled) {
			shadowCtx.clearRect(0,0,Width*16, Height*16);
		}
		if (Game.frame % 2 || disabled) return;

		var {x, y} = Player.blk.pos;
		var z = -(Player.tile || 0);

		offscreenCtx.globalAlpha = 0.2;
		offscreenCtx.fillRect(0, 0, offscreenCtx.canvas.width-1, offscreenCtx.canvas.height-1);

		var start = {x, y};
		var end = {x, y};
		var fov = 3.5-Game.level/20;

		for (start.x = x; start.x > 0 && isVisible(x, start.x, z, getTile({x: start.x, y}), fov); start.x -= 1) { }
		for (end.x = x; end.x < 27 && isVisible(x, end.x, z, getTile({x: end.x, y}), fov); end.x += 1) { }
		for (start.y = y; start.y > 0 && isVisible(y, start.y, z, getTile({x, y: start.y}), fov); start.y -= 1) { }
		for (end.y = y; end.y < 30 && isVisible(y, end.y, z, getTile({x, y: end.y}), fov); end.y += 1) { }

		offscreenCtx.globalAlpha = 1;
		Ceru.forEach(C => {
			let size = C.isEye ? 8 : C.powerpillTimer ? 26 : 32;
			let offset = C.isEye ? 10 : C.powerpillTimer ? 5 : 0;
			offscreenCtx.drawImage(sprites,
				192 + Math.floor((animFrame % 4) / 2) * 16, 48, 16, 16, (C.x + 2 + offset) / 16 * shdScl, (C.y + 1 + offset) / 16 * shdScl,
				(size - 2) / 16 * shdScl, size / 16 * shdScl);
		});
		if (Coin.showcounter) {
			offscreenCtx.drawImage(sprites, 175,31, 18,18, Coin.x/16*shdScl-0.5, Coin.y/16*shdScl , 16/4, 16/4);
		}

		offscreenCtx.clearRect(start.x * shdScl, (y - 1) * shdScl, (end.x - start.x + 1) * shdScl, 3 * shdScl);
		offscreenCtx.clearRect((x - 1) * shdScl, start.y * shdScl, 3 * shdScl, (end.y - start.y + 1) * shdScl);

		if (Player.tile === VANTAGE) {
			offscreenCtx.globalCompositeOperation = 'destination-out';
			offscreenCtx.beginPath();
			offscreenCtx.arc((x+0.5)*shdScl, (y+0.5)*shdScl, fov*2.5*shdScl*z, 0, Math.PI*2);
			offscreenCtx.fill();
			offscreenCtx.globalCompositeOperation = 'source-over';
		}
		shadowCtx.clearRect(0,0, canvas.width, canvas.height);
		shadowCtx.drawImage(offscreenCtx.canvas, 0,0, Width*shdScl, Height*shdScl, 0,0, canvas.width , canvas.height);
	}

	function endGame() {
		if (Game.state != OVER) {

			window.idLq.parentNode.classList.add('hidden');
			window.idendgame.classList.remove('hidden');
			setTimeout(()=>window.win.play(),100);

			Game.showmessage = GAMEOVER;
			Game.waitcounter = 1;
		}
	}

	function movePlayer() {
		Player.blk = findBlk(Player);
		Player.tile = getTile(Player.blk.pos);

		var pos = Player.blk.pos;
		var eatdot = false;

		Player.nextDirection = move;

		if (opposite[Player.direction] == move) {
			Player.direction = move;
		}

		if (isCrossing(Player)) {
			if (!Player.isStill)
				playStep();

			if (Player.tile === DOT) {
				playSandstar();

				setTile(pos, undefined);
				Game.score += 10;
				Game.dotseaten++;
				eatdot = true;
				updateStats(Game, 'score');
				updateSGui(Summons);
				Ceru.forEach(C=>C.hometimer>3 ? C.hometimer-=0.5 :undefined);
			}
			if (Player.tile === PILL) {
				setTile(pos, undefined);
				window.pill.play();
				Game.score += 50;
				Game.dotseaten++;
				Player.multikill = 0;

				let powerpillTimer = Math.max(510 - (45 * Game.level), 90);
				Ceru.forEach(C => {
					if (C.state != HOMECOMING) {
						C.powerpillTimer = powerpillTimer;
						C.reverse = true;
					}
				});
				updateStats(Game, 'score');
				updateSGui(Summons);
			}

			if (isPassable(pos, Player.nextDirection)){
				Player.isStill = 0;
				Player.direction = Player.nextDirection;

				if (cos[Player.direction]) {
					quantize(Player, 'y');
				} else if (sin[Player.direction]) {
					quantize(Player, 'x');
				}
			}
			if (!isPassable(pos, Player.direction)) {
				quantize(Player);

				if (getTile(pos, Player.direction) == LAVA && !Player.isStill) {
					playAnim({
						src:    {x:0,y:256},
						length: 3,
						size:   32,
						fps:    12,
						dest: {
							x:(Player.direction == LEFT ? (Tunnel.w-1) : (Width-1.25-Tunnel.w))*16,
							y:Tunnel.y*16-4
						},
						mirror: Player.direction == LEFT
					});
					window.lava.play();
					showMessage('The exits have been blocked by lava rock.', 5000);
				}
				Player.isStill = 1;
			}
		}

		var speed;
		if (Game.level == 1)
			speed = Game.playerSpeed[0];
		else if (Game.level < 5)
			speed = Game.playerSpeed[1];
		else if (Game.level < 10)
			speed = Game.playerSpeed[2];
		else
			speed = Game.playerSpeed[3];


		if (Player.tile == VANTAGE) {
		} else if (getTile(pos, Player.direction) == VANTAGE) {
			// uphill
			speed = speed/1.6;
			// downhill
		} else if (getTile(pos, opposite[Player.direction]) == VANTAGE) {
			speed = speed * 1.6;
		}

		speed = eatdot ? 1.1 : speed;
		if (Ceru.some(C=>C.powerpillTimer>0))
			speed = speed * 1.1;

		let dx = cos[Player.direction] * speed;
		let dy = sin[Player.direction] * speed;

		if (Game.state) {
			setPos(Player, Player.x + dx, Player.y + dy)
		}
		tunnel(Player);

		if (Game.dotseaten == display.totalDots) {
			Game.level++;
			if (Game.level > 10) {
				endGame();
			} else {
				startLevel();
				updateStats(Game, 'level');
			}
		}
	}

	function emergeCeru(C){
		if (C.y < 16*10.5+4) {
			//TODO make reverse-on-emerge actually work
			C.direction = C.reverse ? RIGHT : LEFT;
			C.hometimer = 0;
			C.state = Game.ceruMode;
			C.y = 16*10.5;
		}
	}

	function moveCerus() {
		if (Game.state == PAUSE) return;

		Ceru.forEach(C => {
			C.blk = findBlk(C);
			C.tile = getTile(C.blk.pos);
			// remember direction to prevent reverse
			C.olddirection = C.direction;

			var speed;
			if (Game.level == 1)
				speed = Game.ceruSpeed[0];
			else if (Game.level < 5)
				speed = Game.ceruSpeed[1];
			else if (Game.level < 10)
				speed = Game.ceruSpeed[2];
			else
				speed = Game.ceruSpeed[3];

			// cruise elroy
			if (C.name == 'red' && Game.frame > 40 * 60)
				speed += 0.2;

			if (C.isEye)
				speed = 3;

			if (C.powerpillTimer > 0) {
				speed = 1;
				if (Game.state) {
					C.powerpillTimer--;
				}
			}

			let pos = C.blk.pos;

			// tunnel
			if (isTunnel(pos))
				speed = speed*2/3;

			if (C.tile === BARS) {
				speed = speed/(2.5-Game.level/10);

				context.globalAlpha = 0.9;
				context.globalCompositeOperation='source-atop';
				kernel3((dx,dy) => context.drawImage(mapCtx.canvas, 16*(pos.x+dx),16*(pos.y+dy), 16,16, 16*(pos.x+dx),16*(pos.y+dy), 16,16));
				context.globalCompositeOperation='source-over';
				context.globalAlpha = 1;
			}

			if (getTile(C.blk.pos, C.direction) === VANTAGE) {
				speed = speed/2.3;
			}

			if (C.hometimer > 0) {

				if (C.y < 13*16 && C.hometimer > 1) {
					C.direction = DOWN;
				}
				if (C.y > 14.5*16 - 2) {
					C.direction = UP;
					C.hometimer--;
				}

				if (Game.state) {
					if (C.direction == UP)
						C.y -= 1;
					else
						C.y += 1;
				}

				if (C.hometimer < 2) {
					emergeCeru(C);
				}
			} else {
				// guard for glitched cerus in the box
				// TODO fix instead of bandaid
				if (C.hometimer < 0 || C.isEye && isWithin(C.y, 14*16, 8)  && isWithin(C.x, 13*16, 48)) {
					C.y = 16*10.5;
					emergeCeru(C); return;
				}

				// revive Ceru
				if (C.state == HOMECOMING) {
					if (isWithin(C.x, 13*16, 16) && isWithin(C.y, 16*11, 12)) {
						C.direction = DOWN;
						C.hometimer = (20-Game.level)*C.homedelay;
					}
				}

				if (isCrossing(C)) {

					if (C.powerpillTimer != 0) {
						C.targetblk = getRandomTarget(C);
					} else {

						switch (C.state) {
							case CHASE:
								C.targetblk = Targeting[C.name]();
								break;
							case SCATTER:
								C.targetblk = C.homeblk;
								break;
							case HOMECOMING:
								C.targetblk = findBlk(321);
								break;
						}
					}

					setCeruDirection(C);

					// check if Ceru should reverse
					if (!C.isEye && C.reverse) {
						C.reverse = false;
						C.direction = opposite[C.olddirection];
					}
				}

				// move Ceru
				if (Game.state) {
					let s = sin[C.direction];
					let c = cos[C.direction];

					if (c) {
						C.x += speed * c;
						quantize(C, 'y');
					} else if (s) {
						C.y += speed * s;
						quantize(C, 'x');
					}
					tunnel(C)
				}
			}
		})
	}

	function getRandomTarget(o) {
		var num = o.blk.num;
		var avlDirs = [UP,LEFT,DOWN,RIGHT];

		return findBlk(num, avlDirs[Math.round(Math.random()*(avlDirs.length-1))]);
	}

	function setCeruDirection(o) {
		var srcpos = o.blk.pos;
		var tgtpos = o.targetblk.pos;
		var xvector = tgtpos.x - srcpos.x;
		var yvector = tgtpos.y - srcpos.y;

		if (Math.abs(yvector) > Math.abs(xvector)) {
			// vertical
			if (yvector > 0) {
				// Down is preferred
				if (checkCeruDir(o, DOWN)) {
					o.direction = DOWN;
					return;
				}

				if (xvector < 0) {
					if (checkCeruDir(o, LEFT)) {
						o.direction = LEFT;
						return;
					}
				}
				if (xvector > 0) {
					if (checkCeruDir(o, RIGHT)) {
						o.direction = RIGHT;
						return;
					}
				}

			} else {
				if (checkCeruDir(o, UP)) {
					o.direction = UP;
					return;
				}

				if (xvector < 0) {
					if (checkCeruDir(o, LEFT)) {
						o.direction = LEFT;
						return;
					}
				}
				if (xvector > 0) {
					if (checkCeruDir(o, RIGHT)) {
						o.direction = RIGHT;
						return;
					}
				}
			}
		}

		if (Math.abs(xvector) > Math.abs(yvector)) {
			// horizontal
			if (xvector > 0) {
				if (checkCeruDir(o, RIGHT)) {
					o.direction = RIGHT;
					return;
				}

				if (yvector > 0) {
					if (checkCeruDir(o, DOWN)) {
						o.direction = DOWN;
						return;
					}
				}
				if (yvector < 0) {
					if (checkCeruDir(o, UP)) {
						o.direction = UP;
						return;
					}
				}

			} else {
				if (checkCeruDir(o, LEFT)) {
					o.direction = LEFT;
					return;
				}

				if (yvector > 0) {
					if (checkCeruDir(o, DOWN)) {
						o.direction = DOWN;
						return;
					}
				}
				if (yvector < 0) {
					if (checkCeruDir(o, UP)) {
						o.direction = UP;
						return;
					}
				}

			}
		}

		// last available option
		let last = [UP,LEFT,DOWN,RIGHT].filter(dir => {
			return checkCeruDir(o, dir)});

		if (last.length) {
			o.direction = last[0];
			return;
		}

		if (o.x > (Width-1)*16-12) {        // don't reverse at the end of the tunnel
			return;
		}
		// direction reversal is allowed as a last resort
		o.direction = opposite[o.direction];
	}

	function playerDied() {
		Coin.showcounter = 0;
		Game.lives--;

		Stats.deadpool[Game.level-1] = {lost: Stats.deadpool[Game.level-1].lost+1, place:Object.assign({},Player.blk.pos)};
		updateStats(Game, 'lives:-');

		if (Game.lives <= 0) {
			window.over.play();
			Game.waitcounter = 150;
			Game.showmessage = GAMEOVER;
		} else {
			startLevel();
		}
	}

	function getTile({x, y}, shift = STILL) {
		x = (x+cos[shift]+0.5)<<0;
		y = (y+sin[shift]+0.5)<<0;

		if (y < 0 || y > Height - 1 || x < 0 || x > Width - 1) {
			return STONE
		} else {
			return display[Math.abs(y)][Math.abs(x)];
		}
	}

	function setTile({x, y}, tile) {
		display[y][x] = tile;
	}

	function checkCeruDir(o, direction) {
		var blk = o.blk;

		// can't go up there
		if  ( !o.isEye && ~[320, 323, 656, 659].indexOf(blk.num) && direction == UP ||
			blk.num == 659 && direction == UP ||
			~[320,321,322,323].indexOf(blk.num)               && direction == DOWN)
			return false;

		return isPassable(blk.pos, direction, o) && opposite[direction] != o.olddirection;
	}

	function isTunnel({x,y}) {
		return y == Tunnel.y && (x < Tunnel.w || x > Width-1-Tunnel.w);
	}

	function tunnel(o) {
		if (o.x < -16) {
			o.x = (Width-1)*16-8;
		}
		if (o.x > (Width-1)*16-8) {
			o.x = -16;
		}
	}

	function newGame() {
		window.idLeaderboards.parentNode.classList.add('hidden');
		window.idtsuchi.classList.remove('hidden');
		window.idhelp.classList.remove('hidden');
		window.idLq.parentNode.classList.remove('hidden');
		window.idendgame.classList.add('hidden');
		window.idShadow.classList.remove('blacked'); //not sure if needed

		if (Game.japariMode) {
			Stats.highscoreRunOnce();
			Stats.getUserdata().then(warning);
		}

		window.youkoso.currentTime = 0;
		window.youkoso.play();

		Object.assign(Game, {
			score:      0,
			lives:      3,
			level:      1,
			state:      ACTIVE,
			extrascore: 0,
			coins:      0,
			enableLava: false
		});

		display = Map.map(el => el.slice());
		generateBars();
		Stats.deadpool = (new Array(10)).fill({lost:0});

		startLevel();
		renderSandstar();

		showMessage('Welcome to the Underground Labyrinth!' + (Game.japariMode ? '<br>Can you make it to the end in one piece?' : ''),
			Game.japariMode ? 6000 : 3000);

		window.idJapari.parentNode.classList.toggle('hidden');
		window.idSplash.classList.remove('show');
	}

	function startLevel() {
		startBtn.textContent = 'Pause';

		window.chase.pause();
		window.chase.currentTime = 0;
		window.pill.pause();
		window.pill.currentTime = 0;

		offscreenCtx.fillRect(0,0, Width*shdScl,Height*shdScl);
		setPos(Player, 13*16, 22.5*16);
		Object.assign(Player, {
			blk:            findBlk(Player),
			direction:      LEFT,
			nextDirection:  LEFT,
			isStill:        1,
			alive: true
		});
		move = LEFT;

		Ceru.forEach((C,i) => {
			Object.assign(C, {
				state:          HOMECOMING,
				powerpillTimer: 0,
				direction:      UP + Math.round(Math.random()),
				hometimer:      i * (25 - Game.level),
				reverse:        false
			});
			setPos(C, (i + 4.4) * 32 + 2, 13.5*16);
		});
		setPos(Ceru[0], 13*16, 10*16);
		Ceru[0].direction = LEFT;
		Ceru[0].state = SCATTER;

		Object.assign(Coin, {
			which: 0,
			showcounter:0,
			enableThird: false
		});

		updateStats(Game);

		Object.assign(Game, {
			frame:          0,
			waitcounter:    120,
			ceruMode:       SCATTER,
			showmessage:    SCATTER,
			dotseaten:      0
		});

		display = Map.map(el => el.slice());

		levelModifiers();

		for (friend in Summons) {
			let pickup = Summons[friend].pickup;

			pickup.pos = [];
			for (let i=0; i<pickup.max; i++) {
				pickup.pos.push(getRndPos());
			}
			Object.assign(pickup, {
				which: 0,
				found: 0,
				delayT: pickup.delay
			});
			Object.assign(Summons[friend], {
				active: false,
				disabled: true,
				cooldownT: 0,
				timerT: 0
			});
		}
		updateSGui(Summons, true);

		renderMap(display);
		display.totalDots = Map.totalDots(display);

		gSeed = Math.round(Math.random()*2);

		drawShadow();
		window.idShadow.style.opacity = 0.9+Game.level/100;
	}

	function generateBars() {
		vants.forEach(vnt => vnt.forEach(point => setTile(point, VANTAGE)));

		function isAllowed(b1, b2, dir) {
			// only replace wooden walls
			return getTile(b1) == WOOD && getTile(b2) == WOOD &&
					// that are 1 block thick, open from both sides
				!getTile(b1,opposite[dir+1]) && !getTile(b2,opposite[dir]) &&
					// that aren't near the edges or other bars
				!isPassable(b1,turn[dir],true) && !isPassable(b1,turn[dir+1],true) &&
					// or near vantage points
				!kernel3((dx,dy) => getTile({x:b1.x+dx, y:b1.y+dy}) == VANTAGE, true) &&
				!kernel3((dx,dy) => getTile({x:b2.x+dx, y:b2.y+dy}) == VANTAGE, true);
		}

		for (let i=0;i<=Width*Height-1;i++) {
			let blk = findBlk(i);
			// horizontally passing
			if (isAllowed(blk.pos, findBlk(i+1).pos, LEFT)  && Math.random()>0.3 ) {
				setTile(blk.pos, BARS);
				setTile(findBlk(i+1).pos, BARS);
				barred.h.push([blk.pos,findBlk(i+1).pos]);
			}
			// vertically passing
			if (isAllowed(blk.pos, findBlk(i+Width).pos, UP)  && Math.random()>0.3 ) {
				setTile(blk.pos, BARS);
				setTile(findBlk(i+Width).pos, BARS);
				barred.v.push([blk.pos,findBlk(i+Width).pos]);
			}
		}
		shuffle(barred.h);
		shuffle(barred.v);
	}

	function levelModifiers() {
		if (!Game.japariMode) return;
		let mods = [];

		mods[1] = ()=>{
			Summons.Serval.pickup.max = 0;
		};

		mods[2] = ()=>{
			Summons.Serval.pickup.max = 1;

			for (let i=1; i<Game.level; i++) {
				if (barred.h[i]) {
					setTile(barred.h[i][0], BARS);
					setTile(barred.h[i][1], BARS);
				}

				if (barred.v[i]) {
					setTile(barred.v[i][0], BARS);
					setTile(barred.v[i][1], BARS);
				}
			}
		};
		mods[3] = ()=>{
			Coin.enableThird = true;
			Summons.Serval.pickup.max = 2;
		};
		mods[4] = ()=>{
			Summons.Serval.pickup.max = 3;
			vants[0].forEach(vant => setTile(vant, VANTAGE));
		};
		mods[5] = ()=>{
			Game.enableLava = true;
		};
		mods[8] = ()=>{
			vants[1].forEach(vant => setTile(vant, VANTAGE));
		};

		mods.some((mod,i) => i > Game.level || mod());
	}

	function summon(name) {
		if (Game.state !== ACTIVE) return;
		let friend = Summons[name];

		if (!friend.disabled && !friend.active && !friend.blocked) {
			friend.active = true;
			Game.waitcounter = 30;
			friend.count++;

			friend.call().play();

			Game.score-= friend.price;
			Game.coins--;

			if (friend.timer) {
				friend.timerT = friend.timer;
			}

			updateSGui(Summons);
			updateStats(Game, 'score','coins:-');
		}
	}

}());