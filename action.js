

// create canvas
canvas = document.createElement("canvas");

c_width = 1200; c_height = 600;
canvas.width = c_width;
canvas.height = c_height;

document.getElementById("draw").appendChild(canvas);

canvas.style.backgroundColor = "black";




//draw
ctx = canvas.getContext("2d");
ctx.strokeStyle = "#FFFFFF";	//stroke color
ctx.fillStyle = "white";

function coord(coordinate) { //converts cartesian to native
	return [coordinate[0] + c_width/2, -coordinate[1] + c_height/2];
}

function icoord(coordinate_n) { //converts native to cartesian
	return [coordinate_n[0] - c_width/2, -coordinate_n[1] + c_height/2];
}

function circ(c_params) {	// c_params = [center,r]
	center = coord(c_params[0]);
	ctx.beginPath();
	ctx.arc(center[0],center[1], c_params[1],0,2* Math.PI);
	ctx.stroke();
}

function ray(c_params, theta) {	//draws ray with cirle params and angle
	center = coord(c_params[0]);
	r = c_params[1];
	ctx.moveTo(center[0], center[1]);
	ctx.lineTo(center[0] + r*Math.cos(theta), center[1] - r*Math.sin(theta));
	ctx.stroke();

	//point
	point_x = 10; point_y = 10;	//point size
	p_center = [center[0] + r*Math.cos(theta) - point_x/2, center[1] - r*Math.sin(theta) - point_y/2];
	
	ctx.fillRect( p_center[0], p_center[1] ,point_x,point_y);

	return icoord([ p_center[0] + point_x/2, p_center[1] +  point_y/2]);
}



function wipe() {	//clear canvas
	ctx.clearRect(0, 0, c_width, c_height);
}

function phasor(c_params, theta) {
	circ(c_params);
	return ray(c_params, theta);
}


function tracer(shape) {	// traces out shape
	for(i=0; i<shape.length;i++) {
		center = coord(shape[i]);

		point_x = 5; point_y = 5;
		ctx.fillRect( center[0], center[1] ,point_x,point_y);
	}
}


// draw epicycles
function mag(C) { return Math.sqrt( Math.pow(C[0],2) + Math.pow(C[1],2) ); }
function arg(C) { return Math.atan2(C[1],C[0]); }


/*ft = [ 
	[10.72,16.52],
	[-12.64,20.90],
	[-135.66,-45.57],
	[-44.85,-23.71],
	[66.75,-53.07]
 ];

 ph = [
 	0,
 	1,
 	-1,
 	2,
 	-2
 ];
*/

ft = [[-0.0585806, 0.0248542], [0.0405367, 
  0.208668], [0.0173635, -0.036085], [0.156774, 
  0.0317437], [-0.0902005, 0.0823196], [-0.182415, 
  0.00280184], [-0.202768, -0.0105097], [0.130615, 
  0.0121942], [0.0418586, 
  0.0756412], [-0.154716, -0.185824], [-0.0566664, -0.17109], 
[0.0200319, -0.148981], [0.161051, 0.135481], [0.0129458, 
  0.0786091], [0.305452, -0.129473], [-0.0526659, 
  0.00375033], [0.329598, 0.0564123], [-0.0458117, 0.3046], [0.058044,
   0.0232915], [-0.248026, 
  0.453244], [0.160467, -0.135005], [-0.222949, 
  0.440145], [-0.0872916, -0.0189156], [-0.325884, -0.0444535], 
[-0.49155, -0.281747], [-0.10589, 
  0.345863], [-0.168844, -0.167833], [0.278511, -0.11132], [0.164289, 
-0.46101], [-0.144966, -0.387321], [-0.294395, -0.114852], [0.636404, 
  0.599939], [0.765485, 
  0.927843], [-0.225547, -0.534269], [-0.461319, -0.109653], 
[0.419577, -0.122707], [-1.56439, 2.37317], [-2.42865, 
  0.266844], [1.46729, -1.50661], [-2.51873, -3.20741], [0.582156, 
  3.47454], [-6.0573, -6.15665], [1.37746, -4.80505], [2.2577, 
-0.322392], [7.62961, -8.83956], [-8.96776, -0.941005], [24.643, 
-13.5236], [11.1437, -18.0848], [-60.7695, -27.8692], [84.067, 
-70.1259], [36.774, -16.2808], [20.4711, -0.643032], [32.6087, 
-26.0319], [5.68891, -37.5849], [-7.5814, 24.7642], [-6.94459, 
  6.10257], [-6.45076, 
  6.6285], [2.88888, -4.96551], [-1.82631, -0.590606], [-3.28795, 
-4.13106], [-1.41239, 0.893549], [0.119332, -2.76685], [3.0032, 
  0.940118], [0.955169, -1.93771], [0.866592, 
  1.2229], [-0.559155, -0.612824], [0.660095, 0.831938], [0.240871, 
  0.647211], [-0.133542, 
  1.04972], [-1.1367, -0.0657395], [0.0147619, -0.306831], [-0.22287, 
-0.287871], [-0.214215, 
  0.0508939], [-0.409983, -0.364437], [0.155145, -0.316669], 
[0.384263, 
  0.096632], [0.175664, -0.149945], [0.221308, -0.208656], 
[-0.0712706, -0.0557874], [-0.136215, 0.279015], [-0.176137, 
  0.182839], [0.347865, -0.059304], [0.0783358, 
  0.069544], [-0.16054, -0.092002], [-0.368206, -0.0870223], 
[0.215019, -0.0464422], [0.0733099, 0.177206], [0.050552, 
  0.0654016], [-0.0556879, -0.139462], [0.0768621, -0.11673], 
[-0.0365781, 0.14187], [-0.0635663, 
  0.0428358], [-0.0962365, -0.00502243], [0.0263649, -0.00396537], 
[-0.071262, 
  0.0105217], [-0.0333593, -0.0522816], [-0.0714924, -0.0471237], 
[0.059551, -0.0622056], [-0.0732672, -0.00519282], [0.0840217, 
  0.0198696], [0.00843716, 0.0254869]];


//create phase
ph = [];
m = Math.floor(ft.length/2);
for(i = 0; i<=2*m;i++) {
	ph.push( i-m );
}


shape = []
time = 0;
c_params = [[0,0],100];

setInterval(function(){ 
	time+=1/m;
	wipe();

	prev = phasor([ [0,0] , 10*mag(ft[0])/10 ], time*ph[0] + arg(ft[0]) );	//staring circle to set starting and ending positions
	for(let i=1;i<ft.length;i++) {
		prev = phasor([ prev, 10*mag(ft[i])/10 ], time*ph[i] +  arg(ft[i]) );
		
	}
	shape.push(prev);
    tracer(shape);


}, 30);

