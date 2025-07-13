"use strict";
import "./services/api";
import "./utils/utils";
import { isValidDate, type Date } from "./utils/utils";

export type AgeResult = {
  years: number;
  months: number;
  days: number;
};

const formEl = document.getElementById("form") as HTMLFormElement;

function calculateAge({ day, month, year }: Date): AgeResult {
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

function displayInfos(age: AgeResult) {
  const yearsElement = document.getElementById("inputYears");
  const monthsElement = document.getElementById("inputMonths");
  const daysElement = document.getElementById("inputdays"); // Attention à la casse : "inputdays" et non "inputDays"

  if (yearsElement) {
    yearsElement.textContent = age.years.toString();
  }

  if (monthsElement) {
    monthsElement.textContent = age.months.toString();
  }

  if (daysElement) {
    daysElement.textContent = age.days.toString();
  }
}

// FORM CONTROL
formEl.addEventListener(
  "invalid",
  (e: Event) => {
    const target = e.target as HTMLInputElement;
    const dayLabelEl = document.getElementById(
      "dayLabel",
    ) as HTMLParagraphElement;
    const monthLabelEl = document.getElementById(
      "monthLabel",
    ) as HTMLParagraphElement;
    const yearLabelEl = document.getElementById(
      "yearLabel",
    ) as HTMLParagraphElement;

    if (target && target instanceof HTMLInputElement) {
      target.setCustomValidity("Please enter a valid number.");
      target.classList.add("shake");

      setTimeout(() => {
        target.classList.remove("shake");
      }, 400);
    }
    if (dayLabelEl && monthLabelEl && yearLabelEl) {
      dayLabelEl.classList.add("text-red-400");
      monthLabelEl.classList.add("text-red-400");
      yearLabelEl.classList.add("text-red-400");
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

function init() {
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

    const age = calculateAge({ day, month, year } as Date);

    displayInfos(age);
  });
}
window.addEventListener("DOMContentLoaded", init);
