const tileScale = 10;
const maxDimensions = 100; //map will be 100 by 100
const boundaryDimensions = 3; //first 3 and last 3 rows and columns cannot be edited
let canvas = null;
let ctx = null;
let map = []; //2d map initialized as 1d array, push rows into it
let tileMap = {
    1: null, //boundary
    2: null, //grass
    3: null, //track
    4: null, //start line
    5: null, //speed boost
    6: null, //check point
    7: null  //player
}
let tile = 3;


function initializeMap(){
    for (var i = 0; i < maxDimensions; i++){
        const row = []
        for (var j = 0; j < maxDimensions; j++){
            //add initial boundaries
            if (i < boundaryDimensions || i >= maxDimensions - boundaryDimensions || j < boundaryDimensions || j >= maxDimensions - boundaryDimensions){
                row.push(1);
            } else if (i == 45 && j == 9){ //add player location
                row.push(7);
            } else if ((i == 44) && (j > 5 && j < 13)){ //add initial start line
                row.push(4);
            } else {
                row.push(2);
            }
        }
        map.push(row);
    }
}

function setColour(newTile){
    tile = newTile;
}

function updateTile(x, y, newTile){
    map[y][x] = newTile; //update map

    //update image on canvas
    const tileImage = tileMap[newTile];
    if (tileImage == null){
        ctx.fillRect(x * tileScale, y * tileScale, tileScale, tileScale); 
    } else {
        ctx.drawImage(tileImage, x * tileScale, y * tileScale, tileScale, tileScale);
    }
}   

function playerEditTile(x, y, newTile){
    if (map[y][x] != 7 //user cannot edit initial player position
        && map[y][x] != 4 //user cannot edit initial start line
        && y > boundaryDimensions - 1 && y < maxDimensions - boundaryDimensions //user cannot edit initial boundaries
        && x > boundaryDimensions - 1 && x < maxDimensions - boundaryDimensions){ 
        updateTile(x, y, tile);
    }
}

function generateCanvas(){
    canvas = document.getElementById("canvasMap");
    ctx = canvas.getContext("2d");
    for (var i = 0; i < maxDimensions; i++){
        for (var j = 0; j < maxDimensions; j++){
            const tile = map[i][j];
            updateTile(j, i, tile);
        }
    }

    let lastMouse = {x: 0, y: 0}

    canvas.addEventListener('mousemove', function(e){
        lastMouse.x = Math.floor(e.offsetX / tileScale);
        lastMouse.y = Math.floor(e.offsetY / tileScale);
    }, false);

    canvas.addEventListener('mousedown', function(e){
        if (e.which == 1){ //only on left clicks
            canvas.addEventListener('mousemove', onPaint, false);
        }
    });

    canvas.addEventListener('mouseup', function(){
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function(e){
        playerEditTile(lastMouse.x, lastMouse.y, tile)
    };

}

function saveLevel(){
    console.log(JSON.stringify({'map' : map}));
}

$(function() {
    tileMap[1] = document.getElementById("boundary");
    tileMap[2] = document.getElementById("grass");
    tileMap[3] = document.getElementById("track");
    tileMap[4] = document.getElementById("startline");
    tileMap[5] = document.getElementById("boost");
    tileMap[6] = document.getElementById("checkpoint");
    tileMap[7] = document.getElementById("player");
    initializeMap();
    generateCanvas();
});
