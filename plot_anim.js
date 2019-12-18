var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c_width = c.getClientRects()[0].width
c_height = c.getClientRects()[0].height

function coord_rect( loc ) { //[x,y]
	return [ c_width/2+loc[0],c_height/2-loc[1] ]
}

function coord_rect_rev( loc ) { //[x,y]
	return [ -c_width/2+loc[0],c_height/2+loc[1] ]
}

function coord_polar( loc ) { //[x,y]
	return coord_rect([ loc[0]*Math.cos(loc[1]), loc[0]*Math.sin(loc[1]) ]);
}

//plot line give in cartesian
function plt_line(loc_start, loc_finish, disp = [0,0], type="cart") {
	if(type == "cart") {
		loc_start = coord_rect(loc_start);	// convert coordinate to native coordinates
		loc_finish = coord_rect(loc_finish);	// convert coordinate to native coordinates
	}else if(type == "polar"){
		loc_start = coord_polar(loc_start);	// convert coordinate to native coordinates
		loc_finish = coord_polar(loc_finish);	// convert coordinate to native coordinates
	}
	

	ctx.moveTo(loc_start[0]+disp[0],loc_start[1]+disp[1]);
	ctx.lineTo(loc_finish[0]+disp[0],loc_finish[1]+disp[1]);
	ctx.stroke();
}






mag = []
freq = []


pi = Math.PI/100;
for(i=1;i<100;i+=2) {
	mag.push( 4/(pi*i) );
	freq.push( i ); 
}



/*mag = [4/pi,4/(3*pi),4/(5*pi),4/(7*pi),4/(9*pi),4/(11*pi),4/(13*pi),4/(15*pi)];
freq = [1,3,5,7,9,11,13,15];*/



displacement =[-250,0]


var time = -10;


function sum_x(arr, to) {	// sum arr up until and including to
	var total_x = 0;
	for(i=0; i<=to; i++) {
		total_x+=arr[i]*Math.cos(time*freq[i]);
	}

	return total_x;
}

function sum_y(arr, to) {	// sum arr up until and including to
	var total_y = 0;
	for(i=0; i<=to; i++) {
		total_y+=arr[i]*Math.sin(time*freq[i]);
	}

	return total_y;
}


function draw_circle(center, rad, disp = [0,0]) {
	ctx.beginPath();
	ctx.arc(center[0]+disp[0],center[1]+disp[1],rad, 0, 2*Math.PI);
}


function draw(color = "#000000", width = 1){	//instead of clearing the canvas we can draw white lines on the original black lines
	ctx.strokeStyle = color;
	ctx.lineWidth = width;

	prev=[0,0];
	for(j=0;j<=mag.length;j++) {
		plt_line( prev , [sum_x(mag,j),sum_y(mag,j)] ,displacement);
		set = prev;
		prev = coord_rect(prev);
		
		ctx.beginPath();
		draw_circle([prev[0],prev[1]],mag[j],displacement);
		
		prev =  [sum_x(mag,j),sum_y(mag,j)];
	}

	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	return set;
}


trace = [sum_x(mag,2),0];

amps = [];

function draw_plt() {
	s = 0;
	for(k=amps.length;k>=amps.length-1000;k--) {
		if(k<0) {break;}
			ctx.beginPath();
			
			plt_line([s,amps[k-1]],[s,amps[k]]);
			ctx.stroke();
			s++;
	}
}

setInterval(myTimer, 30);
function myTimer() {
	ctx.beginPath();
	
	
	/*we clear the canvas in this way as to preserve the overall drawing*/
	//draw("#FFFFFF",2.5);	//clear canvas

	ctx.clearRect(0, 0, c.width, c.height);
	time+=0.05;
	prev = draw();
	/*ctx.beginPath();
	ctx.arc(0,prev[1],100, 0, 2*Math.PI);
	ctx.stroke();*/


	
	//trace shape
	/*ctx.lineWidth = 10;
	plt_line(trace,prev);
	ctx.lineWidth = 1;
	
	trace = prev;*/
	amps.push(prev[1]);

	draw_plt();
}


