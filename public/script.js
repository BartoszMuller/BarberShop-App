const button = document.querySelector(".btn-kontakt");
const info = document.querySelector(".home-info");
const whitebg = document.querySelector(".white-background-title");

button.addEventListener("click", () => {
  button.classList.toggle("active-btn");
  info.classList.toggle("active");
  whitebg.classList.toggle("activebg");
});
