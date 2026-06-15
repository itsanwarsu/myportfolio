function initHamburger() {
     
     const hamburger = document.querySelector(".hamburger");
     const menu = document.querySelector(".mobile-menu");
     const overlay = document.querySelector(".overlay");
     const menulink = document .querySelectorAll(".mobile-menu a")
     const body = document.body;
     
     hamburger.addEventListener("click",() => {
       hamburger.classList.toggle("active");
      menu.classList.toggle("active");
      overlay.classList.toggle("active");
      body.classList.toggle("no-scroll");
      console.log("Hamburger clicked")
     });
     
     
     menulink.forEach(link => {link.addEventListener("click",() => {
       menu.classList.remove("active");
       overlay.classList.remove("active");
       body.classList.remove("no-scroll");
       hamburger.classList.remove("active");
     });
     });
     
     overlay.addEventListener("click",() => {
       hamburger.classList.remove("active");
       menu.classList.remove("active");
       overlay.classList.remove("active");
       body.classList.remove("no-scroll")
     });
     };
     
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
  
  function initreveal() {
     const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => observer.observe(el));

const steps = document.querySelectorAll(".step");

const straggerobserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const index = entry.target.style.getPropertyValue("--i");

      setTimeout(() => {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }, index * 200); // STAGGER EFFECT

    }
  });
}, { threshold: 0.2 });

steps.forEach(step => straggerobserver.observe(step));
};

function initgalery() {
const images = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

let index = 0;
const track = document.querySelector(".gallery-track");
const items = document.querySelectorAll(".gallery-item");

setInterval(() => {
  index++;

  if (index >= items.length) index = 0;

  track.style.transform = `translateX(${-index * 315}px)`;
}, 3000);
};

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

     initHamburger();
     initnav();
     initreveal();
     initgalery();
     initfaq();
