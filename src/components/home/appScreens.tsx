import type { PhoneScreen } from "../kada-kit";
import { ArrowRight } from "lucide-react";

/** Screens for the Get-the-App phone mockup (cycled by the kit's GetAppSection). */
export const APP_SCREENS: PhoneScreen[] = [
  {
    id: "tracking",
    node: (
      <div className="flex flex-col h-full justify-between animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <img src="/favicon.png" alt="The Kada" className="h-5 w-5 object-contain" />
            <span className="text-xs font-black text-white">Order #KD-8831</span>
          </div>
          <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
            ON THE WAY
          </span>
        </div>

        <div className="relative my-2 rounded-2xl bg-slate-800/80 p-3 border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold mb-2">
            <span>ETA: <strong className="text-white text-xs font-black">18 Mins</strong></span>
            <span className="text-emerald-400">2.4 km away</span>
          </div>

          <div className="relative h-20 w-full rounded-xl bg-slate-950/80 p-2 flex items-center justify-between border border-white/5">
            <div className="flex flex-col items-center gap-1">
              <div className="h-7 w-7 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-[10px]">
                🍳
              </div>
              <span className="text-[8px] font-bold text-slate-400">Kitchen</span>
            </div>

            <div className="flex-1 mx-2 relative flex items-center justify-center">
              <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-blue-600 w-2/3 animate-pulse" />
              </div>
              <div className="absolute left-2/3 -translate-x-1/2 -top-3.5 h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg text-xs">
                🛵
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="h-7 w-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-[10px]">
                📍
              </div>
              <span className="text-[8px] font-bold text-slate-400">Home</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-xs text-white">
              AK
            </div>
            <div>
              <p className="text-xs font-bold text-white">Rider Anoop K.</p>
              <p className="text-[10px] text-slate-400">⭐ 4.9 · 1,420 deliveries</p>
            </div>
          </div>
          <div className="px-2 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-[10px] font-black border border-blue-600/30">
            CALL RIDER
          </div>
        </div>

        <div className="mt-2 text-center text-[10px] text-slate-400 font-medium">
          Malabar Dum Biryani × 2 • Infopark Kakkanad
        </div>
      </div>
    ),
  },
  {
    id: "order",
    node: (
      <div className="flex flex-col h-full justify-between animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div>
            <p className="text-[9px] uppercase font-black text-blue-400">Delivering in 22 mins</p>
            <p className="text-xs font-black text-white">Kakkanad, Kochi</p>
          </div>
          <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
            🔍
          </span>
        </div>

        <div className="my-auto rounded-2xl bg-white/5 border border-white/10 p-3 space-y-2.5">
          <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-800">
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80"
              alt="Dum Biryani"
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-black">
              BESTSELLER
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-white text-[9px] font-bold">
              ⭐ 4.9 (420+)
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-white">Thalassery Chicken Biryani</h4>
              <span className="text-xs font-black text-emerald-400">₹220</span>
            </div>
            <p className="text-[10px] text-slate-400">Aromatic kaima rice, tender chicken, ghee roast spices</p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <span className="text-[10px] text-emerald-400 font-bold">Coupon KADA50 applied (-₹100)</span>
            <span className="text-[10px] line-through text-slate-500">₹320</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 py-2.5 text-center text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5"
        >
          <span>1-Tap Checkout • ₹120</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    ),
  },
  {
    id: "dining",
    node: (
      <div className="flex flex-col h-full justify-between animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div>
            <p className="text-[9px] uppercase font-black text-indigo-400">Table Reservation</p>
            <p className="text-xs font-black text-white">Instant Confirmation</p>
          </div>
          <span className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-indigo-600">
            CONFIRMED
          </span>
        </div>

        <div className="my-auto rounded-2xl bg-indigo-950/40 border border-indigo-500/30 p-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
              🥂
            </div>
            <div>
              <p className="text-xs font-black text-white">The Malabar Coast Bistro</p>
              <p className="text-[10px] text-slate-300">Fort Kochi Waterfront</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
            <div className="rounded-lg bg-white/5 p-2">
              <p className="text-slate-400">Party Size</p>
              <p className="text-white font-bold">4 Guests</p>
            </div>
            <div className="rounded-lg bg-white/5 p-2">
              <p className="text-slate-400">Time Slot</p>
              <p className="text-white font-bold">Today, 8:00 PM</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-white text-slate-900 text-center space-y-1">
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-500">Show Pass At Restaurant</p>
            <div className="font-mono text-xs font-black tracking-widest text-blue-400">
              #KADA-DINE-4402
            </div>
            <p className="text-[9px] font-bold text-emerald-600">Zero Booking Fee • Table Reserved</p>
          </div>
        </div>

        <div className="rounded-xl bg-white/10 py-2 text-center text-white text-[11px] font-bold">
          Navigate to Restaurant (GPS)
        </div>
      </div>
    ),
  },
  {
    id: "rewards",
    node: (
      <div className="flex flex-col h-full justify-between animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 font-black">👑</span>
            <span className="text-xs font-black text-white">Kada Club Perks</span>
          </div>
          <span className="text-[9px] font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
            GOLD TIER
          </span>
        </div>

        <div className="my-auto space-y-2.5">
          <div className="rounded-2xl bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-blue-600/20 border border-amber-400/40 p-3 text-center space-y-1">
            <p className="text-[9px] uppercase font-black text-amber-300">Welcome Reward Unlocked</p>
            <p className="text-base font-black text-white">20% OFF</p>
            <p className="text-[10px] text-slate-300">Up to ₹50 on orders above ₹99</p>
            <div className="inline-block mt-1 px-3 py-1 rounded-full bg-white text-slate-900 font-mono text-[10px] font-black tracking-wider">
              CODE: WELCOME
            </div>
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🪙</span>
              <div>
                <p className="text-xs font-black text-white">500 Kada Coins</p>
                <p className="text-[9px] text-slate-400">Worth ₹50 in cashback</p>
              </div>
            </div>
            <button type="button" className="px-2 py-1 rounded bg-amber-500 text-slate-950 text-[10px] font-black">
              REDEEM
            </button>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-center text-slate-950 text-xs font-black">
          Claim Daily Scratch Card
        </div>
      </div>
    ),
  },
];
