"use client";

import dynamic from "next/dynamic";

const CursorGlow = dynamic(() => import("@/components/ui/cursor-glow").then(m => m.CursorGlow), { ssr: false });

export default function CursorGlowWrapper() {
  return <CursorGlow />;
}
