player=function(){
	this.name="p1";
	this.x=0;
	this.y=0;
	this.height=squareH*2;
	this.width=squareW;
	this.dir="right";
	this.frame=0;
	this.jumpingImg=document.getElementById("Pjumping");
	this.anim=[document.getElementById("Pstanding"),document.getElementById("Pleftforward"),document.getElementById("Pstanding"),document.getElementById("Prightforward")];
	this.walkSp=10;
	this.jumping=false;
	this.jmpSpeed=25;
	this.jmpSpeedOrigin=this.jmpSpeed;
	this.frameNext=frameNext;
}
frameNext=function(){
	if(this.frame==this.anim.length-1) this.frame=0;
	else this.frame+=1;
}
block=function(){
	this.x=0;
	this.y=0;
	this.width=squareW;
	this.height=squareH;
}
commy1=function(x,y){
	this.name="commy1";
	this.walkSp=10;
	this.anim=[document.getElementById("C1standing"),document.getElementById("C1leftForward"),document.getElementById("C1standing"),document.getElementById("C1rightForward")];
	//commy1Mover=self.setInterval("moveCommy1s()", 1000);
	this.x=x;
	this.y=y;
	this.lastX=0;
	this.origX=x;
	this.origY=y;
	this.dir="right";
	this.frame=0;
	this.isDead=false;
	this.width=squareW;
	this.height=2*squareH;
	this.frameNext=frameNext;
	this.jumping=false;
	this.flip=flip;
	this.jmpSpeed=25;
	this.jmpSpeedOrigin=this.jmpSpeed;
}
flip=function(){
	if(this.dir=="right") this.dir="left";
	else this.dir="right";
}