import data from "../data.json";

const infoGrpEl = document.getElementById("grp") as HTMLDivElement;

// Mapping des couleurs vers les classes complètes
const colorClasses = {
  red: {
    bg: "bg-base-red-50",
    text: "text-base-red-400",
    textStrong: "text-base-red-950",
    textMuted: "text-base-red-950/50",
  },
  yellow: {
    bg: "bg-base-yellow-50",
    text: "text-base-yellow-400",
    textStrong: "text-base-yellow-950",
    textMuted: "text-base-yellow-950/50",
  },
  green: {
    bg: "bg-base-green-50",
    text: "text-base-green-400",
    textStrong: "text-base-green-950",
    textMuted: "text-base-green-950/50",
  },
  blue: {
    bg: "bg-base-blue-50",
    text: "text-base-blue-400",
    textStrong: "text-base-blue-950",
    textMuted: "text-base-blue-950/50",
  },
};

data.forEach((el) => {
  const { category, score, icon, color } = el;
  const classes = colorClasses[color as keyof typeof colorClasses];

  const component = `
  <div class="${classes.bg} flex items-center justify-between rounded-xl px-5 py-4">
    <div class="flex gap-4">
      <img src=${icon} alt="icon reaction" />
      <p class="${classes.text} text-base leading-[130%] font-medium">
        ${category}
      </p>
    </div>
    <div>
      <p class="${classes.textMuted} text-base leading-[130%] font-bold">
        <span class="${classes.textStrong}">${score}</span> / 100
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
