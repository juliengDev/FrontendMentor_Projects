import "./style.css";

import * as z from "zod";

const EmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email("Oops! Please check your email"),
});

const formEl = document.querySelectorAll("form") as NodeListOf<HTMLFormElement>;
const emailInputEl = document.getElementById(
  "email-tablet",
) as HTMLInputElement;
const emailInputMobilEl = document.getElementById(
  "email-mobile",
) as HTMLInputElement;
const errorEl = document.querySelector(".error-msg") as HTMLParagraphElement;
const errorMobilEl = document.querySelector(
  ".error-mobil-msg",
) as HTMLParagraphElement;
const buttonsEl = document.querySelectorAll(
  "button",
) as NodeListOf<HTMLButtonElement>;

function displayError(message: string): void {
  errorEl.textContent = message;
  errorEl.className =
    " text-base-red block self-center pt-2 text-sm font-semibold";
  errorMobilEl.textContent = message;
  errorMobilEl.className =
    " text-base-red block self-start pl-4 text-sm font-semibold";
  buttonsEl.forEach((btn) => btn.classList.add("top-[2px]", "right-[2px]"));
  emailInputEl.classList.add("border-2", "border-[#FF5466]");
  emailInputEl.classList.remove("border-[#C2D3FF]", "border-1");
  emailInputMobilEl.classList.add("border-2", "border-[#FF5466]");
  emailInputMobilEl.classList.remove("border-[#C2D3FF]", "border-1");
}

function clearError(): void {
  errorEl.textContent = "";
  errorEl.className = "";
  errorMobilEl.textContent = "";
  errorMobilEl.className = "";
  buttonsEl.forEach((btn) => btn.classList.remove("top-0", "right-0"));
  emailInputEl.classList.add("border-[#C2D3FF]", "border-1");
  emailInputEl.classList.remove("border-2", "border-[#FF5466]");
  emailInputMobilEl.classList.add("border-[#C2D3FF]", "border-1");
  emailInputMobilEl.classList.remove("border-2", "border-[#FF5466]");
}

formEl.forEach((form) => {
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const email = formData.get("email") as string;

    const result = EmailSchema.safeParse({ email });

    if (!result.success) {
      const firstError = result.error.issues[0];
      displayError(firstError.message);
    } else {
      clearError();
      console.log("Email valide:", result.data);
    }
  });
});
