const timerElement = document.getElementById("info");

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



function drawTiles(){
  const boundaryTexture = new THREE.TextureLoader().load('level/level.png');
  boundaryTexture.generateMipmaps = false;
  boundaryTexture.minFilter = THREE.NearestFilter;
  boundaryTexture.magFilter = THREE.NearestFilter;
  let geometry = new THREE.PlaneGeometry(100, 100);
  let material = new THREE.MeshBasicMaterial({map: boundaryTexture});
  let plane = new THREE.Mesh( geometry, material );
  initializePlayer(-41, 4, camera, scene); //TODO remove hardcoded value
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
            setMap(result);
            drawTiles();
          }
        }
    }
    httpRequest.send();
}











