/* base functionality */

window.onresize();
warning();
main();

function main() {
    now = window.performance.now();
    delta = now - then;
    requestAnimationFrame(main);

    if (Game.state === OVER) {
        gameover();
    } else if (delta >= interval) {
        then = now - (delta % interval);

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

	// TODO move out of this function
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

    if (keyboard.pressT && keyboard.buttonsUp) {
        cheats.invincible = !cheats.invincible;
    }
    if (keyboard.pressJ && keyboard.buttonsUp) {
        cheats.drawPills = !cheats.drawPills;
    }

    keyboard.buttonsUp = !(keyboard.pressSpace || (keyboard.pressCTRL && keyboard.pressC) || keyboard.pressT || keyboard.pressJ);


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
            } else if (getTile(C, C.direction) !== VANTAGE && !cheats.invincible){
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
    if (!cheats.drawPills) return;
    let ctx=context, frame = Game.frame;

    if (Game.lq) {
        ctx = dotCtx; frame = (frame+1)/2;
    }

    if (Game.frame%2 || !Game.lq) {
        if (Game.lq)
            ctx.clearRect(0,0, Width*16,Height*16);

        display.forEach((row, y) => {
            row.forEach((tile, x) => {
                if (tile === DOT) {
                    let shape = (frame+Math.round(random(x*y+gSeed)*3))%4;
                    let hue = Math.round(Game.frame+random(x*y+gSeed)*90)%120;

                    ctx.drawImage(ssCtx.canvas, hue*16,shape*16, 16,16, 16*x,16*y, 16,16);
                } else if (tile === PILL) {
                    ctx.drawImage(sprites, 208,24, 24,24, 16*x-1,16*y-1, 24,24);
                }
            })
        });
    }
    if (Game.lq) context.drawImage(dotCtx.canvas, 0,0);
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