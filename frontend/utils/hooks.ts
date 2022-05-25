import { useEffect, useState } from "react";

export function useSessionStorage<T>(
  key: string
): [T | null, (value: T | null) => void] {
  const [state, _setState] = useState<T | null>(null);

  const setState = (value: T | null) => {
    _setState(value);
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const item = sessionStorage.getItem(key);
    if (item) _setState(JSON.parse(item));
  }, [key]);

  return [state, setState];
}
