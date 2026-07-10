function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const menulink = document.querySelectorAll(".mobile-menu a");
  const body = document.body;

  if (!hamburger || !menu || !overlay) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });

  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
  });

  menulink.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("no-scroll");
      hamburger.classList.remove("active");
    });
  });
}

function initnav() {
  let lastScroll = 0;
  const nav = document.querySelector("nav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // jika di paling atas selalu tampil
    if (currentScroll <= 0) {
      nav.classList.remove("hide");
      return;
    }

    // scroll ke bawah
    if (currentScroll > lastScroll) {
      nav.classList.add("hide");
    } else {
      // scroll ke atas
      nav.classList.remove("hide");
    }

    lastScroll = currentScroll;
  });
}

function initfaq() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      faqItems.forEach(el => {
        if (el !== item) {
          el.classList.remove("active");
        }
      });
      item.classList.toggle("active");
    });
  });
}

function initcounter() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.dataset.target);
        let current = 0;

        const updateCounter = () => {
          const increment = target / 80;
          current += increment;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + "+";
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));
}

function initscroolanimation() {
  const sections = document.querySelectorAll(".section");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach(section => observer.observe(section));
}

// ============================================
// CONTACT FORM - EMAILJS
// ============================================
function initContactForm() {
  if (typeof emailjs === "undefined") {
    console.error("EmailJS library tidak ditemukan.");
    return;
  }

  emailjs.init({ publicKey: "GX1K6g92Cnqbkvl4z" });

  const form = document.getElementById("contactForm");
  if (!form) {
    console.warn("Form contact tidak ditemukan.");
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Hindari double submit
    if (submitBtn && submitBtn.disabled) return;

    const formData = new FormData(form);

    const name = formData.get("name")?.trim() || "";
    const email = formData.get("email")?.trim() || "";
    const project = formData.get("project")?.trim() || "";
    const message = formData.get("message")?.trim() || "";

    // Validasi kolom kosong
    if (!name || !email || !project || !message) {
      alert("Harap isi semua kolom.");
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Masukkan alamat email yang valid.");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Mengirim...";
    }

    try {
      const response = await emailjs.send("service_anwarsu", "template_emkm88w", {
        name,
        email,
        project,
        message,
      });

      console.log("Email berhasil dikirim:", response);
      alert("✅ Pesan berhasil dikirim!");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("❌ Gagal mengirim pesan.\nSilakan coba beberapa saat lagi.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim Pesan";
      }
    }
  });
}

// ============================================
// JALANKAN SEMUA INIT SAAT DOM SIAP
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initHamburger();
  initnav();
  initfaq();
  initscroolanimation();
  initcounter();
  initContactForm();
});
