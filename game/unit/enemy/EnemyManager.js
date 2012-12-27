/**
 * Менеджер управления Врагами
 * @author ProBigi
 */

function EnemyManager()
{
	this.enemies = [];
	
	this.vacuumSize = 150;
	this.enemiesCont = new createjs.Container();
	
	this.tank = null;
	
	this.freezMode = false;
	this.freezTime = 0;
	
	this.enemyScaleMode = false;
	this.enemyScaleTime = 0;
	
	this.timerAddSimpleEnemy = 0;
	this.timeToAddSimple = 3000;
	
	this.timerAddMediumEnemy = 0;
	this.timerToAddMedium = 5000;
	
	this.timerAddEscapeEnemy = 0;
	this.timerToAddEscape = 5000;
	
	this.timerAddStrongEnemy = 0;
	this.timerToAddStrong = 10000;
	
	this.timerAddChaseEnemy = 0;
	this.timerToAddChase = 7000;
	
	this.timerAddTankEnemy = 0;
	this.timerToAddTank = 40000;
	
	this.timerAddVacuumEnemy = 0;
	this.timerToAddVacuum = 15000;
	
	
	this.totalEnemyKills = 0;
	
	this.isWaveInit = false;
	
	this.WAVES = [];
	
	this.skillKoeff = 1;
	
	this.MAX_LEN = 100;
	
	this.WAVE_LEN = 0;
	
	this.max_simple = 0;
	this.simples = [];
	this.max_medium = 0;
	this.mediums = [];
	this.max_escape = 0;
	this.escapes = [];
	this.max_chase = 0;
	this.chases = [];
	this.max_stong = 0;
	this.strongs = [];
	this.max_vacuum = 0;
	this.vacuums = [];
	this.max_tank = 1;
	this.tanks = [];
	
	this.arrayTypes = [];
	this.arrayTypes.push(this.simples, this.mediums, this.escapes, this.chases, this.strongs, this.vacuums, this.tanks);
	
	
	this.WAVES.push({ time: 5000, wave: this.wave1, init: false });
	this.WAVES.push({ time: 50000, wave: this.wave2, init: false });
	this.WAVES.push({ time: 120000, wave: this.wave3, init: false });
	this.WAVES.push({ time: 180000, wave: this.wave4, init: false });
	this.WAVES.push({ time: 260000, wave: this.wave5, init: false });
	this.WAVES.push({ time: 360000, wave: this.wave6, init: false });
	this.WAVES.push({ time: 460000, wave: this.wave7, init: false });
	this.WAVES.push({ time: 560000, wave: this.wave8, init: false });
	this.WAVES.push({ time: 660000, wave: this.wave9, init: false });
	
}

EnemyManager.prototype.wave1 = function()
{
	console.log("CALL WAVE 1");
	global.EnemyManager.WAVE_LEN = 20;
	
	global.EnemyManager.max_simple = 20;
	global.EnemyManager.max_medium = 0;
	global.EnemyManager.max_escape = 0;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave([EnemyTypes.SIMPLE_ENEMY], [20], [global.EnemyManager.timeToAddSimple]);
}

EnemyManager.prototype.wave2 = function()
{
	console.log("CALL WAVE 2");
	global.EnemyManager.WAVE_LEN = 24;
	
	global.EnemyManager.max_simple = 18;
	global.EnemyManager.max_medium = 5;
	global.EnemyManager.max_escape = 0;
	global.EnemyManager.max_chase = 1;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.CHASE_ENEMY],
		[18, 5, 1],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddChase]);
}

EnemyManager.prototype.wave3 = function()
{
	console.log("CALL WAVE 3");
	global.EnemyManager.WAVE_LEN = 33;
	
	global.EnemyManager.max_simple = 15;
	global.EnemyManager.max_medium = 10;
	global.EnemyManager.max_escape = 8;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY],
		[15, 10, 8],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape]);
}

EnemyManager.prototype.wave4 = function()
{
	console.log("CALL WAVE 4");
	global.EnemyManager.WAVE_LEN = 42;
	
	global.EnemyManager.max_simple = 15;
	global.EnemyManager.max_medium = 15;
	global.EnemyManager.max_escape = 10;
	global.EnemyManager.max_chase = 2;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY],
		[15, 15, 10, 2],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase]);
}

