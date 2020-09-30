let positionX;
let positionY;
let mobilenet;
let classifier;
let video;
let label = 'loading model';
let happyButton;
let sadButton;
let trainButton;
let indicator = false;
let playButton;
let left;
let right;
let up;
let down;
let invalid;
let inputImage = invalid;

function setup() {
	createCanvas(windowWidth, windowHeight);
	positionX = (windowWidth/2)- 100;
	positionY = (windowHeight)-40;
	video = createCapture(VIDEO);
	video.position(600, 0);
	filter(INVERT);
  	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);

	LeftButton = createButton('Move Left');
	LeftButton.position(600, 500);
	LeftButton.mousePressed(function() {
		console.log('Entered LeftButton');
		left = classifier.addImage('Left');
	});

	RightButton = createButton('Move Right');
	RightButton.position(670, 500);
	RightButton.mousePressed(function(){
		console.log('Entered RightButton');
		right = classifier.addImage('Right');
	});


	UpButton = createButton('Move Up');
	UpButton.position(720, 500);
	UpButton.mousePressed(function(){
		console.log('Entered UpButton');
		up = classifier.addImage('Up');
	});


	DownButton = createButton('Move Down');
	RightButton.position(830, 500);
	RightButton.mousePressed(function(){
		console.log('Entered downButton');
		down = classifier.addImage('Down');
	});

	trainButton = createButton('train');
	trainButton.position(940, 500);
	trainButton.mousePressed(function() {
		classifier.train(whileTraining);
	});

	playButton = createButton('Play');
	playButton.position(1000, 500);
	playButton.mousePressed(function() {
		console.log('Entered playbutton indicator');
		indicator = true;
	});
	console.log('Entered play');
	inputImage = image(video, 600, 0);

	//actions();
}

function draw() {
	background(255);
	Maze();
	//player();
	// if (indicator){
	// 	console.log('Entered Indicator');
	// 	play();
	// 	player();
	// }
	console.log('inputImage next line');
	if (inputImage == left){
		positionX = positionX - 10;
		console.log('moving left');
	} else if (inputImage == right){
		positionX = positionX + 10;
		console.log('moving right');
	} else if (inputImage == up){
		positionY = positionY - 10;
		console.log('moving up');
	} else if (inputImage == down){
		positionY = positionY + 10;
		console.log('moving down');
	}
	player();
}


function Maze(){
	rect(0, 0, 595, windowHeight-5);
	a = line((20/100)*600, 0, (20/100)*600, (20/100)*windowHeight);
	b = line((40/100)*600, 0,(40/100)*600, (30/100)*windowHeight);
	c = line((40/100)*600, (30/100)*windowHeight,(10/100)*600, (30/100)*windowHeight);
	d = line((10/100)*600, (30/100)*windowHeight, (10/100)*600, (15/100)*windowHeight);
	e = line((70/100)*600, windowHeight-5, (70/100)*600, (75/100)*windowHeight);
	f = line((70/100)*600, (85/100)*windowHeight, (20/100)*600, (85/100)*windowHeight);
	g = line((20/100)*600, (85/100)*windowHeight, (20/100)*600, (45/100)*windowHeight);
	h = line((20/100)*600, (45/100)*windowHeight, (50/100)*600, (45/100)*windowHeight);
	i = line((30/100)*600, (55/100)*windowHeight, (70/100)*600, (55/100)*windowHeight);
	j = line((70/100)*600, (55/100)*windowHeight, (70/100)*600, (45/100)*windowHeight);
	k = line((70/100)*600, (45/100)*windowHeight, 600, (45/100)*windowHeight);
	l = line((80/100)*600, (55/100)*windowHeight, (80/100)*600, (15/100)*windowHeight);
	m = line((80/100)*600, (15/100)*windowHeight, (90/100)*600, (15/100)*windowHeight);
	n = line((60/100)*600, 0, (60/100)*600, (25/100)*windowHeight);
}

function player(){
	console.log('Entered ellipse');
	ellipse(positionX, positionY, 65, 65);
}

// function actions() {
// 	console.log('entered');
//   if (inputImage == 'Left' ) {
// 	  console.log('left');
//       //leftImage();
//   } else if (inputImage == 'Right' ) {
// 	  console.log('right');
//       //rightImage();
//   } else if (inputImage == 'Up'){
// 	  console.log('up');
// 	  //upImage();
//   } else if (inputImage == 'Down' ){
// 	  console.log('down');
// 	  //downImage();
//   }
// }


function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss){
	if (loss == null){
		console.log("Training Complete!");
		classifier.classify(gotResults);
	}else{
		console.log(loss);
	}
}

function gotResults(error, result) {
	if (error) {
	  console.error(error);
	} else {
	  // updated to work with newer version of ml5
	  // label = result;
	  label = result[0].label;
	  classifier.classify(gotResults);
	}
  }


// function play(){
// 	console.log('Entered play');
// 	inputImage = image(video, 600, 0);
// 	//classifyInputImage();
// 	console.log('inputImage next line');
// 	if (inputImage == left){
// 		positionX = positionX - 10;
// 		console.log('moving left');
// 	} else if (inputImage == right){
// 		positionX = positionX + 10;
// 		console.log('moving right');
// 	} else if (inputImage == up){
// 		positionY = positionY - 10;
// 		console.log('moving up');
// 	} else if (inputImage == down){
// 		positionY = positionY + 10;
// 		console.log('moving down');
// 	}
// }

