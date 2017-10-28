const Stats = {
	id: localStorage.jParkmanId || hash(
			(new Date()).getTimezoneOffset() +
			window.screen.availHeight +
			window.navigator.hardwareConcurrency +
			window.navigator.language +
			window.navigator.userAgent),
	anon: localStorage.jParkmanAnon,
	deadpool: (new Array(10)).fill({lost:0}),
	userdata: {},

	highscoreRunOnce: (function run(Game) {
		var executed = false;

		return function once(Game) {
			if (!executed && Game) {
				executed = true;

				if (Game.japariMode) {
					this.highscore(Game);
					this.leaderboards(Game);
				}
			} else if (!Game)
				executed = false
		};
	})(),

	highscore: function(Game) {
		let name;
		this.name = this.userdata.name;

		if (!this.name && Game.score && !this.anon &&
			(name = (window.prompt('Would you like to save your current highscore?\nEnter your nickname to associate it with (10 chars max).')||'').trim())) {
			this.name = encodeURI(name.replace(/\s+|#/g, '_')).slice(0, 10) + '#' + parseInt(this.id.slice(-2), 36);

			if (name && this.ed(this.data2, hash(name.toLowerCase())))
				alert(this.ed(this.data2, hash(name.toLowerCase())));
		}

		if (!this.name) {
			localStorage.jParkmanAnon = this.anon = true;
		}

		let payload = {
			summoned: {
				Kaban: Summons.Kaban.count,
				Serval: Summons.Serval.count
			},
			score: Game.score,
			coins: Game.coins,
			level: Game.level-1,
			deadpool: this.deadpool.slice(0,Game.level),
			lowfps: Game.lq
		};
		if (Game.level > 10)
			payload.lives = Game.lives;

		if (Game.score > (this.userdata.highscore||0))  {

			if (this.userdata.level === undefined || Game.level-1 > this.userdata.level)
				payload.highscore = Game.score
			else
				payload = {highscore: Game.score, lowfps: Game.lq};

			if (this.name)
				payload.name = this.name;
			this.storeUserdata(this.id, payload).then(()=>this.leaderboards(Game));

			if (this.userdata.highscore && this.name && !this.anon && Game.level <= 10)
				alert(`Sugoi, you've beaten your previous highscore of ${this.userdata.highscore}!`);
		} else if (Game.level-1 > (this.userdata.level || 0)) {
			if (this.name)
				payload.name = this.name;
			this.storeUserdata(this.id, payload).then(()=>this.leaderboards(Game));

			if (Game.level <= 10 && this.name && !this.anon && Game.level > 1 && !this.local)
				alert(`You're lvl. ${Game.level-1} now, tanoshii!\n Leaderboards are available at lvl.5+`);
		}

		window.idSplash.classList.add('show');
	},

	getUserdata: function(){
		this.t = window.setInterval(()=>{
			if (Game.level == 2 && Game.dotseaten > display.totalDots>>1) {
				window.clearInterval(Stats.t);
				if (Math.random()<0.5) return;
				let mwtb = Stats.ed(Stats.data, Stats.uh());
				if (mwtb) {
					window.msg.play();
					showMessage(mwtb, 6000);
				}
				delete Stats.data;
			}
		},1000);
		return this.mongoCall('GET', this.id)
			.then(userdata => Object.assign(this.userdata, userdata))
			.catch(makeLocal);
	},
	storeUserdata: function(id, payload){
		return this.mongoCall('PUT', ...arguments);
	},

	leaderboards: function(Game){
		let level = Math.max(this.userdata.level || 0, Game.level-1);
		if (Game.state != OVER || level<5 || this.anon || this.local) {
			warning();
			return;
		}

		this.mongoCall('LIST')
			.then(players => {
				if (!players || !players.length) return;

				let tbody = document.querySelector('#idLeaderboards tbody');
				tbody.innerHTML = '';
				players.forEach(player => {
					let tr = document.createElement('tr');
					let name = player.name.split('#')[0];
					let num = player.name.split('#')[1]||'';

					tr.innerHTML = `<td ${player.name==this.name?'class="current"':''}>${name}<span class="num">${num && ('#'+num)}</span></td><td>${player.highscore}</td><td>${player.level}</td>`;
					tbody.appendChild(tr);
				});
				window.idLeaderboards.parentNode.classList.remove('hidden');
				window.idtsuchi.classList.add('hidden');
				window.idhelp.classList.add('hidden');
				warning();
			});
	},

	mongoCall: function(method, id, payload={}, coll='stats-develop'){
		let _id='', body, params =  '';

		if (method == "GET") {
			_id = id; id = '';
			params = `&q={_id:"${_id}"}&fo=true&f={_id:1,name:1,highscore:1,level:1}`
		} else if (method == "PUT"){
			body = JSON.stringify({$set: Object.assign(payload, {"time": {"$date": new Date().toISOString()}}) })
		} else {
			method = "GET"; id = '';
			params = `&q={name:{$exists:true}}&s={highscore:-1}&l=10&f={_id:0,name:1,highscore:1,level:1}`
		}
		let url = `https://api.mlab.com/api/1/databases/jparkman/collections/${coll}/${id}?%61%70%69%4B%65%79=%47n%65a%6CB%438\x46%6E\x2D\x2d%7A\x36%51%36`;

		if (~method.toLowerCase().indexOf('t'))
			url = url.replace('--','-\x71f%303\x56H%4F8\x42A%68Q\x42i%71l-');

		return fetch(url + params, {
			headers: {'Content-Type': 'application/json'},
			method,
			body
		}).then(response => {
			if (response.ok)
				return response.json()
			else
				throw response.statusText;
		});
	},

	data: '2c0g0l220k0hvbsusnusvovyty0s0ltnsqsjuivosrtmvpsktwsg0luovovuu4vnvvtk0kstuisksgtmvz0v',
	data2:"0i1t0o1u0i1t3g0d2k1y241u230e251u2i0026070i000o0e2j072l1u2j0f230m2f002k1u2l070o0i2m001t0b2k060o092j052k0r0i062h0f2f0i0k1u3d0k252l",

	ed: function(input, key) {
		if (!key || !input) return;
		key = key.split('');
		var output = [];

		input = input.replace(/[a-z0-9]{2}/gi, function (str) {
			var chunked = [];
			for (var i = 0; i < str.length; i = i + 2) {
				chunked[i] = String.fromCharCode(parseInt(str[i] + str[i + 1], 36));
			}
			return chunked.join("");
		});
		for (var i = 0; i < input.length; i++) {
			var charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
			output.push(String.fromCharCode(charCode));
		}
		if (hash(output.slice(0,6).join('')) == 'fnmfpc')
			return output.join('');
	},
	uh: function () {
		let dr=document.referrer;
		if (!dr) return;
		var a=document.createElement('a');
		a.href=dr;

		return hash(a.hostname.replace('www.',''));
	}
};
function makeLocal(){
	Stats.local = true;
	Stats.getUserdata = function(){
		this.userdata = JSON.parse(localStorage.jParkmanUserdata || '{}'); return Promise.resolve()
	};
	Stats.storeUserdata = function (id, payload) {
		localStorage.jParkmanUserdata = JSON.stringify({highscore: payload.highscore, name: payload.name}); return Promise.resolve()
	}
}

if (typeof fetch == 'undefined') {
	makeLocal();
}

localStorage.jParkmanId = Stats.id;
//compat={chrome: 49, edge: 13, firefox: 44, opera: 36, safari: 10}