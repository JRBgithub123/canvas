var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;


function drawBackground(){
	ctx.save();
	ctx.translate(r,r);
	ctx.beginPath();
	ctx.strokeStyle="#ccc";
	ctx.lineWidth=10;
	ctx.arc(0,0,r-5,0,2*Math.PI,false);
	ctx.stroke();
	
	var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
	
	//画12个数字
	hourNumbers.forEach(function(num,i){
		var rad=2*Math.PI/12*i;
		var x=Math.cos(rad)*(r-40);
		var y=Math.sin(rad)*(r-40);
		ctx.font="30px Arial";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		ctx.fillText(num,x,y);
	})
	
	
	//画60个点
	for(var i=0;i<60;i++){
		var rad1=2*Math.PI/60*i;
		var x=Math.cos(rad1)*(r-20);
		var y=Math.sin(rad1)*(r-20);
		ctx.beginPath();
		if(i%5==0){
			ctx.arc(x,y,6,0,2*Math.PI,false);
		}
			ctx.arc(x,y,3,0,2*Math.PI,false);
		ctx.fillStyle="green";
		ctx.fill();
	}
}

//画时针
function  drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();	
	var rad=2*Math.PI/12*hour+2*Math.PI/(60*12)*minute;
	ctx.rotate(rad);
	ctx.lineCap="round";
	ctx.lineWidth=6;
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r/2);	
	ctx.stroke();
	ctx.restore();
}

//画分针
function drawMinute(minute,second){
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle="blue";
	var rad=2*Math.PI/60*minute+2*Math.PI/(60*60)*second;	
	ctx.rotate(rad);
	ctx.lineCap="round";
	ctx.lineWidth=4;
	ctx.moveTo(0,20);
	ctx.lineTo(0,-r+30);	
	ctx.stroke();
	ctx.restore();
}


//画秒针
function drawSeconds(second){	
	ctx.save();
	ctx.beginPath();
	var rad=2*Math.PI/60*second;	
	ctx.rotate(rad);
	ctx.moveTo(-2,20);
	ctx.lineTo(2,20);
	ctx.lineTo(1,-r+20);
	ctx.lineTo(-1,-r+20);
	ctx.fillStyle="aqua";
	ctx.fill();	
	ctx.restore();
}


function drawDot(){
	ctx.beginPath();
	ctx.fillStyle="black";
	ctx.arc(0,0,8,0,2*Math.PI,false);
	ctx.fill();
}







function draw(){
	ctx.clearRect(0,0,width,height);
	var dd=new Date();
	var hour=dd.getHours();
	var minute=dd.getMinutes();
	var second=dd.getSeconds();
	
	drawBackground();
	
	drawHour(hour,minute);
	drawMinute(minute,second);
	drawSeconds(second);
	drawDot();
	ctx.restore();
	
};

draw();

setInterval(draw,1000);
