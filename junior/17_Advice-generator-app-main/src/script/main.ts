"use strict";
import "./services/api";
import "./utils/utils";
import { getData } from "./utils/utils";

const URL_API = "https://api.adviceslip.com/advice";
const btnEl = document.querySelector(".generateQuote") as HTMLButtonElement;
const displayQuote = async (): Promise<void> => {
  const quoteOutputEl = document.getElementById("quote") as HTMLElement;
  const idOutpuEl = document.getElementById("idQuote") as HTMLSpanElement;
  if (!quoteOutputEl) {
    console.error("Élément quote introuvable");
    return;
  }
  if (!idOutpuEl) {
    console.error("Élément id introuvable");
    return;
  }

  try {
    const data = await getData(URL_API);

    if (data?.slip?.advice) {
      quoteOutputEl.innerHTML = "";
      idOutpuEl.textContent = "";
      quoteOutputEl.insertAdjacentText("beforeend", `“${data.slip.advice}”`);
      idOutpuEl.textContent = String(data.slip.id);
    }
  } catch (error) {
    quoteOutputEl.innerHTML = "Error loading the quote";
  }
};

btnEl.addEventListener("click", displayQuote);
displayQuote();