EnemyManager.prototype.wave5 = function()
{
	console.log("CALL WAVE 5");
	global.EnemyManager.WAVE_LEN = 46;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 16;
	global.EnemyManager.max_escape = 10;
	global.EnemyManager.max_chase = 6;
	global.EnemyManager.max_strong = 3;
	global.EnemyManager.max_vacuum = 1;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[10, 16, 10, 6, 3, 1],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave6 = function()
{
	console.log("CALL WAVE 6");
	global.EnemyManager.WAVE_LEN = 50;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 12;
	global.EnemyManager.max_escape = 10;
	global.EnemyManager.max_chase = 10;
	global.EnemyManager.max_strong = 6;
	global.EnemyManager.max_vacuum = 2;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[10, 12, 10, 10, 6, 2],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave7 = function()
{
	console.log("CALL WAVE 7");
	global.EnemyManager.WAVE_LEN = 51;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 10;
	global.EnemyManager.max_escape = 16;
	global.EnemyManager.max_chase = 5;
	global.EnemyManager.max_strong = 10;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY],
		[10, 10, 16, 5, 10, 0],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong]);
}

EnemyManager.prototype.wave8 = function()
{
	console.log("CALL WAVE 8");
	global.EnemyManager.WAVE_LEN = 56;
	
	global.EnemyManager.max_simple = 6;
	global.EnemyManager.max_medium = 10;
	global.EnemyManager.max_escape = 20;
	global.EnemyManager.max_chase = 5;
	global.EnemyManager.max_strong = 12;
	global.EnemyManager.max_vacuum = 3;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[6, 10, 20, 5, 12, 3],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave9 = function()
{
	console.log("CALL WAVE 9");
	global.EnemyManager.WAVE_LEN = 59;
	
	global.EnemyManager.max_simple = 20;
	global.EnemyManager.max_medium = 14;
	global.EnemyManager.max_escape = 10;
	global.EnemyManager.max_chase = 5;
	global.EnemyManager.max_strong = 6;
	global.EnemyManager.max_vacuum = 4;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[20, 14, 10, 5, 6, 4],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.addEnemy = function(type)
{
	if (this.enemies.length >= this.MAX_LEN) { return; }
	
	var enemy;
	switch(type)
	{
		case EnemyTypes.SIMPLE_ENEMY:
			enemy = new SimpleEnemy();
			if (this.simples.length < this.max_simple) { this.simples.push(enemy); } else { enemy = null; }
			break;
		case EnemyTypes.MEDIUM_ENEMY:
			enemy = new MediumEnemy();
			if (this.mediums.length < this.max_medium) { this.mediums.push(enemy); } else { enemy = null; }
			break;
		case EnemyTypes.ESCAPE_ENEMY:
			enemy = new EscapeEnemy();
			if (this.escapes.length < this.max_escape) { this.escapes.push(enemy); } else { enemy = null; }
			break;
		case EnemyTypes.CHASE_ENEMY:
			enemy = new ChaseEnemy();
			if (this.chases.length < this.max_chase) { this.chases.push(enemy); } else { enemy = null; }
			break;
		case EnemyTypes.STRONG_ENEMY:
			enemy = new StrongEnemy();
			if (this.strongs.length < this.max_strong) { this.strongs.push(enemy); } else { enemy = null; }
			break;
		
		case EnemyTypes.VACUUM_ENEMY:
			enemy = new VacuumEnemy();
			if (this.vacuums.length < this.max_vacuum) { this.vacuums.push(enemy); } else { enemy = null; }
			break;
		case EnemyTypes.TANK_ENEMY:
			enemy = new TankEnemy();
			if (this.tanks.length < this.max_tank) { this.tanks.push(enemy); } else { enemy = null; }
			this.tank = enemy;
			break;
	}
	if (enemy)
	{
		enemy.init();
		
		this.enemiesCont.addChild(enemy);
		this.enemies.push(enemy);
	}
}




EnemyManager.prototype.initWave = function(types,nums,times)
{
	//this.isWaveInit = true;
	
	var len = types.length;
	for (var i = 0; i < len; i++)
	{
		for (var j = 0; j < nums[i]; j++)
		{
			var tween = createjs.Tween.get(this, {loop:false});
			var obj = { };
			tween.to( { },times[i]).call(this.addEnemy, [types[i]]);
		}
	}
	
	//TODO инициализация волны
	//Задаем параметры, массив типов, массив количества каждого типа, массив промежутки появления для каждого типа
	//После отработки инициализации, продолжение слежки за волной, постоянной пополнение определенным количеством мобов
	//Задание коэффициента усиления монстров
	
	/*
	function wtf(type)
	{
		console.log(type);
	}*/
}


EnemyManager.prototype.blow = function(unit)
{
	var ssBlow = new createjs.SpriteSheet({ "animations": {
		"run": [0, 15]},
		"images": [global.preloader.imgs.blow_anim],
		"frames": {
		"regX": global.preloader.imgs.blow_anim.height/2,
		"regY": global.preloader.imgs.blow_anim.height/2,
		"height": global.preloader.imgs.blow_anim.height,
		"width": global.preloader.imgs.blow_anim.height
		}
	});	
	
	ssBlow.getAnimation("run").frequency = 2;
	
	var blow = new createjs.BitmapAnimation(ssBlow);
	
	blow.onAnimationEnd = function(anim, frame)
	{
		anim.stop();
		global.EnemyManager.enemiesCont.removeChild(anim);
		anim = null;
		//global.EnemyManager.removeEnemy(unit);
	}
	
	//var scale = 0.6;
	blow.x = unit.x;
	blow.y = unit.y;
	global.EnemyManager.enemiesCont.addChild(blow);
				
	blow.gotoAndPlay("run");
	blow.rotation = Math.random()*360;
	blow.scaleX = blow.scaleY = 0.7;
	
	unit.stopUnit = true;
	
	global.EnemyManager.removeEnemy(unit);
}

EnemyManager.prototype.removeEnemy = function(enemy)
{
	var index = this.enemies.indexOf(enemy);
	if (index != -1)
	{
		if (this.enemiesCont.contains(enemy)) { this.enemiesCont.removeChild(enemy); }
		
		//enemy.clearData();
		
		global.points += enemy.points;
		
		this.removeTypeEnemy(enemy, this.arrayTypes[enemy.type]);
		
		this.totalEnemyKills++;
		
		this.enemies.splice(index,1);
		enemy = null;
	}
	
	//console.log("ENEMIES " + this.enemies.length);
}

EnemyManager.prototype.removeTypeEnemy = function(enemy, arrType)
{
	var ind = arrType.indexOf(enemy);
	if (ind!=-1) { arrType.splice(ind,1); }
}

EnemyManager.prototype.update = function(elapsedTime)
{
	this.move(elapsedTime);
	
	for (var i = 0; i < this.WAVES.length; i++)
	{
		var obj = this.WAVES[i];
		if (obj.init == true) { continue; }
		obj.time -= elapsedTime;
		if (obj.time <= 0) { obj.wave.call(); obj.init = true; }
	}
	
	this.checkAddSimpleEnemy(elapsedTime);
	this.checkAddMediumEnemy(elapsedTime);
	this.checkAddEscapeEnemy(elapsedTime);
	this.checkAddStrongEnemy(elapsedTime);
	this.checkAddChaseEnemy(elapsedTime);
	this.checkAddTankEnemy(elapsedTime);
	this.checkAddVacuumEnemy(elapsedTime);
	
}

EnemyManager.prototype.move = function(elapsedTime)
{
	if (this.freezTime > 0){
		this.freezTime-=elapsedTime;
	}
	
	if (this.enemyScaleTime > 0)
	{
		this.enemyScaleTime-=elapsedTime;
	} else {
		this.enemyScaleTime = 0;
		
		if (this.enemyScaleMode)
		{
			for (var j = 0; j < this.enemies.length; j++)
			{
				this.enemies[j].setNormalEnemy();
			}
		}
		
		this.enemyScaleMode = false;
	}
	
	for (var i = 0; i < this.enemies.length; i++)
	{
		if (this.enemies[i] != null)
		{
			this.enemies[i].move(elapsedTime);
		}
	}
}

EnemyManager.prototype.checkAddSimpleEnemy = function(elapsedTime)
{
	this.timerAddSimpleEnemy += elapsedTime;
	if (this.timerAddSimpleEnemy >= this.timeToAddSimple)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.SIMPLE_ENEMY);
		}
		this.timerAddSimpleEnemy = 0;
	}
}

