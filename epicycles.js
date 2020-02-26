
class Epicycles {
	constructor(ctx, dim) {
		this.ctx = ctx;
		this.c_width = dim[0];
		this.c_height = dim[1];
		this.ft;
		this.ph = [];
		this.shape = []
	    this.time = 0;
	}

	set scaling(ft) {
		this.ft = ft;

		this.m = Math.floor(this.ft.length/2);
		for(let i =0; i<=2*this.m;i++) {	// make phase
			this.ph.push(i-this.m);
		}
	}


	coord(coordinate) { //converts cartesian to native
	    return [coordinate[0] + this.c_width/2, -coordinate[1] + this.c_height/2];
	}

	icoord(coordinate_n) { //converts native to cartesian
	    return [coordinate_n[0] - this.c_width/2, -coordinate_n[1] + this.c_height/2];
	}


	circ(c_params) {  // c_params = [center,r]
	    this.center = this.coord(c_params[0]);
	    this.ctx.beginPath();
	    this.ctx.arc(this.center[0],this.center[1], c_params[1],0,2* Math.PI);
	    this.ctx.stroke();
	}


	ray(c_params, theta) {  //draws ray with cirle params and angle
	    this.center = this.coord(c_params[0]);
	    this.r = c_params[1];
	    this.ctx.moveTo(this.center[0], this.center[1]);
	    this.ctx.lineTo(this.center[0] + this.r*Math.cos(theta), this.center[1] - this.r*Math.sin(theta));
	    this.ctx.stroke();

	    //point
	    this.point_x = 10; this.point_y = 10; //point size
	    this.p_center = [this.center[0] + this.r*Math.cos(theta) - this.point_x/2, this.center[1] - this.r*Math.sin(theta) - this.point_y/2];
	    
	    this.ctx.fillRect( this.p_center[0], this.p_center[1] ,this.point_x,this.point_y);

	    return this.icoord([ this.p_center[0] + this.point_x/2, this.p_center[1] +  this.point_y/2]);
	}

	wipe() {  //clear canvas
	    this.ctx.clearRect(0, 0, this.c_width, this.c_height);
	}

	phasor(c_params, theta) {
	    this.circ(c_params);
	    return this.ray(c_params, theta);
	}

	tracer() { // traces out this.shape
	    for(let i=0; i<this.shape.length;i++) {
	      this.center = this.coord(this.shape[i]);

	      this.point_x = 5; this.point_y = 5;
	      this.ctx.fillRect( this.center[0], this.center[1] ,this.point_x,this.point_y);
	  	}
	}

	mag(C) { return Math.sqrt( Math.pow(C[0],2) + Math.pow(C[1],2) ); }
  	arg(C) { return Math.atan2(C[1],C[0]); }



  	stopDrawing() {
	    clearInterval(this.drawer);
	}

	draw(center) {
		this.time+=1/this.m;
	      this.wipe();
	      this.prev = this.phasor([ center, 10*this.mag(this.ft[0])/10 ], this.time*this.ph[0] + this.arg(this.ft[0]) );  //staring circle to set starting and ending positions
	      for(let i=1;i<this.ft.length;i++) {
	        this.prev = this.phasor([ this.prev, 10*this.mag(this.ft[i])/10 ], this.time*this.ph[i] +  this.arg(this.ft[i]) );
	        
	      }
	      this.shape.push(this.prev);
	        this.tracer(this.shape);
	}





}

this.drawer = setInterval(function(){ 
	      


	  	}, 100);
