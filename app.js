// Create Dino Constructor
function Dinosaur(species, weight, height, diet, where, when, fact) {
	this.species = species;
	this.weight = weight;
	this.height = height;
	this.diet = diet;
	this.where = where;
	this.when = when;
	this.fact = fact;
}

// Create Dino Objects
let dinos = [];
let getDinos = (async () => {
	let response = await fetch("./dino.json");
	let dinojson = await response
		.json()
		.then((data) => (dinos = data.Dinos.map((dino) => new Dinosaur(dino))));
})();

// Create Human Object
function Human(name, weight, feet, inches, diet) {
	this.name = name;
	this.weight = weight;
	this.feet = feet;
	this.inches = inches;
	this.diet = diet;
}
// Use IIFE to get human data from form
let human;

function pullForm() {
	const humanAttr = ["name", "weight", "feet", "inches", "diet"];
	const humanEl = humanAttr.reduce((acc, stat) => {
		acc[stat] = document.getElementById(stat).value;
		return acc;
	}, {});
	// return humanEl;
	human = Human(humanEl);
	console.log(human);
}
const btn = document.getElementById("btn");
btn.addEventListener("click", pullForm);

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function heightCompare(human, dino) {
	const humHeight = human.feet * 12 + human.inches;
	const [height, species] = dino;

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
	const [weight, species] = dino;

	const comparison = weight - humWeight;
	switch (humWeight < weight) {
		case true:
			return `Wow, you are ${comparison} pounds lighter than a ${species}! Do you do crossfit or something?`;
		case false:
			return `Wait, that can't be right- you are ${-comparison} lbs heavier than a ${species}! Maybe lay off the burgers for a while`;
	}
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
