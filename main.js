function drawMap(){
	cameraReset();
	if(chkDeath()) {
		document.getElementById('dieSound').play();
		alert("dead");
		resetVars();
	}
	cvs.clearRect(0,0,10000,10000);
	for(x=0;x<map.length;x++){
		for (y=0;y<map[x].length;y++){
			if (map[x][y]=="S") {
				drawPlayer(x,y);
			}
			if (map[x][y]=="B") {
				cvs.drawImage(document.getElementById("block1"),x*squareW,y*squareH);
				blockks.push([x*squareW,y*squareH,squareW,squareH]);
			}
			if (map[x][y]=="T") {
				cvs.drawImage(document.getElementById("terrain1"),x*squareW,y*squareH);
				blockks.push([x*squareW,y*squareH,squareW,squareH]);
			}
			if (map[x][y]=="C1") {
				drawCommy1(x*squareW,y*squareH);
				//drawCommy1s();
				//cvs.drawImage(document.getElementById("C1standing"),x*squareW,y*squareH,commy1W,commy1H);
				//blockks.push([x*squareW,y*squareH,squareW,squareH]);
			}
			if (map[x][y]=="E") {
				cvs.drawImage(document.getElementById("flag1"),x*squareW,y*squareH,squareW,squareH);
				blockks.push([x*squareW,y*squareH,squareW,squareH]);
			}
			//add other objects at loc x,y
		}
	}
	blocks=[];
	for (i=0;i<blockks.length;i++){
		tmp=new block();
		tmp.x=blockks[i][0];
		tmp.y=blockks[i][1];
		tmp.width=blockks[i][2];
		tmp.height=blockks[i][3];
		blocks.push(tmp);
	}
	blockks=[];
	cameraToPlayer();
	return [0,0];
}
function cameraReset(){
	cvs.translate((p1.x-100)*-1,(p1.y)*-1);
}
function cameraToPlayer(){
	cvs.translate(p1.x-100,p1.y);
}
function scrollY(n){
	p1.y-=n;
	collided=false;
	//console.log(n);
	if(n<0){//check down 		p1.y-=n;
		for (i=0;i<blocks.length;i++){
			//blocks[i].y+=n;
			if(Math.abs(blocks[i].y-p1.y)>testRadius || Math.abs(blocks[i].x-p1.x)>testRadius) continue;//efficient checking
			if (collideDown(p1,blocks[i]) && !collided) {
				collided=true;
				window.clearInterval(jmp);//stop jumping
				jmp=null;
				p1.jumping=false;
				p1.jmpSpeed=p1.jmpSpeedOrigin; //p1.y+=n;
				for (b=0;b<blocks.length;b++){
					//blocks[b].y-=n;
				}
				//p1.y+=n;
				//n=0;
				//----- adjust -----
				n=(blocks[i].y-p1.y-p1.height)*-1;
				p1.y+=n*-1;
				for (b=0;b<blocks.length;b++){
					//blocks[b].y-=n*-1;
				}
				//cvs.translate(blocks[i].x-p1.x-p1.width,0);
				//drawMap();
			}
		}
		
	}
	else{//check up-- limitation: does not work if already touching block above
		//p1.y-=n;
		for (i=0;i<blocks.length;i++){
			blocks[i].y+=n;
			if(Math.abs(blocks[i].y-p1.y)>testRadius || Math.abs(blocks[i].x-p1.x)>testRadius) continue;
			if (collideUp(p1,blocks[i]) && !collided) {
				collided=true;
				//p1.y+=n;
				for (b=0;b<blocks.length;b++){
					//blocks[b].y-=n;
				}
				p1.jmpSpeed=0;
				//n=(blocks[i].y-p1.y+p1.height)*-1;
				//p1.y+=n*-1;
				for (b=0;b<blocks.length;b++){
					//blocks[b].y-=n*-1;
				}
				p1.y+=n;
			}
		}
	}
	
	//cvs.clearRect(0,0,10000,10000);
	//cvs.translate(0,n);
	//drawMap();
}
function scrollX(e,n){
	e.x-=n;
	collided=false;
	//*before moving right or left, check for block in front
	//console.log(n);
	if(n<0){//check right
		//p1.x-=n;
		for (i=0;i<blocks.length;i++){
			//blocks[i].x+=n;
			if(Math.abs(blocks[i].y-e.y)>testRadius || Math.abs(blocks[i].x-e.x)>testRadius) continue;
			if (collideRight(e,blocks[i]) && !collided) {
				collided=true;
				n=(blocks[i].x-e.x-e.width)*-1;
				e.x+=blocks[i].x-e.x-e.width;
			}
		}
		
	}
	else{//check left
		//p1.x-=n;
		for (i=0;i<blocks.length;i++){
			//blocks[i].x+=n;
			if(Math.abs(blocks[i].y-e.y)>testRadius || Math.abs(blocks[i].x-e.x)>testRadius) continue;
			if (collideLeft(e,blocks[i]) && !collided) {
				collided=true;
				n=e.x-blocks[i].x-blocks[i].width;
				e.x-=n;
			}
		}
	}
	//cvs.clearRect(0,0,10000,10000);
	//cvs.translate(n,0);
	/*for (i=0;i<blocks.length;i++){
		blocks[i].x+=n;
	}
	p1.x-=n;*/
	//drawMap();
	if(!e.jumping && e.name=="p1"){//limitation - falls through if 1 block hole
		col=false;
		for (i=0;i<blocks.length;i++){
			if(Math.abs(blocks[i].y-e.y)>testRadius || Math.abs(blocks[i].x-e.x)>testRadius) continue;
			if(collideDown(e,blocks[i])) col=true;
		}
		if(!col){
			e.jmpSpeed=0;
			jump();
		}
	}
}
function jump(){
	if(!p1.jumping){
		p1.jumping=true;
		jmp=self.setInterval("scrollY(p1.jmpSpeed);p1.jmpSpeed-=+gravity;", frameRate);
	}
}
function chkDeath(){
	if(p1.y>window.innerHeight) return true;
	for(Z=0;Z<commy1s.length;Z++){
		c=commy1s[Z];
		if(collideAll(p1,c)) return true;
	}
	return false;
}
function drawPlayer(x,y){
	if(p1.x==0 && p1.y==0){//not drawn yet
		p1.x=x*squareW;
		p1.y=y*squareH;
		cvs.drawImage(p1.anim[p1.frame],x*squareW,y*squareH);
	}
	else{
		if(p1.dir=="right"){
			if(p1.jumping){
				cvs.drawImage(p1.jumpingImg,p1.x,p1.y);
			}
			else{
				//p1.frameNext();
				cvs.drawImage(p1.anim[p1.frame],p1.x,p1.y);
			}
		}
		else{//facing left
			cvs.translate(p1.x*2+p1.width, 0);
			cvs.scale(-1, 1);
			if(p1.jumping){
				cvs.drawImage(p1.jumpingImg,p1.x,p1.y);
			}
			else{
				//p1.frameNext();
				cvs.drawImage(p1.anim[p1.frame],p1.x,p1.y);
			}
			cvs.translate(p1.x*2+p1.width, 0);
			cvs.scale(-1, 1);
		}
	}

}
function drawCommy1(x,y){
	newC=true;
	comm=-1;
	for(i=0;i<commy1s.length;i++){
		if(commy1s[i].origX==x && commy1s[i].origY==y) {
			newC=false;
			comm=i;
		}
	}
	if(newC) {
		commy1s.push(new commy1(x,y));
		//cvs.drawImage(document.getElementById("C1standing"),x*squareW,y*squareH,commy1s[commy1s.length-1].width,commy1s[commy1s.length-1].height);
	}
	for(i=0;i<commy1s.length;i++){
		if(commy1s[i].origX==x && commy1s[i].origY==y) {
		 commy=commy1s[i];
	 if(commy.isDead) return;
		if(commy.dir=="right"){
			//c1FrameNext(commy);
			cvs.drawImage(commy.anim[commy.frame],commy.x,commy.y, commy.width,commy.height);
		}
		else{//facing left
			cvs.translate(commy.x*2+commy.width, 0);
			cvs.scale(-1, 1);
			//c1FrameNext(commy);
			//console.log(commy.anim[commy.frame]);
			cvs.drawImage(commy.anim[commy.frame],commy.x,commy.y, commy.width,commy.height);
			//cvs.drawImage(commy.anim[commy.frame],commy.x,commy.y,commy.width,commy.height);
			cvs.translate(commy.x*2+commy.width, 0);
			cvs.scale(-1, 1);
		}
	 }
	}
}

