//element selections
const section1 = document.querySelector("#section-1");
const linkScrollto = document.querySelector(".header__heading--text-link");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const sections = document.querySelectorAll(".section");
const tabContainer = document.querySelector(".operations__tab-container");
console.log(tabContainer);
//////////////////scroll to section-1//////////////////////////////////////////////////////////////////////////
linkScrollto.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////nav events///////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////section fadeIn/////////////////////////////////////////////////////////////

function sectionObserver(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section__hidden");
    observer.unobserve(entry.target);
  });
}

const sectionsObserver = new IntersectionObserver(sectionObserver, {
  root: null,
  threshold: 0.15,
});
sections.forEach((sec) => {
  sec.classList.add("section__hidden");
  sectionsObserver.observe(sec);
});

/////////////////////////////////tabbed component//////////////////////////////////////////////////////////////////
function handleTab(e) {
  let clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  document
    .querySelectorAll(".operations__tab")
    .forEach((tab) => tab.classList.remove("operations__tab--active"));
  document
    .querySelectorAll(".operations__content")
    .forEach((content) =>
      content.classList.remove("operations__content--active")
    );
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
}
tabContainer.addEventListener("click", handleTab);

///////////////////////////////slider//////////////////////////////////////////////////////////////////////////////
const slides = document.querySelectorAll(".slider__slide");
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const dots = document.querySelectorAll(".slider__dot");
const dotContainer = document.querySelector(".slider__dots");
const maxSlide = slides.length;
let curSlide = 0;

function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
}
function activateDot(slide) {
  dots.forEach((dot) => dot.classList.remove("slider__dot--activate"));
  document
    .querySelector(`.slider__dot--${slide}`)
    .classList.add("slider__dot--activate");
}
goToSlide(0);

function nextSlide() {
  console.log(curSlide);
  if (curSlide === maxSlide - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
}
function prevSlide() {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
}
function selectSlide(e) {
  const dott = e.target.closest(".slider__dot");
  if (!dott) return;
  curSlide = +dott.dataset.dot;
  goToSlide(curSlide);
  activateDot(curSlide);
}

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);
dotContainer.addEventListener("click", selectSlide);
