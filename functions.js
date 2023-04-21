async function previewImage(thumbnail, productImage) {
	thumbnail.src = await toBase64(productImage.files[0]);
}

async function makeEntry(
	e,
	productId,
	productImage,
	productName,
	productPrice,
	productDescription,
	entries,
	sortBy
) {
	e.preventDefault();
	if (
		validateInputs(
			productId,
			productImage,
			productName,
			productPrice,
			productDescription
		)
	) {
		if (!keyExists(Number(productId.value))) {
			let entry = {
				id: Number(productId.value),
				name: productName.value,
				image: await toBase64(productImage.files[0]),
				price: Number(productPrice.value),
				description: productDescription.value,
			};
			try {
				localStorage.setItem(Number(productId.value), JSON.stringify(entry));
			} catch (error) {
				alert(error.name);
			}

			displayEntries(entries, sortBy);
			console.log("Entry Made");
		} else {
			alert("Id Already Exists");
		}
	}
}

function toBase64(image) {
	var reader = new FileReader();
	reader.readAsDataURL(image);
	return new Promise((resolve, reject) => {
		reader.onloadend = function () {
			return resolve(reader.result);
		};
	});
}

function validateInputs(
	productId,
	productImage,
	productName,
	productPrice,
	productDescription
) {
	let pattern = /^[a-z\d\-_\s]+$/i;
	if (
		productId.value &&
		productImage.files[0] &&
		productName.value &&
		productPrice.value &&
		productDescription.value &&
		pattern.test(productName.value)
	) {
		console.log("All true!");
		return true;
	} else alert("Something is empty");
	return false;
}

function keyExists(key) {
	return localStorage.getItem(key) == null ? false : true;
}

function displayEntries(entries, sortBy) {
	entries.innerHTML = "";
	if (localStorage.length != 0) {
		let products = [];
		for (let i = 0, len = localStorage.length; i < len; ++i) {
			products.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
		}
		if (sortBy.value == "id") {
			products.sort((a, b) => (a.id > b.id ? 1 : -1));
		} else if (sortBy.value == "name") {
			products.sort((a, b) => (a.name > b.name ? 1 : -1));
		} else products.sort((a, b) => (a.price > b.price ? 1 : -1));

		for (let i = 0, len = products.length; i < len; ++i) {
			let div = document.createElement("div");
			div.className = "entry";
			div.innerHTML = `<span>Id : ${products[i].id}</span>
			<div class="details">
				<span>Name : ${products[i].name}</span>
                <span>Price : ${products[i].price}</span>
				</div>
			<div class="actions">
				<div class="edit">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M17.6878 3.00154L20.9985 6.3122L12.3107 15H9V11.6893L17.6878 3.00154ZM17.6878 5.12286L10.5 12.3107V13.5H11.6893L18.8771 6.3122L17.6878 5.12286ZM5 5H12V6.5H6.5V17.5H17.5V12H19V19H5V5Z"
								fill="#1F2328"></path>
						</g>
					</svg>
				</div>
				<div class="view">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M20.7703 12C20.7703 11.6412 20.5762 11.4056 20.188 10.9343C18.768 9.21014 15.6357 6 12 6C8.36428 6 5.23207 9.21014 3.81198 10.9343C3.42382 11.4056 3.22974 11.6412 3.22974 12C3.22974 12.3588 3.42382 12.5944 3.81198 13.0657C5.23207 14.7899 8.36428 18 12 18C15.6357 18 18.768 14.7899 20.188 13.0657C20.5762 12.5944 20.7703 12.3588 20.7703 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3432 9 9.00002 10.3431 9.00002 12C9.00002 13.6569 10.3432 15 12 15Z"
								fill="#33363F"></path>
						</g>
					</svg>
				</div>
				<div class="delete">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round"></path>
							<path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round"></path>
							<path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round"></path>
							<path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
								stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
						</g>
					</svg>
				</div>
			</div>`;
			entries.appendChild(div);
		}
		let entryBtns = document.querySelectorAll(".entry");
		entryBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => handleAction(e, entries, sortBy));
		});
	}
}

function handleAction(e, entries, sortBy) {
	let actions = ["edit", "delete", "view"];
	if (actions.includes(e.target.className)) {
		if (e.target.className == "edit") {
			window.location.href =
				"./edit.html?id=" +
				e.target.parentElement.parentElement.firstChild.innerText.slice(5);
		}
		if (e.target.className == "view") {
			window.location.href =
				"./view.html?id=" +
				e.target.parentElement.parentElement.firstChild.innerText.slice(5);
		}
		if (e.target.className == "delete") {
			let key = String(
				e.target.parentElement.parentElement.firstChild.innerText
			).slice(5);
			localStorage.removeItem(key);
			displayEntries(entries, sortBy);
		}
	}
}

async function editEntry(
	e,
	productId,
	productImage,
	productName,
	productPrice,
	productDescription
) {
	e.preventDefault();
	if (
		validateInputs(
			productId,
			productImage,
			productName,
			productPrice,
			productDescription
		)
	) {
		let obj = JSON.parse(localStorage.getItem(productId.value));
		obj.name = productName.value;
		obj.image = await toBase64(productImage.files[0]);
		obj.price = productPrice.value;
		obj.description = productDescription.value;
		localStorage.setItem(productId.value, JSON.stringify(obj));
		alert("Entry Edited");
	}
}

function filter(e, entries, sortBy) {
	if (e.target.value == "") {
		displayEntries(entries, sortBy);
	} else if (localStorage.getItem(e.target.value)) {
		entries.innerHTML = "";
		let obj = JSON.parse(localStorage.getItem(e.target.value));
		let div = document.createElement("div");
		div.className = "entry";
		div.innerHTML = `<span>Id : ${obj.id}</span>
			<div class="details">
				<span>Name : ${obj.name}</span>
                <span>Price : ${obj.price}</span>
				</div>
			<div class="actions">
				<div class="edit">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M17.6878 3.00154L20.9985 6.3122L12.3107 15H9V11.6893L17.6878 3.00154ZM17.6878 5.12286L10.5 12.3107V13.5H11.6893L18.8771 6.3122L17.6878 5.12286ZM5 5H12V6.5H6.5V17.5H17.5V12H19V19H5V5Z"
								fill="#1F2328"></path>
						</g>
					</svg>
				</div>
				<div class="view">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M20.7703 12C20.7703 11.6412 20.5762 11.4056 20.188 10.9343C18.768 9.21014 15.6357 6 12 6C8.36428 6 5.23207 9.21014 3.81198 10.9343C3.42382 11.4056 3.22974 11.6412 3.22974 12C3.22974 12.3588 3.42382 12.5944 3.81198 13.0657C5.23207 14.7899 8.36428 18 12 18C15.6357 18 18.768 14.7899 20.188 13.0657C20.5762 12.5944 20.7703 12.3588 20.7703 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3432 9 9.00002 10.3431 9.00002 12C9.00002 13.6569 10.3432 15 12 15Z"
								fill="#33363F"></path>
						</g>
					</svg>
				</div>
				<div class="delete">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round"></path>
							<path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round"></path>
							<path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round"></path>
							<path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
								stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
							<path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000"
								stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
						</g>
					</svg>
				</div>
			</div>`;
		entries.appendChild(div);
		let entryBtns = document.querySelectorAll(".entry");
		entryBtns.forEach((btn) => {
			btn.addEventListener("click", (e) => handleAction(e, entries, sortBy));
		});
	} else {
		entries.innerHTML = "";
	}
}

function debounce(func, entries, sortBy, timeout = 100) {
	let timer;
	return (e) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(e, entries, sortBy);
		}, timeout);
	};
}
