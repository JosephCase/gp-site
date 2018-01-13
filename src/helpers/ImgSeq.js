window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, fps){
            window.setTimeout(function() {
            	callback(new Date().getTime())
            }, 1000 / 60);
        }
    );
}();

export default function ImgSeq(firstFrame, lastFrame, fileName, leadingZero, waitForCache, image, _onCache){
	var self = this;
	var firstFrame = firstFrame;
	var lastFrame = lastFrame;
	var frames = Math.abs(lastFrame - firstFrame)+1;
	var fileName = fileName;
	var leadingZero = leadingZero;
	var imgs = [];
	var preloadedImages = [];
	var cachedImgs = 0;
	var cacheComplete = false;
	var isPlaying = false;
	var waitForCache = waitForCache;
	// var image = document.getElementById(image);
	var onComplete = null;
	var onCache = null;
	var wantsToPlay = false;

	var fps = 0;
	var startFrame;
	var endFrame;
	var frame;
	var playBack;
	var isReverse;
	var keepPrev;
	var loop;
	var elapsed;
	var fpsInterval;
    var then;
    var isPlaying;
    var stop;
    var startTime;
    var ended;

	//if there is a onCache callback save it to the object
    if(typeof _onCache === "function") {
        onCache = _onCache;
    }

	// Create Array containing the full name of each image in the sequence
	var newFileName;
	for (var i = firstFrame; i <= lastFrame; i++) {
		//set n to a string of 0's followed by the number in the sequence
		var n = "000000000" + i;
		//shorten n to the didgits needed 
    	n = n.substr(n.length-leadingZero);
    	//replace the [] given in the file name with n
		newFileName = fileName.replace("[]", n);
		//add to the array
		imgs.push(newFileName);
	}
	// Create the canvas
	this.canvas=document.createElement("canvas");
	var ctx=this.canvas.getContext("2d");
	//add canvas before the image
	image.parentNode.insertBefore(this.canvas, image);
	//add all the images attributes to the canvas
	var attrs = image.attributes,
    i = attrs.length,
    attr;
	while (i--)
	{
	    attr = attrs[i];
	    this.canvas.setAttribute(attr.name, attr.value)
	}

	var cw = self.canvas.width,
 		ch = self.canvas.height;

	//remove the image
	image.parentNode.removeChild(image);
	//create an image
	let img = new Image();
	//once image has loaded draw it to the canvas and set canvas height and width to match it
	img.onload = function() {
	    ctx.drawImage(this,0,0,cw,ch);
	};
	//set image src to the src of the canvas (attr was taken from the original image that was on the page)
	img.src = this.canvas.getAttribute("src");
	// img.id = image.id + 2; //to make unique ?

	//cache all other images in the sequence from the array
	cacheImgs(imgs);

	function cacheImgs(array) {
	    //Fill preloadedImages Array with images 

	    for (var i = 0; i < array.length; i++) {
	    	//make new image
	        var img = new Image();
	        img.src = array[i];
	    	preloadedImages.push(img);
	        img.onload = function() {
	    		//on load increase cached images total by 1
	    		cachedImgs += 1;
	            if(cachedImgs == frames) {
	            	cacheComplete = true;
	            	if (onCache !== null) {
	            		onCache(self);
	            	}
	            	if(wantsToPlay) {
	            		window.requestAnimFrame(drawLoop); 
	            	}
	            }
	        }
	    }
	}	

	function getFPS(fps){
		//get fps as int depending of data type given
		var str = /fps/;
		if(str.test(fps)){
			return fps.replace('fps', '');
		}else{
			return (frames / fps) * 1000;
		}
	}

	function drawLoop(timestamp) {
		if (!startTime) startTime = timestamp/1000;
		if (!ended) window.requestAnimFrame(drawLoop);
		draw(timestamp/1000 - startTime);
	}

	function draw(delta) {
		var frame = Math.floor(delta * fps) + startFrame;
		if(frame > endFrame) {
			if(!ended) {
				if(onComplete) onComplete();
			}
			if(loop) {
				startTime = null;
			} else {
				ended = true;
			}
		} else if(!stop) {
			ctx.clearRect(0,0,cw,ch);
			ctx.drawImage(preloadedImages[frame], 0, 0, cw, ch);
		}
	}

	// public functions
	this.play = function(sf, ef, _fps, lp, reverse, keepPrev, _onComplete, _execOnFrame){
		// set all variable to play the sequence
		fps = getFPS(_fps),
		startFrame = sf,
		endFrame = ef,
		frame = sf,
		playBack = reverse,
		isReverse = (startFrame > endFrame) ? true:false,
		keepPrev = keepPrev,
		loop = lp,
		elapsed,
		fpsInterval = 1000 / fps,
	    then=Date.now(),
	    isPlaying = true,
	    stop = false,
	    startTime = null,
	    ended = false;

	    //if there is a onComplete callback save it to the object
	    if(typeof _onComplete === "function") {
	        onComplete = _onComplete;
	    }  

	    if(waitForCache == true && !cacheComplete){
	    	wantsToPlay = true;
	    }else{
	    	window.requestAnimFrame(drawLoop); 
	    } 
	}

	this.stop = function() {
		stop = true;
	}

}