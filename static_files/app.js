const fps = 60;
let pressed = {};
let clock = new THREE.Clock();
let map = null;
let player = null;
let playerTexture = null;
let currentTime = 0;
let bestTime = 0;
let checkpointPassed = true;
const maxSpeedOnTrack = 15;
const maxSpeedOnGrass = 4;
const boostSpeed = 25;
let playerSpeed = 0;
const playerAcceleration = 6 / fps;
const playerDeceleration = -3 * playerAcceleration;
let timerElement = document.getElementById("info");
let raceStarted = false;

const scene = new THREE.Scene();
scene.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI);
scene.background = new THREE.Color(0xab6a8c);
const camera = new THREE.PerspectiveCamera( 
    30, window.innerWidth/window.innerHeight, 0.1, 500
  );
camera.position.set(0, 1.25, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



window.addEventListener('resize', function(){
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;

	camera.updateProjectionMatrix();
});

//player
function initializePlayer(x, y){
  const geometry = new THREE.PlaneGeometry(0.75, 0.75);
  playerTexture = new THREE.TextureLoader().load('player/racer.png');
  playerTexture.generateMipmaps = false;
  playerTexture.minFilter = THREE.NearestFilter;
  playerTexture.magFilter = THREE.NearestFilter;
  playerTexture.offset.x = 0.2;
  playerTexture.repeat.set(0.2, 1);
  const material = new THREE.MeshBasicMaterial( { map: playerTexture } );
  material.transparent = true;
  player = new THREE.Mesh( geometry, material );
  player.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2 );
  player.position.x = x; 
  player.position.y = y;
  player.position.z = 0.375;
  player.add(camera); //camera will follow player
  scene.add(player);
}

//****************** RENDER FRAMES ********************
const animate = function () {
  setTimeout( function() {
    requestAnimationFrame( animate );
  }, 1000 / fps );

	camera.position.z = 8;
	renderer.render( scene, camera );
  movePlayer();
  updateTimer();
};
loadBackground(scene);
loadTrackTextures();
animate();
addListeners();

function updateTimer(){
  if (raceStarted){
    currentTime += 1;
    if (currentTime % 10 == 0) { //only update every 10 frames for performance
      timerElement.innerHTML = "Time: " + (currentTime / fps).toFixed(2) + " Best: " + (bestTime / fps).toFixed(2);
    }
  }
}

function convertJsonTilesToMap(x, y){
  //json map is represented as the coordinates on left below. 
  //have to convert it to the coordinate system on the right. 
  //(0,0)   (100,0)     maps to    (-50,50)  (50,50)
  //(0,100) (100,100)              (-50,-50) (50,-50)
  return [x - 50, y - 50];
}

function convertMapToJsonTiles(x, y){
  return [x + 50, y + 50];
}

function drawTiles(){
  const boundaryTexture = new THREE.TextureLoader().load('level/level.png');
  boundaryTexture.generateMipmaps = false;
  boundaryTexture.minFilter = THREE.NearestFilter;
  boundaryTexture.magFilter = THREE.NearestFilter;
  let geometry = new THREE.PlaneGeometry(100, 100);
  let material = new THREE.MeshBasicMaterial({map: boundaryTexture});
  let plane = new THREE.Mesh( geometry, material );
  initializePlayer(-41, 4); //TODO remove hardcoded value
  scene.add( plane );
}



function loadTrackTextures(){
  const httpRequest = new XMLHttpRequest();
    httpRequest.overrideMimeType("application/json");
    httpRequest.open("GET", "/level/level.json", true);
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status == "200") {
          const result = JSON.parse(httpRequest.response).map;
          if (result != null){
            map = result;
            drawTiles();
          }
        }
    }
    httpRequest.send();
}

//records pressed keys
function addListeners() {
    window.addEventListener('keydown', function(e) {
      pressed[e.key.toUpperCase()] = true;
    })
    window.addEventListener('keyup', function(e) {
      pressed[e.key.toUpperCase()] = false;
    })
}

function getTile(x, y){
  let location = convertMapToJsonTiles(Math.floor(x), Math.floor(y));
  return map[location[1]][location[0]]; //map array stores y then x
}

function canMove(moveDistance){
  let playerPosition = new THREE.Vector3();
  player.getWorldPosition(playerPosition);
  playerPosition.add(new THREE.Vector3(0, 0, moveDistance));
  //console.log(playerPosition.x + ", " + playerPosition.y);
  let tileType = getTile(playerPosition.x, playerPosition.y);
  //console.log(tileType);
  if (tileType == 1){
    return false;
  } else if (tileType == 2){
    if (playerSpeed > maxSpeedOnGrass){
      playerSpeed = maxSpeedOnGrass;
    }
  } else if (tileType == 5){
    playerSpeed = boostSpeed;
  } else if (tileType == 6){
    checkpointPassed = true;
  } else if (tileType == 4){
    raceStarted = true;
    newLap();
  }
  return true;
}

function newLap(){
  if (checkpointPassed){
    if (bestTime == 0 || currentTime < bestTime){
      bestTime = currentTime;
    }
    currentTime = 0;
    checkpointPassed = false;
  }
}

function moveForward(moveDistance){
  if (canMove(-1 * moveDistance)){
    player.translateZ( -1 * moveDistance );
    if (playerSpeed < maxSpeedOnTrack){
      playerSpeed += playerAcceleration;
    } else if (playerSpeed > maxSpeedOnTrack){ //decelerate from speed boost
      playerSpeed -= playerAcceleration;
    }
  } else {
    player.translateZ(moveDistance + 0.5); //player gets pushed back if they hit boundary
    playerSpeed = 0;
  } 
  playerTexture.offset.x = 0.2;
}

function movePlayer() {
    let delta = clock.getDelta(); // interval 1/60th of a second
    let moveDistance = playerSpeed * delta; // 10 pixels per second
    let rotateAngle = Math.PI  * delta; // pi radians (180 deg) per interval

    // move forwards/backwards/left/right
    if ( pressed['W'] ) {
      moveForward(moveDistance);
    } else {
      if (playerSpeed > 0){
        playerSpeed += playerDeceleration;
        moveForward(moveDistance);
      }
    }
    if ( pressed['S'] ) {
      if (canMove(moveDistance)){
        player.translateZ(moveDistance);
      }  
    }
    
    var rotation_matrix = new THREE.Matrix4().identity();
    if ( pressed['A'] ) {
      player.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
      playerTexture.offset.x = 0;
    }
    if ( pressed['D'] ) {
      player.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);
      playerTexture.offset.x = 0.4;
    }

}


