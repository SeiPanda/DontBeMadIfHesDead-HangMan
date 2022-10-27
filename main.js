let inputWord = "";
let clickCount = 1;
let allClick = false;
let dead = false;

document.querySelector("#submitButton").addEventListener("click", clicksubmitButton);


document.querySelectorAll(".ABC").forEach(item => {
    item.addEventListener("click", handleClickABC);
})

function handleClickABC(e){

 let prove = false;
 
  let shortCut = e.target;
  let currentClickedItem;

  currentClickedItem = shortCut.parentNode.id;

  if(!document.getElementById(currentClickedItem).classList.contains("disable")){
    
    if(inputWord.includes(currentClickedItem)){
      for(i = 0; i < inputWord.length; i++){
        
        if( inputWord[i] == currentClickedItem){
          document.querySelector("#item" + i).innerText = inputWord[i];
          document.querySelector("#item" + i).classList.add("visible");
          document.querySelector("#item" + i).classList.add("guessed");
          document.getElementById(currentClickedItem).classList.add("disable");
        }
      }   
    }else{

      document.querySelector("#hang_manArea > img").src = './img/' + clickCount + 'dead.png';
      if(clickCount == 10){
        alert("its dead!!!!")
        setTimeout( () => {
          restartGame();
        }, 1000 );
        return; 
      }
      clickCount = clickCount + 1;
    }
  }
  document.getElementById(currentClickedItem).classList.add("disable");
  prove = proveIfAllGuessed();
  if(prove){
    alert("you won")
    setTimeout( () => {
      restartGame();
    }, 1000 );
  }
}

function restartGame(){
  clickCount = 1;
  document.querySelector("#hang_manArea > img").src = './img/0dead.png';

  document.querySelectorAll(".ABC").forEach(item => {
    if(item.classList.contains("disable")){
      item.classList.remove("disable");
    }

    document.querySelector("#PopUpName").style.display = "flex";

    document.querySelectorAll(".lines").forEach(item => {
      item.innerHTML = "";
    })

    document.querySelector("#inputName").value = "";
  })
}

function createDivs(inputWord){

  if(inputWord.length >= 7){
    document.querySelector("#line2").classList.remove("hidden");
  }else{
    document.querySelector("#line2").classList.add("hidden");
  }

  for(k = 0; k < inputWord.length; k++){
    if(k >= 7 && k <= 14){
      div = '<div id="item'+ k +'" class="item_input"><span>-</span></div>';
      document.querySelector("#line2").innerHTML += div;
    }else{
      if(k == 0){
        div = '<div id="item'+ k +'" class="item_input"><span>-</span></div>';
        document.querySelector("#line1").innerHTML += div;
      }else{
        div = '<div id="item'+ k +'" class="item_input"><span>-</span></div>';
        document.querySelector("#line1").innerHTML += div;
      }
    } 
  }
}


function proveIfAllGuessed(){
  let tested = true;
  document.querySelectorAll(".item_input").forEach(item => {
    if(!(item.classList.contains("guessed"))){
      tested = false;
    }
  })
  return tested;
}

function GetValueInput(){
  let input = document.querySelector("#inputName").value.toUpperCase();
  let isInputCorrect = ProveInput(input);

  if(isInputCorrect){
    document.querySelector("#PopUpName").style.display = "none";
    return input;
  }
  return "";
}

function clicksubmitButton(){

  
  inputWord = GetValueInput();

  if(inputWord !== ""){
    createDivs(inputWord);
  }else{

    alert("Ungültige Eingabe: Nur Buchstaben!");
  }

}

function ProveInput(input){
  var zeichenKette = input;
  let bool = false;
  let i = 0;
  
  while(zeichenKette.length > i){
    if(zeichenKette.search(/^[a-zA-Z]+$/) == -1){
      bool = false;
      return;
    }else{
      bool = true;
    }
    i++;
  }
  
  return bool;
}