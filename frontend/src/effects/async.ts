import { useEffect } from "react";

/**
 * Like useEffect but works with async functions and makes sure that errors will be reported
 */
export function useAsyncEffect(effect: () => Promise<any>, deps: readonly any[] | undefined) {
  useEffect(() => {
    effect().catch(e => console.warn("useAsyncEffect error", e));
  }, deps);
}