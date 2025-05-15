// Toggle mobile navigation
function toggleNav() {
    const nav = document.getElementById("myTopnav");
    nav.classList.toggle("responsive");
}

// Select membership plan
function selectPlan(planName, price) {
    const planInput = document.getElementById("membershipPlan");
    if (planInput) {
        planInput.value = `${planName} - $${price}/month`;
    }
    window.scrollTo({
        top: document.querySelector(".registration-section").offsetTop,
        behavior: "smooth"
    });
}

// Form validation
function validateForm() {
    let isValid = true;

    // Clear all previous errors
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    const requiredFields = [
        { id: "firstName", message: "First name is required." },
        { id: "lastName", message: "Last name is required." },
        { id: "email", message: "Valid email is required." },
        { id: "phone", message: "Phone number is required." },
        { id: "dob", message: "Date of birth is required." },
        { id: "address", message: "Address is required." },
        { id: "city", message: "City is required." },
        { id: "zipCode", message: "Zip code is required." },
        { id: "membershipPlan", message: "Please select a membership plan." }
    ];

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        if (!input || input.value.trim() === "") {
            document.getElementById(field.id + "Error").textContent = field.message;
            isValid = false;
        }
    });

    if (!document.getElementById("healthConsent").checked) {
        document.getElementById("healthConsentError").textContent = "You must confirm your health status.";
        isValid = false;
    }

    if (!document.getElementById("termsConsent").checked) {
        document.getElementById("termsConsentError").textContent = "You must agree to the terms.";
        isValid = false;
    }

    if (isValid) {
        showThankYouModal();
    }

    return false; // Prevent default form submission
}

// Show Thank You Modal
function showThankYouModal() {
    const modal = document.getElementById("thankYouModal");
    modal.style.display = "block";

    // Optional: Reset form after submission
    document.getElementById("membershipForm").reset();
    document.getElementById("membershipPlan").value = "";
}

// Close Thank You Modal
function closeModal() {
    document.getElementById("thankYouModal").style.display = "none";
}

// Close modal when clicking outside it
window.onclick = function (event) {
    const modal = document.getElementById("thankYouModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Close modal when clicking the X
document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
});

// Workout slideshow
let workoutSlideIndex = 1;
showWorkoutSlides(workoutSlideIndex);

function plusWorkoutSlides(n) {
    showWorkoutSlides(workoutSlideIndex += n);
}

function currentWorkoutSlide(n) {
    showWorkoutSlides(workoutSlideIndex = n);
}

function showWorkoutSlides(n) {
    let i;
    const slides = document.getElementsByClassName("workout-slides");
    const dots = document.getElementsByClassName("workout-dot");
    if (slides.length === 0) return;

    if (n > slides.length) workoutSlideIndex = 1;
    if (n < 1) workoutSlideIndex = slides.length;

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[workoutSlideIndex - 1].style.display = "block";
    if (dots[workoutSlideIndex - 1]) {
        dots[workoutSlideIndex - 1].classList.add("active");
    }
}

// Autoplay workout slideshow every 7 seconds
setInterval(() => {
    const slides = document.getElementsByClassName("workout-slides");
    if (slides.length > 0) {
        plusWorkoutSlides(1);
    }
}, 7000);
