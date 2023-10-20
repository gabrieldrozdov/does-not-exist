let dict;
let content = document.querySelector('.content');
async function fetchDict() {
	const response = await fetch("words_dictionary.json");
	dict = await response.json();
	checkURL();
}
fetchDict();

function generateURL() {


	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onreadystatechange = function() {
		if (request.readyState == 4){
			console.log(request.status)
		} else {
			link.dataset.state = 0;
		}
		generateURL();
	};
	request.send();
	setTimeout(() => {
		request.abort();
	}, 2000)
}


let iteration = 0;
async function checkURL() {
	iteration++;

	let word = Object.keys(dict)[Math.floor(Math.random()*Object.keys(dict).length)];
	let url = 'https://' + word + '.com';
	let index = Object.keys(dict).indexOf(word);

	let link = document.createElement("a");
	link.href = url;
	link.innerText = index + ": " + url;
	link.target = "_blank";
	link.style.order = index;
	link.dataset.iteration = iteration;
	content.appendChild(link);

	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 10000)
	
	console.log(url)
    fetch(url, { signal: controller.signal })
		.then(response => {
			clearTimeout(timeoutId)
			if (response.status == 404) {
				link.dataset.state = 0;
				checkURL();
			} else {
				link.dataset.state = 1;
				checkURL();
			}
		})
		.catch((err) => {
			link.dataset.state = 0;
			checkURL();
		})
}