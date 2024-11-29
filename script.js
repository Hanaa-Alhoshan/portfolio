document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formStatus = document.getElementById('form-status');

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill out all fields.";
        formStatus.style.color = 'red';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.style.color = 'red';
        return;
    }

    formStatus.textContent = "Sending your message...";
    formStatus.style.color = 'blue';

    fetch('https://example.com/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server error: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            formStatus.textContent = "Your message has been sent!";
            formStatus.style.color = 'green';
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        })
        .catch(error => {
            formStatus.textContent = "There was an error sending your message.";
            formStatus.style.color = 'red';
        })
        .finally(() => {
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        });
});

let currentSlideIndex = 0;
let slideImages = [];

// Function to open the popup with dynamic images
function openPopup(imgElement) {
    var popup = document.getElementById("popup");
    var popupImage = document.getElementById("popup-image");

    popupImage.src = imgElement.src; // Set image source in popup
    popup.style.display = "flex"; // Show the popup
}

// Function to close the popup
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none"; // Hide the popup
}

// Function to navigate through slides
function changeSlide(direction) {
    const popupSlides = document.getElementById("popup-slides").children;
    popupSlides[currentSlideIndex].classList.remove("active");
    currentSlideIndex = (currentSlideIndex + direction + slideImages.length) % slideImages.length;
    popupSlides[currentSlideIndex].classList.add("active");
}

// Open popup with dynamic images for gallery
function openGalleryPopup(images) {
    slideImages = images;
    currentSlideIndex = 0;
    const popupSlides = document.getElementById("popup-slides");
    popupSlides.innerHTML = ""; // Clear previous images

    // Add images dynamically to the slider
    slideImages.forEach((imgSrc) => {
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc;
        imgElement.classList.add("slide");
        popupSlides.appendChild(imgElement);
    });

    // Display the popup and set the first image
    popupSlides.children[currentSlideIndex].classList.add("active");
    document.getElementById("image-popup").style.display = "flex";
}

// Function to close the gallery popup
function closeGalleryPopup() {
    document.getElementById("image-popup").style.display = "none";
}
