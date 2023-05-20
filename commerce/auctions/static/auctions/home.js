/*document.addEventListener("DOMContentLoaded", function () {
	console.log("DOM fully loaded and parsed");

	getCategoryImages();
});

function getCategoryImages() {
	fetch(`category_images`)
		.then((response) => response.json())
		.then((categories) => {
			console.log(categories);

			categories.forEach((category) => {
				const { category: categoryKey, ...images } = category;
				console.log(categoryKey);
				console.log(images);

				categoryCarousel(categoryKey, images);
			});
		});
}

function categoryCarousel(categoryKey, images) {
	let categoryList = document.createElement("li");
	categoryList.classList.add("category-item");

	let categorySlides = "";
	for (let key in images) {
		categorySlides += `
		<div class="slide">
			<img src="${images[key]}" alt="${key}" />
		</div>`;
	}

	let imageCarousel = document.createElement("div");
	imageCarousel.classList.add("category-carousel");
	imageCarousel.innerHTML = categorySlides;

	let categoryName = document.createElement("span");
	categoryName.id = "category-span";
	categoryName.textContent = categoryKey;

	categoryList.appendChild(imageCarousel);
	categoryList.appendChild(categoryName);

	document.querySelector("#categories").appendChild(categoryList);

	carousel();
}

function carousel() {
	const categoryList = document.querySelector(".category-item");
	const imageCarousel = document.querySelector(".category-carousel");
	const carouselSlides = document.querySelectorAll(".slide");
	const slideInterval = 3000; // Time between each slide (in milliseconds)
	let currentIndex = 0;
	let timer;

	function showSlide(index) {
		imageCarousel.style.transform = `translateX(-${index * 100}%)`;
	}

	function showNextSlide() {
		currentIndex++;
		if (currentIndex >= carouselSlides.length) {
			currentIndex = 0;
		}
		showSlide(currentIndex);
	}

	function startCarousel() {
		stopCarousel(); // Clear any existing interval to prevent overlapping timers
		timer = setInterval(showNextSlide, slideInterval);
	}

	function stopCarousel() {
		clearInterval(timer);
	}

	carouselSlides.forEach(slide => { 
		slide.addEventListener("mouseenter", startCarousel);
		slide.addEventListener("mouseleave", stopCarousel);
	})

	carousel();
}

*/
