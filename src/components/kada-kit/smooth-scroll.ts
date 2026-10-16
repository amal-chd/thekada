import { useEffect } from "react";
import Lenis from "lenis";
import "./kada-kit.css";

/**
 * Eased wheel scrolling for every Kada website (the feel thekada.in had).
 * Touch keeps native momentum; reduced-motion users get plain scrolling;
 * nested scroll areas (menus, sheets, code blocks) scroll on their own.
 * Call once from the app root.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      allowNestedScroll: true,
      // Ease to in-page anchors ("#contact-sales") instead of jumping.
      anchors: { offset: -72 },
      autoRaf: true,
    });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Re-measure as lazy routes and images change the page height.
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}
