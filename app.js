// Hjelpefunksjon for å hente filnavn fra bilde-URL ("hunter" i stedet for "assets/hunter.jpg")
const getImageFilename = (img) => img.src.split("/").pop().split(".")[0];

// DEL 1: Lag karakter og lagre karakteren i localStorage

// Hent HTML-elementer
const characterName = document.getElementById("character-name");
const characterHP = document.getElementById("character-hp");
const attackDamage = document.getElementById("attack-damage");
const profileImgs = document.querySelectorAll(".profile-img");
const createCharacterBtn = document.getElementById("create-character");

// Funksjon for å velge et bilde og oppdatere rammefarge
let selectedImg = null; // Holder valgt bilde
function selectImage(img) {
	// Sett rammefargen for alle bilder som angitt i CSS
	profileImgs.forEach((img) => (img.style.borderColor = "#6a4e1e"));
	// Sett ny rammefarge for valgt bilde
	img.style.borderColor = "#ffd700";
	selectedImg = img;
}

// Kjør funksjon ved klikk på bilde
profileImgs.forEach((img) =>
	img.addEventListener("click", () => selectImage(img))
);

// Funksjon for å lagre data i localStorage
function saveCharacterData() {
	// Lagre karakterdata i localStorage
	localStorage.setItem("character-name", characterName.value);
	localStorage.setItem("character-hp", characterHP.value);
	localStorage.setItem("character-attack-damage", attackDamage.value);
	// Lagre valgt bilde i localStorage, hvis det finnes
	if (selectedImg) {
		localStorage.setItem(
			"character-profile-img",
			getImageFilename(selectedImg)
		);
	} else {
		localStorage.removeItem("character-profile-img");
	}
}

// Kjør funksjon ved klikk på knappen
createCharacterBtn.addEventListener("click", saveCharacterData);

// Behold valgt bilde og rammefarge ved oppdatering av siden
window.addEventListener("load", () => {
	// Hent filnavn for valgt bilde fra localStorage
	const selectedFilename = localStorage.getItem("character-profile-img");
	if (selectedFilename) {
		// Finn bildet med riktig filnavn
		const previouslySelectedImg = [...profileImgs].find(
			(img) => getImageFilename(img) === selectedFilename
		);
		// Hvis bildet finnes, velg det
		if (previouslySelectedImg) selectImage(previouslySelectedImg);
	}
});

//DEL 2: Generer fiende

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

// Hjelpefunksjoner for å hente tilfeldig fiende-data
const randomInteger = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

// Funksjon for å genere tilfeldig fiende
function generateEnemy() {
	// Hent tilfeldig fiende-data
	const randomImg = randomItem(enemyImgs);
	const randomName = randomItem(enemyNames);
	const randomHP = randomInteger(50, 100);
	const randomAttack = randomInteger(10, 40);
	// Vis fiende-dataen på siden
	enemyImg.src = randomImg;
	enemyName.textContent = `Fiende: ${randomName}`;
	enemyHP.textContent = `HP: ${randomHP}`;
	enemyAttack.textContent = `Angrepsstyrke: ${randomAttack}`;
	// Lagre fiende-dataen i localStorage
	const imageFilename = getImageFilename(randomImg);
	localStorage.setItem("enemy-img", imageFilename);
	localStorage.setItem("enemy-name", randomName);
	localStorage.setItem("enemy-hp", randomHP);
	localStorage.setItem("enemy-attack", randomAttack);
}

// Kjør funksjon ved klikk på knappen
generateEnemyBtn.addEventListener("click", generateEnemy);

// Hent fiende-data fra localStorage og vis på siden ved oppdatering
window.addEventListener("load", () => {
	// Sjekk om det finnes lagret fiende-data
	const savedEnemyImgName = localStorage.getItem("enemy-img");
	const savedEnemyName = localStorage.getItem("enemy-name");
	const savedEnemyHP = localStorage.getItem("enemy-hp");
	const savedEnemyAttack = localStorage.getItem("enemy-attack");
	// Hvis data finnes, oppdater DOM med lagret data
	if (savedEnemyImgName) {
		// Gjenopprett full bilde-sti fra lagret filnavn
		const fullImagePath = `assets/${savedEnemyImgName}.jpg`; // Alle fiende-bildene er .jpg
		enemyImg.src = fullImagePath; // Vis lagret bilde på siden
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
//Du skal vise frem helten og fienden. Se HTML-dokumentet for hvordan fremvisningen skal se ut, med tanke på hvilke tagger, hierarki og hvilke klasser de skal ha.
//Du skal lage den strukturen som vist i HTML, her i Javascript og legge de til i div'en "battle-arena" fra HTML.
