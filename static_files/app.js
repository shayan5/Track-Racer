function defaultNewGame(){
  $("#mainMenu").hide();
  $("#game").show();
  initializeGame({});
}

function editedNewGame(tileMap, tileImage){
  $("#editor").hide();
  initializeGame({tiles: tileMap, image: tileImage});
  $("#game").show();
}

function selectLevelEditor(){
  $("#mainMenu").hide();
  $("#editor").show();
  initializeEditor();
}













