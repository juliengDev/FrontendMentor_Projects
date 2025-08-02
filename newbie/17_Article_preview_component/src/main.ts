import "../css/style.css";

const btnShareEl = document.querySelector<HTMLButtonElement>(".btn__share");
const socialLinksEl = document.querySelector<HTMLDivElement>(".social");
const defaultFillColor = "#6E8098";
const activeFillColor = "#FFF";

if (btnShareEl && socialLinksEl) {
  const btnArrowEl = btnShareEl.querySelector<SVGPathElement>("path");

  btnShareEl.addEventListener("click", () => {
    socialLinksEl.classList.toggle("social-visible");
    btnShareEl.classList.toggle("btn__share-active");

    if (btnArrowEl) {
      const isActive = btnShareEl.classList.contains("btn__share-active");
      btnArrowEl.setAttribute(
        "fill",
        isActive ? activeFillColor : defaultFillColor
      );
    }
  });
} else {
  console.error("Required elements not found");
}
