let timerElement = null;
let scene = null;
let camera = null;
let renderer = null;

function initializeGame(){
  timerElement = document.getElementById("info");
  scene = new THREE.Scene();
  scene.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), Math.PI);
  scene.background = new THREE.Color(0xab6a8c);
  camera = new THREE.PerspectiveCamera( 
    30, window.innerWidth/window.innerHeight, 0.1, 500
  );
  camera.position.set(0, 1.25, 0);
  let canvas = document.getElementById("gameCanvas");
  renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setSize(window.innerWidth, window.innerHeight);
  loadBackground(scene);
  loadTrackTextures();
  animate();
  addListeners();
}

window.addEventListener('resize', function(){
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

const animate = function () {
  setTimeout(function() {
    requestAnimationFrame(animate);
  }, 1000 / fps );

	camera.position.z = 8;
	renderer.render(scene, camera);
  movePlayer();
  updateTimer();
};

function playGame(){
  $("#mainMenu").hide();
  $("#game").show();
  initializeGame();
}


function drawTiles(){
  const boundaryTexture = new THREE.TextureLoader().load('level/level.png');
  boundaryTexture.generateMipmaps = false;
  boundaryTexture.minFilter = THREE.NearestFilter;
  boundaryTexture.magFilter = THREE.NearestFilter;
  let geometry = new THREE.PlaneGeometry(100, 100);
  let material = new THREE.MeshBasicMaterial({map: boundaryTexture});
  let plane = new THREE.Mesh(geometry, material);
  initializePlayer(-41, 4, camera, scene); //TODO remove hardcoded value
  scene.add(plane);
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











