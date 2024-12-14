// Variables globales
let tog = 1; // Variable para alternar entre los turnos de los jugadores
let rollingSound = new Audio('mp3/sonidoDado.mp3'); // Sonido del dado al rodar
let winSound = new Audio('mp3/winSound.mp3'); // Sonido al ganar el juego
let p1sum = 0; // Puntuación del Jugador 1
let p2sum = 0; // Puntuación del Jugador 2
let gameOver = false; // Variable para verificar si el juego ha terminado

// Función principal para jugar
function play(player, psum, correction, num) {
    let sum;
    if (gameOver) return; // Evita cualquier movimiento si el juego ha terminado

    if (psum == 'p1sum') {
        p1sum = p1sum + num;
        if (p1sum > 100) {
            p1sum = p1sum - num;
        }
        // Tablas de serpientes y escaleras para el Jugador 1
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
        // Tablas de serpientes y escaleras para el Jugador 2
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

    // Movimiento de los jugadores en el tablero
    document.getElementById(`${player}`).style.transition = 'linear all .5s'; // Animación de movimiento

    // Posicionamiento de los jugadores
    if (sum < 10) {
        document.getElementById(`${player}`).style.left = `${(sum - 1) * 60}px`;
        document.getElementById(`${player}`).style.top = `${-0 * 60 - correction}px`;
    } else if (sum == 100) {
        winSound.play(); // Reproduce el sonido de victoria
        let winnerText = "";
        if (player == 'p1') {
            winnerText = "¡Jugador Rojo ganó!";
        } else if (player == 'p2') {
            winnerText = "¡Jugador amarillo ganó!";
        }
        document.getElementById("winner").innerText = winnerText; // Muestra el mensaje del ganador
        gameOver = true; // El juego ha terminado
    } else {
        let numarr = Array.from(String(sum));
        let n1 = eval(numarr.shift());
        let n2 = eval(numarr.pop());

        if (n1 % 2 != 0) { // Si el número de decenas es impar
            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 60}px`;
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 60 - correction}px`;
            } else {
                document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 60}px`;
                document.getElementById(`${player}`).style.top = `${-n1 * 60 - correction}px`;
            }
        } else { // Si el número de decenas es par
            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(0) * 60}px`;
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 60 - correction}px`;
            } else {
                document.getElementById(`${player}`).style.left = `${(n2 - 1) * 60}px`;
                document.getElementById(`${player}`).style.top = `${-n1 * 60 - correction}px`;
            }
        }
    }
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

// Evento para el botón del dado
document.getElementById("diceBtn").addEventListener("click", function () {
    if (gameOver) return; // No se puede lanzar el dado si el juego terminó

    rollingSound.play(); // Reproduce el sonido del dado
    num = Math.floor(Math.random() * (6 - 1 + 1) + 1); // Número aleatorio entre 1 y 6
    document.getElementById("dice").innerText = num; // Muestra el número en la interfaz

    if (tog % 2 != 0) {
        document.getElementById('tog').innerText = "Jugador 1: Rojo"; // Muestra el turno del Jugador 1
        play('p1', 'p1sum', 0, num); // Llama a la función play para el Jugador 1
    } else if (tog % 2 == 0) {
        document.getElementById('tog').innerText = "Jugador 2: Amarillo"; // Muestra el turno del Jugador 2
        play('p2', 'p2sum', 55, num); // Llama a la función play para el Jugador 2
    }

    tog = tog + 1; // Cambiar turno
});

// Evento para el botón de reinicio
document.getElementById("resetBtn").addEventListener("click", function () {
    resetGame(); // Llama a la función de reinicio
});
