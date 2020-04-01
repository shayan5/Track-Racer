let colour = 1
let map = []; //2d map initialized as 1d array, push rows into it
let record = false;
let colourMap = {
    1: '#000000', //boundary
    2: '#36b404', //grass
    3: '#586454', //track
    4: '#ffffff', //start line
    5: '#c1f113', //speed boost
    6: '#2d13f1', //check point
    7: '#ff0000' //player
}
const maxDimensions = 100; //map will be 100 by 100
const boundaryDimensions = 3; //first 3 and last 3 rows and columns cannot be edited

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

function setColour(value){
    colour = value;
}

function generateTable(){
    var editTable = "<tbody>";
    for (var i = 0; i < maxDimensions; i++){
        editTable += "<tr>"
        for (var j = 0; j < maxDimensions; j++){
            if (map[i][j] == 2){ //player should only be able to edit grassy area of initial map
                editTable += "<td id='" + i + "-" + j +"' onmouseover='changeColour(this)'></td>";
            } else {
                editTable += "<td id='" + i + "-" + j +"'></td>"; 
            }
        }
        editTable += "</tr>";
    }
    editTable += "</tbody>";
    document.getElementById("mapTable").innerHTML = editTable;
    updateAllColours();
}

function updateAllColours(){
    for (var i = 0; i < maxDimensions; i++){
        for (var j = 0; j < maxDimensions; j++){
            $('#' + i + '-'+ j).css("background-color", colourMap[map[i][j]]);
        }
    }
}

function changeColour(data){
    if (record){
        data.style.backgroundColor = colourMap[colour];
        const id = data.id.split("-");
        map[id[0]][id[1]] = colour; 
    }  
}

function saveLevel(){
    console.log(JSON.stringify({'map' : map}));
}

function toggleRecord(){
    if (record){
        record = false;
        document.getElementById('recordButton').innerHTML = "Click to draw";
    } else {
        record = true;
        document.getElementById('recordButton').innerHTML = "Click to stop drawing";
    }
}

$('document').ready(function(){
    initializeMap();
    generateTable();

    document.body.onkeydown = function(e){
        if(e.keyCode == 32){ //spacebar
            e.preventDefault();
            toggleRecord();
        }
    }
});


