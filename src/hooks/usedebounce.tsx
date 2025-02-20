"use client";
import { useState, useEffect } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const detector = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(detector);
  }, [delay, value]);
  return [debouncedValue];
};
export default useDebounce;
