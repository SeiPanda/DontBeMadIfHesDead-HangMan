let inputWord = "OLIVE";
let clickCount = 1;
let allClick = false;
let dead = false;

document.querySelectorAll(".ABC").forEach(item => {
    item.addEventListener("click", handleClickABC);
})



function handleClickABC(e){


  document.querySelectorAll(".item_input").forEach(item => {
    if(item.classList.contains("guessed")){
      allClick = true;
    }else{
      allClick = false;
    }
  })




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
          }, 700 );
            return;
            
          }
          clickCount = clickCount + 1;
        }
    }
      document.getElementById(currentClickedItem).classList.add("disable");
  }


  function restartGame(){

    clickCount = 0;
    document.querySelector("#hang_manArea > img").src = './img/' + 0 + 'dead.png';
    document.querySelectorAll(".ABC").forEach(item => {
      if(item.classList.contains("disable")){
        item.classList.remove("disable");
      }

      document.querySelectorAll(".item_input").forEach(item => {
        item.innerText = "_";
        item.classList.remove("visible");
        item.classList.remove("guessed");
      })

    })
  }