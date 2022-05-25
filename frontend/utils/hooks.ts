import { useEffect, useState } from "react";

export function useSessionStorage<T>(
  key: string
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const item = sessionStorage.getItem(key);
    if (item) setState(JSON.parse(item));
  }, [key]);

  useEffect(() => {
    if (state) sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
