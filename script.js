let iteration = 0;
async function checkURL() {
	console.log(iteration)
	let word = words[iteration];
	if (iteration == words.length) {
		return
	}
	iteration++;

	let url = 'https://' + word + '.com';

	let link = document.createElement("a");
	link.href = url;
	link.innerHTML = `<span>${word + '.com'}</span>`;
	link.target = "_blank";
	link.dataset.iteration = iteration;
	content.appendChild(link);

	const controller = new AbortController();
	let waited = false;
	const timeoutId = setTimeout(() => {waited = true, controller.abort()}, 2000)
	
	console.log(url)
    fetch(url, {
			signal: controller.signal
		})
		.then((response) => {
			clearTimeout(timeoutId);
			console.log(response);
			if (response.status == 404) {
				// Not available
				link.dataset.state = 1;
				checkURL();
			} else {
				// Available
				link.dataset.state = 0;
				checkURL();
			}
		})
		.catch((err) => {
			if (waited) {
				// Timeout
				link.dataset.state = 2;
			} else {
				// Not reached
				link.dataset.state = 1;
			}
			console.log(err)
			checkURL();
		})
}