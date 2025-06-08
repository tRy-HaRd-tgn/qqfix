document.addEventListener("DOMContentLoaded", function () {
  // Слайдер
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".slider-prev");
  const nextButton = document.querySelector(".slider-next");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);

    // Автоматическая смена слайдов
    setInterval(nextSlide, 5000);
  }

  // Анимации при скролле страницы
  const animatedElements = document.querySelectorAll(
    ".product-item, .advantage-item, .about-feature, .dealer-info, .dealer-image-wrapper, .contact-form-wrapper, .contact-info-wrapper, .gallery-item"
  );

  const animateOnScroll = function () {
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight * 0.85) {
        // Применяем разные анимации в зависимости от типа элемента
        if (element.classList.contains("product-item")) {
          element.style.opacity = "1";
          element.style.animation = "fadeIn 0.8s forwards";
          // Добавляем задержку для эффекта каскада
          const delay =
            Array.from(element.parentNode.children).indexOf(element) * 0.1;
          element.style.animationDelay = delay + "s";
        } else if (element.classList.contains("advantage-item")) {
          element.style.opacity = "1";
          element.style.animation = "scaleIn 0.7s forwards";
          const delay =
            Array.from(element.parentNode.children).indexOf(element) * 0.15;
          element.style.animationDelay = delay + "s";
        } else if (element.classList.contains("gallery-item")) {
          element.style.opacity = "1";
          element.style.animation = "fadeIn 0.6s forwards";
          const delay =
            Array.from(element.parentNode.children).indexOf(element) * 0.1;
          element.style.animationDelay = delay + "s";
        } else if (element.classList.contains("dealer-info")) {
          element.style.opacity = "1";
          element.style.animation = "slideInLeft 0.8s forwards";
        } else if (element.classList.contains("dealer-image-wrapper")) {
          element.style.opacity = "1";
          element.style.animation = "slideInRight 0.8s forwards";
        } else if (element.classList.contains("contact-form-wrapper")) {
          element.style.opacity = "1";
          element.style.animation = "slideInRight 0.8s forwards";
        } else if (element.classList.contains("contact-info-wrapper")) {
          element.style.opacity = "1";
          element.style.animation = "slideInLeft 0.8s forwards";
        } else {
          element.style.opacity = "1";
          element.style.animation = "fadeIn 0.8s forwards";
        }
      }
    });
  };

  // Инициализация стилей для анимации
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
  });

  // Вызываем функцию при загрузке и скролле страницы
  window.addEventListener("scroll", animateOnScroll);
  setTimeout(animateOnScroll, 100); // Запускаем анимацию после загрузки

  // Плавная прокрутка к якорям
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop =
          targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offsetTop - 100, // Отступ от верха страницы
          behavior: "smooth",
        });
      }
    });
  });

  // Многошаговая форма
  const formSteps = document.querySelectorAll(".form-step");
  const nextButtons = document.querySelectorAll(".next-btn");
  const backButtons = document.querySelectorAll(".back-btn");

  nextButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".form-step");
      const currentStepNum = parseInt(currentStep.dataset.step);
      const nextStep = document.querySelector(
        `.form-step[data-step="${currentStepNum + 1}"]`
      );

      if (nextStep) {
        currentStep.classList.remove("active");
        nextStep.classList.add("active");
      }
    });
  });

  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentStep = this.closest(".form-step");
      const currentStepNum = parseInt(currentStep.dataset.step);
      const prevStep = document.querySelector(
        `.form-step[data-step="${currentStepNum - 1}"]`
      );

      if (prevStep) {
        currentStep.classList.remove("active");
        prevStep.classList.add("active");
      }
    });
  });

  // Обработка форм с анимацией
  const discountForm = document.getElementById("discount-form");
  const contactForms = document.querySelectorAll(".contact-form");

  if (discountForm) {
    discountForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Получаем способ связи
      const contactMethod = document.querySelector(
        'input[name="contact"]:checked'
      );
      const phoneInput = document.querySelector('input[name="phone"]');

      if (contactMethod && phoneInput) {
        const method = contactMethod.value;
        const phone = phoneInput.value.replace(/\D/g, ""); // Оставляем только цифры

        // Анимация успешной отправки
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Спасибо! Ваша скидка 5% активирована.';
        successMessage.style.opacity = "0";

        const formContainer = this.closest(".discount-form");
        formContainer.appendChild(successMessage);

        setTimeout(() => {
          successMessage.style.opacity = "1";
          successMessage.style.animation = "fadeIn 0.5s forwards";
        }, 100);

        setTimeout(() => {
          discountForm.reset();
          document
            .querySelector(".form-step.active")
            .classList.remove("active");
          document
            .querySelector('.form-step[data-step="1"]')
            .classList.add("active");
          successMessage.style.opacity = "0";

          // Перенаправление в соответствии с выбранным способом связи
          if (method === "В whatsapp") {
            window.open(
              `https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`,
              "_blank"
            );
          } else if (method === "В Telegram") {
            window.open("https://t.me/danfossrus", "_blank");
          }

          setTimeout(() => successMessage.remove(), 500);
        }, 3000);
      } else {
        // Если не выбран способ связи, просто показываем сообщение об успехе
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML =
          '<i class="fas fa-check-circle"></i> Спасибо! Ваша скидка 5% активирована.';
        successMessage.style.opacity = "0";

        const formContainer = this.closest(".discount-form");
        formContainer.appendChild(successMessage);

        setTimeout(() => {
          successMessage.style.opacity = "1";
          successMessage.style.animation = "fadeIn 0.5s forwards";
        }, 100);

        setTimeout(() => {
          discountForm.reset();
          document
            .querySelector(".form-step.active")
            .classList.remove("active");
          document
            .querySelector('.form-step[data-step="1"]')
            .classList.add("active");
          successMessage.style.opacity = "0";
          setTimeout(() => successMessage.remove(), 500);
        }, 3000);
      }
    });
  }

  contactForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Анимация успешной отправки
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
      submitBtn.style.backgroundColor = "#28a745";

      setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = "#e30613";

        // Если форма в модальном окне, закрываем его
        const modal = this.closest(".modal");
        if (modal) {
          modal.classList.remove("active");
        }
      }, 2000);
    });
  });

  // Улучшенное модальное окно с анимацией
  const orderButtons = document.querySelectorAll(
    ".order-btn, .offer-btn, .request-btn"
  );
  const contactModal = document.getElementById("contact-modal");
  const closeModal = document.querySelector(".close-modal");

  orderButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (contactModal) {
        contactModal.classList.add("active");
        contactModal.querySelector(".modal-content").style.animation =
          "scaleIn 0.4s forwards";
      }
    });
  });

  if (closeModal && contactModal) {
    closeModal.addEventListener("click", function () {
      contactModal.querySelector(".modal-content").style.animation =
        "fadeOut 0.3s forwards";
      setTimeout(() => {
        contactModal.classList.remove("active");
      }, 300);
    });

    // Закрытие модального окна при клике вне его содержимого
    contactModal.addEventListener("click", function (e) {
      if (e.target === this) {
        contactModal.querySelector(".modal-content").style.animation =
          "fadeOut 0.3s forwards";
        setTimeout(() => {
          contactModal.classList.remove("active");
        }, 300);
      }
    });
  }

  // Маска для телефона
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 0) {
        if (value[0] === "7" || value[0] === "8") {
          value = value.substring(1);
        }
        let formattedValue = "+7";

        if (value.length > 0) {
          formattedValue += " (" + value.substring(0, 3);
        }
        if (value.length > 3) {
          formattedValue += ") " + value.substring(3, 6);
        }
        if (value.length > 6) {
          formattedValue += "-" + value.substring(6, 8);
        }
        if (value.length > 8) {
          formattedValue += "-" + value.substring(8, 10);
        }

        e.target.value = formattedValue;
      }
    });
  });

  // Улучшенный функционал для кнопки загрузки файлов
  const fileButtons = document.querySelectorAll(".file-btn");
  fileButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fileInput = this.nextElementSibling;
      if (fileInput) {
        fileInput.click();
      }
    });
  });

  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const button = this.previousElementSibling;
      if (button && this.files.length > 0) {
        button.innerHTML = `<i class="fas fa-check"></i> Файлы выбраны: ${this.files.length}`;
        button.style.backgroundColor = "#28a745";

        setTimeout(() => {
          button.style.backgroundColor = "#e30613";
          button.innerHTML = `Файлы загружены (${this.files.length})`;
        }, 1000);
      }
    });
  });
});
function openModal() {
  document.getElementById("modal-icon").classList.add("activeS");
  document.getElementById("modal-icon").classList.remove("modal-icon");
}
function closeModal() {
  document.getElementById("modal-icon").classList.remove("activeS");
  document.getElementById("modal-icon").classList.add("modal-icon");
}
