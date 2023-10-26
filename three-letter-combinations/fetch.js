let dict;
let words = [];
let content = document.querySelector('.content');
let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
console.log(letters)
async function fetchData() {
	for (let letter1 of letters) {
		for (let letter2 of letters) {
			for (let letter3 of letters) {
				words.push(letter1+letter2+letter3);
			}
		}
	}

	console.log(words.length);
	checkURL();
}
fetchData();