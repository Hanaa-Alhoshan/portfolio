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
        function openPopup(images) {
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

        // Function to close the popup
        function closePopup() {
            document.getElementById("image-popup").style.display = "none";
        }

        // Function to navigate through slides
        function changeSlide(direction) {
            const popupSlides = document.getElementById("popup-slides").children;
            popupSlides[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + direction + slideImages.length) % slideImages.length;
            popupSlides[currentSlideIndex].classList.add("active");
        }

// // Popup and slider logic here (separate from form logic)...
// // تهيئة النافذة المنبثقة
// window.addEventListener('load', () => {
//     const popup = document.getElementById('popup');
//     const closePopup = document.getElementById('close-popup');

//     // عرض النافذة إذا لم تكن قد ظهرت مسبقًا
//     if (!localStorage.getItem('popupSeen')) {
//         popup.style.display = 'flex';
//     }

//     // إغلاق النافذة وحفظ الحالة
//     closePopup.addEventListener('click', () => {
//         popup.style.display = 'none';
//         localStorage.setItem('popupSeen', 'true');
//     });
// });

// // تهيئة السلايدر
// function initSlider() {
//     const slides = document.querySelector('.slides');
//     let index = 0;

//     setInterval(() => {
//         index++;
//         if (index >= slides.children.length) {
//             index = 0; // العودة إلى أول صورة
//         }
//         slides.style.transform = `translateX(${-index * 100}%)`;
//     }, 3000);
// }

// // استدعاء السلايدر عند تحميل الصفحة
// initSlider();

// // معالجة إرسال النموذج
// document.getElementById('contact-form').addEventListener('submit', function (event) {
//     event.preventDefault(); // منع الإرسال الافتراضي

//     // استدعاء الحقول وعناصر الحالة
//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const message = document.getElementById('message').value.trim();
//     const formStatus = document.getElementById('form-status');

//     // إعادة تعيين الرسائل القديمة
//     formStatus.classList.remove('success', 'error', 'info');
//     formStatus.textContent = '';

//     // التحقق من الحقول
//     if (!name) {
//         formStatus.textContent = "Please enter your name.";
//         formStatus.classList.add('error');
//         return;
//     }

//     if (!email) {
//         formStatus.textContent = "Please enter your email.";
//         formStatus.classList.add('error');
//         return;
//     }

//     if (!message) {
//         formStatus.textContent = "Please enter your message.";
//         formStatus.classList.add('error');
//         return;
//     }

//     // التحقق من صحة البريد الإلكتروني
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         formStatus.textContent = "Please enter a valid email address.";
//         formStatus.classList.add('error');
//         return;
//     }

//     // عرض حالة الإرسال
//     formStatus.textContent = "Sending your message...";
//     formStatus.classList.add('info');

//     // إرسال البيانات عبر AJAX
//     fetch('https://example.com/send-message', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name, email, message })
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Server error: " + response.status);
//             }
//             return response.json();
//         })
//         .then(data => {
//             formStatus.textContent = "Your message has been sent!";
//             formStatus.classList.add('success');

//             // إعادة تعيين الحقول
//             document.getElementById('name').value = '';
//             document.getElementById('email').value = '';
//             document.getElementById('message').value = '';
//         })
//         .catch(error => {
//             formStatus.textContent = "There was an error sending your message.";
//             formStatus.classList.add('error');
//         })
//         .finally(() => {
//             // إخفاء الرسالة بعد 5 ثوانٍ
//             setTimeout(() => {
//                 formStatus.textContent = '';
//                 formStatus.classList.remove('success', 'error', 'info');
//             }, 5000);
//         });
// });
// let currentSlideIndex = 0;
// let slideImages = [];

// // Function to open the popup with dynamic images
// function openPopup(images) {
//     slideImages = images;
//     currentSlideIndex = 0;
//     const popupSlides = document.getElementById("popup-slides");
//     popupSlides.innerHTML = ""; // Clear previous images

//     // Add images dynamically to the slider
//     slideImages.forEach((imgSrc) => {
//         const imgElement = document.createElement("img");
//         imgElement.src = imgSrc;
//         imgElement.classList.add("slide");
//         popupSlides.appendChild(imgElement);
//     });

//     // Display the popup and set the first image
//     popupSlides.children[currentSlideIndex].classList.add("active");
//     document.getElementById("image-popup").style.display = "flex";
// }

// // Function to close the popup
// function closePopup() {
//     document.getElementById("image-popup").style.display = "none";
// }

// // Function to navigate through slides
// function changeSlide(direction) {
//     const popupSlides = document.getElementById("popup-slides").children;
//     popupSlides[currentSlideIndex].classList.remove("active");
//     currentSlideIndex = (currentSlideIndex + direction + slideImages.length) % slideImages.length;
//     popupSlides[currentSlideIndex].classList.add("active");
// }
