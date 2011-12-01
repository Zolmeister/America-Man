window.onkeydown=function(e){
	if((e.keyCode==39 || e.keyCode==68) && mvR==0) {
		mvR=self.setInterval("scrollX(p1,"+(p1.walkSp*-1)+");p1.frameNext();",frameRate);//right arrow
		p1.dir="right";
	}
	else if((e.keyCode==37 || e.keyCode==65) && mvL==0) {
		mvL=self.setInterval("scrollX(p1,"+p1.walkSp+");p1.frameNext();",frameRate);//left arrow
		p1.dir="left";
	}
	else if (e.keyCode==32 && !p1.jumping) jump();
}
window.onkeyup=function(e){
	if(e.keyCode==39 || e.keyCode==68) {//right arrow
		window.clearInterval(mvR);
		mvR=0;
	}
	else if(e.keyCode==37 || e.keyCode==65){
		window.clearInterval(mvL);
		mvL=0;
	}//left arrow
}
window.onload=function(){
	start();
}
