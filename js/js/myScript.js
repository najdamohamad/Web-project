const cellSize = 20 
const size = 30

const life = {
    
    board : new Array() ,
    borderX : function() {  return (paper.view.size.width - size * cellSize) / 2 } ,

    borderY : function() { return (paper.view.size.height - size * cellSize) / 2 } ,

    coords : function(i,j)  { let coordonne = [this.borderX() + i*cellSize , this.borderY() + j*cellSize ]  ; return coordonne } ,

    // fonction d'initialisation de notre tableau de celllule 
    init : function()
    {  
        for (let i = 0 ; i < size ; i ++) {
            // board à dimension = 1 
            this.board[i] = new Array()
            for ( let j = 0 ; j < size ; j ++){
                // àfin de transformer notre board à 2 dimensions 
                this.board[i][j] = new Cell(i,j) ;
            }
        }
    },

    //fonction utuliser a la fin de chaque etape pour mettre à jour l'etat de tout les cellules 
    saveState : function()
    {
        for ( let i = 0 ; i < size ; i ++)
        {
            for ( let j = 0 ; j < size ; j ++ )
            {
                this.board[i][j].saveState()
            }
        }
    },

    //fonction qui nous donne l'etat precedent de la cellule choisit 
    getPreviousState : function(i,j){
        if((i>=0) && (i<size) && (j>=0) && (j<size)){
          return this.board[i][j].getPrevState();
        }
        else{
          return 0;
        }
      },


    iterate : function()
        {
           

            for(let i = 1 ; i < size ; i ++ )
            {
                for( let j = 1 ; j < size ; j ++ )
                {   
                    //affin de conter les voisins  on verifie a chaque coté de notre cellule 
                    let nbVois = 0 
                    if(this.getPreviousState(i,j-1) === 1 )
                        nbVois ++ ;
                    if(this.getPreviousState(i-1,j-1) === 1 )
                        nbVois ++ ;
                    if(this.getPreviousState(i-1,j) === 1 )
                        nbVois ++ ;
                    if(this.getPreviousState(i-1,j+1) === 1 )
                        nbVois ++ ;
                    if(this.getPreviousState(i,j+1) === 1 )
                        nbVois ++ ;
                    if(this.getPreviousState(i+1,j) === 1 )
                        nbVois ++ ;
                    if(this.getPreviousState(i+1,j+1) === 1 )
                        nbVois ++ ;
                    if(this.getPreviousState(i+1,j-1) === 1 )
                        nbVois ++ ;
                        
                        
                // conditon du jeu 
                if(nbVois ===3 && this.getPreviousState(i,j) === 0 )
                {
                    this.board[i][j].live()
                }
                if(nbVois !== 2 && nbVois !== 3 && this.getPreviousState(i,j) === 1)
                {
                    this.board[i][j].die()
                }
            }
        }

            this.saveState() 
        },


    
}

class Cell {
    #i ;
    #j ;
    #state ;
    #previousState ;
    #shape; 

    constructor(a , b)
    {
        this.#i = a 
        this.#j = b 
        this.#state = 0 
        this.#previousState = 0 
        this.#shape = paper.Path.Circle(
            {
            center:life.coords(this.#i,this.#j) , radius : cellSize/2 , fillColor : 'white' , strokeColor : 'blue'
            }
            )
    }

    live()
    {
        this.#state = 1 
        this.#shape = paper.Path.Circle ({
            center:life.coords(this.#i,this.#j) , radius : cellSize/2 , fillColor : 'cyan' , strokeColor : 'blue'
            }
            )
    }

    die()
    {
        this.#state = 0
        this.#shape = paper.Path.Circle ({
            center:life.coords(this.#i,this.#j) , radius : cellSize/2 , fillColor : 'white' , strokeColor : 'blue'
            }
            )
    }

    saveState()
    {
        this.#previousState = this.#state 
    }

    getState(){
        return this.#state
    }
    getPrevState()
    {
        return this.#previousState
    }

  
    


}


function onKeyUp(event){
    if (event.key =='g') {
        console.log("Step");
        life.iterate();
    }
}

function onFrame(){
    console.log("Step");
    life.iterate();
  }

window.addEventListener("keyup",onKeyUp);

window.addEventListener("load",
    function(){
        let canvas = document.getElementById("myCanvas")
        paper.setup(canvas)

      life.init()    ;
      //life.board[1][1].live();




      //code finale de moi 


    //   life.board[5][4].live();
    //   life.board[5][5].live();
    //   life.board[5][6].live();
    //   life.board[5][7].live();
    //   life.board[5][8].live();

    //   life.board[9][4].live();
    //   life.board[9][5].live();
    //   life.board[9][6].live();
    //   life.board[9][7].live();
    //   life.board[9][8].live();

    //   life.board[7][8].live();
    //   life.board[7][4].live();
        


      //code pour tester les autres groupes 

      life.board[5][4].live()
      life.board[5][5].live()
      life.board[5][6].live()
      life.board[5][7].live()
      life.board[5][8].live()
  
      life.board[9][4].live()
      life.board[9][5].live()
      life.board[9][6].live()
      life.board[9][7].live()
      life.board[9][8].live()
  
      life.board[7][8].live()
      life.board[7][4].live()



      // si on veut faire le jeu manuellement on clique sur le boutton g pour chaque etape 
      //onKeyUp();

      // le jeu de vie se deroule de maniere automatique avec cette commande la 
      paper.view.setOnFrame(onFrame)
     
    }
)

