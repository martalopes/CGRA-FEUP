var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Adicionados antes de comecar o projeto
	this.luz1 = true;
	this.luz2 = true;
	this.luz3 = true;
	this.luz4 = true;
	this.pausa = false;
	this.speed = 3;
	this.robotAppearances = [];
	this.robotAppearances.push("/resources/images/metal.png");
	this.robotAppearances.push("/resources/images/robothead.png");
	this.robotAppearances.push("/resources/images/robotbody.png");
	this.robotAppearances.push("/resources/images/metalAppearance2.png");
	this.robotAppearances.push("/resources/images/robothead2.png");
	this.robotAppearances.push("/resources/images/robotbody2.png");
	this.robotAppearances.push("/resources/images/metalAppearance3.png");
	this.robotAppearances.push("/resources/images/robothead3.png");
	this.robotAppearances.push("/resources/images/robotbody3.png");
	this.hello = 0;

	this.currRobotAppearance = 'Bender';
	this.robotAppearanceList = [
	'Bender', 'RoboCan', 'Militar'
	];


	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);
	this.boardA = new Plane(this, -0.18, 1.28, 0.09, 0.8, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, 0, 1, 0, 1, BOARD_B_DIVISIONS);
	this.prism = new MyPrism(this,8,20);
	this.cylinder = new MyCylinder(this,8,20);
	this.clock = new MyClock(this);
	this.robot = new MyRobot(this, 8 , 0, 4, - 4 * Math.PI / 5);
	this.lamp = new MyLamp(this, 25, 19);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	this.leftwall = new MyQuad(this, -0.6, 1.55, -0.6, 1.55);
	this.arranged_wall = new MyWall(this);
	this.paisagem = new MyQuad(this, 0, 1, 0, 1);



	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.floorAppearance.setShininess(2);
	this.floorAppearance.loadTexture("/resources/images/floor.png");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.windowAppearance.setShininess(2);
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.windowAppearance.loadTexture("/resources/images/window.png");

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(10,10,10,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.slidesAppearance.setShininess(2);
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.slidesAppearance.loadTexture("/resources/images/slides.png");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.boardAppearance.setShininess(120);
	this.boardAppearance.loadTexture("/resources/images/board.png");

	this.paisagemAppearance = new CGFappearance(this);
	this.paisagemAppearance.setAmbient(0.3,0.3,0.3,1);
	this.paisagemAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.paisagemAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.paisagemAppearance.setShininess(2);
	this.paisagemAppearance.loadTexture("/resources/images/paisagem.png");

	this.metalAppearance = new CGFappearance(this);
	this.metalAppearance.setAmbient(0.3,0.3,0.3,1);
	this.metalAppearance.setDiffuse(10,10,10,1);
	this.metalAppearance.setSpecular(0.1,0.1,0.1,1);
	this.metalAppearance.setShininess(2);
	this.metalAppearance.loadTexture(this.robotAppearances[0]);

	this.metalAppearance2 = new CGFappearance(this);
	this.metalAppearance2.setAmbient(0.3,0.3,0.3,1);
	this.metalAppearance2.setDiffuse(0.9,0.9,0.9,1);
	this.metalAppearance2.setSpecular(0.1,0.1,0.1,1);
	this.metalAppearance2.setShininess(2);
	this.metalAppearance2.loadTexture(this.robotAppearances[3]);

	this.metalAppearance3 = new CGFappearance(this);
	this.metalAppearance3.setAmbient(0.3,0.3,0.3,1);
	this.metalAppearance3.setDiffuse(0.9,0.9,0.9,1);
	this.metalAppearance3.setSpecular(0.1,0.1,0.1,1);
	this.metalAppearance3.setShininess(2);
	this.metalAppearance3.loadTexture(this.robotAppearances[6]);

	this.setUpdatePeriod(100);
	
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.3,0.3,0.3,1);
	
	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setSpecular( 1, 1, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setSpecular( 1, 1, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();
	

	for(var i = 0; i < 4; i++){
		this.lights[i].setVisible(true);
	}


	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();
	this.materialDefault.apply();

	// ---- END Background, camera and axis setup
	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section


	/*this.pushMatrix();
	this.translate(0,4,0);
	this.lamp.display();
	this.popMatrix();

	this.pushMatrix();

		this.materialB.apply();
		this.prism.display();
	this.popMatrix();
	*/

	this.pushMatrix();
		this.materialB.apply();
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.translate(14.5,-14.5,0);
		this.scale(1,1,0.43);
		this.metalAppearance.apply();
		this.cylinder.display();
	this.popMatrix();

	

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	/*this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftwall.display();
	this.popMatrix();*/

	// Plane Wall
	this.pushMatrix();
		this.windowAppearance.apply();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialA.apply();
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.materialB.apply();
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Clock
	this.pushMatrix();
	this.metalAppearance.apply();
	this.scale(1,1,0.2);
	this.translate(7.25,7.25,0);
	this.clock.display();
	this.popMatrix();

	// Robot
	this.pushMatrix();
	this.metalAppearance.apply();
	this.robot.setUp();
	this.robot.display();
	this.popMatrix();

	// Wall
	this.pushMatrix();
	this.windowAppearance.apply();
	this.arranged_wall.display();
	this.popMatrix();

	//Paisagem
	this.pushMatrix();
	this.paisagemAppearance.apply();
	this.translate(-10,5,7.5);
	this.rotate(Math.PI / 2, 0,1,0);
	this.scale(50,30,1);
	this.paisagem.display();
	this.popMatrix();
	


	//Definicoes
	if(this.luz1 == false){
		this.lights[0].disable();
	}else{
		this.lights[0].enable();
	}

	if(this.luz2 == false){
		this.lights[1].disable();
	}else{
		this.lights[1].enable();
	}

	if(this.luz3 == false){
		this.lights[2].disable();
	}else{
		this.lights[2].enable();
	}

	if(this.luz4 == false){
		this.lights[3].disable();
	}else{
		this.lights[3].enable();
	}
	
	if(this.pausa == false){
		this.clock.pause = false;
	}else{
		this.clock.pause = true;
	}

	// ---- END Primitive drawing section

	this.shader.unbind();
};

LightingScene.prototype.update = function(currTime) {
 	this.clock.update(currTime);
 	this.robot.update(currTime);
};

LightingScene.prototype.Settings = function() {
	console.log("Doing Something...");
};
