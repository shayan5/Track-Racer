let pressed = {};
let clock = new THREE.Clock();
let map = null;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xab6a8c);
const camera = 
new THREE.PerspectiveCamera( 
  30, window.innerWidth/window.innerHeight, 0.1, 1000 );
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
const geometry = new THREE.PlaneGeometry(1, 1);
const material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
const player = new THREE.Mesh( geometry, material );
player.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
player.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
player.position.x = 0; 
player.position.y = 0;
player.position.z = 0.5;
player.add(camera); //camera will follow player
scene.add( player );


//load map textures
//northern skybox
let bgTexture = new THREE.TextureLoader().load('level/bg1.png');
let bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
let bgPlane = new THREE.PlaneGeometry(500, 130);
const northernBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
northernBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
northernBgMesh.position.x = 0;
northernBgMesh.position.y = 250;
northernBgMesh.position.z = 65;
scene.add(northernBgMesh);

//northern mountains
let mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
mtTexture.wrapS = THREE.RepeatWrapping;
mtTexture.repeat.x = 2;
let mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
mtMaterial.transparent = true;
let mtPlane = new THREE.PlaneGeometry(300, 60);
const northernMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
northernMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
northernMtMesh.position.x = 0;
northernMtMesh.position.y = 150;
northernMtMesh.position.z = 30;
scene.add(northernMtMesh);

//northern trees
let trTexture = new THREE.TextureLoader().load('level/trees1.png');
trTexture.wrapS = THREE.RepeatWrapping;
trTexture.repeat.x = 3;
let trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
trMaterial.transparent = true;
let trPlane = new THREE.PlaneGeometry(210, 20);
const northernTrMesh = new THREE.Mesh(trPlane, trMaterial);
northernTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
northernTrMesh.position.x = 0;
northernTrMesh.position.y = 105;
northernTrMesh.position.z = 10;
scene.add(northernTrMesh);


//southern skybox
bgTexture = new THREE.TextureLoader().load('level/bg2.png');
bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
bgPlane = new THREE.PlaneGeometry(500, 130);
const southernBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
southernBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
southernBgMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
southernBgMesh.position.x = 0;
southernBgMesh.position.y = -250;
southernBgMesh.position.z = 65;
scene.add(southernBgMesh);

//southern mountains
mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
mtTexture.wrapS = THREE.RepeatWrapping;
mtTexture.repeat.x = 2;
mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
mtMaterial.transparent = true;
mtPlane = new THREE.PlaneGeometry(300, 60);
const southernMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
southernMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
southernMtMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
southernMtMesh.position.x = 0;
southernMtMesh.position.y = -150;
southernMtMesh.position.z = 30;
scene.add(southernMtMesh);

//southern trees
trTexture = new THREE.TextureLoader().load('level/trees1.png');
trTexture.wrapS = THREE.RepeatWrapping;
trTexture.repeat.x = 3;
trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
trMaterial.transparent = true;
trPlane = new THREE.PlaneGeometry(210, 20);
const southernTrMesh = new THREE.Mesh(trPlane, trMaterial);
southernTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
southernTrMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
southernTrMesh.position.x = 0;
southernTrMesh.position.y = -105;
southernTrMesh.position.z = 10;
scene.add(southernTrMesh);

//eastern skybox
bgTexture = new THREE.TextureLoader().load('level/bg2.png');
bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
bgPlane = new THREE.PlaneGeometry(500, 130);
const easternBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
easternBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
easternBgMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 3 * Math.PI / 2);
easternBgMesh.position.x = 250;
easternBgMesh.position.y = 0;
easternBgMesh.position.z = 65;
scene.add(easternBgMesh);

//eastern mountains
mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
mtTexture.wrapS = THREE.RepeatWrapping;
mtTexture.repeat.x = 2;
mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
mtMaterial.transparent = true;
mtPlane = new THREE.PlaneGeometry(300, 60);
const easternMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
easternMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
easternMtMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 3 * Math.PI / 2);
easternMtMesh.position.x = 150;
easternMtMesh.position.y = 0;
easternMtMesh.position.z = 30;
scene.add(easternMtMesh);

//eastern trees
trTexture = new THREE.TextureLoader().load('level/trees1.png');
trTexture.wrapS = THREE.RepeatWrapping;
trTexture.repeat.x = 3;
trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
trMaterial.transparent = true;
trPlane = new THREE.PlaneGeometry(210, 20);
const easternTrMesh = new THREE.Mesh(trPlane, trMaterial);
easternTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
easternTrMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 3 * Math.PI / 2);
easternTrMesh.position.x = 105;
easternTrMesh.position.y = 0;
easternTrMesh.position.z = 10;
scene.add(easternTrMesh);

