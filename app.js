// ==================== DEL 1: LAG KARAKTER ====================

// Hent HTML-elementer
const characterName = document.getElementById("character-name");
const characterHP = document.getElementById("character-hp");
const attackDamage = document.getElementById("attack-damage");
const profileImgs = document.querySelectorAll(".profile-img");
const createCharacterBtn = document.getElementById("create-character");

// Funksjon for å fremheve valgt bilde med ny rammefarge
let selectedImg = null; // Variabel for å kunne endre valgt bilde
function highlightSelectedImage(img) {
	// Nullstille rammefargen på alle bildene
	profileImgs.forEach((img) => (img.style.borderColor = "#6a4e1e"));
	// Gi valgt bilde ny rammefarge
	img.style.borderColor = "#ffd700";
	// Lagre det valgte bilde
	selectedImg = img;
}

// Funksjon for å lagre data i localStorage
function saveCharacterData() {
	// Lagre data fra input-felter
	localStorage.setItem("character-name", characterName.value);
	localStorage.setItem("character-hp", characterHP.value);
	localStorage.setItem("character-attack-damage", attackDamage.value);
	// Lagre filnavnet for valgt bilde
	if (selectedImg) {
		localStorage.setItem(
			"character-profile-img",
			selectedImg.src.split("/").pop()
		);
		//  Overskriv eventuelt tidligere valgt bilde
	} else {
		localStorage.removeItem("character-profile-img");
	}
}

// Funksjon for å vise tidligere valgt bilde
function restoreSelectedImage() {
	// Hent info om valgt bilde fra localStorage
	const selectedImg = localStorage.getItem("character-profile-img");
	if (selectedImg) {
		// Finn bilde med riktig filnavn
		const previouslySelectedImg = [...profileImgs].find(
			(img) => img.src.split("/").pop() === selectedImg
		);
		// Vis tidligere valgt bilde
		if (previouslySelectedImg) previouslySelectedImg.click();
	}
}

// Fremhev valgt bilde ved trykk på bilde
profileImgs.forEach((img) =>
	img.addEventListener("click", () => highlightSelectedImage(img))
);
// Lagre data i localStorage ved trykk på knappen
createCharacterBtn.addEventListener("click", saveCharacterData);
// Fremhev tidligere valgt bilde ved oppdatering av siden
window.addEventListener("load", restoreSelectedImage);

// ==================== DEL 2: GENERER FIENDE ====================

// Hent HTLM-elementer
const generateEnemyBtn = document.getElementById("generate-enemy");
const enemyImg = document.getElementById("enemy-img");
const enemyName = document.getElementById("enemy-name");
const enemyHP = document.getElementById("enemy-hp");
const enemyAttack = document.getElementById("enemy-attack");

// Lister over tilgjengelige fiendebilder og fiendenavn
const enemyImgs = [
	"assets/dragon.jpg",
	"assets/monster.jpg",
	"assets/swamp-monster.jpg",
];
const enemyNames = ["Goblin", "Ork", "Drage"];

// Hjelpefunksjoner for å hente ut tilfeldig data
const randomInteger = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Funksjon for å generere en tilfeldig fiende
function generateEnemy() {
	// Hent ut tilfeldig data
	const randomImg = randomItem(enemyImgs);
	const randomName = randomItem(enemyNames);
	const randomHP = randomInteger(50, 100);
	const randomAttack = randomInteger(10, 40);
	// Oppdater DOM
	enemyImg.src = randomImg;
	enemyName.textContent = `Fiende: ${randomName}`;
	enemyHP.textContent = `HP: ${randomHP}`;
	enemyAttack.textContent = `Angrepsstyrke: ${randomAttack}`;
	// Lagre data i localStorage
	localStorage.setItem("enemy-img", randomImg.split("/").pop());
	localStorage.setItem("enemy-name", randomName);
	localStorage.setItem("enemy-hp", randomHP);
	localStorage.setItem("enemy-attack", randomAttack);
}

