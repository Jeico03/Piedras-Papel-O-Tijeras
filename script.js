document.addEventListener("DOMContentLoaded", () => {
	const choices = ["Piedra", "Papel", "Tijeras"];
	let playerScore = 0;
	let computerScore = 0;

	const gameOptions = document.querySelectorAll(".game-option");
	const resultText = document.querySelector(".game-result p");
	const playerScoreText = document.querySelector(".game-score p:nth-child(2)");
	const computerScoreText = document.querySelector(
		".game-score p:nth-child(3)",
	);
	const restartButton = document.querySelector(".game-button:nth-child(1)");
	const helpButton = document.querySelector(".game-button:nth-child(3)");
	const themeButton = document.getElementById("toggle-theme");

	gameOptions.forEach((button, index) => {
		button.setAttribute("data-choice", choices[index]);
		button.addEventListener("click", () =>
			playGame(button.getAttribute("data-choice")),
		);
	});

	function playGame(playerChoice) {
		const computerChoice = choices[Math.floor(Math.random() * 3)];
		let result = determineWinner(playerChoice, computerChoice);
		resultText.textContent = `Jugador: ${playerChoice} | Computadora: ${computerChoice} | ${result}`;
		updateScore();
		checkGameOver();
	}

	function determineWinner(player, computer) {
		if (player === computer) return "Empate";
		if (
			(player === "Piedra" && computer === "Tijeras") ||
			(player === "Papel" && computer === "Piedra") ||
			(player === "Tijeras" && computer === "Papel")
		) {
			playerScore++;
			return "Ganaste";
		} else {
			computerScore++;
			return "Perdiste";
		}
	}

	function updateScore() {
		playerScoreText.textContent = `Jugador: ${playerScore}`;
		computerScoreText.textContent = `Computadora: ${computerScore}`;
	}

	function checkGameOver() {
		if (playerScore === 3 || computerScore === 3) {
			alert(
				playerScore === 3
					? "¡Ganaste el juego!"
					: "¡Perdiste contra la computadora!",
			);
			restartGame();
		}
	}

	function restartGame() {
		playerScore = 0;
		computerScore = 0;
		resultText.textContent = "Resultado";
		updateScore();
	}

	restartButton.addEventListener("click", restartGame);

	helpButton.addEventListener("click", () => {
		let modal = document.getElementById("help-modal");

		if (!modal) {
			modal = document.createElement("div");
			modal.id = "help-modal";
			modal.classList.add("modal");
			modal.innerHTML = `
        <div class="modal-content">
          <span id="close-help" class="close">&times;</span>
          <h2>Reglas del Juego</h2>
          <p>Piedra vence a Tijeras</p>
          <p>Papel vence a Piedra</p>
          <p>Tijeras vence a Papel</p>
          <p>Gana el primero que llegue a 3 puntos</p>
        </div>
      `;
			document.body.appendChild(modal);

			document.getElementById("close-help").addEventListener("click", () => {
				modal.style.display = "none";
			});
		}

		modal.style.display = "flex";
	});

	const currentTheme = localStorage.getItem("theme") || "light";
	document.body.setAttribute("data-theme", currentTheme);
	themeButton.textContent =
		currentTheme === "dark" ? "Modo Claro" : "Modo Oscuro";

	themeButton.addEventListener("click", event => {
		event.stopPropagation();
		const newTheme =
			document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
		document.body.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		themeButton.textContent =
			newTheme === "dark" ? "Modo Claro" : "Modo Oscuro";
	});
});
