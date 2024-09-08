import { FieldErrors, FieldValues } from "react-hook-form";
import { User } from "./types";

const isValidJSON = (string: string) => {
  return /^[\],:{}\s]*$/.test(
    string
      .replace(/\\["\\\/bfnrtu]/g, "@")
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        "]"
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  );
};

export const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(nameEQ)) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
};

export const renderErrors = <T extends FieldValues>(items: FieldErrors<T>) => {
  let errors = [];
  for (const key in items) {
    const error = items[key];
    if (error) errors.push(error.message?.toString());
  }

  return (
    <ul>
      {errors.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
};

export const isWindow = () => typeof window !== "undefined";

export const getHostname = (name: string): string => {
  const prefix = "app";
  return import.meta.env.NODE_ENV === "development"
    ? `${prefix}_local_${name}`
    : `${prefix}_${name}`;
};

export const bakeLocalStorage = <T,>(name: string, value: T): void => {
  if (!isWindow()) return;
  localStorage.setItem(getHostname(name), JSON.stringify(value));
};

export const deleteLocalStorage = (name: string): void => {
  if (!isWindow()) return;
  localStorage.removeItem(getHostname(name));
};

export const readLocalStorage = <Data,>(
  name: string
): Data | null | undefined => {
  if (!isWindow()) return null;
  const value = localStorage.getItem(getHostname(name));
  return typeof value === "string" && isValidJSON(value)
    ? (JSON.parse(value) as Data)
    : null;
};

export const SignOut = () => {
  deleteLocalStorage("authorization");
  deleteLocalStorage("user");
};

type Condition = (password: string) => boolean;
export const validatePasswordStrength = (password: string = ""): number => {
  const conditions: Condition[] = [
    (pwd) => pwd.length > 8, // Password length greater than 8
    (pwd) => /[A-Z]/.test(pwd), // Contains at least one uppercase letter
    (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), // Contains at least one special character
    (pwd) => !/(.)\1\1/.test(pwd), // No character repeats three times consecutively
  ];

  // Count the number of conditions met
  let conditionsMet = 0;

  for (const condition of conditions) {
    if (condition(password)) {
      conditionsMet++;
    }
  }

  return conditionsMet;
};