//western skybox
bgTexture = new THREE.TextureLoader().load('level/bg2.png');
bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
bgPlane = new THREE.PlaneGeometry(500, 130);
const westernBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
westernBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
westernBgMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
westernBgMesh.position.x = -250;
westernBgMesh.position.y = 0;
westernBgMesh.position.z = 65;
scene.add(westernBgMesh);

//western mountains
mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
mtTexture.wrapS = THREE.RepeatWrapping;
mtTexture.repeat.x = 2;
mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
mtMaterial.transparent = true;
mtPlane = new THREE.PlaneGeometry(300, 60);
const westernMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
westernMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
westernMtMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
westernMtMesh.position.x = -150;
westernMtMesh.position.y = 0;
westernMtMesh.position.z = 30;
scene.add(westernMtMesh);

//western trees
trTexture = new THREE.TextureLoader().load('level/trees1.png');
trTexture.wrapS = THREE.RepeatWrapping;
trTexture.repeat.x = 3;
trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
trMaterial.transparent = true;
trPlane = new THREE.PlaneGeometry(210, 20);
const westernTrMesh = new THREE.Mesh(trPlane, trMaterial);
westernTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
westernTrMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
westernTrMesh.position.x = -105;
westernTrMesh.position.y = 0;
westernTrMesh.position.z = 10;
scene.add(westernTrMesh);


//northern wall
const wallGeometry = new THREE.PlaneGeometry( 5, 10 );
const wallMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( wallGeometry, wallMaterial );
plane1.position.y = 50;
plane1.position.z = 5;
plane1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
scene.add( plane1 );

/*
//grid helper
var axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
var gridHelper = new THREE.GridHelper( 100, 100 );
gridHelper.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
scene.add( gridHelper );
scene.add( new THREE.AxesHelper() );
*/

const animate = function () {

  setTimeout( function() { //30 fps
    requestAnimationFrame( animate );
  }, 1000 / 30 );

	camera.position.z = 5;
	renderer.render( scene, camera );
	movePlayer();
};

loadTrackTextures();
animate();
addListeners();

function convertJsonTilesToMap(x, y){
  //json map is represented as the coordinates on left below. 
  //have to convert it to the coordinate system on the right. 
  //(0,0)   (100,0)     maps to    (-50,50)  (50,50)
  //(0,100) (100,100)              (-50,-50) (50,-50)
  return [x - 50, y - 50];
  
}

function drawTiles(){
  const boundaryTexture = new THREE.TextureLoader().load('level/boundary.png');
  const grassTexture = new THREE.TextureLoader().load('level/grass.jpg');
  const trackTexture = new THREE.TextureLoader().load('level/track.jpg');
  
  
  for (var i = 0; i < 100; i++){
    for (var j = 0; j < 100; j++){
      let geometry = new THREE.PlaneGeometry(1, 1);
      let material = new THREE.MeshBasicMaterial({map: grassTexture});
      const tileType = map[i][j];
      if (tileType == 1){
        material = new THREE.MeshBasicMaterial({map: boundaryTexture}); 
      } else if (tileType == 3){
        material = new THREE.MeshBasicMaterial({map: trackTexture});
      }
      let plane = new THREE.Mesh( geometry, material );
      plane.position.x = j - 50;
      plane.position.y = i - 50;
      scene.add( plane );
    }
  }
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

function movePlayer() {
    var delta = clock.getDelta(); // interval 1/60th of a second
    var moveDistance = 10 * delta; // 10 pixels per second
    var rotateAngle = Math.PI * delta; // pi radians (180 deg) per interval

    // move forwards/backwards/left/right
    if ( pressed['W'] ) {
      player.translateZ( -1 * moveDistance );
    }
    if ( pressed['S'] ) 
      player.translateZ(  moveDistance );
    if ( pressed['A'] )
      player.translateX( -1 * moveDistance );
    if ( pressed['D'] )
	  player.translateX(  moveDistance ); 
	  
	var rotation_matrix = new THREE.Matrix4().identity();
    if ( pressed['A'] )
      player.rotateOnAxis(new THREE.Vector3(0,1,0), rotateAngle);
    if ( pressed['D'] )
      player.rotateOnAxis(new THREE.Vector3(0,1,0), -rotateAngle);

  }