// Funksjon for å vise tidligere generert fiende
function restoreEnemy() {
	// Hent data fra localStorage
	const savedEnemyImg = localStorage.getItem("enemy-img");
	const savedEnemyName = localStorage.getItem("enemy-name");
	const savedEnemyHP = localStorage.getItem("enemy-hp");
	const savedEnemyAttack = localStorage.getItem("enemy-attack");
	// Oppdater DOM, hvis data finnes
	if (savedEnemyImg) {
		enemyImg.src = `assets/${savedEnemyImg}`;
	}
	if (savedEnemyName) {
		enemyName.textContent = `Fiende: ${savedEnemyName}`;
	}
	if (savedEnemyHP) {
		enemyHP.textContent = `HP: ${savedEnemyHP}`;
	}
	if (savedEnemyAttack) {
		enemyAttack.textContent = `Angrepsstyrke: ${savedEnemyAttack}`;
	}
}

// Generer tilfeldig fiende ved trykk på knappen
generateEnemyBtn.addEventListener("click", generateEnemy);
// Vis tidligere generert fiende ved oppdatering av siden
window.addEventListener("load", restoreEnemy);

// ==================== DEL 3: SLOSS ====================

// Hent HTML-elementer
const battleArea = document.getElementById("battle-area");
const fightBtn = document.getElementById("start-fight");
const battleResult = document.getElementById("battle-result");

// Funksjon for å hente data fra localStorage og konvertere til tall
function getStoredData(key) {
	return parseInt(localStorage.getItem(key)) || 0;
}

// Funksjon for å beregne gjenværende HP etter kampen
function calculateRemainingHP() {
	return {
		remainingCharacterHP:
			getStoredData("character-hp") - getStoredData("enemy-attack"),
		remainingEnemyHP:
			getStoredData("enemy-hp") -
			getStoredData("character-attack-damage"),
	};
}

// Funksjon for å lage nye HTML-elementer
function createElement(tag, id, textContent, parent) {
	const element = document.createElement(tag);
	element.id = id;
	if (textContent) element.textContent = textContent;
	parent.appendChild(element);
	return element;
}

// Funksjon for å opprette kampkort
function createBattleCard(id, title, imgKey, nameKey, hpKey, attackKey) {
	// Lag en <div>
	const display = document.createElement("div");
	display.id = id;
	display.classList.add("profile-card");
	battleArea.insertBefore(display, fightBtn);
	// Lag en H2
	createElement("h2", `${id}-heading`, title, display);
	// Lag en <img> og vis bildet lagret i localStorage
	const img = document.createElement("img");
	img.id = `${id}-img`;
	img.alt = `${title} profilbilde`;
	const imgName = localStorage.getItem(imgKey);
	if (imgName) {
		img.src = `assets/${imgName}`;
	}
	display.appendChild(img);
	// Lag en <p> og vis data lagret i localStorage
	createElement(
		"p",
		`${id}-name`,
		`Navn: ${localStorage.getItem(nameKey)}`,
		display
	);
	createElement(
		"p",
		`${id}-hp`,
		`HP: ${localStorage.getItem(hpKey)}`,
		display
	);
	createElement(
		"p",
		`${id}-attack`,
		`Angrepsstyrke: ${localStorage.getItem(attackKey)}`,
		display
	);
}

// Funksjon for å kjøre en kamp
function startBattle() {
	// Fjern eventuelle tidligere motstandere
	document.getElementById("character-display")?.remove();
	document.getElementById("enemy-fight-display")?.remove();
	// Opprett kampkort for karakter og fiende
	createBattleCard(
		"character-display",
		"Helten",
		"character-profile-img",
		"character-name",
		"character-hp",
		"character-attack-damage"
	);
	createBattleCard(
		"enemy-fight-display",
		"Fiende",
		"enemy-img",
		"enemy-name",
		"enemy-hp",
		"enemy-attack"
	);
	// Beregn og vis kampresultatet
	const { characterHP, enemyHP } = calculateRemainingHP();
	if (characterHP > enemyHP) {
		battleResult.textContent = "Du vant!";
	} else if (enemyHP > characterHP) {
		battleResult.textContent = "Du tapte!";
	} else {
		battleResult.textContent = "Uavgjort!";
	}
}

// Kjør en kamp ved trykk på knappen
fightBtn.addEventListener("click", startBattle);
