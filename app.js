// ==================== DEL 1: LAG KARAKTER ====================

// Hent HTML-elementer
const characterName = document.getElementById("character-name");
const characterHP = document.getElementById("character-hp");
const attackDamage = document.getElementById("attack-damage");
const profileImgs = document.querySelectorAll(".profile-img");
const createCharacterBtn = document.getElementById("create-character");

// Tom variabel som brukes i funksjoner for bildevalg
let selectedImg = null;

// Funksjon for å fremheve valgt bilde med ny rammefarge
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
	localStorage.setItem("character-attack", attackDamage.value);
	// Lagre filnavnet for valgt bilde
	if (selectedImg) {
		localStorage.setItem("character-img", selectedImg.src.split("/").pop());
	} else {
		//  Fjern/overskriv eventuelt tidligere valgt bilde
		localStorage.removeItem("character-img");
	}
}

// Funksjon for å vise tidligere valgt bilde
function restoreSelectedImage() {
	// Hent info om valgt bilde fra localStorage
	const selectedImg = localStorage.getItem("character-img");
	if (selectedImg) {
		// Finn bilde med riktig filnavn
		const previouslySelectedImg = [...profileImgs].find(
			(img) => img.src.split("/").pop() === selectedImg
		);
		// Simuler et klikk på bildet for å fremheve det
		if (previouslySelectedImg) previouslySelectedImg.click();
	}
}

// Fremhev valgt bilde ved klikk på bilde
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

// Funksjon for å generere tilfeldig fiende
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

// Funksjon for å opprette HTML-elementer
function createElement(tag, attributes = {}, children = []) {
	// Opprett nytt HTML-element basert på angitt tag
	const element = document.createElement(tag);
	// Legg til eventuelle attributter
	for (const attribute in attributes) {
		if (attributes[attribute] !== null) {
			element[attribute] = attributes[attribute];
		}
	}
	// Legg til eventuelle barneelementer (f.eks. <p> inni en <div>)
	children.forEach((child) => {
		element.appendChild(child);
	});
	return element;
}

// Funksjon for å opprette karakterens kampkort
function createCharacterCard() {
	const characterCard = createElement(
		"div",
		{ id: "character-display", className: "profile-card" },
		[
			createElement("h2", { textContent: "Helten" }),
			createElement("img", {
				id: "char-img",
				alt: "Profilbilde",
				src: `assets/${localStorage.getItem("character-img")}`,
			}),
			createElement("p", {
				id: "char-name",
				textContent:
					"Navn: " +
					`${localStorage.getItem("character-name") || "Ukjent"}`,
			}),
			createElement("p", {
				id: "char-hp",
				textContent:
					"HP: " + `${localStorage.getItem("character-hp") || 0}`,
			}),
			createElement("p", {
				id: "char-attack",
				textContent:
					"Angrepsstyrke: " +
					`${localStorage.getItem("character-attack") || 0}`,
			}),
		]
	);
	battleArea.insertBefore(characterCard, fightBtn);
}

// Funksjon for å opprette fiendens kampkort
function createEnemyCard() {
	const enemyCard = createElement(
		"div",
		{ id: "enemy-fight-display", className: "profile-card" },
		[
			createElement("h2", { textContent: "Fiende" }),
			createElement("img", {
				id: "enemy-fight-img",
				alt: "Fiendens profilbilde",
				src: `assets/${localStorage.getItem("enemy-img")}`,
			}),
			createElement("p", {
				id: "enemy-fight-name",
				textContent:
					"Navn: " +
					`${localStorage.getItem("enemy-name") || "Ukjent"}`,
			}),
			createElement("p", {
				id: "enemy-fight-hp",
				textContent:
					"HP: " + `${localStorage.getItem("enemy-hp") || 0}`,
			}),
			createElement("p", {
				id: "enemy-fight-attack",
				textContent:
					"Angrepsstyrke: " +
					`${localStorage.getItem("enemy-attack") || 0}`,
			}),
		]
	);
	battleArea.insertBefore(enemyCard, fightBtn);
}

// Funksjon for å annonsere vinneren av kampen
function determineWinner() {
	// Hent data fra localStorage, konverter til tall og beregn gjenværende HP
	const remainingCharacterHP =
		(parseInt(localStorage.getItem("character-hp")) || 0) -
		(parseInt(localStorage.getItem("enemy-attack")) || 0);
	const remainingEnemyHP =
		(parseInt(localStorage.getItem("enemy-hp")) || 0) -
		(parseInt(localStorage.getItem("character-attack")) || 0);
	// Oppdater DOM med resultatet basert på mest HP
	if (remainingCharacterHP > remainingEnemyHP) {
		battleResult.textContent = "Du vant!";
	} else if (remainingEnemyHP > remainingCharacterHP) {
		battleResult.textContent = "Du tapte!";
	} else {
		battleResult.textContent = "Uavgjort!";
	}
}

// Funksjon for å kjøre en kamp
function startBattle() {
	// Fjern/overskriv eventuelle tidligere motstandere
	document
		.querySelectorAll(".profile-card")
		.forEach((profileCard) => profileCard.remove());
	// Opprett kampkort for aktuelle motstandere
	createCharacterCard();
	createEnemyCard();
	// Vis kampresultatet
	determineWinner();
}

// Kjør en kamp ved trykk på knappen
fightBtn.addEventListener("click", startBattle);
