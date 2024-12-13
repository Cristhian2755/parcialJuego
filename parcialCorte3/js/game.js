let tog = 1;
let rollingSound = new Audio('mp3/sonidoDado.mp3');
let winSound = new Audio('mp3/winSound.mp3');

let p1sum = 0;
let p2sum = 0;
let gameOver = false; // Variable para verificar si el juego ha terminado

function play(player, psum, correction, num) {
    let sum;
    if (gameOver) return; // Evita cualquier movimiento si el juego ha terminado

    if (psum == 'p1sum') {
        p1sum = p1sum + num;

        if (p1sum > 100) {
            p1sum = p1sum - num;
        }

        if (p1sum == 2) { p1sum = 38; }
        if (p1sum == 4) { p1sum = 14; }
        if (p1sum == 8) { p1sum = 30; }
        if (p1sum == 21) { p1sum = 42; }
        if (p1sum == 28) { p1sum = 76; }
        if (p1sum == 32) { p1sum = 10; }
        if (p1sum == 36) { p1sum = 6; }
        if (p1sum == 48) { p1sum = 26; }
        if (p1sum == 50) { p1sum = 67; }
        if (p1sum == 62) { p1sum = 18; }
        if (p1sum == 71) { p1sum = 92; }
        if (p1sum == 80) { p1sum = 99; }
        if (p1sum == 88) { p1sum = 24; }
        if (p1sum == 95) { p1sum = 56; }
        if (p1sum == 97) { p1sum = 78; }

        sum = p1sum;
    }

    if (psum == 'p2sum') {
        p2sum = p2sum + num;

        if (p2sum > 100) {
            p2sum = p2sum - num;
        }

        if (p2sum == 2) { p2sum = 38; }
        if (p2sum == 4) { p2sum = 14; }
        if (p2sum == 8) { p2sum = 30; }
        if (p2sum == 21) { p2sum = 42; }
        if (p2sum == 28) { p2sum = 76; }
        if (p2sum == 32) { p2sum = 10; }
        if (p2sum == 36) { p2sum = 6; }
        if (p2sum == 48) { p2sum = 26; }
        if (p2sum == 50) { p2sum = 67; }
        if (p2sum == 62) { p2sum = 18; }
        if (p2sum == 71) { p2sum = 92; }
        if (p2sum == 80) { p2sum = 99; }
        if (p2sum == 88) { p2sum = 24; }
        if (p2sum == 95) { p2sum = 56; }
        if (p2sum == 97) { p2sum = 78; }

        sum = p2sum;
    }

    document.getElementById(`${player}`).style.transition = 'linear all .5s'; // Animación de movimiento

    if (sum < 10) {
        document.getElementById(`${player}`).style.left = `${(sum - 1) * 60}px`;
        document.getElementById(`${player}`).style.top = `${-0 * 60 - correction}px`;
    }
    else if (sum == 100) {
        winSound.play();
        let winnerText = "";
        if (player == 'p1') {
            winnerText = "¡Jugador Rojo ganó!";
        } else if (player == 'p2') {
            winnerText = "¡Jugador amarillo ganó!";
        }
        document.getElementById("winner").innerText = winnerText;
        gameOver = true; // El juego ha terminado
    }
    else {
        let numarr = Array.from(String(sum));
        let n1 = eval(numarr.shift());
        let n2 = eval(numarr.pop());

        if (n1 % 2 != 0) {
            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 60}px`;
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 60 - correction}px`;
            } else {
                document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 60}px`;
                document.getElementById(`${player}`).style.top = `${-n1 * 60 - correction}px`;
            }
        } else {
            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(0) * 60}px`;
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 60 - correction}px`;
            } else {
                document.getElementById(`${player}`).style.left = `${(n2 - 1) * 60}px`;
                document.getElementById(`${player}`).style.top = `${-n1 * 60 - correction}px`;
            }
        }
    }


    // Animación de movimiento
    document.getElementById(`${player}`).style.transition = 'linear all .5s'; 

    // Calcular las posiciones de las celdas
    let start = (psum == 'p1sum') ? p1sum - num : p2sum - num; // Posición inicial
    let end = sum; // Posición final
    movePiece(player, start, end, correction);
}

// Función para mover la ficha desde su posición actual a la posición del dado
function movePiece(player, start, end, correction) {
    let currentPos = start;
    let interval = setInterval(function() {
        if (currentPos < end) {
            currentPos++;
            moveToCell(player, currentPos, correction);
        } else {
            clearInterval(interval); // Detener la animación cuando la ficha llega a la posición final
        }
    }, 100); // Tiempo entre cada celda (100ms)
}

// Función para mover la ficha a la celda correspondiente
function moveToCell(player, cell, correction) {
    let x = (cell - 1) % 10; // Columna
    let y = Math.floor((cell - 1) / 10); // Fila
    document.getElementById(`${player}`).style.left = `${x * 60}px`;
    document.getElementById(`${player}`).style.top = `${-y * 60 - correction}px`;
}

// Función para reiniciar el juego
function resetGame() {
    // Restablece las variables del juego
    p1sum = 0;
    p2sum = 0;
    gameOver = false;
    
    // Restablece las posiciones de los jugadores
    document.getElementById('p1').style.left = '-62px';
    document.getElementById('p1').style.top = '0px'; 
    document.getElementById('p2').style.left = '-60px'; 
    document.getElementById('p2').style.top = '-50px';

    // Restablece el texto del ganador
    document.getElementById('winner').innerText = '';

    // Restablece el texto del turno
    document.getElementById('tog').innerText = "Jugador 1: Rojo";
}

document.getElementById("diceBtn").addEventListener("click", function () {
    if (gameOver) return; // No se puede lanzar el dado si el juego terminó

    rollingSound.play();
    num = Math.floor(Math.random() * (6 - 1 + 1) + 1); // Número aleatorio entre 1 y 6
    document.getElementById("dice").innerText = num;

    if (tog % 2 != 0) {
        document.getElementById('tog').innerText = "Jugador 1: Rojo";
        play('p1', 'p1sum', 0, num);
    } else if (tog % 2 == 0) {
        document.getElementById('tog').innerText = "Jugador 2: Amarillo";
        play('p2', 'p2sum', 55, num);
    }

    tog = tog + 1; // Cambiar turno
});

// Evento para el botón de reinicio
document.getElementById("resetBtn").addEventListener("click", function () {
    resetGame(); // Llama a la función de reinicio
});
