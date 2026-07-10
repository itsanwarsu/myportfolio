// ============================================
// 1. HAMBURGER MENU
// ============================================
function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const menulink = document.querySelectorAll(".mobile-menu a");
  const body = document.body;

  // Cek apakah elemen ada
  if (!hamburger || !menu || !overlay) {
    console.warn("Hamburger elements not found");
    return;
  }

  // Hapus listener lama untuk mencegah duplikasi
  hamburger.removeEventListener("click", handleHamburgerClick);
  hamburger.addEventListener("click", handleHamburgerClick);

  overlay.removeEventListener("click", handleOverlayClick);
  overlay.addEventListener("click", handleOverlayClick);

  // Hapus listener lama untuk setiap link
  menulink.forEach(link => {
    link.removeEventListener("click", handleMenuLinkClick);
    link.addEventListener("click", handleMenuLinkClick);
  });

  function handleHamburgerClick() {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("no-scroll");
    console.log("hamburger clicked");
  }

  function handleOverlayClick() {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
  }

  function handleMenuLinkClick() {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    hamburger.classList.remove("active");
  }
}

// ============================================
// 2. NAVIGATION SCROLL
// ============================================
function initnav() {
  let lastScroll = 0;
  const nav = document.querySelector("nav");
  
  // Cek apakah nav ada
  if (!nav) {
    console.warn("Nav element not found");
    return;
  }

  let ticking = false;

  // Hapus listener lama
  window.removeEventListener("scroll", handleScroll);
  window.addEventListener("scroll", handleScroll);

  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        // Jika di paling atas selalu tampil
        if (currentScroll <= 0) {
          nav.classList.remove("hide");
        } 
        // Scroll ke bawah
        else if (currentScroll > lastScroll) {
          nav.classList.add("hide");
        } 
        // Scroll ke atas
        else {
          nav.classList.remove("hide");
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }
}

// ============================================
// 3. FAQ ACCORDION
// ============================================
function initfaq() {
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length === 0) {
    console.warn("No FAQ items found");
    return;
  }

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    
    if (!question) {
      console.warn("FAQ question not found in item");
      return;
    }

    // Hapus listener lama
    question.removeEventListener("click", handleFaqClick);
    question.addEventListener("click", handleFaqClick);

    function handleFaqClick() {
      // Tutup semua FAQ item lainnya
      faqItems.forEach(el => {
        if (el !== item) {
          el.classList.remove("active");
        }
      });

      // Toggle active pada item yang diklik
      item.classList.toggle("active");
    }
  });
}

// ============================================
// 4. COUNTER ANIMATION
// ============================================
function initcounter() {
  const counters = document.querySelectorAll(".counter");

  if (counters.length === 0) {
    console.warn("No counters found");
    return;
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.dataset.target);
        
        // Validasi target
        if (isNaN(target) || target <= 0) {
          console.warn("Invalid target value:", counter.dataset.target);
          return;
        }

        let current = 0;
        let animationId = null;
        let startTime = null;
        const duration = 2000; // 2 detik

        const updateCounter = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          // Easing function (ease out)
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          current = easedProgress * target;

          if (progress < 1) {
            counter.textContent = Math.floor(current);
            animationId = requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + "+";
            if (animationId) cancelAnimationFrame(animationId);
          }
        };

        // Mulai animasi
        animationId = requestAnimationFrame(updateCounter);
        
        // Hentikan observer setelah animasi dimulai
        counterObserver.unobserve(counter);
      }
    });
  }, {
    threshold: 0.1, // Lebih baik dari 0
    rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum elemen masuk
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// ============================================
// 5. SCROLL ANIMATION
// ============================================
function initscroolanimation() {
  const sections = document.querySelectorAll('.section');

  if (sections.length === 0) {
    console.warn("No sections found");
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Biarkan observer tetap mengamati untuk kemungkinan re-animasi
        // Hapus komentar di bawah jika ingin hanya sekali
        // observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // 15% elemen terlihat
    rootMargin: "0px 0px -50px 0px" // Trigger sedikit lebih awal
  });

  sections.forEach(section => {
    observer.observe(section);
  });
}

// ============================================
// 6. EMAILJS CONTACT FORM
// ============================================
function initContactForm() {
  // Inisialisasi EmailJS
  emailjs.init({
    publicKey: "GX1K6g92Cnqbkvl4z"
  });

  const submitBtn = document.getElementById("submit");
  const form = document.getElementById('contactForm');

  if (!submitBtn || !form) {
    console.warn("Contact form elements not found");
    return;
  }

  // Hapus listener lama
  submitBtn.removeEventListener("click", handleFormSubmit);
  submitBtn.addEventListener("click", handleFormSubmit);

  async function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const project = document.getElementById("project").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validasi input
    if (!name || !email || !project || !message) {
      alert("Harap isi semua kolom sebelum mengirim!");
      return;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Harap masukkan email yang valid!");
      return;
    }

    // Disable button untuk mencegah spam
    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";

    try {
      const response = await emailjs.send(
        "service_anwarsu",
        "template_emkm88w",
        {
          name: name,
          email: email,
          project: project,
          message: message
        }
      );

      alert("Pesan berhasil dikirim!");
      form.reset();
      console.log("Email sent successfully:", response);

    } catch (error) {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
      console.error("EmailJS Error:", error);

    } finally {
      // Enable kembali button
      submitBtn.disabled = false;
      submitBtn.textContent = "Kirim Pesan";
    }
  }
}

// ============================================
// 7. LAZY LOAD IMAGES (Bonus)
// ============================================
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  
  if (images.length === 0) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 8. SMOOTH SCROLL (Bonus)
// ============================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector("nav")?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// ============================================
// 9. ERROR HANDLING GLOBAL
// ============================================
function initErrorHandling() {
  // Tangkap error global
  window.addEventListener("error", function(e) {
    console.error("Global error:", e.message);
    // Bisa ditambahkan tracking error ke service seperti Sentry
  });

  // Tangkap promise rejection
  window.addEventListener("unhandledrejection", function(e) {
    console.error("Unhandled Promise Rejection:", e.reason);
  });
}

// ============================================
// 10. INITIALIZE ALL FUNCTIONS
// ============================================
function initAll() {
  try {
    initErrorHandling();
    initHamburger();
    initnav();
    initfaq();
    initcounter();
    initscroolanimation();
    initContactForm();
    initLazyLoad();
    initSmoothScroll();
    
    console.log("All functions initialized successfully!");
  } catch (error) {
    console.error("Error initializing functions:", error);
  }
}

// Jalankan ketika DOM sudah siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}

// ============================================
// 11. RESIZE HANDLER (Bonus)
// ============================================
let resizeTimeout;
window.addEventListener("resize", function() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Handle resize events jika diperlukan
    console.log("Window resized");
  }, 250);
});
