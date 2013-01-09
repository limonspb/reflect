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
	this.timeToAddSimple = 2000;
	
	this.timerAddMediumEnemy = 0;
	this.timerToAddMedium = 3000;
	
	this.timerAddEscapeEnemy = 0;
	this.timerToAddEscape = 4000;
	
	this.timerAddStrongEnemy = 0;
	this.timerToAddStrong = 7000;
	
	this.timerAddChaseEnemy = 0;
	this.timerToAddChase = 6000;
	
	this.timerAddTankEnemy = 0;
	this.timerToAddTank = 40000;
	
	this.timerAddVacuumEnemy = 0;
	this.timerToAddVacuum = 10000;
	
	
	this.totalEnemyKills = 0;
	
	this.WAVES = [];
	
	this.skillKoeff = 1;
	
	this.MAX_LEN = 100;
	
	this.WAVE_LEN = 0;
	
	this.max_simple = 1;
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
	
	
	this.WAVES.push({ time: 0, wave: this.wave1, timeToInit: 5000, init: false });
	this.WAVES.push({ time: 0, wave: this.wave2, timeToInit: 30000, init: false });//50
	this.WAVES.push({ time: 0, wave: this.wave3, timeToInit: 45000, init: false });//50
	this.WAVES.push({ time: 0, wave: this.wave4, timeToInit: 50000, init: false });//60
	this.WAVES.push({ time: 0, wave: this.wave5, timeToInit: 50000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave6, timeToInit: 60000, init: false });//90
	this.WAVES.push({ time: 0, wave: this.wave7, timeToInit: 50000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave8, timeToInit: 60000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave9, timeToInit: 80000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave10, timeToInit: 80000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave11, timeToInit: 70000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave12, timeToInit: 70000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave13, timeToInit: 70000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave14, timeToInit: 70000, init: false });//80
	this.WAVES.push({ time: 0, wave: this.wave15, timeToInit: 70000, init: false });//80
	
	this.WAVES.push({ time: 0, wave: this.wave16, timeToInit: 90000, init: false });//120
	this.WAVES.push({ time: 0, wave: this.wave17, timeToInit: 90000, init: false });//120
	this.WAVES.push({ time: 0, wave: this.wave18, timeToInit: 100000, init: false });//130
	this.WAVES.push({ time: 0, wave: this.wave19, timeToInit: 120000, init: false });//150
	this.WAVES.push({ time: 0, wave: this.wave20, timeToInit: 140000, init: false });//190
	this.WAVES.push({ time: 0, wave: this.wave21, timeToInit: 130000, init: false });//180
}

EnemyManager.prototype.waweTest = function()
{
	log("CALL WAVE TEST");
	global.EnemyManager.WAVE_LEN = 100;
	
	global.EnemyManager.max_simple = 30;
	global.EnemyManager.max_medium = 30;
	global.EnemyManager.max_escape = 0;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 10;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[30, 30, 10],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddVecuum]);
}



EnemyManager.prototype.wave1 = function()
{
	log("CALL WAVE 1");
	global.EnemyManager.WAVE_LEN = 5;
	
	global.EnemyManager.max_simple = 5;
	global.EnemyManager.max_medium = 0;
	global.EnemyManager.max_escape = 0;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave([EnemyTypes.SIMPLE_ENEMY], [5], [global.EnemyManager.timeToAddSimple]);
}

EnemyManager.prototype.wave1 = EnemyManager.prototype.waweTest;//For testing. Do not delete. Comment it

EnemyManager.prototype.wave2 = function()
{
	log("CALL WAVE 2");
	global.EnemyManager.WAVE_LEN = 10;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 0;
	global.EnemyManager.max_escape = 0;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY],
		[10],
		[global.EnemyManager.timeToAddSimple]);
}

EnemyManager.prototype.wave3 = function()
{
	log("CALL WAVE 3");
	global.EnemyManager.WAVE_LEN = 15;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 5;
	global.EnemyManager.max_escape = 0;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY],
		[10, 5],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium]);
}

