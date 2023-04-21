(() => {
	let productId = document.querySelector("#productId");
	let productName = document.querySelector("#productName");
	let productImage = document.querySelector("#image");
	let productPrice = document.querySelector("#price");
	let productDescription = document.querySelector("#description");
	let submitBtn = document.querySelector("#submit");
	let thumbnail = document.querySelector(".thumbnail img");
	let entries = document.querySelector(".displayEntries");
	let sortBy = document.querySelector("#sortBySelect");
	let filterInput = document.querySelector(".filterId");

	productImage.addEventListener("change", () => {
		previewImage(thumbnail, productImage);
	});

	submitBtn.addEventListener("click", (e) => {
		makeEntry(
			e,
			productId,
			productImage,
			productName,
			productPrice,
			productDescription,
			entries,
			sortBy
		);
	});

	filterInput.addEventListener("keyup", debounce(filter, entries, sortBy));

	sortBy.addEventListener("change", () => displayEntries(entries, sortBy));

	displayEntries(entries, sortBy);
})();
