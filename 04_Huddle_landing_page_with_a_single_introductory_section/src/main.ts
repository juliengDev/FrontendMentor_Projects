import "./style.css";
import * as z from "zod";

const EmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email("Please provide a valid email"),
});

const formEl = document.getElementById("form") as HTMLFormElement;
const emailInputEl = document.getElementById("email") as HTMLInputElement;
const errorEl = document.querySelector(".error-msg") as HTMLParagraphElement;
const errorIcon = document.querySelector(".error-icon") as HTMLImageElement;

function displayError(message: string): void {
  errorEl.textContent = message;
  errorEl.className = "self-start pl-6 text-[#F96464]";
  errorIcon.className = "absolute top-1/2 right-20 -translate-y-1/2";
  emailInputEl.classList.add("border-2", "border-[#F96464]");
  emailInputEl.classList.remove("border-base-pink-primary", "border-1");
}

function clearError(): void {
  errorEl.textContent = "";
  errorEl.className = "";
  errorIcon.className = "";
  emailInputEl.classList.add("border-base-pink-primary", "border-1");
  emailInputEl.classList.remove("border-2 border-[#F96464]");
}

formEl.addEventListener("submit", (e: Event) => {
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
