"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MAX = 3;
const KEY = "compare";

type CompareCtx = {
  list: string[];
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  has: (slug: string) => boolean;
  penuh: boolean;
};

const Ctx = createContext<CompareCtx | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<string[]>([]);

  // load dari localStorage sekali di client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setList(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
  }, [list]);

  const toggle = (slug: string) =>
    setList((cur) =>
      cur.includes(slug)
        ? cur.filter((s) => s !== slug)
        : cur.length >= MAX
        ? cur
        : [...cur, slug]
    );
  const remove = (slug: string) =>
    setList((cur) => cur.filter((s) => s !== slug));
  const clear = () => setList([]);
  const has = (slug: string) => list.includes(slug);

  return (
    <Ctx.Provider
      value={{ list, toggle, remove, clear, has, penuh: list.length >= MAX }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCompare() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCompare harus di dalam CompareProvider");
  return c;
}
