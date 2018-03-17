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