// ==================== DEL 4: TESTING ====================

// Mulighet for å kjøre flere tester i samme dokument
const tests = require("./battle");

// Test at data om karakteren lagres i localStorage
describe("saveCharacterData", () => {
	let mockLocalStorage;
	beforeEach(() => {
		// Mock localStorage
		mockLocalStorage = {
			setItem: jest.fn(),
			removeItem: jest.fn(),
		};
		// Overskriv localStorage med mock
		global.localStorage = mockLocalStorage;
		// Mock DOM elementer
		global.characterName = { value: "Hero" };
		global.characterHP = { value: "100" };
		global.attackDamage = { value: "50" };
		global.selectedImg = { src: "/images/hero.png" };
	});
	afterEach(() => {
		jest.restoreAllMocks();
	});
	test("should store character data in localStorage", () => {
		tests.saveCharacterData();
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"character-name",
			"Hero"
		);
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"character-hp",
			"100"
		);
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"character-attack",
			"50"
		);
	});
	test("should store the selected image file name in localStorage", () => {
		tests.saveCharacterData();
		expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
			"character-img",
			"hero.png"
		);
	});
	test("should remove the image data from localStorage if no image is selected", () => {
		global.selectedImg = null;
		tests.saveCharacterData();
		expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
			"character-img"
		);
	});
});

// Test at fienden kan hete Ork, men ikke Amina
describe("enemyNames", () => {
	test("enemyNames should include 'Ork'", () => {
		expect(tests.enemyNames).toContain("Ork");
	});
	test("enemyNames should not include 'Amina'", () => {
		expect(tests.enemyNames).not.toContain("Amina");
	});
});

// Test at utregningen av vinneren blir riktig
describe("determineWinner", () => {
	let mockLocalStorage;
	let mockBattleResult;
	beforeEach(() => {
		// Mock localStorage
		mockLocalStorage = {
			getItem: jest.fn(),
		};
		global.localStorage = mockLocalStorage;
		// Mock battleResult DOM-element
		mockBattleResult = { textContent: "" };
		global.battleResult = mockBattleResult;
	});
	test("should declare the player as the winner when character HP is higher", () => {
		mockLocalStorage.getItem.mockImplementation((key) => {
			const data = {
				"character-hp": "100",
				"enemy-attack": "30",
				"enemy-hp": "50",
				"character-attack": "20",
			};
			return data[key] || null;
		});
		tests.determineWinner();
		expect(mockBattleResult.textContent).toBe("Du vant!");
	});
	test("should declare the player as the loser when enemy HP is higher", () => {
		mockLocalStorage.getItem.mockImplementation((key) => {
			const data = {
				"character-hp": "50",
				"enemy-attack": "20",
				"enemy-hp": "100",
				"character-attack": "10",
			};
			return data[key] || null;
		});
		tests.determineWinner();
		expect(mockBattleResult.textContent).toBe("Du tapte!");
	});
	test("should declare a draw when HP values are equal", () => {
		mockLocalStorage.getItem.mockImplementation((key) => {
			const data = {
				"character-hp": "50",
				"enemy-attack": "20",
				"enemy-hp": "50",
				"character-attack": "20",
			};
			return data[key] || null;
		});
		tests.determineWinner();
		expect(mockBattleResult.textContent).toBe("Uavgjort!");
	});
});
