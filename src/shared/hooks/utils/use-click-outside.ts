import { useEffect, useRef } from "react";

type Options = {
  enabled?: boolean;
};

export const useClickOutside = <T extends HTMLElement>(
  cb: () => void,
  { enabled = true }: Options
) => {
  const ref = useRef<T>(null);

  const cbRef = useRef(cb);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  useEffect(() => {
    if (!enabled) return;

    const clickOutsideListener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      cbRef.current();
    };

    document.addEventListener("mousedown", clickOutsideListener);
    document.addEventListener("touchstart", clickOutsideListener);

    return () => {
      document.removeEventListener("mousedown", clickOutsideListener);
      document.removeEventListener("touchstart", clickOutsideListener);
    };
  }, [enabled]);

  return ref;
};
