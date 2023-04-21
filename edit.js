(() => {
	const urlParams = new URLSearchParams(window.location.search);
	let key = urlParams.get("id");
	let oldObj = JSON.parse(localStorage.getItem(key));
	let productIdEdit = document.querySelector("#productId");
	let productNameEdit = document.querySelector("#productName");
	let productImageEdit = document.querySelector("#image");
	let thumbnailEdit = document.querySelector(".thumbnail img");
	let productPriceEdit = document.querySelector("#price");
	let productDescriptionEdit = document.querySelector("#description");
	let editBtnEdit = document.querySelector("#edit");
	let returnBtn = document.querySelector(".back");

	productIdEdit.value = key;
	productNameEdit.value = oldObj.name;
	thumbnailEdit.src = oldObj.image;
	productPriceEdit.value = oldObj.price;
	productDescriptionEdit.value = oldObj.description;

	editBtnEdit.addEventListener("click", (e) =>
		editEntry(
			e,
			productIdEdit,
			productImageEdit,
			productNameEdit,
			productPriceEdit,
			productDescriptionEdit
		)
	);
	productImageEdit.addEventListener("change", () => {
		previewImage(thumbnailEdit, productImageEdit);
	});

	returnBtn.addEventListener("click", () => {
		window.location.href = "./index.html";
	});
})();
