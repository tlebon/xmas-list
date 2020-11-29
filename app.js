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
		const species = 'human';
		super(Number(weight), height, diet, species);
		this.name = name;
	}
}
// Use IIFE to get human data from form
let human;

function pullForm() {
	const humanAttr = ['name', 'weight', 'feet', 'inches', 'diet'];
	let humanEl = humanAttr.map((stat) => {
		return document.getElementById(stat).value;
	});
	human = new Human(...humanEl);
}

const btn = document.getElementById('btn');
btn.addEventListener('mousedown', pullForm);

//should the dino compare methods be abstracted to 1 function?
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
			return `Wait, that can't be right- you are ${-comparison} lbs heavier than a ${species}!`;
	}
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function dietCompare(human, dino) {
	const humDiet = human.diet.toLowerCase();
	const { diet, species } = dino;

	switch (true) {
		case humDiet == diet:
			return `You are a ${humDiet}? Same as a ${species}`;
		case humDiet == 'Omnivor':
			return `So you eat it all? Thats different from a ${species}, they were only ${diet}s`;
		case humDiet == 'Herbivor' || humDiet == 'Carnivor':
			return `You are a ${humDiet}? The ${species} was a ${diet}`;
	}
}
function compareKey(key, human, dino) {
	if (human[key] == dino[key]) {
		return `You have the same ${key} as a ${dino.species}`;
	}
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
			htmlTraits.push(`${trait}: ${traits[trait]}`);
		}
		return htmlTraits;
	}

	const compares = [
		dietCompare(human, dino),
		weightCompare(human, dino),
		heightCompare(human, dino),
		dino.fact,
		...createInfo(dino),
	];

	return compares[randNum];
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

btn.addEventListener('mousedown', makeGrid);
function makeGrid() {
	form.className = 'inactive';
	restart.className = '';
	let tiles = dinos.map((dino) => makeTile(dino));
	tiles.splice(4, 0, makeTile(human));
	tiles.forEach((tile) => (grid.innerHTML += tile));
}
// Clear the page, show the original content/ randomize the dino order
restart.addEventListener('click', function () {
	form.className = '';
	restart.className = 'inactive';
	grid.innerHTML = '';
});
