




var canvas = document.createElement('canvas');	//make canvas
canvas.id = "plot";	//give id
canvas.width = window.innerWidth;	//make canvas browser width
canvas.height = window.innerHeight; // make canvas browser height
document.body.appendChild(canvas); //place in document
var ctx = canvas.getContext("2d")	
ctx.fillStyle = "#FF0000";	// lines in black

x_p = window.innerWidth/100;	//percetange of screen
y_p = window.innerHeight/100;	//pencentage of screen

function rect_to_native(coord) {	//converts x,y coords to native coordes from top left corner
	[x,y] = coord;
	return [ x+window.innerWidth/2, -y+innerHeight/2 ];
}

function native_to_rect(coord) {	//converts x,y coords to native coordes from top left corner
	[x,y] = coord;
	return [ x-window.innerWidth/2, -(y-innerHeight/2) ];
}

function circle(center,r) {
	//convert to native
	[x,y] = rect_to_native(center);

	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.stroke()
}

function line(start,finish) {
	[a,b] = rect_to_native(start);
	[x,y] = rect_to_native(finish);
	ctx.moveTo(a,b);
	ctx.lineTo(x,y);
	ctx.stroke()
}

function sum(arr,ind) {
	tot = 0;
	for(i=0;i<ind;i++) {
		tot+=arr[i];
	}

	return tot;
}


function angle_m(re,im) {
	if(re>0 && im>0) {return Math.atan(im/re);}
	else if( re>0 && im <0 ) { return (Math.atan(im/re)); }
	else if( re<0 && im > 0 ) {return (Math.PI + Math.atan(im/re)); }
	else if(re<0 && im<0) { return (-Math.PI + Math.atan(im/re)); }
	else if( re == 0 && im>0 ) {return Math.PI/2;}
	else if( im ==0 && re >0 ) {return 0;}
	else if( re == 0 && im<0 ) {return (-Math.PI/2);}
	else if( im ==0 && re <0 ) {return Math.PI;}
}

time = 0;

freq = [];
mag_im_0 = [];
mag_re_0 = [];
// ---------------- magnitudes ----------------



for(j=1;j<50;j+=2) {
	mag_im_0.push(0);
	mag_re_0.push(4/(j*Math.PI));
	freq.push(j);
}

mag = [];
for(i=0;i<mag_re_0.length;i++) {
	mag.push( Math.sqrt(mag_re_0[i]**2+mag_im_0[i]**2) );
}
summer =  mag.reduce((a, b) => a + b, 0);
for(i=0; i<mag.length;i++) { 	//rescale such that total length is 1/10 screen width
	mag[i] = (mag[i]/summer)*(window.innerWidth/10);
}


// ---------------- angular frequencies ----------------
for(i=0;i<freq.length;i++) {
	freq[i] = freq[i]/Math.min(...freq);	//fastest phasor completes 5 cycles/time, time is set by setInterval function
}



// ---------------- draw epicycles ----------------
setInterval(draw,30);
setInterval(clear,1000)

tips = [];
function draw() {
	time+=0.1;	//time unit
	ctx.clearRect(0, 0, canvas.width, canvas.height);	//clear canvas

	mag_re = mag_re_0.slice(0,mag_re_0.length);	//copy by val not re !!
	mag_im = mag_im_0.slice(0,mag_im_0.length);


	for(i=0; i<mag.length;i++) { 
		angle = angle_m(mag_re_0[i],mag_im_0[i]) + freq[i]*time;

		mag_re[i] = mag[i]*Math.cos(angle); 
		mag_im[i] = mag[i]*Math.sin(angle);
	}	//assign lengths such that total length length is 1/3 of total window width




	for(j=0;j<mag.length;j++) {
		line( [ sum(mag_re,j),sum(mag_im,j) ], [ sum(mag_re,j)+mag_re[j],sum(mag_im,j)+mag_im[j] ])
		circle( [ sum(mag_re,j),sum(mag_im,j) ], mag[j] );
	}
	circle([0,0],0);	//clear bug of not deleting last drawn cirlce

	tips.push( ([ sum(mag_re,mag.length),sum(mag_im,mag.length) ]) );
	draw_plt();
}


function draw_plt() {
	// use tips to draw imaginary and real parts
	line(tips[tips.length-1], [x_p*10,tips[tips.length-1][1]]);	// line from tip to im plot

	t=x_p*10;
	for(j=tips.length-1;j>0;j--) {	//im plot
		line([t,tips[j][1]],[t,tips[j-1][1]]);
		t+=1;
	}



}


function clear() {
	tips = tips.slice(tips.length-300, tips.length);
}
