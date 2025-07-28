//element selections
const section1 = document.querySelector("#section-1");
const linkScrollto = document.querySelector(".header__heading--text-link");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
//////////////////scroll to section-1//////////////////////////////////////////
linkScrollto.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////nav events///////////////////////////////////////////
nav.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll(".nav__link").forEach((link) => {
    if (e.target !== link) return;
    document
      .querySelector(`${link.getAttribute("href")}`)
      .scrollIntoView({ behavior: "smooth" });
  });
});

///////sticky nav////////////////
const navHeight = nav.getBoundingClientRect().height;
function stickyNav(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("nav-sticky");
  else nav.classList.remove("nav-sticky");
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);
////////////////nav fade/////////////
function handleEvent(e) {
  const logoItems = document.querySelectorAll(".nav__logo--item");
  if (e.target.classList.contains("nav__item")) {
    document.querySelectorAll(".nav__item").forEach((item) => {
      if (e.target !== item) item.style.opacity = this;
    });
    logoItems.forEach((item) => (item.style.opacity = this));
  }
}

nav.addEventListener("mouseover", handleEvent.bind(0.5));
nav.addEventListener("mouseout", handleEvent.bind(1));
