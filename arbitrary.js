function getMap(){
	return map1;
}
function addImages(){//implement better
	//document.write('<img id="terrain1" src="terrain1.png" style="visibility:hidden;">');
}
function start(){
	//addImages();
	drawMap();
	drawLives();
	frameHandler=self.setInterval("drawMap();",frameRate);
	commy1Mover=self.setInterval("moveCommy1s();", frameRate);
}
function drawLives(){
	
}
audioOn=true;
function audioControl(){
e=document.getElementById('controls');
if(audioOn){
audioOn=false;
e.innerHTML='audio: off';
document.getElementById('bgSound').muted = true;
document.getElementById('dieSound').muted = true;
} 
else {
audioOn=true;
e.innerHTML='audio: on';
document.getElementById('bgSound').muted = false;
document.getElementById('dieSound').muted = false;
}
}
