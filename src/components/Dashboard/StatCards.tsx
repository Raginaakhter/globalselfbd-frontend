import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorBg: string;
  textColor: string;
  link: string;
}

export function StatCard({ title, value, icon: Icon, colorBg, textColor, link }: StatCardProps) {
  return (
    <Link href={link} className="group block">
      <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-2xs transition-all duration-150 hover:-translate-y-[3px] hover:scale-[1.01] hover:shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">{title}</span>
          <div className={`rounded-xl p-2 transition-transform group-hover:scale-110 ${colorBg} ${textColor}`}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-2">
          <span className="text-2xl font-black tracking-tight text-slate-900">{value}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </Link>
  );
}
