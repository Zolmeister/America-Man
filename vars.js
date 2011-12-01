squareH=25;
squareW=25;
p1=new player();
cvs=document.getElementById("main").getContext("2d");
commy1s=new Array();
cvs.save();
map=getMap();
frameRate=66;//60?fps
var mvR;
var mvL;
testRadius=200;

blocks=new Array();
blockks=new Array();
gravity=3;
function resetVars(){
	cvs.restore();
	cvs.save();
	blocks=new Array();
	blockks=new Array();
	p1=new player();
	map=getMap();
	resetPlayer();
	resetCommy1s();
}
function resetCommy1s(){
	
}
function resetPlayer(){
	document.body.innerHTML+="<meta http-equiv='refresh' content='0'>";
}