import "./style.css";
import * as z from "zod";

const errorMessage = {
  minLengthErrorMessage: "Password must be at least 8 characters long.",
  maxLengthErrorMessage: "Password must not exceed 20 characters.",
  uppercaseErrorMessage: "Password must include at least one uppercase letter.",
  lowercaseErrorMessage: "Password must include at least one lowercase letter.",
  numberErrorMessage: "Password must include at least one number.",
  specialCharacterErrorMessage:
    "Password must include at least one special character (e.g. !@#$%).",
};

const FormSchema = z.object({
  firstname: z.string().min(1, "Firstname required"),
  lastname: z.string().min(1, "Lastname required"),
  email: z
    .string()
    .min(1, "Email required")
    .email("Please provide a valid email"),
  password: z
    .string()
    .min(8, { message: errorMessage.minLengthErrorMessage })
    .max(20, { message: errorMessage.maxLengthErrorMessage })
    .refine((password) => /[A-Z]/.test(password), {
      message: errorMessage.uppercaseErrorMessage,
    })
    .refine((password) => /[a-z]/.test(password), {
      message: errorMessage.lowercaseErrorMessage,
    })
    .refine((password) => /[0-9]/.test(password), {
      message: errorMessage.numberErrorMessage,
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: errorMessage.specialCharacterErrorMessage,
    }),
});

const formEl = document.getElementById("form") as HTMLFormElement;

const showError = (fieldName: string, message: string) => {
  const input = document.getElementById(fieldName);
  if (!input) return;
  input.classList.add("border-red-500", "border-2");
  input.setAttribute("aria-invalid", "true");

  const errorElement = input.parentElement?.querySelector(".error");
  const imgErrorElement = input.parentElement?.querySelector("img");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add(
      "text-base-pink",
      "mt-[6px]",
      "text-end",
      "italic",
    );
    imgErrorElement?.classList.remove("hidden");
    errorElement.setAttribute("role", "alert");
  }
};

const clearErrors = () => {
  document.querySelectorAll(".error").forEach((el) => {
    el.textContent = "";
    el.classList.remove("text-base-pink", "mt-[6px]", "text-end", "italic");
  });
  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("border-red-500", "border-2");
    input.removeAttribute("aria-invalid");
    input.value = "";
  });
  document
    .querySelectorAll("img")
    .forEach((img) => img.classList.add("hidden"));
};

formEl.addEventListener("submit", function (e: Event) {
  e.preventDefault();

  const target = e.target as HTMLFormElement;
  const formData = new FormData(target);
  const user = {
    firstname: (formData.get("firstname") as string)?.trim() || "",
    lastname: (formData.get("lastname") as string)?.trim() || "",
    email: (formData.get("email") as string)?.trim().toLowerCase() || "",
    password: (formData.get("password") as string)?.trim() || "",
  };

  const result = FormSchema.safeParse(user);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).forEach(
      (key) => {
        const message = fieldErrors[key]?.[0];
        if (message) {
          showError(key as string, message);
        }
      },
    );
  } else {
    clearErrors();
    console.log("✅ Valid data :", result.data);
  }
});
