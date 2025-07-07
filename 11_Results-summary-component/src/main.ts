import "./style.css";
import data from "../data.json";

const infoGrpEl = document.getElementById("grp") as HTMLDivElement;

data.forEach((el) => {
  const { category, score, icon, color } = el;
  const component = `
  <div class="bg-base-${color}-50 flex items-center justify-between rounded-xl px-5 py-4">
    <div class="flex gap-4">
      <img src=${icon} alt="icon reaction" />
      <p
        class="text-base-${color}-400 text-base leading-[130%] font-medium"
      >
        ${category}
      </p>
    </div>
    <div>
      <p
        class="text-base-${color}-950/50 text-base leading-[130%] font-bold"
      >
        <span class="text-base-${color}-950">${score}</span> / 100
      </p>
    </div>
  </div>
  `;
  const temp = document.createElement("div");
  temp.innerHTML = component.trim();
  const element = temp.firstElementChild;
  if (element) {
    infoGrpEl.insertAdjacentElement("beforeend", element);
  }
});
