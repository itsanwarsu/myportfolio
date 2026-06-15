 const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  const menulink = document.querySelectorAll(".mobile-menu a");
  const overlay = document.querySelector(".overlay");
  const body = document.body;
  
  function initmenu() {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    body.classList.toggle("no-scroll");
    console.log("menu clicked");
  });
  
  menulink.forEach(link => {link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
    body.classList.remove("no-scroll");
    console.log("System Security Breach");
  });
  });
  
  overlay.addEventListener("click",() => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    body.classList.remove("no-scroll");
    overlay.classList.remove("active")
  });
}

function initnav() {
  let lastScroll = 0;
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () =>{
    const currentScroll = window.pageYOffset;
    if(currentScroll <= 0) {
      nav.classList.remove("hide");
      return;
    }
    
    if(currentScroll > lastScroll) {
      nav.classList.add("hide");
    }
    
    else{
      nav.classList.remove("hide");
    }
    lastScroll = currentScroll ;
  });
}

function initscrollanimation() {
  const sections = document.querySelectorAll(".section");
  const observer = new
  
  IntersectionObserver(entries => {
    entries.forEach(entry =>{
      if(entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },{threshold: 0.2
  });
  
  sections.forEach(section =>{
    observer.observe(section);
  });
}

function initfaq() {
  const faqItems = document.querySelectorAll(".faq-item");
  
  faqItems.forEach(item =>{
    const question = item.querySelector(".faq-question");
    
    question.addEventListener("click",() => {
      faqItems.forEach(el => {
        if(el !== item){
          el.classList.remove("active");
        }
      });
      item.classList.toggle("active");
    });
  });
}
initmenu();
initnav();
initscrollanimation();
initfaq();
