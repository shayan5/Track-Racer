let tileScale = 10;
const maxDimensions = 100; //map will be 100 by 100
const boundaryDimensions = 3; //first 3 and last 3 rows and columns cannot be edited
let editorCanvas = null;
let editorCtx = null;
let newMap = []; //2d map initialized as 1d array, push rows into it
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
        newMap.push(row);
    }
}

function setColour(newTile){
    tile = newTile;
}

function updateTile(x, y, newTile){
    newMap[y][x] = newTile; //update map

    //update image on canvas
    const tileImage = tileMap[newTile];
    if (tileImage == null){
        editorCtx.fillRect(x * tileScale, y * tileScale, tileScale, tileScale); 
    } else {
        editorCtx.drawImage(tileImage, x * tileScale, y * tileScale, tileScale, tileScale);
    }
}   

function playerEditTile(x, y, newTile){
    if (newMap[y][x] != 7 //user cannot edit initial player position
        && newMap[y][x] != 4 //user cannot edit initial start line
        && y > boundaryDimensions - 1 && y < maxDimensions - boundaryDimensions //user cannot edit initial boundaries
        && x > boundaryDimensions - 1 && x < maxDimensions - boundaryDimensions){ 
        updateTile(x, y, tile);
    }
}

function generateCanvas(){
    editorCanvas = document.getElementById("editorCanvas");
    const editor = document.getElementById("editor");
    editorCanvas.width = editor.clientWidth;
    editorCanvas.height = editor.clientWidth;
    tileScale = editor.clientWidth / maxDimensions;
    editorCtx = editorCanvas.getContext("2d");
    for (var i = 0; i < maxDimensions; i++){
        for (var j = 0; j < maxDimensions; j++){
            const tile = newMap[i][j];
            updateTile(j, i, tile);
        }
    }

    let lastMouse = {x: 0, y: 0}

    editorCanvas.addEventListener('mousemove', function(e){
        lastMouse.x = Math.floor(e.offsetX / tileScale);
        lastMouse.y = Math.floor(e.offsetY / tileScale);
    }, false);

    editorCanvas.addEventListener('mousedown', function(e){
        if (e.which == 1){ //only on left clicks
            editorCanvas.addEventListener('mousemove', onPaint, false);
        }
    });

    editorCanvas.addEventListener('mouseup', function(){
        editorCanvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function(e){
        playerEditTile(lastMouse.x, lastMouse.y, tile)
    };

    window.addEventListener('resize', function(){
        const editor = document.getElementById("editor");
        editorCanvas.width = editor.clientWidth;
        editorCanvas.height = editor.clientWidth;
        tileScale = editor.clientWidth / maxDimensions;
        redrawCanvas();
        //document.getElementById("editorCanvas").setSize(window.innerWidth, window.innerHeight);
    });

}

function redrawCanvas(){
    const editor = document.getElementById("editor");
    tileScale = editor.clientWidth / maxDimensions;
    for (let i = 0; i < newMap.length; i++){
        for (let j = 0; j < newMap[0].length; j++){
            updateTile(j, i, newMap[i][j]);
        }
    }
}

function saveLevel(){
    console.log(JSON.stringify({'map' : newMap}));
}

function initializeEditor(){
    tileMap[1] = document.getElementById("boundary");
    tileMap[2] = document.getElementById("grass");
    tileMap[3] = document.getElementById("track");
    tileMap[4] = document.getElementById("startline");
    tileMap[5] = document.getElementById("boost");
    tileMap[6] = document.getElementById("checkpoint");
    tileMap[7] = document.getElementById("player");
    initializeMap();
    generateCanvas();
}
