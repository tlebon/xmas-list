const unitTable = {
	weight: 'pounds',
	height: 'inches',
};

/** 
/ Animal Base Class 
*/
class Animal {
	constructor(weight, height, diet, species) {
		this.weight = weight;
		this.height = height;
		this.diet = diet;
		this.species = species;
	}
}

// Create Dino Constructor
class Dinosaur extends Animal {
	constructor({ species, weight, height, diet, where, when, fact }) {
		super(weight, height, diet, species);

		this.where = where;
		this.when = when;
		this.fact = fact;
	}
}

// Create Dino Objects
let dinos = [];
/**
 * getDinos will make an async call to the json file
 * and populate the dinos Array with the result.
 */
let getDinos = (async () => {
	let response = await fetch('./dino.json');
	dinos = await response
		.json()
		.then((data) => (dinos = data.Dinos.map((dino) => new Dinosaur(dino))));
})();

// Create Human Object
class Human extends Animal {
	constructor(name, weight, feet, inches, diet) {
		const height = feet * 12 + Number(inches);
		super(Number(weight), height, diet, 'human');
		this.name = name;
	}
}
// Use IIFE to get human data from form

let human;
/**
 * On form submit,
 * the pullForm method will find the value of the form elements
 * and use them to create a new Human.
 */
function pullForm() {
	const humanAttr = ['name', 'weight', 'feet', 'inches', 'diet'];
	let humanEl = humanAttr.map((stat) => {
		return document.getElementById(stat).value;
	});
	human = new Human(...humanEl);
}

const btn = document.getElementById('btn');
btn.addEventListener('mousedown', pullForm);

//I abstracted the dino compare methods to 1 function
/**
 * CompareKey will take a given key
 * and compare the two methods between a dino and a human, if applicable.
 * Created to abstract all of the methods into 1, but since this is not in the criteria it is currently here
 * to extend the project into comparing other fields (If i decided to do that.)
 *
 * @param {string} key
 * @param {Human} human
 * @param {Dinosaur} dino
 * @returns {string} A comparison based on provided key.
 */
function compareKey(key, human, dino) {
	if (typeof human[key] == 'number') {
		switch (true) {
			case human[key] > dino[key]:
				return `You are ${human[key] - dino[key]} ${
					unitTable[key]
				} more than a ${dino.species}`;

			case human[key] < dino[key]:
				return `You are ${-(human[key] - dino[key])} ${
					unitTable[key]
				} less than a ${dino.species}`;
		}
	}

	return human[key].toLowerCase() == dino[key]
		? `You have the same ${key} as a ${dino.species}: ${human[key]}`
		: `You have a ${human[key]} ${key}. ${dino.species} is a ${dino[key]}`;
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function heightCompare(human, dino) {
	const humHeight = human.height;
	const { height, species } = dino;
	const comparison = height - humHeight;

	switch (humHeight < height) {
		case true:
			return `Wow, you are only ${comparison} inches shorter than a ${species}!`;
		case false:
			return `Wait, that can't be right- you are ${-comparison} inches taller than a ${species}!`;
	}
}
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function weightCompare(human, dino) {
	const humWeight = human.weight;
	const { weight, species } = dino;
	const comparison = weight - humWeight;

	switch (humWeight < weight) {
		case true:
			return `Wow, you are ${comparison} pounds lighter than a ${species}! Do you do crossfit or something?`;
		case false:
			return `Wait, that can't be right- you are ${-comparison} pounds heavier than a ${species}!`;
	}
}

// Create Dino Compare Method 3
function dietCompare(human, dino) {
	const humDiet = human.diet.toLowerCase();
	const { diet, species } = dino;

	return humDiet == diet
		? `You have the same diet as a ${species}, your both ${humDiet}s`
		: `You have a ${humDiet} diet. ${species} is a ${diet}`;
}

function getRandomFact(human, dino) {
	if (dino.species == 'Pigeon') {
		return dino.fact;
	}
	let randNum = Math.floor(Math.random() * 6);

	function createInfo(dino) {
		const htmlTraits = [];
		const { fact, ...traits } = dino;
		for (let trait in traits) {
			htmlTraits.push(
				`${trait[0].toUpperCase() + trait.slice(1)}: ${traits[trait]} ${
					unitTable[trait]
				} `
			);
		}
		return htmlTraits;
	}

	const randomFacts = [
		dino.fact,
		heightCompare(human, dino),
		weightCompare(human, dino),
		dietCompare(human, dino),
		...createInfo(dino),
	];

	return randomFacts[randNum];
}

// Generate Tiles for each Dino in Array

function makeTile(animal) {
	const { species } = animal;
	const isHuman = species == 'human';
	return `<div class="grid-item">
	<h3>${isHuman ? animal.name : species}</h3>
	<img src='/images/${species.toLowerCase()}.png'></img>	
${isHuman ? '' : `<p>${getRandomFact(human, animal)} </p>`}
	</div>`;
}

// Add tiles to DOM
// Remove form from screen
// On button click, prepare and display infographic
const form = document.getElementById('dino-compare');
const restart = document.getElementById('restart');
const grid = document.getElementById('grid');

btn.addEventListener('mousedown', function makeGrid() {
	form.className = 'inactive';
	restart.className = '';
	let tiles = dinos
		.map((dino) => makeTile(dino))
		.sort(() => 0.5 - Math.random()); // put the dino tiles in a random (ish) order
	tiles.splice(4, 0, makeTile(human));
	tiles.forEach((tile) => (grid.innerHTML += tile));
});

// Clear the page, show the original form
restart.addEventListener('click', function restartPage() {
	form.className = '';
	restart.className = 'inactive';
	grid.innerHTML = '';
});
