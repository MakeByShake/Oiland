"use client";
import Link from "next/link";
import { BookOpen, Swords, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const mainButtons = [
  {
    href: "/flashcards",
    label: "Флэшкарталар",
    sublabel: "Оқу режимі",
    icon: BookOpen,
    gradient: "from-emerald-600 to-green-700",
    shadow: "shadow-emerald-900/50",
    enabled: true,
  },
  {
    href: "/game",
    label: "Жарыс",
    sublabel: "Ойын режимі",
    icon: Swords,
    gradient: "from-violet-600 to-purple-700",
    shadow: "shadow-purple-900/50",
    enabled: true,
  },
  {
    href: "#",
    label: "Жақында",
    sublabel: "",
    icon: Clock,
    gradient: "from-gray-700 to-gray-800",
    shadow: "",
    enabled: false,
  },
  {
    href: "#",
    label: "Жақында",
    sublabel: "",
    icon: Clock,
    gradient: "from-gray-700 to-gray-800",
    shadow: "",
    enabled: false,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-950 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-900/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-900/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 p-6 gap-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Мұғалім режимі
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Сынып Бөлмесі
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            Сабақты қызықты және тиімді өткізіңіз
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md sm:max-w-lg">
          {mainButtons.map((btn, i) => {
            const Icon = btn.icon;
            const inner = (
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center gap-3 aspect-square rounded-3xl border p-6 transition-all duration-300",
                  btn.enabled
                    ? cn(`bg-gradient-to-br ${btn.gradient}`, "border-white/10 hover:scale-105 active:scale-95", `shadow-2xl ${btn.shadow}`, "cursor-pointer")
                    : "bg-gray-800/40 border-gray-700/40 cursor-not-allowed opacity-50"
                )}
              >
                <Icon className={cn("w-12 h-12 sm:w-14 sm:h-14", btn.enabled ? "text-white" : "text-gray-600")} />
                <div className="text-center">
                  <p className={cn("font-bold text-xl leading-tight", btn.enabled ? "text-white" : "text-gray-500")}>
                    {btn.label}
                  </p>
                  {btn.sublabel && <p className="text-white/60 text-xs mt-1">{btn.sublabel}</p>}
                  {!btn.enabled && <p className="text-gray-600 text-xs mt-1">Жақында</p>}
                </div>
              </div>
            );
            return btn.enabled ? (
              <Link key={i} href={btn.href}>{inner}</Link>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
