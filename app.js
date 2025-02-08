// ==================== DEL 1: LAG KARAKTER ====================

// Hent HTML-elementer
const characterName = document.getElementById("character-name");
const characterHP = document.getElementById("character-hp");
const attackDamage = document.getElementById("attack-damage");
const profileImgs = document.querySelectorAll(".profile-img");
const createCharacterBtn = document.getElementById("create-character");

// Funksjon for å synliggjøre valgt bilde med ny rammefarge
let selectedImg = null; // Variabel for å kunne endre valgt bilde
profileImgs.forEach((img) =>
	img.addEventListener("click", () => {
		// Gi alle bilder samme rammefarge som bestemt i CSS
		profileImgs.forEach((img) => (img.style.borderColor = "#6a4e1e"));
		// Gi valgt bilde ny rammefarge
		img.style.borderColor = "#ffd700";
		selectedImg = img;
	})
);

// Funksjon for å lagre data i localStorage ved trykk på knappen
createCharacterBtn.addEventListener("click", () => {
	// Lagre karakterdata fra input-felter
	localStorage.setItem("character-name", characterName.value);
	localStorage.setItem("character-hp", characterHP.value);
	localStorage.setItem("character-attack-damage", attackDamage.value);
	// Lagre valgt bilde og overskriv eventuelt tidligere valgt bilde
	if (selectedImg) {
		localStorage.setItem(
			"character-profile-img",
			selectedImg.src.split("/").pop()
		);
	} else {
		localStorage.removeItem("character-profile-img");
	}
});

// Funksjon for å vise valgt bilde etter oppdatering av siden
window.addEventListener("load", () => {
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
});

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

// Hjelpefunksjoner for å hente ut tilfeldig fiendedata
const randomInteger = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Funksjon for å generere tilfeldig fiende ved trykk på knappen
generateEnemyBtn.addEventListener("click", () => {
	// Hent tilfeldig fiendedata
	const randomImg = randomItem(enemyImgs);
	const randomName = randomItem(enemyNames);
	const randomHP = randomInteger(50, 100);
	const randomAttack = randomInteger(10, 40);
	// Vis fiendedataen i DOM
	enemyImg.src = randomImg;
	enemyName.textContent = `Fiende: ${randomName}`;
	enemyHP.textContent = `HP: ${randomHP}`;
	enemyAttack.textContent = `Angrepsstyrke: ${randomAttack}`;
	// Lagre fiendedataen i localStorage
	localStorage.setItem("enemy-img", randomImg.split("/").pop());
	localStorage.setItem("enemy-name", randomName);
	localStorage.setItem("enemy-hp", randomHP);
	localStorage.setItem("enemy-attack", randomAttack);
});

// Funksjon for å vise eventuelt generert fiende etter oppdatering av siden
window.addEventListener("load", () => {
	// Sjekk om det finnes lagret fiendedata
	const savedEnemyImg = localStorage.getItem("enemy-img");
	const savedEnemyName = localStorage.getItem("enemy-name");
	const savedEnemyHP = localStorage.getItem("enemy-hp");
	const savedEnemyAttack = localStorage.getItem("enemy-attack");
	// Hvis data finnes, oppdater DOM med lagret data
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
});
// ==================== DEL 3: SLOSS ====================

// Hent HTML-elementer
const battleArea = document.getElementById("battle-area");
const fightBtn = document.getElementById("start-fight");
const battleResult = document.getElementById("battle-result");

// Hent data fra localStorage og konverter tilbake til tall
const storedCharacterHP = parseInt(localStorage.getItem("character-hp"));
const storedCharacterAttack = parseInt(
	localStorage.getItem("character-attack-damage")
);
const storedEnemyHP = parseInt(localStorage.getItem("enemy-hp"));
const storedEnemyAttack = parseInt(localStorage.getItem("enemy-attack"));

// Hjelpefunktion for utregning av HP etter kampen
const remainingCharacterHP = storedCharacterHP - storedEnemyAttack;
const remainingEnemyHP = storedEnemyHP - storedCharacterAttack;

// Hjelpefunksjon for å lage nye HTML-elementer
function createElement(tag, id, textContent, parent) {
	const element = document.createElement(tag);
	element.id = id;
	if (textContent) element.textContent = textContent;
	parent.appendChild(element);
	return element;
}

// Funksjon for å kjøre en kamp
fightBtn.addEventListener("click", () => {
	// Slett eventuelle tidligere motstandere
	document.getElementById("character-display")?.remove();
	document.getElementById("enemy-fight-display")?.remove();

	// Lag karakterkort og oppdater DOM med data fra localStorage
	const characterDisplay = document.createElement("div");
	characterDisplay.id = "character-display";
	characterDisplay.classList.add("profile-card");
	battleArea.insertBefore(characterDisplay, fightBtn);
	createElement("h2", "char-heading", "Helten", characterDisplay);
	// Hent karakterbildet
	const characterImg = document.createElement("img");
	characterImg.id = "char-img";
	characterImg.alt = "Profilbilde";
	const characterImgName = localStorage.getItem("character-profile-img");
	if (characterImgName) {
		characterImg.src = `assets/${characterImgName}`;
	}
	characterDisplay.appendChild(characterImg);
	// Hent karakterdata
	createElement(
		"p",
		"char-name",
		`Navn: ${localStorage.getItem("character-name")}`,
		characterDisplay
	);
	createElement(
		"p",
		"char-hp",
		`HP: ${localStorage.getItem("character-hp")}`,
		characterDisplay
	);
	createElement(
		"p",
		"char-attack",
		`Angrepsstyrke: ${localStorage.getItem("character-attack-damage")}`,
		characterDisplay
	);

	// Lag fiendekort og oppdater DOM med data fra localStorage
	const enemyDisplay = document.createElement("div");
	enemyDisplay.id = "enemy-fight-display";
	enemyDisplay.classList.add("profile-card");
	battleArea.insertBefore(enemyDisplay, fightBtn);
	createElement("h2", "enemy-heading", "Fiende", enemyDisplay);
	// Hent fiendebildet
	const enemyImg = document.createElement("img");
	enemyImg.id = "enemy-fight-img";
	enemyImg.alt = "Fiendens profilbilde";
	const enemyImgName = localStorage.getItem("enemy-img");
	if (enemyImgName) {
		enemyImg.src = `assets/${enemyImgName}`;
	}
	enemyDisplay.appendChild(enemyImg);
	// Hent fiendedata
	createElement(
		"p",
		"enemy-fight-name",
		`Navn: ${localStorage.getItem("enemy-name")}`,
		enemyDisplay
	);
	createElement(
		"p",
		"enemy-fight-hp",
		`HP: ${localStorage.getItem("enemy-hp")}`,
		enemyDisplay
	);
	createElement(
		"p",
		"enemy-fight-attack",
		`Angrepsstyrke: ${localStorage.getItem("enemy-attack")}`,
		enemyDisplay
	);

	// Funksjon for å regne ut hvem som vinner
	if (remainingCharacterHP > remainingEnemyHP) {
		battleResult.textContent = "Du vant!";
	} else if (remainingEnemyHP > remainingCharacterHP) {
		battleResult.textContent = "Du tapte!";
	} else {
		battleResult.textContent = "Uavgjort!";
	}
});
