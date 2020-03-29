
//https://stackoverflow.com/questions/11127543/how-to-move-an-object-forward-in-three-js

//let playerAngle = 0;
let pressed = {};
let clock = new THREE.Clock();



const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0c1f5);
const camera = 
new THREE.PerspectiveCamera( 
	45, window.innerWidth/window.innerHeight, 0.1, 1000 );
//camera.position.z = 5;
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


/*
//ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.DoubleSide} );
const ground = new THREE.Mesh(groundGeometry, groundMaterial)
scene.add(ground);
*/

//northern wall
const wallGeometry = new THREE.PlaneGeometry( 5, 10 );
const wallMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
const plane1 = new THREE.Mesh( wallGeometry, wallMaterial );
plane1.position.y = 50;
plane1.position.z = 5;
plane1.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
scene.add( plane1 );

var gridHelper = new THREE.GridHelper( 100, 100 );
gridHelper.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
scene.add( gridHelper );

scene.add( new THREE.AxesHelper() );

const animate = function () {
	requestAnimationFrame( animate );

	camera.position.z = 5;
	renderer.render( scene, camera );
	movePlayer();
};

animate();
addListeners();


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
	  //player.rotateOnAxis(new THREE.Vector3(1,0,0), -rotateAngle)
	  //console.log(player.position.x + ", " + player.position.y);
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


/*
document.onkeydown = checkKey;





function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
		// up arrow
		//player.translateX(1);
		player.translateZ(-1);
		console.log(player.position.x, ", " + player.position.y);
	}
    else if (e.keyCode == '40') {
		// down arrow
		player.position.y -= 1;
		player.translateZ(1);
    }
    else if (e.keyCode == '37') {
	   // left arrow
	   player.rotation.y -= 0.1;
    }
    else if (e.keyCode == '39') {
	   // right arrow
	   player.rotation.y += 0.1;
    }

}
*/