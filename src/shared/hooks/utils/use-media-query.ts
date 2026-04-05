import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

export const deviceMatcherMap = {
  bp768: `(max-width: ${MOBILE_BREAKPOINT}px)` as const,
  min768: `(min-width: ${MOBILE_BREAKPOINT}px)` as const,
  bp768_1024:
    `(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT}px)` as const,
  min1024: `(min-width: ${DESKTOP_BREAKPOINT}px)` as const
} as const;

type Matcher =
  | (typeof deviceMatcherMap)[keyof typeof deviceMatcherMap]
  | (string & {});

export function useMediaQuery(matcher: Matcher) {
  const [value, setValue] = useState(() => matchMedia(matcher).matches);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(matcher);
    result.addEventListener("change", onChange);

    return () => result.removeEventListener("change", onChange);
  }, [matcher]);

  return value;
}
