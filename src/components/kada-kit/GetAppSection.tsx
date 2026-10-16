import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Mail, Loader2, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { AppleIcon, PlayIcon } from "./icons";
import "./kada-kit.css";

/** One screen of the desktop phone mockup. Screens cycle automatically. */
export interface PhoneScreen {
  id: string;
  node: ReactNode;
}

export interface Notifier {
  success: (message: string) => void;
  error: (message: string) => void;
}

export interface GetAppSectionProps {
  id?: string;
  className?: string;
  /** Desktop headline and subtitle. */
  headline: string;
  subtitle: string;
  /** Phone-width headline and subtitle. */
  mobileHeadline?: string;
  mobileSubtitle: string;
  appStoreUrl: string;
  playStoreUrl: string;
  /** What the QR code opens (a smart download link). */
  qrValue: string;
  qrLogo?: string;
  /** Text on the phone mockup's dynamic island. */
  liveLabel?: string;
  screens: PhoneScreen[];
  /** Message sent with the WhatsApp share; should contain the download link. */
  whatsAppMessage: string;
  /** Records a WhatsApp lead (10-digit number, no country code) before WhatsApp opens. */
  onWhatsAppLead?: (phoneDigits: string) => Promise<unknown>;
  /** Emails the download link. Without it the share form offers WhatsApp only. */
  onEmailLink?: (email: string) => Promise<unknown>;
  notify?: Notifier;
}


/**
 * "Download the app now!" — the ice card that closes every Kada landing page.
 * Phones get a QR card, store badges and a send-the-link form; desktops get a
 * living phone mockup that cycles through [screens] beside the store badges.
 */