EnemyManager.prototype.checkAddMediumEnemy = function(elapsedTime)
{
	this.timerAddMediumEnemy += elapsedTime;
	if (this.timerAddMediumEnemy >= this.timerToAddMedium)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.MEDIUM_ENEMY);
		}
		this.timerAddMediumEnemy = 0;
	}
}

EnemyManager.prototype.checkAddEscapeEnemy = function(elapsedTime)
{
	this.timerAddEscapeEnemy += elapsedTime;
	if (this.timerAddEscapeEnemy >= this.timerToAddEscape)
	{
		for (var i = 0; i < 2; i++)
		{
			this.addEnemy(EnemyTypes.ESCAPE_ENEMY);
		}
		this.timerAddEscapeEnemy = 0;
	}
}

EnemyManager.prototype.checkAddStrongEnemy = function(elapsedTime)
{
	this.timerAddStrongEnemy += elapsedTime;
	if (this.timerAddStrongEnemy >= this.timerToAddStrong)
	{
		for (var i = 0; i < 2; i++)
		{
			this.addEnemy(EnemyTypes.STRONG_ENEMY);
		}
		this.timerAddStrongEnemy = 0;
	}
}

EnemyManager.prototype.checkAddChaseEnemy = function(elapsedTime)
{
	this.timerAddChaseEnemy += elapsedTime;
	if (this.timerAddChaseEnemy >= this.timerToAddChase)
	{
		for (var i = 0; i < 2; i++)
		{
			this.addEnemy(EnemyTypes.CHASE_ENEMY);
		}
		this.timerAddChaseEnemy = 0;
	}
}

