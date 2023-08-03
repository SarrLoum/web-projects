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
		//startCarouselExplore1();
	} else if (main.classList.contains("category-fashion")) {
		categBtnHover();
	} else if (main.classList.contains(".register-page")) {
		handleRegisterInputs();
	}
});

function handleRegisterInputs() {
	const firstName = document.querySelector("#fisrtname");
	const lastName = document.querySelector("#lastname");
	const email = document.querySelector("#email");
	const password = document.querySelector("#password");
	const confirmation = document.querySelector("#confirmation");
	const submitBtn = document.querySelector(".btn-register");

	function isInputsValid() {
		return (
			firstName.value.trim() !== "" &&
			lastName.value.trim() !== "" &&
			email.value.trim() !== "" &&
			password.value.trim() !== "" &&
			confirmation.value.trim() !== ""
		);
	}

	function updateSubmitBtn() {
		submitBtn.disabled = !isInputsValid();
		console.log("submitBtn.disabled:", submitBtn.disabled);

		if (isInputsValid()) {
			submitBtn.style.background = "#3665F3";
			console.log("background color changed", submitBtn.style.background);
		}
	}

	firstName.addEventListener("input", updateSubmitBtn);
	lastName.addEventListener("input", updateSubmitBtn);
	email.addEventListener("input", updateSubmitBtn);
	password.addEventListener("input", updateSubmitBtn);
	confirmation.addEventListener("input", updateSubmitBtn);
}

function dicoverBtnHover() {
	const dicoverBtn = document.querySelector("#discover-btn");
	const forwardBtn = document.querySelector("#discover-img");
	dicoverBtn.addEventListener("mouseenter", () => {
		forwardBtn.src =
			"http://localhost:8000/static/auctions/media/arrow_forward_white.svg";
	});
	dicoverBtn.addEventListener("mouseleave", () => {
		forwardBtn.src =
			"http://localhost:8000/static/auctions/media/arrow_forward.svg";
	});
}

function categBtnHover() {
	const categBtn = document.querySelector(".categ-hg-btn");
	const forwardBtn = document.querySelector(".categ-hg-img");
	categBtn.addEventListener("mouseenter", () => {
		forwardBtn.src =
			"http://localhost:8000/static/auctions/media/arrow_forward.svg";
	});
	categBtn.addEventListener("mouseleave", () => {
		forwardBtn.src =
			"http://localhost:8000/static/auctions/media/arrow_forward_white.svg";
	});
}

function startCarouselSuggest() {
	const suggestCarousel = document.querySelector(".suggest-carousel");
	const suggestSlides = Array.from(
		document.querySelectorAll(".suggest-slide")
	);
	const slideWidth0 = suggestSlides[0].offsetWidth;
	const slideCount0 = suggestSlides.length;
	const slidesInterval0 = 7000;
	let currentIndex0 = 0;
	let timer1;

	function showSlide1(index) {
		suggestCarousel.style.transform = `translate(-${
			index * slideWidth0
		}px)`;
	}

	function showNextSlides1() {
		currentIndex0++;
		if (currentIndex0 >= slideCount0) {
			currentIndex0 = 0;
		}
		showSlide1(currentIndex0);
	}

	function startCarousel1() {
		timer1 = setInterval(showNextSlides1, slidesInterval0);
	}

	startCarousel1();
}

function startCarouselExplore() {
	const exploreCarousel = document.querySelector(".explore-carousel");
	const exploreSlides = Array.from(
		document.querySelectorAll("#carousel-slide")
	);
	const slideWidth1 = exploreSlides[0].offsetWidth + 2;
	const prevBtn = document.querySelector(".explore-carousel-prev");
	const nextBtn = document.querySelector(".explore-carousel-next");
	let currentIndex1 = 0;

	function showSlide0(index) {
		exploreCarousel.style.transform = `translate(-${
			index * slideWidth1
		}px)`;
	}

	function showNextSlide0() {
		currentIndex1++;
		if (currentIndex1 < 2) {
			showSlide0(currentIndex1);
		} else {
			currentIndex1--;
		}
	}
	function showPrevSlide0() {
		currentIndex1--;
		if (currentIndex1 >= 0) {
			showSlide0(currentIndex1);
		} else {
			currentIndex1 = 0;
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
/*
function startCarouselExplore1() {
	const exploreCarousel2 = document.querySelector(".explore-carousel1");
	const exploreSlides = Array.from(
		document.querySelectorAll("#carousel-slide")
	);
	const slideWidth2 = exploreSlides[0].offsetWidth + 2;
	const prevBtn1 = document.querySelector(".explore-carousel-prev1");
	const nextBtn1 = document.querySelector(".explore-carousel-next1");
	let currentIndex2 = 0;

	function showSlide1(index) {
		exploreCarousel2.style.transform = `translate(-${
			index * slideWidth2
		}px)`;
	}

	function showNextSlide1() {
		currentIndex2++;
		if (currentIndex2 < 2) {
			showSlide1(currentIndex2);
		} else {
			currentIndex2--;
		}
	}
	function showPrevSlide1() {
		currentIndex2--;
		if (currentIndex2 >= 0) {
			showSlide1(currentIndex2);
		} else {
			currentIndex2 = 0;
		}
	}

	nextBtn1.addEventListener("click", () => {
		showNextSlide1();
	});
	prevBtn1.addEventListener("click", () => {
		showPrevSlide1();
	});
}
*/
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
