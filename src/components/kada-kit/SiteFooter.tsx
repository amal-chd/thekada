import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Heart, ArrowUp, ExternalLink } from "lucide-react";
import { AppleIcon, PlayIcon, SocialIcon, SOCIAL_HOVER, DEFAULT_SOCIALS } from "./icons";
import type { SocialLink } from "./icons";
import "./kada-kit.css";

export interface FooterLink {
  label: string;
  /** A route on this site, or an absolute URL (opens in a new tab). */
  to: string;
  highlight?: boolean;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

const isExternal = (to: string) => /^(https?:|mailto:|tel:)/.test(to);

/** The Kadaverse column, with this site's own product highlighted. */
export function kadaverseSection(current: "the-kada" | "kada-dine" | "kada-rider" | "kada-host" | "corp"): FooterSection {
  const links: (FooterLink & { id: typeof current })[] = [
    { id: "the-kada", label: "The Kada", to: "https://order.thekada.in" },
    { id: "kada-dine", label: "Kada Dine", to: "https://kadadine.thekada.in" },
    { id: "kada-rider", label: "Kada Rider", to: "https://rider.thekada.in" },
    { id: "kada-host", label: "Kada Host", to: "https://host.thekada.in" },
    { id: "corp", label: "The Kada Corp", to: "https://thekada.in" },
  ];
  return {
    id: "ecosystem",
    title: "Kadaverse",
    links: links.map(({ id, ...l }) => (id === current ? { ...l, to: "/", highlight: true } : l)),
  };
}

export interface SiteFooterProps {
  /** Wordmark, e.g. ["Kada", "Dine"] renders "Kada Dine" with the second word in blue. */
  wordmark: [string, string];
  logoSrc?: string;
  blurb: string;
  /** Up to four link columns; the fifth desktop column is Community & Apps. */
  sections: FooterSection[];
  appStoreUrl: string;
  playStoreUrl: string;
  socials?: SocialLink[];
  /** Completes "Built with ♥ for …". */
  builtFor?: string;
  /** Leave room under the footer for a mobile sticky app bar. */
  stickyBarSpace?: boolean;
}

function FooterAnchor({ link, className, mobile = false }: { link: FooterLink; className: string; mobile?: boolean }) {
  if (isExternal(link.to)) {
    return (
      <a href={link.to} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{link.label}</span>
        <ExternalLink className={mobile ? "h-3 w-3 opacity-40 group-hover:opacity-100 transition-opacity" : "h-2.5 w-2.5 opacity-50 group-hover:opacity-100"} />
      </a>
    );
  }
  // In-page anchors ("/#faq") need a real navigation so the browser scrolls.
  if (link.to.includes("#")) {
    return (
      <a href={link.to} className={`${className} ${link.highlight ? "text-blue-400 font-bold" : ""}`}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.to} className={`${className} ${link.highlight ? "text-blue-400 font-bold" : ""}`}>
      {link.label}
    </Link>
  );
}

/** The Kada ecosystem footer, shared by every Kada website. */
export function SiteFooter({
  wordmark,
  logoSrc = "/logo.png",
  blurb,
  sections,
  appStoreUrl,
  playStoreUrl,
  socials = DEFAULT_SOCIALS,
  builtFor = "food lovers & local merchants",
  stickyBarSpace = false,
}: SiteFooterProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    sections.length ? { [sections[0].id]: true } : {}
  );

  const toggleSection = (id: string) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <footer
      className="bg-slate-950 text-slate-400 overflow-hidden relative border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] selection:bg-blue-600/30 selection:text-white"
      style={{ zIndex: 60 }}
    >
      {/* Ambient Top Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 sm:pb-12 ${
          stickyBarSpace ? "pb-[calc(env(safe-area-inset-bottom)+5.5rem)]" : "pb-[calc(env(safe-area-inset-bottom)+2.5rem)]"
        }`}
      >
        {/* ─── 1. BRAND ─── */}
        <div className="pb-8 sm:pb-10 border-b border-slate-800/80">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white p-1.5 shadow-md shadow-black/10 flex items-center justify-center shrink-0">
                <img src={logoSrc} alt={`${wordmark.join(" ")} logo`} className="w-full h-full object-contain" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white">
                {wordmark[0]} <span className="text-blue-500">{wordmark[1]}</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">{blurb}</p>
          </div>
        </div>

