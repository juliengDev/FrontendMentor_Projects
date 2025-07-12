"use strict";
import "./services/api";
import "./utils/utils";
import { isValidDate, type Date } from "./utils/utils";

export type AgeResult = {
  years: number;
  months: number;
  days: number;
};
// invalid:border-red-400 invalid:ring-red-400

const formEl = document.getElementById("form") as HTMLFormElement;

// FORM CONTROL
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

export function calculateAge({ day, month, year }: Date): AgeResult {
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}
formEl.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  const day = (document.getElementById("day") as HTMLInputElement)?.value;
  const month = (document.getElementById("month") as HTMLInputElement)?.value;
  const year = (document.getElementById("year") as HTMLInputElement)?.value;

  if (!day || !month || !year) return;

  if (!isValidDate({ day, month, year } as Date)) {
    console.error("Invalid date. Please enter a real calendar date.");
    return;
  }

  console.log("Valid date:", `${day}/${month}/${year}`);

  const age = calculateAge({ day, month, year } as Date);

  console.log("Valid date:", `${day}/${month}/${year}`);
  console.log(
    "Age:",
    `${age.years} years, ${age.months} months, ${age.days} days`,
  );

  console.log(
    `Vous avez ${age.years} ans, ${age.months} mois et ${age.days} jours !`,
  );
  
});
