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

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