EnemyManager.prototype.checkAddTankEnemy = function(elapsedTime)
{
	for (var j = 0; j < global.EnemyManager.enemies.length; j++)
	{
		var enemy = global.EnemyManager.enemies[j];
		if (enemy.type == EnemyTypes.TANK_ENEMY) { return; }
	}
	
	this.timerAddTankEnemy += elapsedTime;
	if (this.timerAddTankEnemy >= this.timerToAddTank)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.TANK_ENEMY);
		}
		this.timerAddTankEnemy = 0;
	}
}

EnemyManager.prototype.checkAddVacuumEnemy = function(elapsedTime)
{
	this.timerAddVacuumEnemy += elapsedTime;
	if (this.timerAddVacuumEnemy >= this.timerToAddVacuum)
	{
		for (var i = 0; i < 1; i++)
		{
			this.addEnemy(EnemyTypes.VACUUM_ENEMY);
		}
		this.timerAddVacuumEnemy = 0;
	}
}

EnemyManager.prototype.clearAll = function()
{
	for (var i = 0; i < this.enemies.length; i++)
	{
		if(!this.enemies[i]) { continue; } 
		
		if (this.enemiesCont.contains(this.enemies[i])) { this.enemiesCont.removeChild(this.enemies[i]) }
		this.enemies[i].clearData();
		this.enemies[i] = null;
	}
	this.enemies.length = 0;
	this.vacuums.length = 0;
	
	//if (this.enemiesCont.parent) { this.enemiesCont.parent.removeChild(this.enemiesCont); }
	var num = this.enemiesCont.getNumChildren();
	while(num--) { this.enemiesCont.removeChildAt(num); }
	
	this.vacuumSize = 150;
	
	this.tank = null;
	
	this.freezMode = false;
	this.freezTime = 0;
	
	this.enemyScaleMode = false;
	this.enemyScaleTime = 0;
}
