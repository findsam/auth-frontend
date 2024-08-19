import { useState, useEffect } from "react";

const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
};

const useCookie = (cookieName: string): string | undefined => {
  const [cookieValue, setCookieValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    const value = getCookie(cookieName);
    setCookieValue(value);
  }, [cookieName]);

  return cookieValue;
};

export default useCookie;
