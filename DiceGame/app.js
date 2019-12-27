/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;
init();
// scores = [0,0];
// roundScore = 0;


// Which player is playing. 0 stands for Player 1 and 1 stands for Player 2.
// This will also serve as index value to assign the score in the 'scores' array above.
// activePlayer = 0;

// Choose a random number between 1 and 6
//dice = Math.floor(Math.random()*6)+1;

//Select content in html document. SETTER
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//GETER
// var x = document.querySelector('#score-0').textContent;
// console.log(x);

//Make changes to CSS
// document.querySelector('.dice').style.display = 'none';
//
// document.getElementById('score-0').textContent = 0;
// document.getElementById('score-1').textContent = 0;
// document.getElementById('current-0').textContent = 0;
// document.getElementById('current-1').textContent = 0;

//Event Listener

document.querySelector('.btn-roll').addEventListener('click', function(){
    // anonymous function
    // State variable
    if(gamePlaying){
        // 1. Random number
        var dice = Math.floor(Math.random()*6)+1;
        //2. Display result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+ dice + '.png';


        //3. update the round score IF the rolled number was NOT 1.
        //Ternary operator
        if (dice !== 1){
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            //next player
            nextPlayer();
        }
    }

});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // 1. Add Currentscore to global score
        scores[activePlayer] += roundScore;

        // 2. update UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];


        // check if player won the game
        if (scores[activePlayer] >= 20) {
            document.getElementById('name-'+activePlayer).textContent = activePlayer === 0 ? '1 WON!' : '2 WON!';
            roundScore = 0;
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        } else {

            // next player
            nextPlayer();
        }

    }


})

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Add, remove, toggle HTML classes
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

