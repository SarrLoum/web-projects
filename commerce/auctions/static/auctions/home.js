document.addEventListener("DOMContentLoaded", function () {
	const main = document.querySelector("#main");
	if (main.classList.contains("homepage")) {
		const carousels = document.querySelectorAll(".carousel");

		carousels.forEach((carousel) => {
			const slides = Array.from(carousel.querySelectorAll(".slide"));
			const slideWidth = slides[0].offsetWidth;
			const slideCount = slides.length;
			const slideInterval = 800; // Time between each slide (in milliseconds)
			let currentIndex = 0;
			let timer;

			function showSlide(index) {
				carousel.style.transform = `translateX(-${
					index * slideWidth
				}px)`;
			}

			function showNextSlide() {
				currentIndex++;
				if (currentIndex >= slideCount) {
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

			carousel.addEventListener("mouseenter", startCarousel);
			carousel.addEventListener("mouseleave", stopCarousel);

			// Add wrapping behavior for the carousel
			function wrapCarousel() {
				if (currentIndex === slideCount) {
					// If at the end, jump to the first slide instantly without transition
					carousel.style.transition = "none";
					currentIndex = 0;
					showSlide(currentIndex);
				} else if (currentIndex === -1) {
					// If at the beginning, jump to the last slide instantly without transition
					carousel.style.transition = "none";
					currentIndex = slideCount - 1;
					showSlide(currentIndex);
				}
				setTimeout(function () {
					// Re-enable transition after the jump
					carousel.style.transition = "transform 0.5s ease-in-out";
				}, 0);
			}

			// Wrap carousel on transition end
			carousel.addEventListener("transitionend", wrapCarousel);
		});

		dicoverBtnHover();
		startCarouselSuggest();
		ratingProduct();
	} else if (main.classList.contains("category-art")) {
		startCarouselExplore();
	}
});

function dicoverBtnHover() {
	const dicoverBtn = document.querySelector(".discover-btn");
	const forwardBtn = document.querySelector(".discover-img");
	dicoverBtn.addEventListener("mouseenter", () => {
		forwardBtn.src = "static/auctions/media/arrow_forward_white.svg";
	});
	dicoverBtn.addEventListener("mouseleave", () => {
		forwardBtn.src = "static/auctions/media/arrow_forward.svg";
	});
}

function startCarouselSuggest() {
	const suggestCarousel = document.querySelector(".suggest-carousel");
	const suggestSlides = Array.from(
		document.querySelectorAll(".suggest-slide")
	);
	const slideWidth1 = suggestSlides[0].offsetWidth;
	const slideCount1 = suggestSlides.length;
	const slidesInterval1 = 7000;
	let currentIndex1 = 0;
	let timer1;

	function showSlide1(index) {
		suggestCarousel.style.transform = `translate(-${
			index * slideWidth1
		}px)`;
	}

	function showNextSlides1() {
		currentIndex1++;
		if (currentIndex1 >= slideCount1) {
			currentIndex1 = 0;
		}
		showSlide1(currentIndex1);
	}

	function startCarousel1() {
		timer1 = setInterval(showNextSlides1, slidesInterval1);
	}

	startCarousel1();
}

function startCarouselExplore() {
	const exploreCarousel = document.querySelector(".explore-carousel");
	const exploreSlides = Array.from(
		document.querySelectorAll("#carousel-slide")
	);
	const slideWidth0 = exploreSlides[0].offsetWidth + 2;
	const slideLength0 = exploreSlides.length;
	const prevBtn = document.querySelector(".explore-carousel-prev");
	const nextBtn = document.querySelector(".explore-carousel-next");
	let currentIndex0 = 0;

	function showSlide0(index) {
		console.log("slide width:", slideLength0);

		exploreCarousel.style.transform = `translate(-${
			index * slideWidth0
		}px)`;
	}

	function showNextSlide0() {
		if (currentIndex0 < slideLength0) {
			currentIndex0++;
			showSlide0(currentIndex0);
			console.log("current index in show next slide:", currentIndex0);
		}
	}
	function showPrevSlide0() {
		if (currentIndex0 > 0) {
			currentIndex0--;
			showSlide0(currentIndex0);
			console.log("current index in show prev slide:", currentIndex0);
		}
	}

	nextBtn.addEventListener("click", () => {
		console.log("nextBtn of explore carousel click");
		showNextSlide0();
	});
	prevBtn.addEventListener("click", () => {
		console.log("prevBtn of explore carousel click");
		showPrevSlide0();
	});
}

function ratingProduct() {
	const ratingInput = document.querySelector("#rating-input");
	const stars = document.querySelectorAll(".star");

	stars.forEach((star) => {
		star.addEventListener("click", () => {
			var value = star.getAtributeValue("data-value");
			ratingInput.value = value;

			stars.forEach(function (s) {
				if (s.getAttribute("data-value") <= value) {
					s.classList.add("selected");
				} else {
					s.classList.remove("selected");
				}
			});
		});
	});
}
