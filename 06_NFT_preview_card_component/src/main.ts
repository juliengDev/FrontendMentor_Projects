import "./style.css";

const equilibriumGrpEl = document.getElementById(
  "equilibriumGrp",
) as HTMLDivElement;

const equilibriumH1El = document.getElementById(
  "equilibriumTitle",
) as HTMLHeadingElement;
const equilibriumSpanEl = document.getElementById(
  "equilibriumCreator",
) as HTMLHeadingElement;
equilibriumGrpEl.addEventListener("mouseenter", () => {
  equilibriumH1El.classList.add("active");
  equilibriumSpanEl.classList.add("active");
});
equilibriumGrpEl.addEventListener("mouseleave", () => {
  equilibriumH1El.classList.remove("active");
  equilibriumSpanEl.classList.remove("active");
});
