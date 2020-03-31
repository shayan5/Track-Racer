let colour = 1
let map = null;

function setColour(value){
    colour = value;
    alert(colour);
}

function generateTable(){
    map = "<tbody>";
    for (var i = 0; i < 100; i++){
        map += "<tr>"
        for (var j = 0; j < 100; j++){
            map += "<td id='" + i + "-" + j +"' onclick='changeColour(this)'></td>";
        }
        map += "</tr>";
    }
    map += "</tbody>";
    document.getElementById("mapTable").innerHTML = map;
}

function changeColour(data){
    alert(data.id);
}

$('document').ready(function(){
    generateTable();
});