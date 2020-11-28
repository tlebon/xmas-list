/*
/ GENERAL ANIMAL FUNCTION 
*/
class Animal {
	constructor(weight, height, diet) {
		this.weight = weight;
		this.height = height;
		this.diet = diet;
	}
}

// Create Dino Constructor
class Dinosaur extends Animal {
	constructor({ species, weight, height, diet, where, when, fact }) {
		super(weight, height, diet);
		this.species = species;
		this.where = where;
		this.when = when;
		this.fact = fact;
	}
}

// Create Dino Objects
let dinos = [];
let getDinos = (async () => {
	let response = await fetch("./dino.json");
	dinos = await response
		.json()
		.then((data) => (dinos = data.Dinos.map((dino) => new Dinosaur(dino))));
})();
// Create Human Object
class Human extends Animal {
	constructor(name, weight, feet, inches, diet) {
		const height = feet * 12 + Number(inches);
		super(Number(weight), height, diet);
		this.name = name;
	}
}
// Use IIFE to get human data from form
let human;

function pullForm() {
	const humanAttr = ["name", "weight", "feet", "inches", "diet"];
	let humanEl = humanAttr.map((stat) => {
		return document.getElementById(stat).value;
	});
	human = new Human(...humanEl);
}

const btn = document.getElementById("btn");
btn.addEventListener("mousedown", pullForm);

//should the dino compare methods be abstracted to 1 function?
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function heightCompare(human, dino) {
	const humHeight = human.height;
	const { height, species } = dino;
	const comparison = height - humHeight;
	console.log(height, humHeight);
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
	console.log(weight, humWeight);
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
	const humDiet = human.diet;
	const { diet, species } = dino;
	console.log(diet, humDiet);
	switch (true) {
		case humDiet == diet:
			return `You are a ${humDiet}? Same as a ${species}`;
		case humDiet == "Omnivor":
			return `So you eat it all? Thats different from a ${species}, they were only ${diet}s`;
		case humDiet == "Herbivor" || humDiet == "Carnivor":
			return `You are a ${humDiet}? The ${species} was a ${diet}`;
	}
}
function getRandomFact(human, dino) {
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
	// console.log(compares);
	return compares[randNum];
}

// Generate Tiles for each Dino in Array

// console.log(dinos);
function tile(dino) {
	const { species } = dino;
	return `<div class="grid-item">
	<h3>${species}</h3>
	<img src='/images/${species.toLowerCase()}.png'></img>	

<p>${getRandomFact(human, dino)} </p>
	</div>`;
}

// Add tiles to DOM
function humanTile(human) {
	return `<div class="grid-item">
	<h3>${human.name}</h3>
	<img src='/images/human.png'></img>	
	</div>`;
}
// Remove form from screen
// On button click, prepare and display infographic
const form = document.getElementById("dino-compare");
btn.addEventListener("mousedown", makeGrid);
function makeGrid() {
	const grid = document.getElementById("grid");
	form.className = "inactive";
	let tiles = dinos.map((dino) => tile(dino));
	tiles.splice(4, 0, humanTile(human));
	tiles.forEach((tile) => (grid.innerHTML += tile));
}
