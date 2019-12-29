/*
Extra challenges
1. A player looses his entire score when he rolls two 6 in a row. After that it is the next player's turn.
Hint: save the previous dice roll in a separate variable.

2. Add an input field to HTML where players can set the winning score, so that the predefined score can be changed.
Hint: You can read that value with the .value property in JS.

3. Add another dice to the game. The player looses his current score when one of them is 1.
Hint: You need CSS to position the second dice.
 */


var scores, roundScore, activePlayer, gamePlaying, lastDice;
var target;

init();


//Event Listener

document.querySelector('.btn-roll').addEventListener('click', function(){
    // anonymous function
    // State variable
    if(gamePlaying){
        // 1. Random number
        // var dice = Math.floor(Math.random()*6)+1;
        // 1.1. Random number for two dise
        var dice1 = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;
        //2. Display result
        // var diceDOM = document.querySelector('.dice')
        //querySelector selectys only the first occurence of the class object
        var diceDOM1 = document.querySelector('#dice-1');
        var diceDOM2 = document.querySelector('#dice-2')
        // diceDOM.style.display = 'block';
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        // diceDOM.src = 'dice-'+ dice + '.png';
        diceDOM1.src = 'dice-'+ dice1 + '.png';
        diceDOM2.src = 'dice-'+ dice2 + '.png';

        //3. update the round score IF the rolled number was NOT 1.
        // if (dice === 6 && lastDice === 6){
        if (((dice1 === 6 && lastDice1 === 6)||(dice2 === 6 && lastDice2 === 6))||(dice1 === 6 && dice2 === 6)){
            //Ternary operator
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = 0;
            nextPlayer();
        // } else if (dice !== 1){
        } else if ((dice1 !== 1)&&(dice2 !== 1)){
            //add score
            // roundScore += dice;
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        }else{
            //next player
            nextPlayer();
        }

        // lastDice = dice;
        lastDice1 = dice1;
        lastDice2 = dice2;

    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // 1. Add Currentscore to global score
        scores[activePlayer] += roundScore;

        // 2. update UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        // 2.1. Set the target amount
        target = document.getElementById("targetPoints").value;
        var targetValue;
        if (target){
            targetValue = target;
        } else {
            targetValue = 50;
        }


        // check if player won the game
        if (scores[activePlayer] >= targetValue) {
            document.getElementById('name-'+activePlayer).textContent = activePlayer === 0 ? '1 WON!' : '2 WON!';
            roundScore = 0;
            // document.querySelector('.dice').style.display = 'none';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
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
    // document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
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