        {/* ─── 2. MOBILE: ACCORDION NAVIGATION ─── */}
        <div className="md:hidden py-6 space-y-2.5">
          {sections.map((sec) => {
            const isOpen = !!openSections[sec.id];
            return (
              <div key={sec.id} className="rounded-2xl border border-slate-800/80 bg-slate-900/40 overflow-hidden transition-all duration-200">
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full p-4 text-left text-xs font-black uppercase tracking-wider text-white hover:bg-slate-900/60 active:bg-slate-900 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <span>{sec.title}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-400" : ""}`} />
                </button>

                {isOpen && (
                  <div className="kk-fade-in px-4 pb-4 pt-1 border-t border-slate-800/50">
                    <ul className="space-y-2.5 text-xs font-semibold text-slate-400 pt-2">
                      {sec.links.map((link) => (
                        <li key={link.label}>
                          <FooterAnchor
                            link={link}
                            mobile
                            className={
                              isExternal(link.to)
                                ? "hover:text-white transition-colors flex items-center justify-between py-2.5 group"
                                : "hover:text-white transition-colors block py-2.5"
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}

          {/* Community & apps card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-4">
            <p className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span>Connect & Get The App</span>
            </p>

            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white transition-all active:scale-95 border border-slate-800 ${SOCIAL_HOVER[s.label]}`}
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Download on the App Store"
                className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white p-2.5 hover:bg-slate-800 transition-all active:scale-95"
              >
                <AppleIcon className="h-5 w-5 shrink-0 text-white" />
                <div className="text-left leading-tight min-w-0">
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 truncate">App Store</span>
                  <span className="block text-[11px] font-black text-white truncate">iOS App</span>
                </div>
              </a>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Get it on Google Play"
                className="flex items-center gap-2 rounded-xl bg-slate-900/90 border border-slate-800 text-white p-2.5 hover:bg-slate-800 transition-all active:scale-95"
              >
                <PlayIcon className="h-5 w-5 shrink-0" />
                <div className="text-left leading-tight min-w-0">
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400 truncate">Google Play</span>
                  <span className="block text-[11px] font-black text-white truncate">Android</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ─── 3. DESKTOP: 5-COLUMN LINK GRID ─── */}
        <div className="hidden md:grid md:grid-cols-5 gap-8 py-12">
          {sections.map((sec) => (
            <div key={sec.id}>
              <p className="text-xs font-black uppercase tracking-widest text-white mb-4">{sec.title}</p>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor
                      link={link}
                      className={
                        isExternal(link.to)
                          ? "hover:text-white transition-colors flex items-center gap-1 group"
                          : "hover:text-white transition-colors"
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-black uppercase tracking-widest text-white mb-4">Community & Apps</p>

            <div className="flex items-center gap-2.5 mb-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:scale-110 active:scale-95 shadow-sm border border-slate-800 ${SOCIAL_HOVER[s.label]}`}
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>

            <div className="space-y-2">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Download on the App Store"
                className="flex items-center gap-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white py-2 px-3 hover:bg-slate-800 hover:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <AppleIcon className="h-5 w-5 shrink-0 text-white" />
                <div className="text-left leading-tight">
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">Download on the</span>
                  <span className="block text-xs font-black text-white">App Store</span>
                </div>
              </a>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Get it on Google Play"
                className="flex items-center gap-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white py-2 px-3 hover:bg-slate-800 hover:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <PlayIcon className="h-5 w-5 shrink-0" />
                <div className="text-left leading-tight">
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">GET IT ON</span>
                  <span className="block text-xs font-black text-white">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ─── 4. LEGAL & ATTRIBUTION ─── */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Guidelines.</p>
            <p>
              © {new Date().getFullYear()} The Kada Digital Ventures Private Limited. All rights reserved. · Kannur, Kerala 670001, India
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <div className="flex items-center gap-1">
              <span>Built with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for {builtFor}</span>
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