function moveCommy1s(){
	for(Z=0;Z<commy1s.length;Z++){
		c=commy1s[Z];
		//console.log(commy1s[i].x);
		if(c.dir=="right"){
			c.lastX=c.x;
			scrollX(c,c.walkSp*-1);
			c.frameNext();
		}
		else{
			c.lastX=c.x;
			scrollX(c,c.walkSp);
			c.frameNext();
		}
		if(c.x==c.lastX) c.flip();
	}
}
/*function moveCommy1s(){
	//cvs.clearRect(0,0,10000,10000);
	for(i=0;i<commy1s.length;i++){
		if(commy1s[i].dir=="right"){
			commy1s[i].x+=1;
			for (b=0;b<blocks.length;b++){
				if(Math.abs(blocks[b].y-commy1s[i].y)>25 || Math.abs(blocks[b].x-commy1s[i].x)>50) continue;
				if(collideRight(commy1s[i],blocks[b])) commy1s[i].dir="left";
			}
		}
		else{
			commy1s[i].x-=1;
			for (b=0;b<blocks.length;b++){
				if(Math.abs(blocks[b].y-commy1s[i].y)>25 || Math.abs(blocks[b].x-commy1s[i].x)>50) continue;
				if(collideLeft(commy1s[i],blocks[b])) commy1s[i].dir="right";
			}
		}
		frameCommy1(commy1s[i]);
	}
	//drawMap();
}*/
