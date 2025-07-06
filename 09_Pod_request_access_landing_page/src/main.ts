import "./style.css";

// import * as z from "zod";

// const EmailSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email required")
//     .email("Please provide a valid email address"),
// });

// const formEl = document.getElementById("form") as HTMLFormElement;
// const emailInputEl = document.getElementById("email") as HTMLInputElement;
// const errorEl = document.querySelector(".error-msg") as HTMLParagraphElement;

// function displayError(message: string): void {
//   errorEl.textContent = message;
//   errorEl.className =
//     " self-start  text-[0.625rem] pl-3 leading-[20px] tracking-[0.13px] text-[#FF5466] italic lg:pl-[1.875rem]";
//   emailInputEl.classList.add("border-2", "border-[#FF5466]");
//   emailInputEl.classList.remove("border-[#C2D3FF]", "border-1");
// }

// function clearError(): void {
//   errorEl.textContent = "";
//   errorEl.className = "";
//   emailInputEl.classList.add("border-[#C2D3FF]", "border-1");
//   emailInputEl.classList.remove("border-2", "border-[#FF5466]");
// }

// formEl.addEventListener("submit", (e: Event) => {
//   e.preventDefault();

//   const target = e.target as HTMLFormElement;
//   const formData = new FormData(target);
//   const email = formData.get("email") as string;

//   const result = EmailSchema.safeParse({ email });

//   if (!result.success) {
//     const firstError = result.error.issues[0];
//     displayError(firstError.message);
//   } else {
//     clearError();
//     console.log("Email valide:", result.data);
//   }
// });
