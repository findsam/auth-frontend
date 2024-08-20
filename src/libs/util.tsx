import { FieldErrors, FieldValues } from "react-hook-form";

const getCookie = (name: string): string | null => {
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

const renderErrors = <T extends FieldValues>(items: FieldErrors<T>) => {
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

export { getCookie, renderErrors };
