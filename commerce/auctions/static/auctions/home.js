document.addEventListener("DOMContentLoaded", function () {
	const carousels = document.querySelectorAll(".carousel");

	carousels.forEach((carousel) => {
		const slides = Array.from(carousel.querySelectorAll(".slide"));
		const slideWidth = slides[0].offsetWidth;
		const slideCount = slides.length;
		const slideInterval = 1500; // Time between each slide (in milliseconds)
		let currentIndex = 0;
		let timer;

		function showSlide(index) {
			carousel.style.transform = `translateX(-${index * slideWidth}px)`;
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
});
