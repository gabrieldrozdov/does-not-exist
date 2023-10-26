// WORD FREQUENCY
// https://www.wordfrequency.info/samples.asp

let data;
let words = [];
let content = document.querySelector('.content');
async function fetchData() {
	const response = await fetch("/assets/data/word-frequency.json");
	data = await response.json();
	for (let key of Object.keys(data)) {
		if (data[key]['rank'] <= 1000) {
			words.push(data[key]['lemma']);
		}
	}

	console.log(words.length);
	checkURL();
}
fetchData();