import "./style.css";
import * as z from "zod";

const EmailSchema = z.object({
  email: z.string().min(1, "Email required").email("Please provide a valid email"),
});

const formEl = document.getElementById("form") as HTMLFormElement;
const errorEl = document.getElementById("error") as HTMLParagraphElement;

function displayError(message: string): void {
  errorEl.textContent = message;
  errorEl.className = "text-red-500 text-sm mt-2";
}

function clearError(): void {
  errorEl.textContent = "";
  errorEl.className = "";
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