export function GetAppSection({
  id = "get-app-section",
  className = "",
  headline,
  subtitle,
  mobileHeadline = "Download the app now!",
  mobileSubtitle,
  appStoreUrl,
  playStoreUrl,
  qrValue,
  qrLogo = "/logo.png",
  liveLabel = "Kada Live",
  screens,
  whatsAppMessage,
  onWhatsAppLead,
  onEmailLink,
  notify,
}: GetAppSectionProps) {
  const [activeMode, setActiveMode] = useState<"whatsapp" | "email">("whatsapp");
  const [phoneVal, setPhoneVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobileForm, setShowMobileForm] = useState(false);
  const [detectedOs, setDetectedOs] = useState<"ios" | "android" | "desktop">("desktop");
  const [activeScreen, setActiveScreen] = useState(0);
  const [isHoveringPhone, setIsHoveringPhone] = useState(false);
  // Shown under the share form; a site's toast (notify) is optional.
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);
  const report = (ok: boolean, message: string) => {
    setStatus({ ok, message });
    if (ok) notify?.success(message);
    else notify?.error(message);
  };

  // Auto-cycle the phone preview
  useEffect(() => {
    if (isHoveringPhone || screens.length < 2) return;
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHoveringPhone, screens.length]);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/iPad|iPhone|iPod/.test(ua)) setDetectedOs("ios");
    else if (/Android/.test(ua)) setDetectedOs("android");
  }, []);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!onEmailLink) return;
    const email = emailVal.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      report(false, "Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      await onEmailLink(email);
      report(true, "Download link sent to your email!");
      setEmailVal("");
    } catch (err: unknown) {
      report(false, err instanceof Error ? err.message : "Failed to send email link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const digits = phoneVal.replace(/\D/g, "");
    if (digits.length < 10) {
      report(false, "Please enter a valid 10-digit WhatsApp number");
      return;
    }
    setIsSubmitting(true);
    try {
      // A failed lead write must not block the share itself.
      await onWhatsAppLead?.(digits.slice(-10)).catch(() => undefined);
      const url = `https://wa.me/91${digits.slice(-10)}?text=${encodeURIComponent(whatsAppMessage)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      report(true, "Opening WhatsApp!");
      setPhoneVal("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const mode = onEmailLink ? activeMode : "whatsapp";
  const screen = screens[activeScreen % Math.max(1, screens.length)];

  return (
    <section
      id={id}
      className={`relative overflow-hidden w-full h-full flex flex-col justify-center items-center py-7 sm:py-11 select-none z-10 ${className}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* ── MOBILE VIEW ── */}
        <div className="lg:hidden text-center max-w-sm mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">{mobileHeadline}</h3>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-1 max-w-xs mx-auto leading-relaxed">
            {mobileSubtitle}
          </p>

          {/* QR card with viewfinder corners */}
          <div className="relative mx-auto my-4 inline-flex items-center justify-center p-3.5 bg-white rounded-3xl border border-blue-200/80 shadow-xl shadow-blue-500/10 select-none">
            <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-blue-600 rounded-tl-lg" />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-blue-600 rounded-tr-lg" />
            <span className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-blue-600 rounded-bl-lg" />
            <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-blue-600 rounded-br-lg" />

            <QRCodeSVG
              value={qrValue}
              size={156}
              level="H"
              fgColor="#0F172A"
              bgColor="#ffffff"
              imageSettings={{ src: qrLogo, height: 34, width: 34, excavate: true }}
            />

            {/* Kada-blue rounded finder eyes */}
            <svg className="absolute inset-3.5 pointer-events-none" viewBox="0 0 33 33" width={156} height={156}>
              <rect x="0.25" y="0.25" width="6.5" height="6.5" rx="1.5" fill="white" stroke="#1E6EF4" strokeWidth="1" />
              <rect x="2" y="2" width="3" height="3" rx="0.8" fill="#1E6EF4" />
              <rect x="26.25" y="0.25" width="6.5" height="6.5" rx="1.5" fill="white" stroke="#1E6EF4" strokeWidth="1" />
              <rect x="28" y="2" width="3" height="3" rx="0.8" fill="#1E6EF4" />
              <rect x="0.25" y="26.25" width="6.5" height="6.5" rx="1.5" fill="white" stroke="#1E6EF4" strokeWidth="1" />
              <rect x="2" y="28" width="3" height="3" rx="0.8" fill="#1E6EF4" />
            </svg>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3 sm:mt-4">
            <a
              href={appStoreUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Download on the App Store"
              className="group flex items-center gap-2.5 rounded-2xl bg-black px-4 py-2 text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <AppleIcon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-white" />
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">Download on the</p>
                <p className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">App Store</p>
              </div>
            </a>
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Get it on Google Play"
              className="group flex items-center gap-2.5 rounded-2xl bg-black px-4 py-2 text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <PlayIcon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold text-slate-400 leading-none">GET IT ON</p>
                <p className="text-xs sm:text-sm font-black text-white leading-tight mt-0.5">Google Play</p>
              </div>
            </a>
          </div>

          {/* Send the link to another phone */}
          <div className="mt-3 pt-2">
            <button
              type="button"
              onClick={() => setShowMobileForm(!showMobileForm)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <span>{showMobileForm ? "Hide share options" : "Need to send the link to another phone?"}</span>
              {showMobileForm ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showMobileForm && (
              <div className="kk-fade-in mt-4 pt-3 text-left">
                {onEmailLink && (
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMode("whatsapp");
                        setStatus(null);
                      }}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        mode === "whatsapp" ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMode("email");
                        setStatus(null);
                      }}
                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        mode === "email" ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>Email</span>
                    </button>
                  </div>
                )}

                <form onSubmit={mode === "whatsapp" ? handleWhatsAppSubmit : handleEmailSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    {mode === "whatsapp" ? (
                      <input
                        type="tel"
                        value={phoneVal}
                        onChange={(e) => setPhoneVal(e.target.value)}
                        placeholder="Enter 10-digit WhatsApp number"
                        aria-label="WhatsApp number"
                        className="flex-1 min-w-0 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
                      />
                    ) : (
                      <input
                        type="email"
                        value={emailVal}
                        onChange={(e) => setEmailVal(e.target.value)}
                        placeholder="Enter email address"
                        aria-label="Email address"
                        className="flex-1 min-w-0 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 bg-white"
                      />
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-slate-900 text-white px-4 py-2 text-xs font-bold shrink-0"
                    >
                      {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Send"}
                    </button>
                  </div>
                </form>
                {status && (
                  <p
                    role="status"
                    className={`mt-2 text-[11px] font-bold ${status.ok ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {status.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── DESKTOP VIEW ── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Living phone mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className="relative w-64 h-[460px] rounded-[2.6rem] bg-slate-950 p-2.5 shadow-2xl border-4 border-slate-800 ring-1 ring-white/10 transition-transform duration-500 hover:scale-[1.02]"
              onMouseEnter={() => setIsHoveringPhone(true)}
              onMouseLeave={() => setIsHoveringPhone(false)}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black text-white/90 tracking-tight truncate">{liveLabel}</span>
                </div>
                <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-slate-900 border border-slate-700" />
              </div>

              <div className="h-full w-full rounded-[2.4rem] overflow-hidden bg-slate-900 text-white relative flex flex-col justify-between p-3.5 pt-8 select-none">
                {screen && (
                  <div key={screen.id} className="kk-fade-in flex flex-col h-full justify-between">
                    {screen.node}
                  </div>
                )}
              </div>
            </div>

            {screens.length > 1 && (
              <div className="mt-5 flex items-center gap-1.5">
                {screens.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Show screen ${i + 1}`}
                    onClick={() => setActiveScreen(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === activeScreen % screens.length ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Action center */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {headline}
              </h2>
              <p className="mt-4 text-base sm:text-lg font-medium text-slate-600 leading-relaxed max-w-xl">{subtitle}</p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">Direct Store Download</p>
                {detectedOs !== "desktop" && (
                  <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Detected {detectedOs === "ios" ? "iPhone / iPad" : "Android"}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Get it on Google Play"
                  className={`group relative flex items-center gap-3.5 rounded-2xl bg-slate-900 px-5 py-3 text-white transition-all duration-200 hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.98] shadow-md ${
                    detectedOs === "android" ? "ring-2 ring-blue-600 ring-offset-2 ring-offset-white" : ""
                  }`}
                >
                  {detectedOs === "android" && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                      Recommended
                    </span>
                  )}
                  <PlayIcon className="h-7 w-7 shrink-0" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">GET IT ON</p>
                    <p className="text-sm font-black text-white leading-tight mt-0.5">Google Play</p>
                  </div>
                </a>

                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download on the App Store"
                  className={`group relative flex items-center gap-3.5 rounded-2xl bg-slate-900 px-5 py-3 text-white transition-all duration-200 hover:bg-slate-800 hover:scale-[1.03] active:scale-[0.98] shadow-md ${
                    detectedOs === "ios" ? "ring-2 ring-blue-600 ring-offset-2 ring-offset-white" : ""
                  }`}
                >
                  {detectedOs === "ios" && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-blue-600 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-sm">
                      Recommended
                    </span>
                  )}
                  <AppleIcon className="h-7 w-7 shrink-0 text-white" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Download on the</p>
                    <p className="text-sm font-black text-white leading-tight mt-0.5">App Store</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetAppSection;
