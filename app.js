const lights = document.getElementById('lights');
lights.addEventListener('focus', function animate() {});
/**
 * Animal Base Class
 * creates a shared base class for both dino and human.
 * @constructor
 */
class Base {
	constructor(name, info, type, image) {
		this.name = name;
		this.info = info;
		this.type = type;
		this.image = image;
	}
}
class Gift extends Base {
	constructor({ name, price, link, type, info, image }) {
		super(name, info, type, image);

		this.price = price;
		this.link = link;
	}
}

let gifts = [];
/**
 * getGift will make an async call to the json file
 * and populate the Gift Array with the result.
 */
let getGift = (async () => {
	let response = await fetch('./gifts.json');
	gifts = await response
		.json()
		.then((data) => (gifts = data.Gifts.map((gift) => new Gift(gift))))
		.then(() => makeGrid(gifts));
})();

/**
 * Human
 * @constructor
 */
class Human extends Base {
	constructor(name, info, type, image) {
		super(name, info, type, image);
	}
}

let tim = new Human(
	'Tim & Oskar',
	'Wish you a Merry Christmas',
	'human',
	'images/IMG_4828.JPG'
);
/**
 * On form submit,
 * the pullForm method will find the value of the form elements
 * and use them to create a new Human.
 */
function pullForm() {
	const humanAttr = ['name', 'cost', 'link', 'type', 'info'];
	let humanEl = humanAttr.map((stat) => {
		return document.getElementById(stat).value;
	});
	human = new Human(...humanEl);
}

// const btn = document.getElementById('btn');
// btn.addEventListener('mousedown', pullForm);

/**
 * makes a html tile for the page.
 * @param Gift
 * @returns a formatting html tile depending on which animal type is entered
 */

function makeTile(item) {
	let { type } = item;
	let isHuman = type === 'human';
	return `<a href=${isHuman ? '#' : item.link} class="grid-item"><div>
	<h3>${item.name}</h3>
	<img src='${item.image}'></img>	
	<p class ='not-overlay'>${item.info} </p>
	${isHuman ? '' : `<p class='overlay'> ${item.price}</p>`}
	</div></a>`;
}

// Add tiles to DOM
// Remove form from screen
// On button click, prepare and display infographic
// const form = document.getElementById('dino-compare');
// const restart = document.getElementById('restart');
const grid = document.getElementById('grid');

function makeGrid() {
	// form.className = 'inactive';
	// restart.className = '';
	let tiles = gifts
		.map((gifts) => makeTile(gifts))
		.sort(() => 0.5 - Math.random()); // put the gift tiles in a random (ish) order
	tiles.splice(4, 0, makeTile(tim));
	tiles.forEach((tile) => (grid.innerHTML += tile));
}

// Clear the page, show the original form
// restart.addEventListener('click', function restartPage() {
// 	form.className = '';
// 	restart.className = 'inactive';
// 	grid.innerHTML = '';
// });
