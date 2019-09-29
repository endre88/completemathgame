let playing=false;
let score;
let timeremaining;
var correctAnswer;
let fastanswer;

document.getElementById("startreset").onclick=function(){
	if (playing==true){//if we are playing
		history.go(0);;//oldal újratöltés
		
	}
	else{
		score=0;
		playing=true;
		document.getElementById("scorevalue").innerHTML=score;
		show("timeremaining");
		timeremaining=60;
		document.getElementById("startreset").innerHTML="Reset Game";
		hide("gameover")
		
		//Start countdown
		startCountdown();
		generateQA();
	}
}


for(i=1;i<5;i++){
//click on asnwer box
	document.getElementById("box"+i).onclick=function(){
		//check if we playing
		if (playing==true){ //yes
			if(this.innerHTML==correctAnswer){ //correct answer
				score++;
				document.getElementById("scorevalue").innerHTML=score;
				hide("wrong");
				show("correct");
				setTimeout(function(){hide("correct")},1000);
				generateQA();
			}
			else{
				hide("correct");
				show("wrong");
				setTimeout(function(){hide("wrong")},1000);
			}
		}
}
}

function startCountdown(){
	action=setInterval(function(){
		timeremaining-=1;
		document.getElementById("timeremainingvalue").innerHTML=timeremaining;
	if (timeremaining==0){
		stopCountdown();
		show("gameover");
		document.getElementById("scoreend").innerHTML=score +".";
		hide("timeremaining");
		hide("wrong");
		hide("correct");
		playing=false;
		document.getElementById("startreset").innerHTML="Start Game";
	}
	},1000);
	
}

function stopCountdown(){
	clearInterval(action);
}

function show(Id){
	document.getElementById(Id).style.display="block";
}

function hide(Id){
	document.getElementById(Id).style.display="none";
}

function generateQA(){
	let x=1+Math.round(Math.random()*9);
	let y=1+Math.round(Math.random()*9);
	correctAnswer=x*y;
	document.getElementById("question").innerHTML=x + "x" + y;
	let correctPosition=1+Math.round(Math.random()*3);
	document.getElementById("box"+ correctPosition).innerHTML=correctAnswer;
	  
	var answer=[correctAnswer];
	for(i=1;i<5;i++){
		if(i!==correctPosition){
			var wrongAnswer;
			do {
				wrongAnswer=(1+Math.round(Math.random()*9))*(1+Math.round(Math.random()*9));}
			while (answer.indexOf(wrongAnswer)>-1);
			document.getElementById("box"+i).innerHTML=wrongAnswer;
			answer.push(wrongAnswer);
		}
	}
}