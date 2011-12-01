function collideDown(e1,e2){
	if((e1.y+e1.height>=e2.y && e1.y+e1.height<=e2.y+e2.height) &&//bottom
				((e1.x<=e2.x && e1.x+e1.width>=e2.x+1) || //right side
						e1.x<e2.x+e2.width && e1.x+e1.width>e2.x+e2.width)){//left side
						e1Right = e1.x+e1.width;
						e1Bottom = e1.y+e1.height;
						eRight = e2.x + e2.width;
						eBottom = e2.y + e2.height;
//						console.log('down \nplayer: (' + e1.x + ', ' + e1.y + ') (' + e1Right + ', ' + e1Bottom + ')');
//						console.log('element: (' + e2.x + ', ' + e2.y + ') (' + eRight + ', ' + eBottom + ')');					
//						console.log("bottom: "+(e1.y+e1.height>=e2.y && e1.y+e1.height<=e2.y+e2.height)+"\n top: "+(e1.y>=e2.y && e1.y<=e2.y+e2.height)+"\n right: "+(e1.x<e2.x && e1.x+e1.width>e2.x));
						return true;
	}
	return false;
}
function collideUp(e1,e2){
	return (collideDown(e2,e1));
	if((e1.y>=e2.y && e1.y<=e2.y+e2.height) &&//top
				((e1.x<=e2.x && e1.x+e1.width>=e2.x) || //left side
						e1.x<=e2.x+e2.width && e1.x+e1.width>=e2.x+e2.width)){//right side
						e1Right = e1.x+e1.width;
						e1Bottom = e1.y+e1.height;
						eRight = e2.x + e2.width;
						eBottom = e2.y + e2.height;
//						console.log('player: (' + e1.x + ', ' + e1.y + ') (' + e1Right + ', ' + e1Bottom + ')');
//						console.log('element: (' + e2.x + ', ' + e2.y + ') (' + eRight + ', ' + eBottom + ')');					
//						console.log("top: "+e1.y>=e2.y && e1.y<=e2.y+e2.height);
						return true;
	}
	return false;
}
function collideLeft(e1,e2){
	if(((e1.y+e1.height>=e2.y+1 && e1.y+e1.height<=e2.y+e2.height+1) ||//bottom
			(e1.y>=e2.y && e1.y<=e2.y+e2.height-1)) &&// top
			(e1.x<e2.x+e2.width && e1.x+e1.width>e2.x+e2.width)){//left side
					e1Right = e1.x+e1.width;
					e1Bottom = e1.y+e1.height;
					eRight = e2.x + e2.width;
					eBottom = e2.y + e2.height;
//					console.log('up\nplayer: (' + e1.x + ', ' + e1.y + ') (' + e1Right + ', ' + e1Bottom + ')');
//					console.log('element: (' + e2.x + ', ' + e2.y + ') (' + eRight + ', ' + eBottom + ')');					
//					console.log("bottom: "+(e1.y+e1.height>=e2.y && e1.y+e1.height<=e2.y+e2.height)+"\n top: "+(e1.y>=e2.y && e1.y<=e2.y+e2.height)+"\n right: "+(e1.x<e2.x && e1.x+e1.width>e2.x));
					return true;
	}
	return false;
}
function checkRight(){
	for (i=0;i<blocks.length;i++){
	e1=p1;
	e2=blocks[i];
	if(Math.abs(blocks[i].y-p1.y)>50 || Math.abs(blocks[i].x-p1.x)>10) continue;//efficient checking
	console.log("bottom: "+(e1.y+e1.height>=e2.y && e1.y+e1.height<=e2.y+e2.height)+"\n top: "+(e1.y>=e2.y && e1.y<=e2.y+e2.height)+"\n right: "+(e1.x<e2.x && e1.x+e1.width>e2.x));
	}
}
function collideRight(e1,e2){
	if(((e1.y+e1.height>=e2.y+1 && e1.y+e1.height<=e2.y+e2.height+1) ||//bottom
			(e1.y>=e2.y && e1.y<=e2.y+e2.height-1)) &&// top
					(e1.x<=e2.x && e1.x+e1.width>=e2.x)){//right side
					e1Right = e1.x+e1.width;
					e1Bottom = e1.y+e1.height;
					eRight = e2.x + e2.width;
					eBottom = e2.y + e2.height;
//					console.log('right\nplayer: (x:' + e1.x + ', y:' + e1.y + ') (bX:' + e1Right + ',by: ' + e1Bottom + ')');
//					console.log('element: (' + e2.x + ', ' + e2.y + ') (' + eRight + ', ' + eBottom + ')');
//					console.log("bottom: "+(e1.y+e1.height>=e2.y && e1.y+e1.height<=e2.y+e2.height)+"\n top: "+(e1.y>=e2.y && e1.y<=e2.y+e2.height)+"\n right: "+(e1.x<e2.x && e1.x+e1.width>e2.x));
					return true;
	}
	return false;
}
function collideAll(e1,e2){
	if(collideRight(e1,e2) || collideLeft(e1,e2) || collideUp(e1,e2) || collideDown(e1,e2)) return true;
}