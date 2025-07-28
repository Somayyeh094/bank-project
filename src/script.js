//element selections
const section1 = document.querySelector("#section-1");
const linkScrollto = document.querySelector(".header__heading--text-link");
const nav = document.querySelector("nav");

///scroll to section-1
linkScrollto.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

///nav events
nav.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll(".nav__link").forEach((link) => {
    if (e.target !== link) return;
    document
      .querySelector(`${link.getAttribute("href")}`)
      .scrollIntoView({ behavior: "smooth" });
  });
});
