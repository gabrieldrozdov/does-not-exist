// TOP DOMAINS
// https://fivethirtyeight.datasettes.com/fivethirtyeight/most-common-name~2Fsurnames

let data;
let words = [];
let content = document.querySelector('.content');
async function fetchData() {
	const response = await fetch("/assets/data/top-domains.json");
	data = await response.json();
	for (let key of Object.keys(data)) {
		words.push(data[key]['Domain'].split('.').join(""));
	}

	console.log(words.length);
	checkURL();
}
fetchData();