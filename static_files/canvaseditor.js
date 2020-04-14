const tileScale = 10;
const maxDimensions = 100; //map will be 100 by 100
const boundaryDimensions = 3; //first 3 and last 3 rows and columns cannot be edited
let map = []; //2d map initialized as 1d array, push rows into it
let colourMap = {
    1: '#000000', //boundary
    2: '#36b404', //grass
    3: '#586454', //track
    4: '#ffffff', //start line
    5: '#c1f113', //speed boost
    6: '#2d13f1', //check point
    7: '#ff0000' //player
}

function initializeMap(){
    for (var i = 0; i < maxDimensions; i++){
        const row = []
        for (var j = 0; j < maxDimensions; j++){
            //add initial boundaries
            if (i < boundaryDimensions || i >= maxDimensions - boundaryDimensions || j < boundaryDimensions || j >= maxDimensions - boundaryDimensions){
                row.push(1);
            } else if (i == 45 && j == 9){ //add player location
                row.push(7);
            } else if ((i == 44 || i == 43) && (j > 5 && j < 13)){ //add initial start line
                row.push(4);
            } else {
                row.push(2);
            }
        }
        map.push(row);
    }
}

function generateCanvas(){
    var c = document.getElementById("canvasMap");
    var ctx = c.getContext("2d");
    const imgBoundary = document.getElementById("boundary");
    const imgGrass = document.getElementById("grass");
    const imgTrack = document.getElementById("track");
    for (var i = 0; i < maxDimensions; i++){
        for (var j = 0; j < maxDimensions; j++){
            const tile = map[i][j];
            if (tile == 1){
                ctx.drawImage(imgBoundary, j * tileScale, i * tileScale, tileScale, tileScale);
            } else if (tile == 2){
                ctx.drawImage(imgGrass, j * tileScale, i * tileScale, tileScale, tileScale);
            } else if (tile == 3){
                ctx.drawImage(imgTrack, j * tileScale, i * tileScale, tileScale, tileScale);
            }
        }
    }
}

$(function() {
    initializeMap();
    generateCanvas();
});
