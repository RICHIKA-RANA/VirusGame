function load_images(){
	virus_image= new Image;
	virus_image.src ="img/virus.gif";	

	player_image= new Image;
	player_image.src ="img/player.png";	

	gem_image= new Image;
	gem_image.src ="img/gem.gif";	
}
function init(){ 

	canvas=document.getElementById('mycanvas');
	console.log(canvas);

	w = 1338
	h = 668

	canvas.width =w
	canvas.height = h

	score = 0;
	game_over = false;

	pen=canvas.getContext("2d");
	console.log(pen); 

	e1= {
		x : 150,
		y : 50,
		w : 90,
		h : 90,
		speed :15,
	};
	e2= {
		x : 350,
		y : 100,
		w : 100,
		h : 100,
		speed :25,
	};
	e3= {
		x : 600,
		y : 250,
		w : 120,
		h : 120,
		speed :35,
	};
	e4= {
		x : 800,
		y : 300,
		w : 130,
		h : 130,
		speed :45,
	};
	e5= {
		x : 1000,
		y : 450,
		w : 140,
		h : 140,
		speed :55,
	};
	enemy = [e1,e2,e3,e4,e5];

	player = {
		x : 20,
		y : h/3,
		w : 60,
		h : 60,
		speed : 20,
		moving : 'false',
	}

	gem = {
		x : w-100,
		y : h/3,
		w : 60,
		h : 60,
	}

	canvas.addEventListener('mousedown',function() {
		console.log("You press the mouse");
		player.moving = true;
	});
	canvas.addEventListener('mouseup',function() {
		console.log("You released the mouse");
		player.moving = false;
	});
}

function draw(){

	pen.clearRect(0,0,w,h);
	pen.fillStyle="red";

	pen.drawImage(player_image,player.x,player.y,player.w,player.h);	
	pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);	

	for (let i =0; i < enemy.length; i++) {
		pen.drawImage(virus_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);	
	}
	pen.fillStyle= "white";
	pen.fillText("score " + score,10,10);
}	

function isColliding(b1,b2) {
	if (Math.abs(b1.x - b2.x)<= 30 && Math.abs(b1.y - b2.y)<= 30) {
		return true;
	}
	return false;
}

function update() {

	if (player.moving == true) {
		player.x += player.speed;
		score += 20;
	}

	for (let i = 0; i <enemy.length; i++) {
		if (isColliding(enemy[i],player)) {
			score -= i*100;
			if (score<0) {
				game_over = true;
				alert("Game over!");
			}
		}
	}

	if (isColliding(gem,player)) {
		game_over= true;
		draw();
		alert("Your Score " + score);
	}

	for (let i =0; i < enemy.length; i++) {
		enemy[i].y += enemy[i].speed;
		if (enemy[i].y>h-enemy[i].h || enemy[i].y<0) {
			enemy[i].speed *= -1;
		}
	}
}

function Gameloop() {
	
	if (game_over == true) {
		clearInterwal(f);
	}
	draw();
	update();
}

load_images();
init();
var f = setInterval(Gameloop,100);