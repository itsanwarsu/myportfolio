function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const menulink = document.querySelectorAll(".mobile-menu a");
  
  const body = document.body;
  
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("no-scroll");
    console.log("hamburger clicked")
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

  window.addEventListener("scroll", () => {

  const currentScroll = window.pageYOffset;

  // jika di paling atas selalu tampil
  if(currentScroll <= 0){
    nav.classList.remove("hide");
    return;
  }

  // scroll ke bawah
  if(currentScroll > lastScroll){
    nav.classList.add("hide");
  }

  // scroll ke atas
  else{
    nav.classList.remove("hide");
  }

  lastScroll = currentScroll;
  });
  }

  function initfaq() {
const faqItems =
document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const question =
  item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    faqItems.forEach(el => {
      if(el !== item){
        el.classList.remove("active");
      }
    });

    item.classList.toggle("active");

  });

});
};

  function initcounter() {
  const counters =
  document.querySelectorAll(".counter");

  const counterObserver =
  new IntersectionObserver(entries => {

  entries.forEach(entry => {

  if (entry.isIntersecting) {

  const counter =
  entry.target;

  const target =
  Number(counter.dataset.target);

  let current = 0;

  const updateCounter = () => {
  const increment =  target / 80;

  current += increment;
  if (current < target) {
  counter.textContent =
  Math.ceil(current);
  requestAnimationFrame(
  updateCounter
  );
  }
  else {
  counter.textContent = target + "+";
  }
  };

  updateCounter();
  counterObserver.unobserve(counter);
  }
  });
  });

  counters.forEach(counter => {
  counterObserver.observe(counter);
  });
  }

  function initscroolanimation() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
  if (entry.isIntersecting) {
  entry.target.classList.add('show');
  observer.unobserve(entry.target);
  }
  });
  },{threshold: 0.2
  });

  sections.forEach(section => {
  observer.observe(section);
  });
  }

emailjs.init({
    publicKey:"GX1K6g92Cnqbkvl4z"
});

const submitBtn = document.getElementById("submit");
const form = document.getElementById('contactForm');

submitBtn.addEventListener("click",(e) => {
  e.preventDefault(); //mencegah form reload
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const project = document.getElementById("project").value.trim();
    const message = document.getElementById("message").value.trim();

    // Cek apakah ada input yang kosong
    if (!name || !email || !project || !message) {
        alert("Harap isi semua kolom sebelum mengirim!");
        return; // hentikan proses, tidak lanjut ke emailjs.send()
    }

    emailjs.send(
        "service_anwarsu",
        "template_emkm88w",
        {
            name: name,
            email: email,
            project: project,
            message: message
        }
    )
    .then(()=>{
        alert("Message sent successfully!");
        form.reset();
    })
    .catch((error)=>{
        alert("Failed to send message");
        console.log(error);
    });

});
  initHamburger();
  initnav();
  initfaq();
  initscroolanimation();
  initcounter();
