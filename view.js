(() => {
	const urlParams = new URLSearchParams(window.location.search);
	let productId = urlParams.get("id");
	let idDiv = document.querySelector(".id");
	let image = document.querySelector(".card img");
	let productName = document.querySelector(".productName");
	let productPrice = document.querySelector(".productPrice");
	let productDescription = document.querySelector(".productDescription");
	let returnBtn = document.querySelector(".back");
	let obj = JSON.parse(localStorage.getItem(productId));

	returnBtn.addEventListener(
		"click",
		() => (window.location.href = "./index.html")
	);

	idDiv.innerHTML = "ID : " + productId;
	image.src = obj.image;
	productName.innerHTML = "Name : " + obj.name;
	productPrice.innerHTML = "Price : " + obj.price;
	productDescription.innerHTML = "Details : " + obj.description;
})();
