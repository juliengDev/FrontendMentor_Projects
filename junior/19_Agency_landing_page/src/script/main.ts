const burger = document.getElementById("burger") as HTMLButtonElement;
const menu = document.getElementById("menu") as HTMLUListElement;
const triangle = document.getElementById("triangle") as HTMLDivElement;
burger.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");

  if (isOpen) {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    triangle.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
    triangle.classList.add("hidden");
  }

  burger.setAttribute("aria-expanded", String(isOpen));
});

// Optionnel : fermer le menu si on clique en dehors
document.addEventListener("click", (e) => {
  const target = e.target as Node;
  const isClickInside = burger.contains(target) || menu.contains(target);
  if (!isClickInside && menu.classList.contains("open")) {
    menu.classList.remove("open");
    menu.classList.add("hidden");
    triangle.classList.add("hidden");
    burger.setAttribute("aria-expanded", "false");
  }
});