EnemyManager.prototype.wave4 = function()
{
	log("CALL WAVE 4");
	global.EnemyManager.WAVE_LEN = 25;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 10;
	global.EnemyManager.max_escape = 5;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY],
		[10, 10, 5],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape]);
}


EnemyManager.prototype.wave5 = function()
{
	log("CALL WAVE 5");
	global.EnemyManager.WAVE_LEN = 33;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 12;
	global.EnemyManager.max_escape = 8;
	global.EnemyManager.max_chase = 3;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY],
		[10, 12, 8, 3],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase]);
}

EnemyManager.prototype.wave6 = function()
{
	log("CALL WAVE 6");
	global.EnemyManager.WAVE_LEN = 35;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 10;
	global.EnemyManager.max_escape = 10;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 5;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.STRONG_ENEMY],
		[10, 10, 10, 5],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddStrong]);
}

EnemyManager.prototype.wave7 = function()
{
	log("CALL WAVE 7");
	global.EnemyManager.WAVE_LEN = 21;
	
	global.EnemyManager.max_simple = 3;
	global.EnemyManager.max_medium = 3;
	global.EnemyManager.max_escape = 3;
	global.EnemyManager.max_chase = 8;
	global.EnemyManager.max_strong = 2;
	global.EnemyManager.max_vacuum = 2;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[3, 3, 3, 8, 2, 2],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave8 = function()
{
	log("CALL WAVE 8");
	global.EnemyManager.WAVE_LEN = 17;
	
	global.EnemyManager.max_simple = 0;
	global.EnemyManager.max_medium = 0;
	global.EnemyManager.max_escape = 5;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 7;
	global.EnemyManager.max_vacuum = 5;
	
	global.EnemyManager.initWave(
		[EnemyTypes.ESCAPE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[5, 7, 5],
		[global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave9 = function()
{
	log("CALL WAVE 9");
	global.EnemyManager.WAVE_LEN = 25;
	
	global.EnemyManager.max_simple = 0;
	global.EnemyManager.max_medium = 0;
	global.EnemyManager.max_escape = 0;
	global.EnemyManager.max_chase = 0;
	global.EnemyManager.max_strong = 0;
	global.EnemyManager.max_vacuum = 20;
	
	global.EnemyManager.initWave(
		[EnemyTypes.VACUUM_ENEMY],
		[20],
		[global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave10 = function()
{
	log("CALL WAVE 10");
	global.EnemyManager.WAVE_LEN = 50;
	
	global.EnemyManager.max_simple = 0;
	global.EnemyManager.max_medium = 0;
	global.EnemyManager.max_escape = 10;
	global.EnemyManager.max_chase = 10;
	global.EnemyManager.max_strong = 30;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY],
		[10, 10, 30],
		[global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong]);
}

////////////////////////////////////////////////////////////////
EnemyManager.prototype.wave11 = function()
{
	log("CALL WAVE 11");
	global.EnemyManager.WAVE_LEN = 58;
	
	global.EnemyManager.max_simple = 12;
	global.EnemyManager.max_medium = 16;
	global.EnemyManager.max_escape = 13;
	global.EnemyManager.max_chase = 10;
	global.EnemyManager.max_strong = 5;
	global.EnemyManager.max_vacuum = 2;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[12, 16, 13, 10, 5, 2],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave12 = function()
{
	log("CALL WAVE 12");
	global.EnemyManager.WAVE_LEN = 75;
	
	global.EnemyManager.max_simple = 15;
	global.EnemyManager.max_medium = 15;
	global.EnemyManager.max_escape = 15;
	global.EnemyManager.max_chase = 15;
	global.EnemyManager.max_strong = 10;
	global.EnemyManager.max_vacuum = 5;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[15, 15, 15, 15, 10, 5],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave13 = function()
{
	log("CALL WAVE 13");
	global.EnemyManager.WAVE_LEN = 62;
	
	global.EnemyManager.max_simple = 12;
	global.EnemyManager.max_medium = 14;
	global.EnemyManager.max_escape = 16;
	global.EnemyManager.max_chase = 5;
	global.EnemyManager.max_strong = 15;
	global.EnemyManager.max_vacuum = 0;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY],
		[12, 14, 16, 5, 15, 0],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong]);
}

EnemyManager.prototype.wave14 = function()
{
	log("CALL WAVE 14");
	global.EnemyManager.WAVE_LEN = 67;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 12;
	global.EnemyManager.max_escape = 20;
	global.EnemyManager.max_chase = 10;
	global.EnemyManager.max_strong = 10;
	global.EnemyManager.max_vacuum = 5;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[10, 12, 20, 10, 10, 5],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave15 = function()
{
	log("CALL WAVE 15");
	global.EnemyManager.WAVE_LEN = 72;
	
	global.EnemyManager.max_simple = 23;
	global.EnemyManager.max_medium = 15;
	global.EnemyManager.max_escape = 13;
	global.EnemyManager.max_chase = 7;
	global.EnemyManager.max_strong = 7;
	global.EnemyManager.max_vacuum = 7;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[23, 15, 13, 7, 7, 7],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

/** -----зацикленные волны----- **/

EnemyManager.prototype.wave16 = function()
{
	this.skillKoeff += 1;
	
	log("CALL WAVE 16");
	global.EnemyManager.WAVE_LEN = 63;
	
	global.EnemyManager.max_simple = 15;
	global.EnemyManager.max_medium = 15;
	global.EnemyManager.max_escape = 15;
	global.EnemyManager.max_chase = 4;
	global.EnemyManager.max_strong = 10;
	global.EnemyManager.max_vacuum = 4;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[15, 15, 15, 4, 10, 4],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave17 = function()
{
	log("CALL WAVE 17");
	global.EnemyManager.WAVE_LEN = 61;
	
	global.EnemyManager.max_simple = 15;
	global.EnemyManager.max_medium = 10;
	global.EnemyManager.max_escape = 10;
	global.EnemyManager.max_chase = 6;
	global.EnemyManager.max_strong = 15;
	global.EnemyManager.max_vacuum = 5;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[15, 10, 10, 6, 15, 5],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave18 = function()
{
	log("CALL WAVE 18");
	global.EnemyManager.WAVE_LEN = 63;
	
	global.EnemyManager.max_simple = 20;
	global.EnemyManager.max_medium = 14;
	global.EnemyManager.max_escape = 5;
	global.EnemyManager.max_chase = 4;
	global.EnemyManager.max_strong = 15;
	global.EnemyManager.max_vacuum = 5;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[20, 14, 5, 4, 15, 5],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave19 = function()
{
	log("CALL WAVE 19");
	global.EnemyManager.WAVE_LEN = 61;
	
	global.EnemyManager.max_simple = 15;
	global.EnemyManager.max_medium = 6;
	global.EnemyManager.max_escape = 14;
	global.EnemyManager.max_chase = 6;
	global.EnemyManager.max_strong = 14;
	global.EnemyManager.max_vacuum = 6;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[15, 6, 14, 6, 14, 6],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave20 = function()
{
	log("CALL WAVE 20");
	global.EnemyManager.WAVE_LEN = 66;
	
	global.EnemyManager.max_simple = 10;
	global.EnemyManager.max_medium = 10;
	global.EnemyManager.max_escape = 20;
	global.EnemyManager.max_chase = 2;
	global.EnemyManager.max_strong = 18;
	global.EnemyManager.max_vacuum = 6;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[10, 10, 20, 2, 18, 6],
		[global.EnemyManager.timeToAddSimple, global.EnemyManager.timerToAddMedium, global.EnemyManager.timerToAddEscape, global.EnemyManager.timerToAddChase, global.EnemyManager.timerToAddStrong, global.EnemyManager.timerToAddVecuum]);
}

EnemyManager.prototype.wave21 = function()
{
	log("CALL WAVE 21");
	global.EnemyManager.WAVE_LEN = 78;
	
	global.EnemyManager.max_simple = 20;
	global.EnemyManager.max_medium = 14;
	global.EnemyManager.max_escape = 16;
	global.EnemyManager.max_chase = 4;
	global.EnemyManager.max_strong = 14;
	global.EnemyManager.max_vacuum = 10;
	
	global.EnemyManager.initWave(
		[EnemyTypes.SIMPLE_ENEMY, EnemyTypes.MEDIUM_ENEMY, EnemyTypes.ESCAPE_ENEMY, EnemyTypes.CHASE_ENEMY, EnemyTypes.STRONG_ENEMY, EnemyTypes.VACUUM_ENEMY],
		[20, 14, 16, 4, 14, 10],
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
	var len = types.length;
	for (var i = 0; i < len; i++)
	{
		for (var j = 0; j < nums[i]; j++)
		{
			var tween = createjs.Tween.get(this, {loop:false});
			tween.to( { },times[i]).call(this.addEnemy, [types[i]]);
		}
	}
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
	playExp();
}

EnemyManager.prototype.removeEnemy = function(enemy)
{
	var index = this.enemies.indexOf(enemy);
	if (index != -1)
	{
		if (this.enemiesCont.contains(enemy)) { this.enemiesCont.removeChild(enemy); }//???08 здесь два раза будет вычислен индекс в массиве
																					  // не будет! это же разные массивы, и это стандартная проверка на всякий случай
																					  // она популярна во флеш
																					  //где же это разные массивы? Он один - enemiesCont
																					  //вот тут this.enemiesCont.contains(enemy) - вычислится номер элемента
																					  //а вот тут this.enemiesCont.removeChild(enemy) - вычислится снова
		//enemy.clearData();
		
		global.points += enemy.points;
		
		this.removeTypeEnemy(enemy, this.arrayTypes[enemy.type]);
		
		
		this.totalEnemyKills++;
		
		this.enemies.splice(index,1);
		enemy = null;
	}
	
	//log("ENEMIES " + this.enemies.length);
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
		else if (i > 0) {
			if (this.WAVES[i-1].init == false)
			{
				break;
			}
		}
		obj.time += elapsedTime;
		if (obj.time >= obj.timeToInit) {
			obj.wave.call();
			obj.init = true;
			obj.time = 0;
			if (i == this.WAVES.length - 1)
			{
				var lenW = this.WAVES.length;
				this.WAVES[lenW-6].init = false;
				this.WAVES[lenW-5].init = false;
				this.WAVES[lenW-4].init = false;
				this.WAVES[lenW-3].init = false;
				this.WAVES[lenW-2].init = false;
				this.WAVES[lenW-1].init = false;
			}
		}
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
	
	
	//if (this.enemiesCont.parent) { this.enemiesCont.parent.removeChild(this.enemiesCont); }
	var num = this.enemiesCont.getNumChildren();
	while(num--) { this.enemiesCont.removeChildAt(num); }
	
	this.vacuumSize = 150;
	
	this.tank = null;
	
	this.freezMode = false;
	this.freezTime = 0;
	
	this.enemyScaleMode = false;
	this.enemyScaleTime = 0;
	
	
	this.totalEnemyKills = 0;
	
	this.skillKoeff = 1;
	
	this.MAX_LEN = 100;
	
	this.WAVE_LEN = 0;
	
	for (var i = 0; i < this.WAVES.length; i++)
	{
		var obj = this.WAVES[i];
		obj.time = 0;
		obj.init = false;
	}
	
	this.max_simple = 0;
	this.simples.length = 0;
	this.max_medium = 0;
	this.mediums.length = 0;
	this.max_escape = 0;
	this.escapes.length = 0;
	this.max_chase = 0;
	this.chases.length = 0;
	this.max_stong = 0;
	this.strongs.length = 0;
	this.max_vacuum = 0;
	this.vacuums.length = 0;
	this.max_tank = 1;
	this.tanks.length = 0;
	
	this.timerAddSimpleEnemy = 0;
	this.timeToAddSimple = 2000;
	this.timerAddMediumEnemy = 0;
	this.timerToAddMedium = 3000;
	this.timerAddEscapeEnemy = 0;
	this.timerToAddEscape = 4000;
	this.timerAddStrongEnemy = 0;
	this.timerToAddStrong = 7000;
	this.timerAddChaseEnemy = 0;
	this.timerToAddChase = 6000;
	this.timerAddTankEnemy = 0;
	this.timerToAddTank = 40000;
	this.timerAddVacuumEnemy = 0;
	this.timerToAddVacuum = 10000;
}
