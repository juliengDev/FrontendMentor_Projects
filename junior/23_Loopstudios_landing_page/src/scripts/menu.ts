const menu = document.getElementById("menu") as HTMLUListElement;
const iconBurger = document.getElementById("icon-burger") as HTMLButtonElement;
const iconClose = document.getElementById("icon-close") as HTMLButtonElement;

function openMenu() {
  menu.classList.remove("hidden");
  menu.classList.add("open");
  menu.classList.add("flex");
  iconBurger.classList.add("hidden");
  iconClose.classList.remove("hidden");
}
function closeMenu() {
  menu.classList.add("hidden");
  menu.classList.remove("open");
  menu.classList.remove("flex");
  iconBurger.classList.remove("hidden");
  iconClose.classList.add("hidden");
}

iconBurger.addEventListener("click", openMenu);
iconClose.addEventListener("click", closeMenu);

// Optionnel : fermer le menu si on clique en dehors
document.addEventListener("click", (e) => {
  const target = e.target as Node;
  const isClickInside = iconBurger.contains(target) || menu.contains(target);
  if (!isClickInside && menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.classList.add("hidden");
    iconBurger.setAttribute("aria-expanded", "false");
  }
});
