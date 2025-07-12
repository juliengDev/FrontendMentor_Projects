"use strict";
import "./services/api";
import "./utils/utils";

// invalid:border-red-400 invalid:ring-red-400

const formEl = document.getElementById("form") as HTMLFormElement;

formEl.addEventListener(
  "invalid",
  (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target && target instanceof HTMLInputElement) {
      target.setCustomValidity("Please enter a valid number.");
      target.classList.add("shake");

      setTimeout(() => {
        target.classList.remove("shake");
      }, 400);
    }
  },
  true,
);

formEl.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target && target instanceof HTMLInputElement) {
    target.setCustomValidity("");
  }
});
