// ============================================
// 6. EMAILJS CONTACT FORM (ULTIMATE FIX)
// ============================================
function initContactForm() {
  console.log("Initializing contact form...");
  
  // Inisialisasi EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({
      publicKey: "GX1K6g92Cnqbkvl4z"
    });
  } else {
    console.error("EmailJS not loaded!");
    return;
  }

  const form = document.getElementById('contactForm');
  if (!form) {
    console.warn("Contact form not found");
    return;
  }

  // Cegah semua perilaku default form
  form.setAttribute('onsubmit', 'return false;');
  
  // Gunakan event delegation
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Form submitted - handling via JS");
    
    // Ambil data dari form
    const formData = new FormData(form);
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const project = formData.get('project')?.trim() || '';
    const message = formData.get('message')?.trim() || '';

    // Validasi
    if (!name || !email || !project || !message) {
      alert("Harap isi semua kolom sebelum mengirim!");
      return;
    }

    // Validasi email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Harap masukkan email yang valid!");
      return;
    }

    // Cari button submit di dalam form
    const submitBtn = form.querySelector('button[type="submit"], #submit, .submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Mengirim...";
    }

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

      alert("Pesan berhasil dikirim! ✅");
      form.reset();
      console.log("Email sent:", response);

    } catch (error) {
      alert("❌ Gagal mengirim pesan. Silakan coba lagi.");
      console.error("EmailJS Error:", error);

    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim Pesan";
      }
    }
  });

  // Juga cegah click pada button submit
  form.querySelectorAll('button[type="submit"], #submit').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Trigger submit event
      form.dispatchEvent(new Event('submit', { bubbles: true }));
    });
  });
}
