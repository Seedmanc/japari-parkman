(function () {

    var cheats = {
	    invincible: true,

	    showCeruTarget: false,
	    buttonsUp: true,
	    buttonJUp: true
    };
    var requestID;

    var canvas = document.getElementById('game');
    var shadowCtx = document.getElementById('shadow').getContext('2d');
    var mapCtx = document.getElementById('map').getContext('2d');
    var context = canvas.getContext('2d');
	mapCtx.imageSmoothingEnabled= false;
    context.fillStyle = "#000000";
	context.imageSmoothingEnabled= true;

	const phases = [
	// scatter  chase
		10,     15,
		10,     20,
		7.5,    20,
		5,
	];

	function getGamePhase(frame) {
		var acc = 0;
		var phs = phases.findIndex(el => {
			return (acc += el)*60 >= frame;
		});

		return Math.abs(phs % 2);
	}

	const ACTIVE = 0;
	const PAUSE = 1;
	const OVER = 2;

    // messages
	const GETREADY = 0;
	const GAMEOVER = 1;
	const CERUSCORE = 2;
	const FRUITSCORE = 3;

	// shifts for x and y for given direction value
	const sin = [0, 0, 0, -1, 1];
	const cos = [0, -1, 1, 0, 0];

    // direction
	const STILL = 0;
    const LEFT = 1;
	const RIGHT = 2;
	const UP = 3;
	const DOWN = 4;
	const opposite = [STILL,RIGHT,LEFT,DOWN,UP];

    // key codes
	const KEYUP = 38;
	const KEYDOWN = 40;
	const KEYRIGHT = 39;
	const KEYLEFT = 37;
	const KEYSPACE = 32;
	
	const KEYJ = 74;
	const KEYCTRL = 17;
	const KEYC = 67;

    // events
	var move = LEFT;
    var pressJ = false;
    var pressSpace = false;
    var pressCTRL = false;
    var pressC = false;

    // map
	const N = null;
    const levelMap =
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
	        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
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
    var display = [];

	// materials
	const WOOD = 1;
	const STONE = 2;
	const BARS = 3;
	const DOT = 0;
    const PILL = null;

	var japariMode = false;
	var totalDots = levelMap.reduce((prev, curr) => prev + curr.filter(blk => blk === PILL || blk === DOT).length, 0);

    var youkoso = new Audio('audio/youkoso.mp3');
    var ded = new Audio('audio/ded.mp3');
    var oneup = new Audio('audio/oneup.mp3');
    var coinda = new Audio('audio/coinda.mp3');
    var cerubreak = new Audio('audio/cerubreak.mp3');
    var nom = new Audio('audio/nom.mp3');
    var sprites = new Image();
    sprites.src = 'image/sprites.png';

	// ceru modes
	const SCATTER = 0;
	const CHASE = 1;
	const HOMECOMING = 2;

    // game object
    var Game = {
	    state: OVER,
		score: 0,
		level: 0,
		lives: 3,
		frame: 0,
		ceruMode: SCATTER,
		extralife: false
    };

    // speeds per level
    Game.playerSpeed = [1.8, 2, 2.2, 2];
    Game.playerSpeedChasing = [2, 2.1, 2.2, 2];
    Game.ceruSpeed = [1.7, 1.9, 2.1, 2.1];
    Game.ceruSpeedChasing = [1, 1.1, 1.2, 1.2];

    var animDivisor = 0;
    var animFrame = 1;

    var player = {
	    x: 0,
	    y: 0,
	    isStill: 1,
	    dieanimation: 0,
	    multikill: 1
    };

    var ceruValue = 200;

    var fruit = {
	    x: 13*16 +6,
	    y: 17*16,
		scorecounter: 0,
	    showcounter: 0
    };

	const Targeting = {
		red:    () => findBlk(player),
		pink:   () => {
			let pos = findBlk(player).pos;

			pos.x = Math.max(pos.x + cos[player.direction]*4, 0);
			pos.y = Math.max(pos.y + sin[player.direction]*4, 0);

			return {pos};
		},
		blue:   () => {
			let srcpos = findBlk(ceru[0]).pos;
			let pacpos = findBlk(player).pos;
			let x = Math.min(Math.max(pacpos.x + (pacpos.x - srcpos.x), 0), levelMap[0].length-1);
			let y = Math.min(Math.max(pacpos.y + (pacpos.y - srcpos.y), 0), levelMap.length-1);

			return {pos: {x, y}};
		},
		orange: () => {
			let srcpos = findBlk(ceru[3]).pos;
			let pacblk = findBlk(player);

			if (Math.pow(srcpos.x-pacblk.pos.x, 2) + Math.pow(srcpos.y-pacblk.pos.y, 2) > 64)
				return pacblk;
			else
				return ceru[3].homeblk;
		}
	};

	fruit.score = (level) => {
		return Math.round(
			Math.max(
				Math.min(
					2.15*Math.pow(level,3) - 22.35*Math.pow(level,2) + 144.1*level - 34.05
					, 5000)
				, 100)
			);
	};
    fruit.first = true;
    fruit.second = true;


    // cerus
    var ceru = [];
	[25, 2, 867, 840].forEach((hb,i) => {
        ceru.push(
	        {
		         name: ['red', 'pink', 'blue', 'orange'][i],
		         x: 0,
			     y: 0,
			     olddirection: 0,
			     direction: LEFT,
			     state: HOMECOMING,
			     powerpillTimer: 0,
			     hometimer: 0,
			     reverse: false,
			     targetblk: findBlk(0),
			     homeblk: findBlk(hb),
			     seed: Math.round(Math.random()*2)
	        }
        );
    });

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
                pressSpace = true;
	            event.preventDefault();
                break;
            case KEYJ:
                pressJ = true;
                break;
            case KEYCTRL:
                pressCTRL = true;
                break;
            case KEYC:
                pressC = true;
                break;
        }
    }, false);

    window.addEventListener("keyup", function (event) {
        switch (event.keyCode) {
            case KEYSPACE:
                pressSpace = false;
                break;
            case KEYJ:
                pressJ = false;
                break;
            case KEYCTRL:
                pressCTRL = false;
                break;
            case KEYC:
                pressC = false;
                break;
        }
    }, false);

    requestID = requestAnimationFrame(animate);
	
	// main loop
    function animate() {
        requestID = requestAnimationFrame(animate);
        if (Game.state == OVER) {
            intro();
        } else {
            draw();
            moveCerus();
            movePlayer();
            gameLogic();
        }
    }

	function renderMap() {
		var walls = [], outcorners = [], incorners = [];
		var floor = [0,0];
		walls[LEFT] = [16,0];
		walls[RIGHT] = [32,0];
		walls[UP] = [48,0];
		walls[DOWN] = [64,0];

		incorners[LEFT] = [];
		incorners[LEFT][UP] = [80,0];
		incorners[LEFT][DOWN] = [96,0];
		incorners[RIGHT] = [];
		incorners[RIGHT][UP] = [112,0];
		incorners[RIGHT][DOWN] = [128,0];
		outcorners[LEFT] = [];
		outcorners[LEFT][UP] = [144,0];
		outcorners[LEFT][DOWN] = [160,0];
		outcorners[RIGHT] = [];
		outcorners[RIGHT][UP] = [176,0];
		outcorners[RIGHT][DOWN] = [192,0];

		for (let y=0; y<display.length; y++)  {
			let row = display[y];
			for (let x=0; x<=row.length; x++)  {
				let blk = row[x];
				mapCtx.drawImage(sprites, ...floor, 16,16, x*16,y*16, 16,16);
				if (blk) {
					let sprite = [0,16];

					opposite.some((dir, opp) => {
						if (!getTile({x,y}, dir)) {             //straight walls
							let median = [];                    //keep current tile in line with adjacent blocks
							if (cos[dir]) {
								median.push(
									getTile({x,y:y-1}, dir),
									getTile({x,y:y+1}, dir)
								);
							} else {
								median.push(
									getTile({x:x-1,y}, dir),
									getTile({x:x+1,y}, dir)
								);
							}
						    sprite = walls[median.filter(m=>m)[1] ? dir : opp];


							if (cos[dir]) {                     //outside corners
								if (!getTile({x,y}, UP)) {
									sprite = outcorners[opp][DOWN];
								}
								if (!getTile({x,y}, DOWN)) {
									sprite = outcorners[opp][UP];
								}
							}
							return true;
						} else if (cos[dir]) {                  //inside corners
							if (!getTile({x,y:y-1}, dir)) {
								sprite = incorners[opp][DOWN];
							}
							if (!getTile({x,y:y+1}, dir)) {
								sprite = incorners[opp][UP];
							}
						}

					});

					if (sprite) {
						let texturedSprite = sprite.slice();
						texturedSprite[1] += 16*(getTile({x,y})-1);
						mapCtx.drawImage(sprites, ...texturedSprite, 16,16, x*16,y*16, 16,16);
					}
				}
			}
		}
	}

    function intro() {
        context.fillRect(0, 0, canvas.width, canvas.height); 

        Game.lives = 3;
        if (pressSpace)
            newGame();
    }

    function gameLogic() {
 
        if (!pressC)
            cheats.buttonsUp = true;

        if (pressCTRL && pressC && cheats.buttonsUp) {
            cheats.buttonsUp = false;

            if (cheats.showCeruTarget)
                cheats.showCeruTarget = false;
            else {
                cheats.showCeruTarget = true;
                Game.score = 0;
            }

        }

        if (!pressJ)
            cheats.buttonJUp = true;

        if (pressJ && cheats.buttonJUp) {
            cheats.buttonJUp = false;

            japariMode = !japariMode;
	        shadowCtx.clearRect(0,0,canvas.width, canvas.height)
        }

        if ((Game.score > 10000) && (!Game.extralife)) {
            Game.extralife = true;
            Game.lives++;
            oneup.play();
        }

        if (Game.waitcounter == 0)
            Game.frame++;


	    let newPhase = getGamePhase(Game.frame);
	    if (newPhase !== Game.ceruMode) {
		    Game.ceruMode = newPhase;
		    document.title = Game.ceruMode ? 'CHASE' : 'SCATTER';
	    }
        ceru.forEach(C => {
            // check Player Ceru collision
            if ((isCollision(player, C)) && (C.state != HOMECOMING)) {
                if (C.powerpillTimer > 0) {
                    // break ceru
                    cerubreak.play();
                    C.state = HOMECOMING;
                    C.powerpillTimer = 0;
                    Game.score += ceruValue * player.multikill;
	                player.multikill++;
                    Game.waitcounter = 60;
                    C.dieanimation = 1;
                    Game.showmessage = CERUSCORE;
                } else {
                    // Player dies
                    if (cheats.invincible == false) {
                        if (player.dieanimation == 0) {
                            ded.play();
                            Game.waitcounter = 20;
                            // init die process
                            player.dieanimation = 1;
                            fruit.showcounter = 0;
                        }
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

        if (fruit.scorecounter > 0) {

            if (Game.showmessage == FRUITSCORE) {

                context.drawImage(sprites,
                    3 * 24,
                    296 - 16,
                    24,
                    7,

                    fruit.x - 8,
                    fruit.y -20,
                    48,
                    14);
            }
            fruit.scorecounter--;
        }

        if (Game.waitcounter > 0) {
            Game.state = PAUSE;

            if (Game.showmessage == GETREADY)
                context.drawImage(sprites, 8 * 16, 264, 6 * 16, 15, 6 * 32, 17 * 16, 5 * 32, 30);
            if (Game.showmessage == GAMEOVER)
                context.drawImage(sprites, 0, 256, 80, 7, 4.5 * 32, 17 * 16, 160, 14);
            if (Game.showmessage == CERUSCORE)
                context.drawImage(sprites, 8 + (player.multikill - 2) * 16, 296 - 16, 16, 7, player.x, Math.max(player.y -20, 0), 32, 14);
            Game.waitcounter--;

            if (Game.waitcounter == 0) {
                if (Game.showmessage == GAMEOVER) {
                    Game.showmessage = 0;
                    Game.state = OVER;
                }
                else {
                    Game.showmessage = 0;
                    Game.state = ACTIVE;
                }
            }
        }
    }

    function drawFruit() {
        if ((Game.dotseaten == 70) && (fruit.first)) {
            fruit.showcounter = 540;
            fruit.first = false;
        }
        if ((Game.dotseaten == 170) && (fruit.second)) {
            fruit.showcounter = 540;
            fruit.second = false;
        }

        if (fruit.showcounter > 0) {
            fruit.showcounter--;

            context.drawImage(sprites,
                224,
                0,
                22,
                22,

                fruit.x, fruit.y, 22, 22);

            if (isCollision(player, fruit)) {
                coinda.play();
                fruit.showcounter = 0;
                Game.score += fruit.score(Game.level);
                fruit.scorecounter = 40;
                Game.showmessage = FRUITSCORE;
            }
        }
    }

    function drawPills() {
	    display.forEach((row, y) => {
		    row.forEach((tile, x) => {
			    if (tile === DOT) {
				    context.drawImage(sprites, 0,280, 7,7, 16*x,16*y, 14,14);
			    } else if (tile === PILL) {
				    context.drawImage(sprites, 224,24, 22,22, 16*(x)-3,16*y-2, 22,22);
			    }
		    })
	    });
    }

    function drawPlayer() {
        if (player.dieanimation > 0) {
            context.drawImage(sprites, 32 * Math.floor((player.dieanimation)/3),224, 32,32, player.x,player.y, 32,32);
            if (Game.waitcounter == 0) {

                if (!(animFrame % 4)) {
                    player.dieanimation++;
                    if (player.dieanimation == 22) {
                        playerDies();
                    }
                }
            }
        } else {
	        let bob = player.isStill ? 0 : Math.floor((animFrame % 4) / 2);

	        context.drawImage(sprites, 32*(player.direction-1), 176, 32, 32, Math.round(player.x+1)+bob, Math.round(player.y -1)+bob, 32, 32);
	        if (player.powerpillTimer) {
		        context.drawImage(sprites, 32*(player.direction-1), 208, 32, 16, Math.round(player.x+1)+bob, Math.round(player.y +7)+bob, 32, 16);
	        }


	        if (japariMode){
		        if (sin[player.direction]) {
			        context.drawImage(sprites, 160, 64, 32, 16, Math.round(player.x+1)+bob, Math.round(player.y)+bob, 32, 16);
		        } else {
			        context.drawImage(sprites, 128 + (player.direction-1)*16, 64, 16, 16,
				        Math.round(player.x+1+(2-player.direction)*16 )+bob, Math.round(player.y)+bob, 16, 16);
		        }
	        }
	        if (player.isStill && player.direction == DOWN) {
		        context.drawImage(sprites, 240, 176, 16, 16, Math.round(player.x+10) , Math.round(player.y +16) , 16, 16);
	        }

	        if (!player.isStill) {

		        if (sin[player.direction]) { //vertical
			        context.drawImage(sprites, 128 + 16*(animFrame%4) + (player.direction-UP) * 64, 176, 16, 16,
				        Math.round(player.x+10)+bob, Math.round(player.y +16)+bob, 16, 16);
		        } else {                     //horizontal
			        let hshift = player.direction == LEFT ? 5 : 14;
			        context.drawImage(sprites, 128 + 16*(animFrame%4) + (player.direction-LEFT) * 64, 192, 16, 16,
				        Math.round(player.x + hshift)+bob, Math.round(player.y +16)+bob, 16, 16);
		        }
            }
        }
    }

    function drawCerus() {

        if ((player.dieanimation == 0) && (Game.showmessage != GAMEOVER)) {
	        let bob = Math.floor((animFrame % 4) / 2);
            ceru.forEach((C, i) => {

	            if (C.dieanimation > 0) {
		            context.drawImage(sprites, 128+(C.dieanimation-1)*32,48 + 32*3, 32,32, C.x+2,C.y +1, 32,32);
		            if (!(Game.waitcounter % 6)) {
			            C.dieanimation++;
			            if (C.dieanimation >= 5) {
				            C.dieanimation = 0;
			            }
		            }
	            } else if (C.powerpillTimer > 0) {
                    if (C.powerpillTimer < 120) {

                        // flashing
	                    context.drawImage(sprites, 128+(animFrame % 4)*32, 48 + 32*2, 32, 32, C.x+2+bob, C.y +1, 32, 32);
                    } else {
                        // blue ceru
	                    context.drawImage(sprites, 128+((animFrame+C.seed) % 4)*32, 48 + 32, 32, 32, C.x+2+bob, C.y +1, 32, 32);
                    }

                } else {
                    if (C.state != HOMECOMING || C.hometimer > 0) {
                        context.drawImage(sprites, ((animFrame+C.seed) % 4)*32, 48 + i*32, 32, 32, C.x+2, C.y +1 + bob, 32, 32);
                    }
                    // draw eye
                    if (!((Game.waitcounter > 0) && (Game.showmessage == CERUSCORE) && (C.state == HOMECOMING) && (C.hometimer == 0) ||
	                    (C.state !== HOMECOMING || C.hometimer) && C.direction === UP)) {
	                    context.drawImage(sprites, (112 + 16 * C.direction), 48, 16, 16, C.x + 10, C.y +5 + bob, 16, 16);
                    }
                }

	            if (cheats.showCeruTarget) {
		            let srcpos = C.targetblk.pos;

		            context.drawImage(sprites, 18 + 32 * i,300, 8,8, srcpos.x * 16,srcpos.y * 16, 16,16);
	            }
            })
        }
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawPills();
        drawFruit();

        // animation frame divisor
        animDivisor++;
        if (animDivisor > 4) {
            animDivisor = 0;
            animFrame++;
            if (animFrame > 3) {
                animFrame = 0;
            }
        }
        drawPlayer();
        drawCerus();
        drawShadow();
    }

    function drawShadow() {
        if (Game.frame % 2 || !japariMode) return;

        shadowCtx.fillStyle='rgba(0,0,0,0.2)';
        shadowCtx.fillRect(16/4 , 16/4 , canvas.width-16/2, canvas.height -16/2);

        var {x, y} = findBlk(player).pos;
        var start = {x, y}; var end = {x, y};

        for (start.x = x; start.x > 0 && !getTile({x: start.x, y}) ; start.x -= 1) {}
        for (end.x = x; end.x<27 && !getTile({x: end.x, y}) ; end.x += 1) {}
        for (start.y = y; start.y > 0 && !getTile({x, y: start.y}) ; start.y -= 1) {}
        for (end.y = y; end.y < 30 && !getTile({x, y: end.y}) ; end.y += 1) {}

	    shadowCtx.globalAlpha = 0.5;
	    ceru.forEach(C => {
		    let isEye = C.state == HOMECOMING && !C.hometimer;
		    let size =  isEye ? 8 : C.powerpillTimer ? 26 : 32;    let offset = isEye ? 10 : C.powerpillTimer ? 5 : 0;
		    shadowCtx.drawImage(sprites, 192+Math.floor((animFrame % 4)/2)*32+1, 48, 30, 32, C.x+2+offset, C.y +1 +offset, size-2, size);
	    });
	    shadowCtx.globalAlpha = 1;

        shadowCtx.clearRect((start.x)*16, (y-1)*16, (end.x - start.x + 1)*16, 16*3);
        shadowCtx.clearRect((x - 1)*16, (start.y )*16, 16*3, (end.y - start.y + 1) * 16)
    }

    function movePlayer() {
        var pos = findBlk(player).pos;
        var eatdot = false;

	    if (Game.waitcounter == 0 && player.powerpillTimer) {
		    player.powerpillTimer--;
	    }
	    
	     player.nextDirection = move;

	    if (opposite[player.direction] == move) {
		    player.direction = move;
	    }

        if (isPlayerCrossing(player)) {
            if (getTile(pos) === DOT) {
                setTile(pos, undefined);
                nom.play();
                Game.score += 10;
                Game.dotseaten++;
                eatdot = true;
            }
            if (getTile(pos) === PILL) {
                setTile(pos, undefined);
	            nom.play();
                Game.score += 50;
                Game.dotseaten++;
	            player.multikill = 1;
	            player.powerpillTimer = Math.max(400 - (30 * Game.level), 120);
                ceru.forEach(C => {
                    if (C.state != HOMECOMING) {
	                    C.powerpillTimer = player.powerpillTimer;
	                    C.reverse = true;
                    }
                })
            }

            if (!getTile(pos, player.nextDirection)){
                player.isStill = 0;
                player.direction = player.nextDirection;
                if (cos[player.direction]) {
                    quantize(player, 'y');
                } else if (sin[player.direction]) {
                    quantize(player, 'x');
                }
            }
            if (getTile(pos, player.direction)) {
                player.isStill = 1;
                quantize(player);
            }
        }
 
        var speed;
        if (Game.level == 1)
            speed = Game.playerSpeed[0];
        else if (Game.level < 5)
            speed = Game.playerSpeed[1];
        else if (Game.level < 21)
            speed = Game.playerSpeed[2];
        else
            speed = Game.playerSpeed[3];

	    player.movex = cos[player.direction] * (eatdot ? 1 : speed);
	    player.movey = sin[player.direction] * (eatdot ? 1 : speed);

        if (Game.state != PAUSE && player.dieanimation == 0) {
            setPos(player, player.x + player.movex, player.y + player.movey)
        }
        tunnel(player);

        if (Game.dotseaten == totalDots) {
            nextLevel()
        }
    }

    function moveCerus() {
        ceru.forEach((C ) => {

            // remember direction to prevent reverse
            C.olddirection = C.direction;

            var speed;
            if (Game.level == 1)
                speed = Game.ceruSpeed[0];
            else if (Game.level < 5)
                speed = Game.ceruSpeed[1];
            else if (Game.level < 21)
                speed = Game.ceruSpeed[2];
            else
                speed = Game.ceruSpeed[3];

	        // cruise elroy
            if (C.name == 'red' && Game.frame > 40 * 60)
                speed += 0.2;

            if (C.state == HOMECOMING && C.hometimer == 0)
                speed = 3;

            if (C.powerpillTimer > 0) {
                speed = 1;
                if (Game.waitcounter == 0) {
                    C.powerpillTimer--;
                }
            }

            if ((C.y == 11.5*16) && (C.x < 5*16 || C.x > 21*16))
                speed = 1.3;


            if (C.hometimer > 0) {

                if (C.y < 12.5*16 && C.hometimer > 1) {
                    C.direction = DOWN;
                }
                if (C.y > 14.5*16 - 2) {
                    C.direction = UP;
                    C.hometimer--;
                }

                if (Game.state != PAUSE) {
                    if (C.direction == UP)
                        C.y -= 1.3;
                    else
                        C.y += 1.3;
                }

                if (C.hometimer < 2) {
                    // emerge Ceru
                    if (C.y < 16*10.5+2) {
                        C.direction = LEFT;
                        C.hometimer = 0;
                        C.state = Game.ceruMode;
                        C.y = 16*10.5;
                    }
                }
            }
            else {
				// revive ceru
                if (C.state == HOMECOMING) {
                    if (isWithin(C.x, 13*16, 2) && (C.y == 16*10.5)) {
                        C.x = 13*16;
                        C.direction = DOWN;
                        C.hometimer = 5;
                    }
                }

                if (isCeruCrossing(C)) {

                    if (C.state == CHASE) {
	                    C.targetblk = Targeting[C.name]();
                    } else if (C.state == SCATTER) {
                        C.targetblk = C.homeblk;
                    } else if (C.state == HOMECOMING) {
                        C.targetblk = findBlk(321);
                    } else if (C.powerpillTimer != 0) {
                        C.targetblk = getRandomTarget(C);
                    }
                    setCeruDirection(C);

                    // check if ceru should reverse
                    if (C.state != HOMECOMING && C.reverse) {
                        C.reverse = false;
	                    C.direction = opposite[C.olddirection];
                    }
                }


                // move ceru
                if (Game.state != PAUSE) {
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

    function getPinkTarget() {
        var pos = findBlk(player).pos;

        pos.x = Math.max(pos.x + cos[player.direction]*4, 0);
        pos.y = Math.max(pos.y + sin[player.direction]*4, 0);

        return {pos};
    }

    function getBlueTarget() {
	    var srcpos = findBlk(ceru[0]).pos;
	    var pacpos = findBlk(player).pos;

        var x = Math.min(Math.max(pacpos.x + (pacpos.x - srcpos.x), 0), levelMap[0].length-1);
        var y = Math.min(Math.max(pacpos.y + (pacpos.y - srcpos.y), 0), levelMap.length-1);

        return {pos: {x, y}};
    }

    function getOrangeTarget() {
        var srcpos = findBlk(ceru[3]).pos;
        var pacblk = findBlk(player);

        if (Math.pow(srcpos.x-pacblk.pos.x, 2) + Math.pow(srcpos.y-pacblk.pos.y, 2) > 64)
            return pacblk;
        else
            return ceru[3].homeblk;
    }

    function getRandomTarget(o) {
        var num = findBlk(o).num;
	    var avlDirs = [UP,LEFT,DOWN,RIGHT].filter(dir => checkDirection(o, dir));

	    return findBlk(num, avlDirs[Math.floor(Math.random()*(avlDirs.length-1))]);
    }

    function setCeruDirection(o) {
        var srcpos = findBlk(o).pos;
	    var tgtpos = o.targetblk.pos;
        var xvector = tgtpos.x - srcpos.x;
        var yvector = tgtpos.y - srcpos.y;

        if (Math.abs(yvector) > Math.abs(xvector)) {
            // vertical
            if (yvector > 0) {
                // Down is preferred
                if (checkDirection(o, DOWN)) {
                    o.direction = DOWN;
                    return;
                }

                if (xvector < 0) {
                    if (checkDirection(o, LEFT)) {
                        o.direction = LEFT;
                        return;
                    }
                }
                if (xvector > 0) {
                    if (checkDirection(o, RIGHT)) {
                        o.direction = RIGHT;
                        return;
                    }
                }


            }
            else {
                if (checkDirection(o, UP)) {
                    o.direction = UP;
                    return;
                }

                if (xvector < 0) {
                    if (checkDirection(o, LEFT)) {
                        o.direction = LEFT;
                        return;
                    }
                }
                if (xvector > 0) {
                    if (checkDirection(o, RIGHT)) {
                        o.direction = RIGHT;
                        return;
                    }
                }
            }
        }

        if (Math.abs(xvector) > Math.abs(yvector)) {
            // horizontal
            if (xvector > 0) {
                if (checkDirection(o, RIGHT)) {
                    o.direction = RIGHT;
                    return;
                }

                if (yvector > 0) {
                    if (checkDirection(o, DOWN)) {
                        o.direction = DOWN;
                        return;
                    }
                }
                if (yvector < 0) {
                    if (checkDirection(o, UP)) {
                        o.direction = UP;
                        return;
                    }
                }



            } else {
                if (checkDirection(o, LEFT)) {
                    o.direction = LEFT;
                    return;
                }

                if (yvector > 0) {
                    if (checkDirection(o, DOWN)) {
                        o.direction = DOWN;
                        return;
                    }
                }
                if (yvector < 0) {
                    if (checkDirection(o, UP)) {
                        o.direction = UP;
                        return;
                    }
                }

            }
        }

        // last available option
	    if ([UP,LEFT,DOWN,RIGHT].some(dir => {
			    return o.direction = checkDirection(o, dir) && dir;
		    })) {
		    return;
	    }

	    if (o.x > 26*16+4) {        // don't reverse at the end of the tunnel
		    return;
	    }
        // direction reversal is allowed if a ceru is stuck in a dead end of tunnel
	    if (cos[o.direction]) {
		    o.direction = opposite[o.direction];
	    }
    }

    function playerDies() {
        fruit.showcounter = 0;
        player.dieanimation = 0;
        Game.lives--;
        if (Game.lives <= 0) {
            Game.waitcounter = 120;
            Game.showmessage = GAMEOVER;
        }
        else {
            startLevel();
        }
    }

    function quantize(object, axes = 'xy') {
        [...axes].forEach(axis => object[axis] = Math.floor(object[axis] / 16) * 16 + 8);
    }

    function setPos(object, x, y) {
        object.x = x;
        object.y = y;
    }

    function isCeruCrossing(o) {
	    margin = o.powerpillTimer ? 0.5 : 1.5;

	    return isWithin(o.x % 16, 16/2, margin) && isWithin(o.y % 16, 16/2, margin);
    }

	function isWithin(value, target, radius) {
		return value >= target - radius && value <= target + radius;
	}

    function isPlayerCrossing(o) {
	    var margin = 5;
	    return isWithin(o.x % 16, 16/2, margin) && isWithin(o.y % 16, 16/2, margin);
    }

	function getTile({x, y}, shift = STILL) {
		x += cos[shift];
		y += sin[shift];

		if (y < 0 || y > display.length - 1 || x < 0 || x > display[0].length - 1) {
			return STONE
		} else {
			return display[Math.abs(y)][Math.abs(x)];
		}
	}

	function setTile({x, y}, tile) {
		display[y][x] = tile;
	}

	// fetch block data of the map by the pixel coords or its absolute number, optionally with a shift
    function findBlk(o, shift = STILL) {
	    var x, y, num;

	    if (typeof o == 'number') {
		   x = o % 28;
		   y = Math.floor(o / 28);
	    } else {
		   x = Math.floor(o.x / 16)+1;
		   y = Math.floor(o.y / 16)+1;
	    }
	    x += cos[shift];
	    y += sin[shift];
	    num = x + 28 * y;

        return {
	        pos: {x, y},
	        num
        }
    }


    function checkDirection(o, direction) {
        var blk = findBlk(o);

        // can't go up there
        if (o.state == CHASE || o.state == SCATTER)
            if (~[320, 323, 656, 659].indexOf(blk.num))
                if (direction == UP)
                    return false;

	    return !getTile(blk.pos, direction) && opposite[direction] != o.olddirection;
    }

    function isCollision(first, second) {
        var margin = 16/2;

	    return isWithin(first.x, second.x, margin) && isWithin(first.y, second.y, margin);
    }

    function tunnel(o) {
        if (o.x < -28) {
	        o.x = 26.5*16;
        }
        if (o.x > 26.5*16) {
	        o.x = -28;
        }
    }

    function newGame() {
	    youkoso.play();
        Game.score = 0;
        Game.lives = 3;
        Game.level = 0;
        Game.state = ACTIVE;
        Game.extralife = false;
        nextLevel();
    }

    function nextLevel() {
	    startLevel();
        Game.dotseaten = 0;
        Game.level++;
        fruit.first = true;
        fruit.second = true;
	    player.isStill = 1;

	    display = levelMap.map(el => el.slice());
	    renderMap();
    }

    function startLevel() {
        setPos(player, 13*16, 22.5*16);
        player.movex = 0;
        player.movey = 0;
        player.direction = LEFT;
        player.nextDirection = LEFT;

	    ceru.forEach((C,i) => {
            C.state = HOMECOMING;
		    C.powerpillTimer = 0;
		    C.direction = UP + Math.round(Math.random());
		    C.hometimer = i * 5;
		    C.reverse = false;
            setPos(C, (i + 4.4) * 32 + 2, 13.5*16);
        });
        setPos(ceru[0], 13*16, 10*16);
        ceru[0].direction = LEFT;
        ceru[0].state = SCATTER;

        fruit.showcounter = 0;
        Game.frame = 0;
        Game.waitcounter = 120;
        Game.ceruMode = SCATTER;
        Game.showmessage = GETREADY;
        document.title = 'SCATTER';
    }
}());