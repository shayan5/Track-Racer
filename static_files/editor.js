let colour = 1
let map = null;
let record = false;
let colourMap = {
    1: '#000000', //boundary
    2: '#36b404', //grass
    3: '#586454', //track
    4: '#ffffff', //start line
    5: '#c1f113', //speed boost
    6: '#2d13f1' //check point
}

function setColour(value){
    colour = value;
}

function generateTable(){
    map = "<tbody>";
    for (var i = 0; i < 100; i++){
        map += "<tr>"
        for (var j = 0; j < 100; j++){
            map += "<td id='" + i + "-" + j +"' onmouseover='changeColour(this)'></td>";
        }
        map += "</tr>";
    }
    map += "</tbody>";
    document.getElementById("mapTable").innerHTML = map;
}

function changeColour(data){
    if (record){
        data.style.backgroundColor = colourMap[colour];
    }  
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
    generateTable();

    document.body.onkeyup = function(e){
        e.preventDefault();
        if(e.keyCode == 32){ //spacebar
            toggleRecord();
        }
    }
});


