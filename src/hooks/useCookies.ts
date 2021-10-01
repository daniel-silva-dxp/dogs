import { useCallback, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";

interface Cookies {
  set: (key: string, token: string) => void;
  get: (key: string) => string;
  remove: (key: string) => void;
}

const cookies = {} as Cookies;

export function useCookies() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const response = cookies.get("dogs.token");
    if (response) setToken(response);
  }, []);

  try {
    cookies.set = useCallback((key, token) => {
      setCookie(undefined, key, token, {
        maxAge: 3600, // 1 hours
        path: "/",
      });
    }, []);

    cookies.get = useCallback((key) => {
      const { key: token } = parseCookies();
      return token;
    }, []);

    cookies.remove = useCallback((key) => destroyCookie(undefined, key), []);
  } catch (e) {
    throw new Error("There is no token in cookies");
  }

  return { token, cookies };
}
