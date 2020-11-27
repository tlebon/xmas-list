/*
/ GENERAL ANIMAL FUNCTION 
*/
function Animal(weight, height, diet){
	this.weight = weight;
	this.height = height;
	this.diet = diet;
}

// Create Dino Constructor
function Dinosaur({ species, weight, height, diet, where, when, fact }) {
	this.species = species;
	this.weight = weight;
	this.height = height;
	this.diet = diet;
	this.where = where;
	this.when = when;
	this.fact = fact;
}

// Create Dino Objects
let getDinos = async () => {
	let response = await fetch("./dino.json");
	let dinojson = await response
		.json()
		.then((data) => (dinos = data.Dinos.map((dino) => new Dinosaur(dino))));
	return dinojson;
};

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
	let humanEl = humanAttr.map((stat) => {
		return document.getElementById(stat).value;
	});

	human = new Human(...humanEl);
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
function dietCompare(human, dino) {
	const humDiet = human.diet;
	const [diet, species] = dino;

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
	let randNum = Math.floor(Math.random() * 4);
	const compares = [
		dietCompare(human, dino),
		weightCompare(human, dino),
		heightCompare(human, dino),
		dino.fact,
	];
	return compares[randNum];
}

// Generate Tiles for each Dino in Array
function tile(dino) {

	function createInfo(dino) {
		const htmlTraits = [];
		const { species, fact, ...traits } = dino;
		for (let trait in traits) {
			htmlTraits.push(`<p>${trait}: ${traits[trait]}</p>`);
		}
		return htmlTraits;
	}

	return `<div id="grid-item">
	<h3>${species}</h3>
	<img src='images/${species.toLowerCase()}'></img>	
${createInfo(dino).join("</br>")}
</br>${getRandomFact(human, dino)}
	</div>`;
}
// Add tiles to DOM

if (dinos.length) {
	const grid = document.getElementById("grid");
	dinos.forEach((dino) => {
		grid.innerHTML += tile(dino);
	});
}
// Remove form from screen

// On button click, prepare and display infographic
