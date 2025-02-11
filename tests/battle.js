// ==================== DEL 4: TESTING ====================

// Fra del 1
function saveCharacterData() {
	localStorage.setItem("character-name", characterName.value);
	localStorage.setItem("character-hp", characterHP.value);
	localStorage.setItem("character-attack", attackDamage.value);
	if (selectedImg) {
		localStorage.setItem("character-img", selectedImg.src.split("/").pop());
	} else {
		localStorage.removeItem("character-img");
	}
}

// Fra del 2
const enemyNames = ["Goblin", "Ork", "Drage"];

// Fra del 3
function determineWinner() {
	const remainingCharacterHP =
		(parseInt(localStorage.getItem("character-hp")) || 0) -
		(parseInt(localStorage.getItem("enemy-attack")) || 0);
	const remainingEnemyHP =
		(parseInt(localStorage.getItem("enemy-hp")) || 0) -
		(parseInt(localStorage.getItem("character-attack")) || 0);
	if (remainingCharacterHP > remainingEnemyHP) {
		battleResult.textContent = "Du vant!";
	} else if (remainingEnemyHP > remainingCharacterHP) {
		battleResult.textContent = "Du tapte!";
	} else {
		battleResult.textContent = "Uavgjort!";
	}
}

// Mulighet for å kjøre flere tester i samme dokument
module.exports = {
	saveCharacterData: saveCharacterData,
	enemyNames: enemyNames,
	determineWinner: determineWinner,
};
