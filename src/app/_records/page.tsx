// "use client";

// import React, { useCallback, useEffect, useRef, useState } from "react";

// /* eslint-disable @typescript-eslint/no-explicit-any */

// const h = React.createElement;
// const FONT =
//   "var(--font-geist-sans), system-ui, sans-serif";

// ---------------------------------------------------------------------------
// // scoped styles (ported from the Claude Design template helmet)
// // ---------------------------------------------------------------------------
// const EMR_CSS = `
// .emr-root { --emr-pane-pad:16px; --emr-section-gap:16px; --emr-card-gap:16px; }
// .emr-account:hover { background:#F0F6FB; }
// .emr-sub:hover { background:#EAF3FA; color:#0077B6 !important; }
// .emr-sub-active { background:#CCE4F0 !important; color:#0F2A3D !important; font-weight:600 !important; }
// .emr-iconbtn { transition:background .15s ease, border-color .15s ease; }
// .emr-iconbtn:hover { background:#B8DCEE !important; }
// .emr-ghostbtn { transition:background .15s ease; }
// .emr-ghostbtn:hover { background:#F0F6FB; }
// .emr-nav-active { background:#0077B6 !important; color:#fff !important; font-weight:600 !important; border-radius:9px !important; }
// .emr-nav-idle { color:#1F3A4D !important; border-radius:9px !important; }
// .emr-nav-idle:hover { background:#EAF3FA !important; color:#0077B6 !important; }
// .emr-rec-row:hover { background:#EFF7FC !important; }
// .emr-sidebar { transition:width .18s ease; }
// .emr-focus-btn:hover { background:#EAF3FA !important; }
// .emr-resize-handle { position:relative; flex:0 0 8px; align-self:stretch; cursor:col-resize; background:transparent; display:flex; align-items:center; justify-content:center; touch-action:none; z-index:6; }
// .emr-resize-handle::before { content:""; position:absolute; top:0; bottom:0; left:3px; width:2px; background:#E6EDF3; transition:background .15s ease; }
// .emr-resize-handle:hover::before { background:#0077B6; }
// .emr-resize-grip { position:relative; z-index:1; width:5px; height:38px; border-radius:3px; background:#C3D0DA; opacity:0; transition:opacity .15s ease; }
// .emr-resize-handle:hover .emr-resize-grip { opacity:1; }
// .emr-root[data-emr-collapsed="true"] .emr-sidebar { width:74px !important; }
// .emr-root[data-emr-collapsed="true"] .emr-brand-text,
// .emr-root[data-emr-collapsed="true"] .emr-nav-label,
// .emr-root[data-emr-collapsed="true"] .emr-nav-chevron,
// .emr-root[data-emr-collapsed="true"] .emr-subnav,
// .emr-root[data-emr-collapsed="true"] .emr-acct-text,
// .emr-root[data-emr-collapsed="true"] .emr-acct-chevron { display:none !important; }
// .emr-root[data-emr-collapsed="true"] .emr-navbtn { justify-content:center !important; padding-left:0 !important; padding-right:0 !important; }
// .emr-root[data-emr-collapsed="true"] .emr-brand-row { flex-direction:column !important; justify-content:center !important; gap:12px !important; padding:16px 0 12px !important; }
// .emr-root[data-emr-collapsed="true"] .emr-collapse-btn { color:#0077B6 !important; }
// .emr-root[data-emr-collapsed="true"] .emr-account { justify-content:center !important; }
// .emr-root[data-emr-max="true"] .emr-main-col { display:none !important; }
// .emr-root[data-emr-max="true"] .emr-resize-handle { display:none !important; }
// .emr-root[data-emr-max="true"] .emr-panel-aside { flex:1 1 auto !important; width:auto !important; }
// .emr-root[data-emr-max="true"] .emr-split { flex-direction:row !important; }
// .emr-root[data-emr-max="true"] .emr-tables-region { flex:1 1 auto !important; border-right:1px solid #E6EDF3; }
// .emr-root[data-emr-max="true"] .emr-chat-col { flex:0 0 clamp(360px, 38%, 600px) !important; }
// .emr-root[data-emr-max="true"] .emr-conv-pane { flex:1 1 auto !important; max-height:none !important; border-top:none !important; }
// `;

// // ---------------------------------------------------------------------------
// // tiny inline svg helper
// // ---------------------------------------------------------------------------
// type IcoProps = {
//   d?: string | string[];
//   size?: number;
//   stroke?: string;
//   fill?: string;
//   sw?: number;
//   children?: React.ReactNode;
//   style?: React.CSSProperties;
// };
// function Ico({ d, size = 18, stroke = "currentColor", fill = "none", sw = 2, children, style }: IcoProps) {
//   const paths = children
//     ? children
//     : (Array.isArray(d) ? d : [d]).map((dd, i) =>
//         h("path", { key: i, d: dd })
//       );
//   return h(
//     "svg",
//     {
//       width: size,
//       height: size,
//       viewBox: "0 0 24 24",
//       fill,
//       stroke,
//       strokeWidth: sw,
//       strokeLinecap: "round",
//       strokeLinejoin: "round",
//       style,
//     },
//     paths
//   );
// }

// // ---------------------------------------------------------------------------
// // records data generator (ported)
// // ---------------------------------------------------------------------------
// type Rec = {
//   sno: number; pid: string; consent: string; age: number; gender: string;
//   residence: string; severity: string; smoking: string; bmi: string;
//   era: string; followup: number; status: string;
// };
// function recData(n: number): Rec[] {
//   const gen = ["female", "male"];
//   const res = ["urban", "rural"];
//   const sev = ["mild", "moderate", "severe"];
//   const smk = ["non-smoker", "ex-smoker", "smoker"];
//   const eras = ["Era 2 (2016–2024)", "Era 1 (2009–2015)"];
//   const cons = ["yes", "yes", "yes", "no"];
//   const p = (arr: string[], i: number, s: number) =>
//     arr[Math.abs((i * s + 7) >> 1) % arr.length];
//   const rows: Rec[] = [];
//   for (let i = 0; i < n; i++)
//     rows.push({
//       sno: i + 1,
//       pid: "MEN-" + String(341 + i).padStart(4, "0"),
//       consent: p(cons, i, 13),
//       age: 38 + (Math.abs(i * 37 + 11) % 30),
//       gender: p(gen, i, 3),
//       residence: p(res, i, 5),
//       severity: p(sev, i, 7),
//       smoking: p(smk, i, 11),
//       bmi: (20 + (Math.abs(i * 29 + 3) % 110) / 10).toFixed(1),
//       era: p(eras, i, 17),
//       followup: 8 + (Math.abs(i * 23 + 5) % 50),
//       status: Math.abs(i * 19 + 2) % 5 === 0 ? "Failure" : "Controlled",
//     });
//   return rows;
// }

// // ---------------------------------------------------------------------------
// // chat types
// // ---------------------------------------------------------------------------
// type Opt = { label: string; value: string };
// type Decision = {
//   id: string; table: string; forCol?: string; prompt: string;
//   note?: string; options: Opt[]; chosen?: Opt;
// };
// type Action = {
//   id: string; table: string; colKey: string; colLabel: string;
//   measure?: string; done: boolean;
// };
// type Msg = { role: "user" | "ai"; text?: string; action?: Action; decision?: Decision };

// // ===========================================================================
// // component
// // ===========================================================================
// export default function RecordsPage() {
//   const [panelOpen, setPanelOpen] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
//   const [panelW, setPanelW] = useState(460);
//   const [panelMax, setPanelMax] = useState(false);
//   const [builderOpen, setBuilderOpen] = useState(false);
//   const [builderTitle, setBuilderTitle] = useState("Create Statistical Table");
//   const [recordsShown, setRecordsShown] = useState(40);
//   const [chat, setChat] = useState<Msg[]>([]);

//   const rootRef = useRef<HTMLDivElement | null>(null);
//   const panelRef = useRef<HTMLElement | null>(null);
//   const sheetRef = useRef<HTMLDivElement | null>(null);
//   const tablesRef = useRef<HTMLDivElement | null>(null);
//   const chatInputRef = useRef<HTMLInputElement | null>(null);
//   const aidRef = useRef(0);
//   const loadingRef = useRef(false);
//   const resizingRef = useRef(false);
//   const dragWRef = useRef(460);

//   // restore persisted panel width
//   useEffect(() => {
//     let w: number | null = null;
//     try {
//       const s = localStorage.getItem("emrRecordsPanelW");
//       if (s) w = parseInt(s, 10);
//     } catch {}
//     if (w && !isNaN(w)) setPanelW(w);
//   }, []);

//   // reflect state onto root data attributes
//   useEffect(() => {
//     const el = rootRef.current;
//     if (!el) return;
//     el.setAttribute("data-emr-collapsed", sidebarCollapsed ? "true" : "false");
//     el.setAttribute("data-emr-max", panelMax && panelOpen ? "true" : "false");
//     if (panelRef.current && !resizingRef.current)
//       panelRef.current.style.width = (panelW || 460) + "px";
//   }, [sidebarCollapsed, panelMax, panelOpen, panelW]);

//   // -------- handlers --------
//   const toggleSidebar = useCallback(() => setSidebarCollapsed((s) => !s), []);
//   const openPanel = useCallback(() => setPanelOpen(true), []);
//   const closePanel = useCallback(() => {
//     setPanelOpen(false);
//     setPanelMax(false);
//   }, []);
//   const openBuilder = useCallback(() => {
//     setBuilderTitle("Create Statistical Table");
//     setBuilderOpen(true);
//   }, []);
//   const closeBuilder = useCallback(() => setBuilderOpen(false), []);
//   const editTable = useCallback((name: string) => {
//     setBuilderTitle("Edit " + name);
//     setBuilderOpen(true);
//   }, []);
//   const toggleMax = useCallback(() => setPanelMax((m) => !m), []);
//   const clearChat = useCallback(() => setChat([]), []);

//   const onSheetScroll = useCallback(
//     (e: React.UIEvent<HTMLDivElement>) => {
//       const el = e.currentTarget;
//       if (!el) return;
//       if (el.scrollTop + el.clientHeight >= el.scrollHeight - 280) {
//         if (!loadingRef.current) {
//           setRecordsShown((cur) => {
//             if (cur >= 150) return cur;
//             loadingRef.current = true;
//             setTimeout(() => (loadingRef.current = false), 120);
//             return Math.min(150, cur + 40);
//           });
//         }
//       }
//     },
//     []
//   );

//   // -------- chat logic (ported) --------
//   const effectDecision = useCallback((table: string): Decision => {
//     aidRef.current += 1;
//     return {
//       id: "d" + aidRef.current,
//       table,
//       forCol: "es",
//       prompt:
//         "Your engine can compute more than one effect-size measure for these variables. Which should it use?",
//       note: "I won’t choose this for you — the right measure depends on your study design.",
//       options: [
//         { label: "Odds ratio (OR)", value: "OR" },
//         { label: "Risk ratio (RR)", value: "RR" },
//         { label: "Cramér’s V", value: "V" },
//       ],
//     };
//   }, []);

//   const sendChat = useCallback(
//     (raw: string) => {
//       const text = (raw || "").trim();
//       if (!text) return;
//       const low = text.toLowerCase();
//       setChat((prev) => {
//         const msgs = prev.slice();
//         msgs.push({ role: "user", text });
//         const table = /table\s*2|table_2/.test(low)
//           ? "Statistical Table_2"
//           : "Statistical Table_1";
//         const labels: Record<string, string> = {
//           p: "p-value",
//           ci: "95% CI",
//           es: "effect size",
//         };
//         let colKey: string | null = null;
//         if (/p[\s-]*value|p val/.test(low)) colKey = "p";
//         else if (/95%|\bci\b|confidence/.test(low)) colKey = "ci";
//         else if (/effect/.test(low)) colKey = "es";

//         if (colKey && table === "Statistical Table_2") {
//           msgs.push({
//             role: "ai",
//             text:
//               "Statistical Table_2 already reports " +
//               labels[colKey] +
//               " — computed by your engine. Nothing to add.",
//           });
//         } else if (colKey) {
//           const already = prev.some(
//             (m) =>
//               m.action &&
//               m.action.table === table &&
//               m.action.colKey === colKey &&
//               m.action.done
//           );
//           if (already) {
//             msgs.push({
//               role: "ai",
//               text:
//                 "The " + labels[colKey] + " column is already on " + table + ".",
//             });
//           } else if (colKey === "es") {
//             msgs.push({ role: "ai", decision: effectDecision(table) });
//           } else {
//             aidRef.current += 1;
//             msgs.push({
//               role: "ai",
//               action: {
//                 id: "a" + aidRef.current,
//                 table,
//                 colKey,
//                 colLabel: labels[colKey],
//                 done: true,
//               },
//             });
//           }
//         } else if (/summ|finding|significan/.test(low)) {
//           msgs.push({
//             role: "ai",
//             text:
//               "From your engine’s results: only Treatment Era is significant (p = 0.048, OR 3.36, 95% CI 1.01–11.20). Everything else is non-significant.",
//           });
//         } else if (/kaplan|km curve|survival/.test(low)) {
//           msgs.push({
//             role: "ai",
//             text:
//               "Requested from your engine — the Kaplan–Meier local-control curve is saved in the panel above.",
//           });
//         } else {
//           aidRef.current += 1;
//           msgs.push({
//             role: "ai",
//             decision: {
//               id: "d" + aidRef.current,
//               table,
//               prompt:
//                 "I’m not sure what you’d like me to run, and I won’t guess. What should I ask your engine to do?",
//               note: "Pick one and I’ll send that exact command to your statistics engine.",
//               options: [
//                 { label: "Add p-value", value: "p" },
//                 { label: "Add 95% CI", value: "ci" },
//                 { label: "Add effect size", value: "es" },
//                 { label: "Summarise findings", value: "sum" },
//               ],
//             },
//           });
//         }
//         return msgs;
//       });
//       if (chatInputRef.current) chatInputRef.current.value = "";
//     },
//     [effectDecision]
//   );

//   const resolveDecision = useCallback(
//     (id: string, opt: Opt) => {
//       setChat((prev) => {
//         let dec: Decision | null = null;
//         const chatArr = prev.map((m) => {
//           if (m.decision && m.decision.id === id && !m.decision.chosen) {
//             const nd = { ...m.decision, chosen: opt };
//             dec = nd;
//             return { ...m, decision: nd };
//           }
//           return m;
//         });
//         if (!dec) return chatArr;
//         const d: Decision = dec;
//         const table = d.table || "Statistical Table_1";
//         if (d.forCol) {
//           aidRef.current += 1;
//           chatArr.push({
//             role: "ai",
//             action: {
//               id: "a" + aidRef.current,
//               table,
//               colKey: d.forCol,
//               colLabel: "Effect size",
//               measure: opt.label,
//               done: true,
//             },
//           });
//         } else {
//           const v = opt.value;
//           if (v === "p" || v === "ci") {
//             aidRef.current += 1;
//             chatArr.push({
//               role: "ai",
//               action: {
//                 id: "a" + aidRef.current,
//                 table,
//                 colKey: v,
//                 colLabel: v === "p" ? "p-value" : "95% CI",
//                 done: true,
//               },
//             });
//           } else if (v === "es") {
//             chatArr.push({ role: "ai", decision: effectDecision(table) });
//           } else {
//             chatArr.push({
//               role: "ai",
//               text:
//                 "From your engine’s results: only Treatment Era is significant (p = 0.048, OR 3.36, 95% CI 1.01–11.20).",
//             });
//           }
//         }
//         return chatArr;
//       });
//     },
//     [effectDecision]
//   );

//   const toggleAction = useCallback((id: string) => {
//     setChat((prev) =>
//       prev.map((m) =>
//         m.action && m.action.id === id
//           ? { ...m, action: { ...m.action, done: !m.action.done } }
//           : m
//       )
//     );
//   }, []);

//   const activeCols = useCallback(
//     (table: string) => {
//       const order = ["p", "ci", "es"];
//       const labels: Record<string, string> = {
//         p: "p-value",
//         ci: "95% CI",
//         es: "Effect size",
//       };
//       const keys: string[] = [];
//       chat.forEach((m) => {
//         if (
//           m.action &&
//           m.action.table === table &&
//           m.action.done &&
//           keys.indexOf(m.action.colKey) < 0
//         )
//           keys.push(m.action.colKey);
//       });
//       keys.sort((a, b) => order.indexOf(a) - order.indexOf(b));
//       return keys.map((k) => ({ key: k, label: labels[k] }));
//     },
//     [chat]
//   );

//   const chatKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendChat((e.target as HTMLInputElement).value);
//     }
//   };
//   const chatSend = () => {
//     if (chatInputRef.current) sendChat(chatInputRef.current.value);
//   };

//   // -------- resize drag (ported) --------
//   const startResize = useCallback(
//     (e: React.PointerEvent) => {
//       e.preventDefault();
//       resizingRef.current = true;
//       dragWRef.current = panelW || 460;
//       const root = rootRef.current;
//       if (root) {
//         root.style.userSelect = "none";
//         root.style.cursor = "col-resize";
//       }
//       const move = (ev: PointerEvent) => {
//         const x = ev.clientX;
//         const min = 360;
//         const max = Math.min(window.innerWidth * 0.72, 1000);
//         let w = window.innerWidth - x;
//         w = Math.max(min, Math.min(max, w));
//         dragWRef.current = w;
//         if (panelRef.current) panelRef.current.style.width = w + "px";
//       };
//       const up = () => {
//         document.removeEventListener("pointermove", move);
//         document.removeEventListener("pointerup", up);
//         resizingRef.current = false;
//         if (root) {
//           root.style.userSelect = "";
//           root.style.cursor = "";
//         }
//         setPanelW(dragWRef.current);
//         try {
//           localStorage.setItem("emrRecordsPanelW", String(dragWRef.current));
//         } catch {}
//       };
//       document.addEventListener("pointermove", move);
//       document.addEventListener("pointerup", up);
//     },
//     [panelW]
//   );

//   // =========================================================================
//   // renderers (ported near-verbatim from the template)
//   // =========================================================================
//   const recordsTable = () => {
//     const B = "1px solid #E6EDF3";
//     const cols = [
//       { k: "sno", label: "S.No", w: 74, center: true, accent: true },
//       { k: "pid", label: "Patient ID", w: 118 },
//       { k: "consent", label: "Consent", w: 108 },
//       { k: "age", label: "Age", w: 76, center: true },
//       { k: "gender", label: "Gender", w: 110 },
//       { k: "residence", label: "Residence", w: 115 },
//       { k: "severity", label: "Severity", w: 115 },
//       { k: "smoking", label: "Smoking Status", w: 150 },
//       { k: "bmi", label: "BMI", w: 86, center: true },
//       { k: "era", label: "Treatment Era", w: 150 },
//       { k: "followup", label: "Follow-up (mo)", w: 130, center: true },
//       { k: "status", label: "Local Control", w: 132 },
//     ] as const;
//     const data = recData(150).slice(0, recordsShown || 40);
//     const th = (c: (typeof cols)[number]) =>
//       h(
//         "th",
//         {
//           key: c.k,
//           style: {
//             padding: "13px 16px",
//             textAlign: c.center ? "center" : "left",
//             borderBottom: "2px solid #DDE6EC",
//             borderRight: B,
//             background: "#F7FAFC",
//             minWidth: c.w + "px",
//             whiteSpace: "nowrap",
//             position: "sticky",
//             top: 0,
//             zIndex: 2,
//           } as React.CSSProperties,
//         },
//         h(
//           "div",
//           {
//             style: {
//               display: "flex",
//               alignItems: "center",
//               justifyContent: c.center ? "center" : "space-between",
//               gap: "10px",
//             },
//           },
//           [
//             h(
//               "span",
//               {
//                 key: "l",
//                 style: {
//                   fontWeight: 700,
//                   fontSize: "13.5px",
//                   color: (c as any).accent ? "#0077B6" : "#0F2A3D",
//                 },
//               },
//               c.label
//             ),
//             c.center
//               ? null
//               : h(
//                   "svg",
//                   {
//                     key: "m",
//                     width: 15,
//                     height: 15,
//                     viewBox: "0 0 24 24",
//                     fill: "#9BB0BF",
//                     stroke: "none",
//                     style: { flexShrink: 0 },
//                   },
//                   [
//                     h("circle", { key: 1, cx: 12, cy: 5, r: 1.5 }),
//                     h("circle", { key: 2, cx: 12, cy: 12, r: 1.5 }),
//                     h("circle", { key: 3, cx: 12, cy: 19, r: 1.5 }),
//                   ]
//                 ),
//           ]
//         )
//       );
//     const pill = (s: string) =>
//       h(
//         "span",
//         {
//           style: {
//             display: "inline-flex",
//             alignItems: "center",
//             padding: "3px 10px",
//             borderRadius: "7px",
//             fontSize: "12px",
//             fontWeight: 600,
//             background: s === "Failure" ? "#FDECEC" : "#E4F6EC",
//             color: s === "Failure" ? "#C0392B" : "#1F8A5B",
//           },
//         },
//         s
//       );
//     const head = h(
//       "thead",
//       { key: "h" },
//       h("tr", {}, [
//         h(
//           "th",
//           {
//             key: "chk",
//             style: {
//               padding: "13px 14px",
//               borderBottom: "2px solid #DDE6EC",
//               borderRight: B,
//               background: "#F7FAFC",
//               width: "46px",
//               textAlign: "center",
//               position: "sticky",
//               top: 0,
//               zIndex: 2,
//             } as React.CSSProperties,
//           },
//           h("input", {
//             type: "checkbox",
//             style: {
//               width: "17px",
//               height: "17px",
//               accentColor: "#0077B6",
//               cursor: "pointer",
//             },
//           })
//         ),
//         ...cols.map(th),
//         h(
//           "th",
//           {
//             key: "act",
//             style: {
//               padding: "13px 16px",
//               textAlign: "center",
//               borderBottom: "2px solid #DDE6EC",
//               background: "#EEF4F8",
//               color: "#0F2A3D",
//               fontWeight: 700,
//               fontSize: "13.5px",
//               position: "sticky",
//               right: 0,
//               top: 0,
//               zIndex: 3,
//               minWidth: "84px",
//               boxShadow: "-5px 0 8px -6px rgba(16,42,61,.25)",
//             } as React.CSSProperties,
//           },
//           "Actions"
//         ),
//       ])
//     );
//     const body = h(
//       "tbody",
//       { key: "b" },
//       data.map((r, i) => {
//         const bg = i % 2 ? "#F8FBFD" : "#fff";
//         return h(
//           "tr",
//           { key: i, style: { background: bg } },
//           [
//             h(
//               "td",
//               {
//                 key: "chk",
//                 style: {
//                   padding: "12px 14px",
//                   borderBottom: B,
//                   borderRight: B,
//                   textAlign: "center",
//                 } as React.CSSProperties,
//               },
//               h("input", {
//                 type: "checkbox",
//                 style: {
//                   width: "17px",
//                   height: "17px",
//                   accentColor: "#0077B6",
//                   cursor: "pointer",
//                 },
//               })
//             ),
//             ...cols.map((c) =>
//               h(
//                 "td",
//                 {
//                   key: c.k,
//                   style: {
//                     padding: "12px 16px",
//                     borderBottom: B,
//                     borderRight: B,
//                     textAlign: c.center ? "center" : "left",
//                     fontSize: "13.5px",
//                     color: (c as any).accent ? "#0077B6" : "#334A5A",
//                     fontWeight: (c as any).accent ? 600 : 400,
//                     whiteSpace: "nowrap",
//                   } as React.CSSProperties,
//                 },
//                 c.k === "status"
//                   ? pill((r as any)[c.k])
//                   : String((r as any)[c.k])
//               )
//             ),
//             h(
//               "td",
//               {
//                 key: "act",
//                 style: {
//                   padding: "10px 16px",
//                   borderBottom: B,
//                   textAlign: "center",
//                   position: "sticky",
//                   right: 0,
//                   background: bg,
//                   boxShadow: "-5px 0 8px -6px rgba(16,42,61,.25)",
//                 } as React.CSSProperties,
//               },
//               h(
//                 "button",
//                 {
//                   "aria-label": "Edit row",
//                   style: {
//                     width: "32px",
//                     height: "32px",
//                     border: "none",
//                     background: "transparent",
//                     cursor: "pointer",
//                     display: "inline-flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     borderRadius: "8px",
//                   },
//                 },
//                 h(Ico, {
//                   size: 17,
//                   stroke: "#0077B6",
//                   d: ["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"],
//                 })
//               )
//             ),
//           ]
//         );
//       })
//     );
//     return h(
//       "table",
//       {
//         style: {
//           width: "100%",
//           borderCollapse: "collapse",
//           minWidth: "1500px",
//           fontSize: "14px",
//         } as React.CSSProperties,
//       },
//       [head, body]
//     );
//   };

//   // ---- non-editable result table ----
//   type TRow = {
//     label?: string; section?: string; sub?: boolean; v?: string[];
//     p?: string; ci?: string; es?: string;
//   };
//   const buildTable = (rows: TRow[], extraCols: { key: string; label: string }[]) => {
//     const B = "1px solid #BFC8D0";
//     const val: React.CSSProperties = {
//       padding: "9px 12px",
//       border: B,
//       textAlign: "center",
//       fontSize: "13px",
//       color: "#334A5A",
//       whiteSpace: "nowrap",
//     };
//     const hcell = (main: string | string[], align?: string) =>
//       h(
//         "th",
//         {
//           style: {
//             padding: "9px 12px",
//             border: B,
//             textAlign: (align as any) || "center",
//             background: "#fff",
//             verticalAlign: "middle",
//           } as React.CSSProperties,
//         },
//         Array.isArray(main)
//           ? [
//               h(
//                 "div",
//                 {
//                   key: 1,
//                   style: { fontSize: "13px", color: "#0F2A3D", fontWeight: 700 },
//                 },
//                 main[0]
//               ),
//               h(
//                 "div",
//                 {
//                   key: 2,
//                   style: { fontSize: "11px", color: "#64748B", fontWeight: 600 },
//                 },
//                 main[1]
//               ),
//             ]
//           : h(
//               "div",
//               { style: { fontSize: "13px", color: "#0F2A3D", fontWeight: 700 } },
//               main
//             )
//       );
//     const statTd = (key: string, txt: string | undefined, span: number) => {
//       const sig =
//         key === "p" && txt && !isNaN(parseFloat(txt)) && parseFloat(txt) < 0.05;
//       return h(
//         "td",
//         {
//           key: "x" + key,
//           rowSpan: span || 1,
//           "data-emr-col": key,
//           style: {
//             ...val,
//             verticalAlign: "middle",
//             color: sig ? "#C0392B" : "#0F2A3D",
//             fontWeight: sig ? 800 : 600,
//           } as React.CSSProperties,
//         },
//         txt || ""
//       );
//     };
//     const labelTd = (text: string, indent: boolean | undefined, weight: number) =>
//       h(
//         "td",
//         {
//           key: "l",
//           style: {
//             padding: indent ? "9px 12px 9px 26px" : "9px 12px",
//             border: B,
//             fontSize: "13px",
//             color: "#0F2A3D",
//             fontWeight: weight,
//           } as React.CSSProperties,
//         },
//         text
//       );
//     const headCells: React.ReactNode[] = [
//       React.cloneElement(hcell("Variable", "left") as any, { key: "v" }),
//       React.cloneElement(hcell(["Total", "N (%)"]) as any, { key: "t" }),
//       React.cloneElement(hcell(["Local Control", "N (%)"]) as any, { key: "c" }),
//       React.cloneElement(hcell(["Local Failure", "N (%)"]) as any, { key: "f" }),
//     ];
//     extraCols.forEach((c) =>
//       headCells.push(
//         React.cloneElement(hcell(c.label) as any, {
//           key: "h" + c.key,
//           "data-emr-col": c.key,
//         })
//       )
//     );
//     const head = h("thead", { key: "h" }, h("tr", {}, headCells));
//     const ncol = 4 + extraCols.length;
//     const trs: React.ReactNode[] = [];
//     let k = 0;
//     while (k < rows.length) {
//       const r = rows[k];
//       if (r.section) {
//         trs.push(
//           h(
//             "tr",
//             { key: "s" + k },
//             h(
//               "td",
//               {
//                 colSpan: ncol,
//                 style: {
//                   padding: "9px 12px",
//                   border: B,
//                   fontWeight: 700,
//                   fontSize: "13px",
//                   color: "#0F2A3D",
//                   background: "#fff",
//                 } as React.CSSProperties,
//               },
//               r.section
//             )
//           )
//         );
//         let cnt = 0;
//         while (k + 1 + cnt < rows.length && rows[k + 1 + cnt].sub) cnt++;
//         for (let m = 0; m < cnt; m++) {
//           const opt = rows[k + 1 + m];
//           const cells: React.ReactNode[] = [
//             labelTd(opt.label as string, true, 400),
//             h("td", { key: 0, style: val }, opt.v![0]),
//             h("td", { key: 1, style: val }, opt.v![1]),
//             h("td", { key: 2, style: val }, opt.v![2]),
//           ];
//           if (m === 0)
//             extraCols.forEach((c) =>
//               cells.push(statTd(c.key, (r as any)[c.key], cnt))
//             );
//           trs.push(h("tr", { key: "o" + k + "_" + m }, cells));
//         }
//         k += 1 + cnt;
//       } else {
//         const cells: React.ReactNode[] = [
//           labelTd(r.label as string, r.sub, r.sub ? 400 : 600),
//           h("td", { key: 0, style: val }, r.v![0]),
//           h("td", { key: 1, style: val }, r.v![1]),
//           h("td", { key: 2, style: val }, r.v![2]),
//         ];
//         extraCols.forEach((c) => cells.push(statTd(c.key, (r as any)[c.key], 1)));
//         trs.push(h("tr", { key: "d" + k }, cells));
//         k++;
//       }
//     }
//     const body = h("tbody", { key: "b" }, trs);
//     return h(
//       "div",
//       { "data-emr-xscroll": "1", style: { overflowX: "auto" } },
//       h(
//         "table",
//         {
//           style: {
//             width: "100%",
//             borderCollapse: "collapse",
//             minWidth: (extraCols.length ? 660 : 440) + "px",
//             background: "#fff",
//           } as React.CSSProperties,
//         },
//         [head, body]
//       )
//     );
//   };

//   // ---- grouped bar chart ----
//   const groupedBar = (
//     title: string,
//     cats: { label: string; control: number; failure?: number }[]
//   ) => {
//     const W = 480, H = 330, ml = 52, mr = 14, mt = 58, mb = 76;
//     const plotW = W - ml - mr, plotH = H - mt - mb, baseY = mt + plotH, yMax = 100;
//     const els: React.ReactNode[] = [];
//     [0, 20, 40, 60, 80, 100].forEach((t) => {
//       const y = baseY - (t / yMax) * plotH;
//       els.push(
//         h("line", {
//           key: "g" + t,
//           x1: ml, x2: W - mr, y1: y, y2: y,
//           stroke: "#d7dee5", strokeWidth: 1, strokeDasharray: "4 4",
//         })
//       );
//       els.push(
//         h(
//           "text",
//           {
//             key: "yl" + t, x: ml - 7, y: y + 4, textAnchor: "end",
//             fontSize: 12, fontWeight: 700, fill: "#334A5A",
//           },
//           String(t)
//         )
//       );
//     });
//     els.push(h("line", { key: "yax", x1: ml, y1: mt - 4, x2: ml, y2: baseY, stroke: "#334A5A", strokeWidth: 1.4 }));
//     els.push(h("line", { key: "xax", x1: ml, y1: baseY, x2: W - mr, y2: baseY, stroke: "#334A5A", strokeWidth: 1.4 }));
//     const n = cats.length, gW = plotW / n, barW = Math.min(46, gW * 0.28), gap = 8;
//     cats.forEach((c, i) => {
//       const cx = ml + gW * i + gW / 2;
//       const bx1 = cx - barW - gap / 2, bx2 = cx + gap / 2;
//       const chv = Math.max(0, (c.control / yMax) * plotH);
//       els.push(h("rect", { key: "cb" + i, x: bx1, y: baseY - chv, width: barW, height: chv, fill: "#1f77b4" }));
//       if (c.control > 0)
//         els.push(h("text", { key: "ct" + i, x: bx1 + barW / 2, y: baseY - chv - 7, textAnchor: "middle", fontSize: 12.5, fontWeight: 800, fill: "#1f77b4" }, c.control.toFixed(1) + "%"));
//       if (c.failure != null) {
//         const fhv = Math.max(0, (c.failure / yMax) * plotH);
//         els.push(h("rect", { key: "fb" + i, x: bx2, y: baseY - fhv, width: barW, height: fhv, fill: "#e0891a" }));
//         if (c.failure > 0)
//           els.push(h("text", { key: "ft" + i, x: bx2 + barW / 2, y: baseY - fhv - 7, textAnchor: "middle", fontSize: 12.5, fontWeight: 800, fill: "#e0891a" }, c.failure.toFixed(1) + "%"));
//       }
//       String(c.label)
//         .split("\n")
//         .forEach((ln, li) =>
//           els.push(h("text", { key: "xl" + i + "_" + li, x: cx, y: baseY + 20 + li * 15, textAnchor: "middle", fontSize: 12.5, fontWeight: 600, fill: "#0F2A3D" }, ln))
//         );
//     });
//     els.push(h("text", { key: "yt", x: 15, y: mt + plotH / 2, transform: "rotate(-90 15 " + (mt + plotH / 2) + ")", textAnchor: "middle", fontSize: 12.5, fontWeight: 800, fill: "#0F2A3D" }, "Percentage (%)"));
//     els.push(h("text", { key: "ti", x: W / 2, y: 24, textAnchor: "middle", fontSize: 16, fontWeight: 800, fill: "#0F2A3D" }, title));
//     const rEnd = W - mr, ly = 42;
//     els.push(h("rect", { key: "l2", x: rEnd - 138, y: ly - 9, width: 14, height: 9, fill: "#e0891a" }));
//     els.push(h("text", { key: "l2t", x: rEnd - 120, y: ly, fontSize: 11.5, fontWeight: 600, fill: "#334A5A" }, "Local Failure (n=13)"));
//     els.push(h("rect", { key: "l1", x: rEnd - 288, y: ly - 9, width: 14, height: 9, fill: "#1f77b4" }));
//     els.push(h("text", { key: "l1t", x: rEnd - 270, y: ly, fontSize: 11.5, fontWeight: 600, fill: "#334A5A" }, "Local Control (n=202)"));
//     return h(
//       "svg",
//       { viewBox: "0 0 " + W + " " + H, width: "100%", style: { display: "block", maxWidth: W + "px", margin: "0 auto" } },
//       els
//     );
//   };

//   // ---- histogram + KDE ----
//   const histogram = (title: string) => {
//     const W = 480, H = 330, ml = 52, mr = 14, mt = 58, mb = 76;
//     const plotW = W - ml - mr, plotH = H - mt - mb, baseY = mt + plotH;
//     const xMin = 13, xMax = 95, fMax = 50;
//     const xp = (a: number) => ml + ((a - xMin) / (xMax - xMin)) * plotW;
//     const yp = (f: number) => baseY - (f / fMax) * plotH;
//     const els: React.ReactNode[] = [];
//     [0, 10, 20, 30, 40, 50].forEach((t) => {
//       const y = yp(t);
//       els.push(h("line", { key: "g" + t, x1: ml, x2: W - mr, y1: y, y2: y, stroke: "#d7dee5", strokeWidth: 1, strokeDasharray: "4 4" }));
//       els.push(h("text", { key: "yl" + t, x: ml - 7, y: y + 4, textAnchor: "end", fontSize: 12, fontWeight: 700, fill: "#334A5A" }, String(t)));
//     });
//     const bins = [[18, 1], [24, 7], [30, 9], [36, 22], [42, 30], [48, 46], [54, 29], [60, 29], [66, 20], [72, 11], [78, 7], [84, 3], [90, 1]];
//     bins.forEach((b, i) => {
//       const x0 = xp(b[0] - 3), x1 = xp(b[0] + 3);
//       els.push(h("rect", { key: "b" + i, x: x0, y: yp(b[1]), width: x1 - x0 - 1, height: baseY - yp(b[1]), fill: "#3b8fc4", stroke: "#12354f", strokeWidth: 1 }));
//     });
//     const pts: string[] = [];
//     for (let a = 13; a <= 95; a += 1.5) {
//       const g = Math.exp(-0.5 * Math.pow((a - 50) / 13, 2)) * 37;
//       pts.push(xp(a).toFixed(1) + "," + yp(g).toFixed(1));
//     }
//     els.push(h("polyline", { key: "kde", points: pts.join(" "), fill: "none", stroke: "#ee1d24", strokeWidth: 3.4, strokeLinejoin: "round", strokeLinecap: "round" }));
//     els.push(h("line", { key: "yax", x1: ml, y1: mt - 4, x2: ml, y2: baseY, stroke: "#334A5A", strokeWidth: 1.4 }));
//     els.push(h("line", { key: "xax", x1: ml, y1: baseY, x2: W - mr, y2: baseY, stroke: "#334A5A", strokeWidth: 1.4 }));
//     [20, 40, 60, 80].forEach((t) =>
//       els.push(h("text", { key: "xl" + t, x: xp(t), y: baseY + 20, textAnchor: "middle", fontSize: 12, fontWeight: 700, fill: "#334A5A" }, String(t)))
//     );
//     els.push(h("text", { key: "xt", x: ml + plotW / 2, y: baseY + 40, textAnchor: "middle", fontSize: 13, fontWeight: 800, fill: "#0F2A3D" }, "Age"));
//     els.push(h("text", { key: "yt", x: 15, y: mt + plotH / 2, transform: "rotate(-90 15 " + (mt + plotH / 2) + ")", textAnchor: "middle", fontSize: 13, fontWeight: 800, fill: "#0F2A3D" }, "Frequency"));
//     els.push(h("text", { key: "ti", x: W / 2, y: 24, textAnchor: "middle", fontSize: 16, fontWeight: 800, fill: "#0F2A3D" }, title));
//     return h("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", style: { display: "block", maxWidth: W + "px", margin: "0 auto" } }, els);
//   };

//   // ---- Kaplan-Meier curve ----
//   const kmCurve = () => {
//     const W = 480, H = 384, ml = 54, mr = 16, mt = 42, pb = 250;
//     const plotW = W - ml - mr, plotH = pb - mt, tMax = 36;
//     const xp = (t: number) => ml + (t / tMax) * plotW;
//     const yp = (s: number) => pb - s * plotH;
//     const els: React.ReactNode[] = [];
//     [0, 0.25, 0.5, 0.75, 1].forEach((s) => {
//       const y = yp(s);
//       els.push(h("line", { key: "g" + s, x1: ml, x2: W - mr, y1: y, y2: y, stroke: "#e3e9ee", strokeWidth: 1, strokeDasharray: "4 4" }));
//       els.push(h("text", { key: "yl" + s, x: ml - 8, y: y + 4, textAnchor: "end", fontSize: 11.5, fontWeight: 700, fill: "#334A5A" }, s.toFixed(2)));
//     });
//     els.push(h("line", { key: "yax", x1: ml, y1: mt - 6, x2: ml, y2: pb, stroke: "#334A5A", strokeWidth: 1.4 }));
//     els.push(h("line", { key: "xax", x1: ml, y1: pb, x2: W - mr, y2: pb, stroke: "#334A5A", strokeWidth: 1.4 }));
//     [0, 6, 12, 18, 24, 30, 36].forEach((t) => {
//       els.push(h("line", { key: "xt" + t, x1: xp(t), y1: pb, x2: xp(t), y2: pb + 5, stroke: "#334A5A", strokeWidth: 1 }));
//       els.push(h("text", { key: "xl" + t, x: xp(t), y: pb + 19, textAnchor: "middle", fontSize: 11.5, fontWeight: 700, fill: "#334A5A" }, String(t)));
//     });
//     const stepPts = (steps: number[][]) => {
//       const pts: number[][] = [];
//       let prev: number | null = null;
//       steps.forEach((st, i) => {
//         if (i === 0) pts.push([xp(st[0]), yp(st[1])]);
//         else {
//           pts.push([xp(st[0]), yp(prev as number)]);
//           pts.push([xp(st[0]), yp(st[1])]);
//         }
//         prev = st[1];
//       });
//       return pts;
//     };
//     const toStr = (pts: number[][]) =>
//       pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
//     const era2 = [[0, 1], [4, 0.99], [9, 0.975], [15, 0.955], [21, 0.94], [27, 0.915], [33, 0.885], [36, 0.885]];
//     const era1 = [[0, 1], [3, 0.96], [8, 0.9], [13, 0.85], [19, 0.8], [25, 0.74], [31, 0.7], [36, 0.7]];
//     els.push(h("polyline", { key: "e2", points: toStr(stepPts(era2)), fill: "none", stroke: "#1f77b4", strokeWidth: 2.4, strokeLinejoin: "round" }));
//     els.push(h("polyline", { key: "e1", points: toStr(stepPts(era1)), fill: "none", stroke: "#e0891a", strokeWidth: 2.4, strokeLinejoin: "round" }));
//     const cens = (color: string, marks: number[][]) =>
//       marks.forEach((m, i) => {
//         const x = xp(m[0]), y = yp(m[1]);
//         els.push(h("line", { key: "c" + color + i, x1: x, y1: y - 4, x2: x, y2: y + 4, stroke: color, strokeWidth: 1.6 }));
//       });
//     cens("#1f77b4", [[6, 0.99], [18, 0.955], [30, 0.915]]);
//     cens("#e0891a", [[11, 0.9], [22, 0.8]]);
//     els.push(h("text", { key: "lr", x: xp(19.5), y: yp(0.33), fontSize: 12, fontWeight: 700, fill: "#0F2A3D" }, "Log-rank p = 0.03"));
//     els.push(h("text", { key: "xt2", x: ml + plotW / 2, y: pb + 38, textAnchor: "middle", fontSize: 12.5, fontWeight: 800, fill: "#0F2A3D" }, "Time since treatment (months)"));
//     els.push(h("text", { key: "yt", x: 15, y: mt + plotH / 2, transform: "rotate(-90 15 " + (mt + plotH / 2) + ")", textAnchor: "middle", fontSize: 12.5, fontWeight: 800, fill: "#0F2A3D" }, "Local control probability"));
//     els.push(h("text", { key: "ti", x: W / 2, y: 22, textAnchor: "middle", fontSize: 15.5, fontWeight: 800, fill: "#0F2A3D" }, "Local Control by Treatment Era"));
//     const lx = W - mr - 152, ly = mt + 8;
//     els.push(h("line", { key: "lg1", x1: lx, y1: ly, x2: lx + 22, y2: ly, stroke: "#1f77b4", strokeWidth: 3 }));
//     els.push(h("text", { key: "lg1t", x: lx + 28, y: ly + 4, fontSize: 11.5, fontWeight: 600, fill: "#334A5A" }, "Era 2 (2016–2024)"));
//     els.push(h("line", { key: "lg2", x1: lx, y1: ly + 16, x2: lx + 22, y2: ly + 16, stroke: "#e0891a", strokeWidth: 3 }));
//     els.push(h("text", { key: "lg2t", x: lx + 28, y: ly + 20, fontSize: 11.5, fontWeight: 600, fill: "#334A5A" }, "Era 1 (2009–2015)"));
//     const rt = pb + 52;
//     els.push(h("text", { key: "nr", x: 4, y: rt - 16, fontSize: 11, fontWeight: 700, fill: "#0F2A3D" }, "No. at risk"));
//     els.push(h("text", { key: "nr2", x: 4, y: rt, fontSize: 11, fontWeight: 600, fill: "#1f77b4" }, "Era 2"));
//     els.push(h("text", { key: "nr1", x: 4, y: rt + 16, fontSize: 11, fontWeight: 600, fill: "#e0891a" }, "Era 1"));
//     const e2r: Record<number, number> = { 0: 178, 12: 150, 24: 96, 36: 40 };
//     const e1r: Record<number, number> = { 0: 24, 12: 15, 24: 8, 36: 3 };
//     [0, 12, 24, 36].forEach((t) => {
//       els.push(h("text", { key: "a2" + t, x: xp(t), y: rt, textAnchor: "middle", fontSize: 11, fill: "#334A5A" }, String(e2r[t])));
//       els.push(h("text", { key: "a1" + t, x: xp(t), y: rt + 16, textAnchor: "middle", fontSize: 11, fill: "#334A5A" }, String(e1r[t])));
//     });
//     return h("svg", { viewBox: "0 0 " + W + " " + H, width: "100%", style: { display: "block", maxWidth: W + "px", margin: "0 auto" } }, els);
//   };

//   // ---- chat thread ----
//   const renderChat = () => {
//     if (!chat.length) return null;
//     const aiAvatar = () =>
//       h(
//         "div",
//         {
//           key: "a",
//           style: {
//             width: "24px", height: "24px", borderRadius: "7px",
//             background: "#EAF3FA", display: "flex", alignItems: "center",
//             justifyContent: "center", flexShrink: 0,
//           },
//         },
//         h(Ico, {
//           size: 13,
//           stroke: "#0077B6",
//           d: "M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.1L4.5 10l5.6-1.4z",
//         })
//       );
//     const rows = chat.map((m, i) => {
//       if (m.decision) {
//         const d = m.decision, chosen = d.chosen;
//         const optBtns = (d.options || []).map((o, oi) =>
//           h(
//             "button",
//             {
//               key: "o" + oi,
//               onClick: chosen ? undefined : () => resolveDecision(d.id, o),
//               disabled: !!chosen,
//               style: {
//                 fontSize: "12px", fontWeight: 600,
//                 color: chosen ? (chosen.label === o.label ? "#B45309" : "#9BB0BF") : "#B45309",
//                 border: "1px solid " + (chosen ? (chosen.label === o.label ? "#E7C48A" : "#EEF0F2") : "#EAD3A6"),
//                 background: chosen ? (chosen.label === o.label ? "#FBEACB" : "#fff") : "#FEF8EE",
//                 borderRadius: "8px", padding: "6px 11px",
//                 cursor: chosen ? "default" : "pointer", fontFamily: "inherit",
//               },
//             },
//             o.label
//           )
//         );
//         const dcard = h(
//           "div",
//           {
//             key: "c",
//             style: {
//               maxWidth: "92%", border: "1px solid #F0DBB0", background: "#FEFAF2",
//               borderRadius: "13px 13px 13px 4px", padding: "11px 13px",
//               display: "flex", flexDirection: "column", gap: "9px",
//             } as React.CSSProperties,
//           },
//           [
//             h("div", { key: "h", style: { display: "flex", alignItems: "center", gap: "7px" } }, [
//               h(Ico, { key: "ic", size: 15, stroke: "#C77C11", d: ["M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3", "M12 17h.01"], children: [h("circle", { key: 0, cx: 12, cy: 12, r: 10 }), h("path", { key: 1, d: "M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" }), h("path", { key: 2, d: "M12 17h.01" })] } as any),
//               h("span", { key: "t", style: { fontSize: "12px", fontWeight: 700, color: "#B45309" } }, chosen ? "Decision recorded" : "Needs your decision"),
//               h("span", { key: "g", style: { marginLeft: "auto", fontSize: "10.5px", fontWeight: 700, color: "#0077B6", background: "#EAF3FA", borderRadius: "6px", padding: "2px 7px" } }, (d.table || "Statistical Table_1").replace("Statistical ", "")),
//             ]),
//             h("div", { key: "p", style: { fontSize: "12.5px", lineHeight: 1.5, color: "#334A5A", fontWeight: 600 } }, d.prompt),
//             d.note ? h("div", { key: "n", style: { fontSize: "11.5px", lineHeight: 1.5, color: "#9A7B4F" } }, d.note) : null,
//             h("div", { key: "o", style: { display: "flex", gap: "7px", flexWrap: "wrap" } }, optBtns),
//             chosen
//               ? h("div", { key: "ch", style: { fontSize: "11.5px", fontWeight: 600, color: "#1F8A5B", display: "flex", alignItems: "center", gap: "5px" } }, [
//                   h(Ico, { key: 0, size: 12, stroke: "#1F8A5B", sw: 3, d: "M20 6 9 17l-5-5" }),
//                   "You chose " + chosen.label + " — command sent to your engine.",
//                 ])
//               : null,
//           ]
//         );
//         return h("div", { key: i, style: { display: "flex", gap: "8px", alignItems: "flex-start", justifyContent: "flex-start" } }, [aiAvatar(), dcard]);
//       }
//       if (m.action) {
//         const a = m.action, done = a.done;
//         const card = h(
//           "div",
//           {
//             key: "c",
//             style: {
//               maxWidth: "90%", border: "1px solid " + (done ? "#CDEBD8" : "#E1E7EC"),
//               background: done ? "#F4FBF7" : "#F7FAFC",
//               borderRadius: "13px 13px 13px 4px", padding: "10px 12px",
//               display: "flex", flexDirection: "column", gap: "8px",
//             } as React.CSSProperties,
//           },
//           [
//             h("div", { key: "h", style: { display: "flex", alignItems: "center", gap: "7px" } }, [
//               h("div", { key: "ic", style: { width: "18px", height: "18px", borderRadius: "50%", background: done ? "#1F8A5B" : "#9BB0BF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
//                 h(Ico, { size: 11, stroke: "#fff", sw: 3, d: done ? "M20 6 9 17l-5-5" : "M18 6 6 18M6 6l12 12" })
//               ),
//               h("span", { key: "t", style: { fontSize: "12px", fontWeight: 700, color: done ? "#1F8A5B" : "#64748B" } }, done ? "Applied by your engine" : "Reverted"),
//               h("span", { key: "g", style: { marginLeft: "auto", fontSize: "10.5px", fontWeight: 700, color: "#0077B6", background: "#EAF3FA", borderRadius: "6px", padding: "2px 7px" } }, a.table.replace("Statistical ", "")),
//             ]),
//             h("div", { key: "d", style: { fontSize: "12.5px", lineHeight: 1.5, color: done ? "#334A5A" : "#9BB0BF" } },
//               (done ? "Added the " : "Removed the ") + a.colLabel + (a.measure ? " (" + a.measure + ")" : "") + " column " + (done ? "to " : "from ") + a.table + (done ? ". Values pulled from your saved analysis." : ".")
//             ),
//             h("div", { key: "f", style: { display: "flex", gap: "8px" } },
//               h("button", { key: "b", onClick: () => toggleAction(a.id), style: { display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: 600, color: done ? "#64748B" : "#0077B6", border: "1px solid " + (done ? "#E6EDF3" : "#D3E4F0"), background: done ? "#fff" : "#F0F6FB", borderRadius: "8px", padding: "5px 11px", cursor: "pointer", fontFamily: "inherit" } }, [
//                 h(Ico, { key: "i", size: 13, stroke: "currentColor", children: done ? [h("path", { key: 1, d: "M9 14 4 9l5-5" }), h("path", { key: 2, d: "M4 9h11a5 5 0 0 1 0 10h-1" })] : [h("path", { key: 1, d: "m15 14 5-5-5-5" }), h("path", { key: 2, d: "M20 9H9a5 5 0 0 0 0 10h1" })] } as any),
//                 done ? "Undo" : "Redo",
//               ])
//             ),
//           ]
//         );
//         return h("div", { key: i, style: { display: "flex", gap: "8px", alignItems: "flex-start", justifyContent: "flex-start" } }, [aiAvatar(), card]);
//       }
//       const user = m.role === "user";
//       const bubble = h(
//         "div",
//         {
//           key: "b",
//           style: {
//             maxWidth: "82%", padding: "9px 12px",
//             borderRadius: user ? "13px 13px 4px 13px" : "13px 13px 13px 4px",
//             background: user ? "#0077B6" : "#F4F7FA",
//             color: user ? "#fff" : "#334A5A",
//             border: user ? "none" : "1px solid #E6EDF3",
//             fontSize: "12.5px", lineHeight: 1.5,
//           } as React.CSSProperties,
//         },
//         m.text
//       );
//       const kids = user ? [bubble] : [aiAvatar(), bubble];
//       return h("div", { key: i, style: { display: "flex", gap: "8px", alignItems: "flex-end", justifyContent: user ? "flex-end" : "flex-start" } }, kids);
//     });
//     return h("div", { style: { display: "flex", flexDirection: "column", gap: "12px", padding: "4px 0" } }, rows);
//   };

//   // -------- table data --------
//   const t1: TRow[] = [
//     { label: "Age (Median, IQR)", p: "0.88", ci: "−2.1 – 1.8", es: "d 0.02", v: ["50 (42–59)", "50 (41.25–58.75)", "50 (42–61)"] },
//     { section: "Age Group", p: "0.31", ci: "0.86 – 5.61", es: "OR 2.20" },
//     { label: "≥ 40", sub: true, v: ["176 (81.86%)", "164 (81.2%)", "12 (92.3%)"] },
//     { label: "< 40", sub: true, v: ["39 (18.14%)", "38 (18.8%)", "1 (7.7%)"] },
//     { section: "Sex", p: "0.20", ci: "0.42 – 3.09", es: "OR 0.87" },
//     { label: "Male", sub: true, v: ["45 (20.93%)", "44 (21.78%)", "1 (7.69%)"] },
//     { label: "Female", sub: true, v: ["170 (79.07%)", "158 (78.22%)", "12 (92.31%)"] },
//   ];
//   const t2: TRow[] = [
//     { section: "Detection Mode", p: "0.71", ci: "0.14 – 4.02", es: "OR 0.74" },
//     { label: "Symptomatic", sub: true, v: ["206 (96.28%)", "193 (98.0%)", "13 (100.0%)"] },
//     { label: "Asymptomatic", sub: true, v: ["4 (1.86%)", "4 (1.5%)", "0"] },
//     { label: "Incidental", sub: true, v: ["1 (0.47%)", "1 (0.5%)", "0"] },
//     { section: "Treatment Era", p: "0.048", ci: "1.01 – 11.20", es: "OR 3.36" },
//     { label: "Era 2 (2016–2024)", sub: true, v: ["187 (86.98%)", "178 (88.1%)", "9 (69.2%)"] },
//     { label: "Era 1 (2009–2015)", sub: true, v: ["28 (13.02%)", "24 (11.9%)", "4 (30.8%)"] },
//     { section: "Baseline Steroid Use", p: "—", ci: "—", es: "—" },
//     { label: "Yes", sub: true, v: ["215 (100%)", "202 (93.95%)", "13 (6.04%)"] },
//     { section: "Syndromic", p: "0.21", ci: "0.42 – 18.6", es: "OR 2.79" },
//     { label: "NF-2", sub: true, v: ["2 (66.67%)", "1 (50.0%)", "1 (50.0%)"] },
//     { label: "None", sub: true, v: ["0", "0", "0"] },
//     { label: "Gardner Syndrome", sub: true, v: ["1 (33.33%)", "1 (100.0%)", "0"] },
//     { label: "Time to GKRS, months (Median, IQR)", p: "0.33", ci: "−1.02 – 0.34", es: "d 0.21", v: ["2.43 (0.82–4.2)", "2.45 (0.85–4.23)", "1.35 (0.46–3.32)"] },
//   ];

//   const folderIcon = (stroke: string) => (
//     <Ico size={16} sw={1.8} stroke={stroke} d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
//   );

//   // =========================================================================
//   // render
//   // =========================================================================
//   return (
//     <div
//       ref={rootRef}
//       className="emr-root"
//       style={{
//         display: "flex",
//         height: "100vh",
//         overflow: "hidden",
//         fontFamily: FONT,
//         color: "#0F2A3D",
//         background: "#F4F7FA",
//       }}
//     >
//       <style dangerouslySetInnerHTML={{ __html: EMR_CSS }} />

//       {/* ===================== SIDEBAR ===================== */}
//       <aside
//         className="emr-sidebar"
//         style={{
//           width: 244,
//           flexShrink: 0,
//           height: "100vh",
//           background: "#fff",
//           borderRight: "1px solid #E6EDF3",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <div className="emr-brand-row" style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 12px 14px" }}>
//           <div style={{ width: 34, height: 34, borderRadius: 9, background: "#0077B6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//             <Ico size={19} stroke="#fff" d={["M3 3v18h18", "m7 14 3-3 3 3 5-6"]} />
//           </div>
//           <span className="emr-brand-text" style={{ fontWeight: 700, fontSize: 15.5, letterSpacing: "-.02em", color: "#0F2A3D", flex: 1 }}>
//             EaseMyResearch
//           </span>
//           <button aria-label="Collapse sidebar" onClick={toggleSidebar} className="emr-collapse-btn" style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", color: "#9BB0BF", cursor: "pointer", borderRadius: 6 }}>
//             <Ico size={17} d={["M9 3v18"]}>
//               <rect x="3" y="3" width="18" height="18" rx="2" />
//               <path d="M9 3v18" />
//             </Ico>
//           </button>
//         </div>

//         <div style={{ flex: 1, overflowY: "auto", padding: "4px 12px" }}>
//           <button className="emr-navbtn emr-nav-idle" style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, height: 44, padding: "0 12px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 14, marginBottom: 2 }}>
//             <Ico size={18}>
//               <rect x="3" y="3" width="7" height="7" rx="1" />
//               <rect x="14" y="3" width="7" height="7" rx="1" />
//               <rect x="14" y="14" width="7" height="7" rx="1" />
//               <rect x="3" y="14" width="7" height="7" rx="1" />
//             </Ico>
//             <span className="emr-nav-label">Dashboard</span>
//           </button>

//           <button className="emr-navbtn emr-nav-active" style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, height: 44, padding: "0 12px", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>
//             <Ico size={18} stroke="#fff">
//               <ellipse cx="12" cy="5" rx="9" ry="3" />
//               <path d="M3 5v14a9 3 0 0 0 18 0V5" />
//               <path d="M3 12a9 3 0 0 0 18 0" />
//             </Ico>
//             <span className="emr-nav-label" style={{ flex: 1, textAlign: "left" }}>Data &amp; Analysis</span>
//             <Ico size={16} stroke="#fff" className={undefined} d="m18 15-6-6-6 6" />
//           </button>

//           <div className="emr-subnav" style={{ display: "flex", flexDirection: "column", gap: 2, padding: "4px 0 4px 14px", marginLeft: 8, borderLeft: "1px solid #E6EDF3" }}>
//             {["testing", "divya", "asdf"].map((s) => (
//               <a key={s} className="emr-sub" href="#" style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, fontSize: 13.5, color: "#64748B", textDecoration: "none" }}>
//                 {folderIcon("#7B93A3")} {s}
//               </a>
//             ))}
//             <a className="emr-sub emr-sub-active" href="#" style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, fontSize: 13.5, color: "#0F2A3D", textDecoration: "none" }}>
//               {folderIcon("#0077B6")} testing sheet
//             </a>
//           </div>
//         </div>

//         <div style={{ padding: 12 }}>
//           <button className="emr-account" style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: 10, border: "1px solid #E6EDF3", borderRadius: 10, background: "#fff", cursor: "pointer", textAlign: "left" }}>
//             <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#0077B6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>D</div>
//             <div className="emr-acct-text" style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
//               <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F2A3D", lineHeight: 1.2 }}>DEMO EMR</span>
//               <span style={{ fontSize: 11.5, color: "#7B93A3", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>drppsharma2016@gma...</span>
//             </div>
//             <Ico size={15} stroke="#9BB0BF" className="emr-acct-chevron" style={{ flexShrink: 0 }} d={["m7 15 5 5 5-5", "m7 9 5-5 5 5"]} />
//           </button>
//         </div>
//       </aside>

//       {/* ===================== MAIN COLUMN ===================== */}
//       <div className="emr-main-col" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", height: "100vh" }}>
//         {/* top bar */}
//         <div style={{ flexShrink: 0, height: 56, background: "#fff", borderBottom: "1px solid #E6EDF3", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "0 20px", overflow: "hidden", position: "sticky", top: 0, zIndex: 5 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, flex: 1, minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" }}>
//             <button aria-label="Toggle sidebar" onClick={toggleSidebar} className="emr-iconbtn" style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid #E6EDF3", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//               <Ico size={18} stroke="#334A5A">
//                 <rect x="3" y="3" width="18" height="18" rx="2" />
//                 <path d="M9 3v18" />
//               </Ico>
//             </button>
//             <a href="#" style={{ color: "#0077B6", textDecoration: "none", fontWeight: 500 }}>My CRF</a>
//             <Ico size={15} stroke="#9BB0BF" d="m9 18 6-6-6-6" />
//             <a href="#" style={{ color: "#0077B6", textDecoration: "none", fontWeight: 500 }}>My Records</a>
//             <Ico size={15} stroke="#9BB0BF" d="m9 18 6-6-6-6" />
//             <span style={{ color: "#334A5A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>6a156dcd9e20f629804d7165</span>
//           </div>
//           <button aria-label="Help" className="emr-iconbtn" style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #E6EDF3", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
//             <Ico size={17} stroke="#0077B6">
//               <circle cx="12" cy="12" r="10" />
//               <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
//               <path d="M12 17h.01" />
//             </Ico>
//           </button>
//         </div>

//         {/* scroll area */}
//         <div style={{ flex: 1, overflowY: "auto", padding: "var(--emr-pane-pad, 16px)" }}>
//           <div style={{ maxWidth: 1687, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--emr-section-gap, 16px)" }}>
//             {/* records card */}
//             <div style={{ background: "#fff", border: "1px solid #E6EDF3", borderRadius: 14, boxShadow: "0 1px 3px rgba(16,42,61,.06)", padding: 22 }}>
//               {/* toolbar */}
//               <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
//                 <div style={{ position: "relative", flex: 1, minWidth: 280 }}>
//                   <Ico size={18} stroke="#0077B6" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 2 }}>
//                     <circle cx="11" cy="11" r="7" />
//                     <path d="m21 21-4.3-4.3" />
//                   </Ico>
//                   <input type="search" placeholder="Search" style={{ width: "100%", paddingLeft: 42, height: 46, borderRadius: 11, background: "#fff", border: "1px solid #D3DFE8", fontSize: 14, fontFamily: "inherit", color: "#0F2A3D", outline: "none", boxSizing: "border-box" }} />
//                 </div>
//                 <button aria-label="Refresh" className="emr-iconbtn" style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#CCE4F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//                   <Ico size={19} stroke="#0077B6" d={["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M8 16H3v5"]} />
//                 </button>
//                 <button className="emr-ghostbtn" style={{ height: 42, padding: "0 16px", borderRadius: 10, border: "1px solid #D3DFE8", background: "#fff", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, color: "#334A5A", fontFamily: "inherit", flexShrink: 0 }}>
//                   All Data
//                   <Ico size={16} stroke="#64748B" d="m6 9 6 6 6-6" />
//                 </button>
//                 <button style={{ height: 42, padding: "0 18px", borderRadius: 10, border: "none", background: "#0077B6", color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "inherit", cursor: "pointer", flexShrink: 0 }}>Convert to CRF</button>
//                 <button style={{ height: 42, padding: "0 16px", borderRadius: 10, border: "none", background: "#0077B6", color: "#fff", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", flexShrink: 0 }}>
//                   <Ico size={17} stroke="currentColor" d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} />
//                   Edit Table
//                 </button>
//                 <button onClick={openBuilder} title="Create statistical table" style={{ height: 42, padding: "0 16px", borderRadius: 10, border: "none", background: "#0077B6", color: "#fff", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", flexShrink: 0 }}>
//                   <Ico size={17} stroke="currentColor" d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
//                   Statistical Table
//                 </button>
//                 <button aria-label="More" className="emr-ghostbtn" style={{ width: 36, height: 42, borderRadius: 10, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//                   <svg width={20} height={20} viewBox="0 0 24 24" fill="#64748B" stroke="none"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg>
//                 </button>
//                 <button aria-label="Download" className="emr-iconbtn" style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#CCE4F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//                   <Ico size={19} stroke="#0077B6" d={["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"]} />
//                 </button>
//                 <button aria-label="Expand" onClick={openPanel} className="emr-iconbtn" style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#CCE4F0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//                   <Ico size={19} stroke="#0077B6" d={["M15 3h6v6", "M9 21H3v-6", "M21 3l-7 7", "M3 21l7-7"]} />
//                 </button>
//               </div>

//               {/* data table */}
//               <div style={{ border: "1px solid #E6EDF3", borderRadius: 12, overflow: "hidden" }}>
//                 <div ref={sheetRef} onScroll={onSheetScroll} style={{ height: "calc(100vh - 244px)", minHeight: 320, overflow: "auto" }}>
//                   {recordsTable()}
//                 </div>
//               </div>

//               {/* footer */}
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginTop: 18 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 14 }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                     <span style={{ color: "#0077B6", fontWeight: 600 }}>Total Records:</span>
//                     <span style={{ background: "#CCE4F0", color: "#0F2A3D", fontWeight: 600, borderRadius: 7, padding: "3px 10px", fontSize: 13 }}>150</span>
//                   </div>
//                   <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//                     <span style={{ color: "#0077B6", fontWeight: 600 }}>Selected:</span>
//                     <span style={{ background: "#EEF3F7", color: "#334A5A", fontWeight: 600, borderRadius: 7, padding: "3px 10px", fontSize: 13 }}>0</span>
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#7B93A3" }}>
//                   <Ico size={15} stroke="#9BB0BF" d="M12 5v14M19 12l-7 7-7-7" />
//                   Scroll to load more — {recordsShown} of 150 records loaded
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ===================== BUILDER MODAL ===================== */}
//       {builderOpen && (
//         <div style={{ position: "fixed", inset: 0, zIndex: 60, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(15,42,61,.42)", fontFamily: FONT, color: "#0F2A3D" }}>
//           <div onClick={closeBuilder} style={{ position: "absolute", inset: 0 }} />
//           <div style={{ position: "relative", width: "min(720px, 96vw)", maxHeight: "88vh", overflowY: "auto", background: "#fff", borderRadius: 16, boxShadow: "0 24px 64px rgba(16,42,61,.32)", display: "flex", flexDirection: "column" }}>
//             <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 12, padding: "18px 22px", borderBottom: "1px solid #EEF3F7", position: "sticky", top: 0, background: "#fff" }}>
//               <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EAF3FA", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                 <Ico size={19} stroke="#0077B6" d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontWeight: 700, fontSize: 17, color: "#0F2A3D" }}>{builderTitle}</div>
//                 <div style={{ fontSize: 12.5, color: "#7B93A3" }}>Pair variables to build a cross-tabulation, then run the analysis on your engine.</div>
//               </div>
//               <button aria-label="Close" onClick={closeBuilder} className="emr-iconbtn" style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid #E6EDF3", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
//                 <Ico size={18} stroke="#334A5A" d="M18 6 6 18M6 6l12 12" />
//               </button>
//             </div>
//             <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 20 }}>
//               <div>
//                 <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#64748B", marginBottom: 6 }}>Table name</label>
//                 <input type="text" defaultValue="Statistical Table_3" style={{ width: "100%", height: 44, border: "1px solid #D3DFE8", borderRadius: 11, padding: "0 14px", fontSize: 14, fontFamily: "inherit", color: "#0F2A3D", outline: "none", boxSizing: "border-box" }} />
//               </div>
//               <div>
//                 <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#64748B", marginBottom: 8 }}>Analysis type</label>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   {["Statistical", "Descriptive", "Sensitivity & Specificity", "Survival"].map((a, i) => (
//                     <button key={a} className={i === 0 ? undefined : "emr-ghostbtn"} style={{ height: 40, padding: "0 16px", borderRadius: 10, border: i === 0 ? "none" : "1px solid #D3DFE8", background: i === 0 ? "#0077B6" : "#fff", color: i === 0 ? "#fff" : "#334A5A", fontSize: 13.5, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" }}>{a}</button>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label style={{ fontSize: 12.5, fontWeight: 600, color: "#64748B", marginBottom: 8, display: "block" }}>Variable pairing</label>
//                 <div style={{ border: "1px solid #EEF3F7", borderRadius: 12, overflow: "hidden" }}>
//                   <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr" }}>
//                     <div style={{ background: "#FBFCFD", borderBottom: "1px solid #EEF3F7", padding: 14 }} />
//                     <div style={{ background: "#FBFCFD", borderBottom: "1px solid #EEF3F7", borderLeft: "1px solid #EEF3F7", padding: 14 }}>
//                       <button style={{ width: "100%", height: 46, border: "1px solid #D3DFE8", borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", cursor: "pointer", fontFamily: "inherit" }}>
//                         <span style={{ fontWeight: 700, fontSize: 14, color: "#0F2A3D" }}>Treatment Era</span>
//                         <Ico size={16} stroke="#9BB0BF" d="m6 9 6 6 6-6" />
//                       </button>
//                     </div>
//                     <div style={{ background: "#FBFCFD", borderBottom: "1px solid #EEF3F7", borderLeft: "1px solid #EEF3F7", padding: 14 }}>
//                       <button style={{ width: "100%", height: 46, border: "1px dashed #C3D0DA", borderRadius: 10, background: "#F4F7FA", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", cursor: "pointer", fontFamily: "inherit" }}>
//                         <span style={{ fontWeight: 600, fontSize: 14, color: "#9BB0BF" }}>Add column</span>
//                         <Ico size={16} stroke="#C3D0DA" d="M12 5v14M5 12h14" />
//                       </button>
//                     </div>
//                     <div style={{ borderBottom: "1px solid #EEF3F7", padding: 14 }}>
//                       <button style={{ width: "100%", height: 46, border: "1px solid #D3DFE8", borderRadius: 10, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", cursor: "pointer", fontFamily: "inherit" }}>
//                         <span style={{ fontWeight: 600, fontSize: 14, color: "#0F2A3D" }}>Local Control</span>
//                         <Ico size={15} stroke="#9BB0BF" d="m6 9 6 6 6-6" />
//                       </button>
//                     </div>
//                     <div style={{ borderBottom: "1px solid #EEF3F7", borderLeft: "1px solid #EEF3F7", display: "flex", alignItems: "center", justifyContent: "center", color: "#C3D0DA" }}>—</div>
//                     <div style={{ borderBottom: "1px solid #EEF3F7", borderLeft: "1px solid #EEF3F7", display: "flex", alignItems: "center", justifyContent: "center", color: "#C3D0DA" }}>—</div>
//                     <div style={{ padding: 14 }}>
//                       <button style={{ width: "100%", height: 46, border: "1px dashed #C3D0DA", borderRadius: 10, background: "#F4F7FA", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", cursor: "pointer", fontFamily: "inherit" }}>
//                         <span style={{ fontWeight: 600, fontSize: 14, color: "#9BB0BF" }}>Add row</span>
//                         <Ico size={15} stroke="#C3D0DA" d="M12 5v14M5 12h14" />
//                       </button>
//                     </div>
//                     <div style={{ borderLeft: "1px solid #EEF3F7" }} />
//                     <div style={{ borderLeft: "1px solid #EEF3F7" }} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, padding: "16px 22px", borderTop: "1px solid #EEF3F7", position: "sticky", bottom: 0, background: "#fff" }}>
//               <button onClick={closeBuilder} className="emr-ghostbtn" style={{ height: 44, padding: "0 20px", borderRadius: 11, border: "1px solid #D3DFE8", background: "#fff", color: "#334A5A", fontWeight: 600, fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>Cancel</button>
//               <button onClick={closeBuilder} style={{ height: 44, padding: "0 24px", borderRadius: 11, border: "none", background: "#0077B6", color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>Save &amp; Run Analysis</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===================== SAVED TABLES PANEL ===================== */}
//       {panelOpen && (
//         <>
//           <div className="emr-resize-handle" onPointerDown={startResize} title="Drag to resize">
//             <div className="emr-resize-grip" />
//           </div>
//           <aside
//             ref={panelRef as any}
//             className="emr-panel-aside"
//             style={{ flexShrink: 0, width: 460, height: "100vh", background: "#F4F7FA", borderLeft: "1px solid #E6EDF3", display: "flex", flexDirection: "column", fontFamily: FONT, color: "#0F2A3D" }}
//           >
//             {/* panel header */}
//             <div style={{ flexShrink: 0, background: "#fff", borderBottom: "1px solid #E6EDF3", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
//               <div style={{ width: 34, height: 34, borderRadius: 9, background: "#EAF3FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                 {folderIcon("#0077B6")}
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontWeight: 700, fontSize: 16, color: "#0F2A3D", lineHeight: 1.2 }}>Saved Statistical Tables</div>
//                 <div style={{ fontSize: 12.5, color: "#7B93A3", marginTop: 1 }}>2 saved results</div>
//               </div>
//               <button className="emr-ghostbtn" style={{ height: 36, padding: "0 13px", borderRadius: 9, border: "1px solid #D3DFE8", background: "#fff", display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#334A5A", fontFamily: "inherit" }}>
//                 <Ico size={15} stroke="#0077B6" d={["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M8 16H3v5"]} />
//                 Refresh
//               </button>
//               <button aria-label="Toggle focus mode" title="Focus mode — hide records, put tables & chat side by side" onClick={toggleMax} className="emr-iconbtn emr-focus-btn" style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid #E6EDF3", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//                 <Ico size={17} stroke="#0077B6" d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
//               </button>
//               <button aria-label="Close panel" onClick={closePanel} className="emr-iconbtn" style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid #E6EDF3", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//                 <Ico size={18} stroke="#334A5A" d="M18 6 6 18M6 6l12 12" />
//               </button>
//             </div>

//             {/* split */}
//             <div className="emr-split" style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
//               <div ref={tablesRef} className="emr-tables-region" style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 18 }}>
//                 {/* BLOCK 1 */}
//                 <div data-emr-card="1" style={{ flexShrink: 0, background: "#fff", border: "1px solid #E6EDF3", borderRadius: 14, boxShadow: "0 1px 3px rgba(16,42,61,.06)", overflow: "hidden" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", borderBottom: "1px solid #EEF3F7", background: "#FBFDFE" }}>
//                     <div style={{ width: 30, height: 30, borderRadius: 8, background: "#EAF3FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                       <Ico size={16} stroke="#0077B6"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></Ico>
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div style={{ fontWeight: 700, fontSize: 14.5, color: "#0F2A3D", lineHeight: 1.2 }}>Statistical Table_1</div>
//                       <div style={{ fontSize: 11.5, color: "#7B93A3", marginTop: 1 }}>Created 31 May 2026</div>
//                     </div>
//                     <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 6, background: "#FDF0DD", color: "#B4690E", fontSize: 10.5, fontWeight: 700 }}>Descriptive</span>
//                     <button onClick={() => editTable("Statistical Table_1")} className="emr-ghostbtn" style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 30, padding: "0 12px", borderRadius: 8, border: "1px solid #D3E4F0", background: "#F0F6FB", color: "#0077B6", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
//                       <Ico size={13} stroke="currentColor" d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} />Edit
//                     </button>
//                   </div>
//                   <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 15 }}>
//                     <div style={{ fontWeight: 700, fontSize: 13.5, color: "#0F2A3D", lineHeight: 1.5 }}>Table 1: Demographic distribution among patients with intracranial meningiomas treated with stereotactic radiosurgery</div>
//                     <div>{buildTable(t1, activeCols("Statistical Table_1"))}</div>
//                     <div>
//                       <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
//                         <Ico size={15} stroke="#0077B6" d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} />
//                         <span style={{ fontWeight: 700, fontSize: 12.5, color: "#0077B6", letterSpacing: ".03em", textTransform: "uppercase" }}>Interpretation</span>
//                       </div>
//                       <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "#334A5A" }}>A total of 215 patients were included. The median age was 50 years (IQR: 42–59). Patients aged 40 years or older made up 176 cases overall (81.86%), 164 in the local control group (81.2%), and 12 in the local failure group (92.3%). Females made up 170 cases overall (79.07%), 158 in the control group (78.22%), and 12 in the failure group (92.31%). Males accounted for 45 cases overall (20.93%), 44 in the control group (21.78%), and 1 in the failure group (7.69%).</p>
//                     </div>
//                     <div>
//                       <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
//                         <Ico size={15} stroke="#0077B6"><path d="M3 3v18h18" /><rect x="7" y="10" width="3" height="7" /><rect x="12" y="6" width="3" height="11" /><rect x="17" y="13" width="3" height="4" /></Ico>
//                         <span style={{ fontWeight: 700, fontSize: 12.5, color: "#0077B6", letterSpacing: ".03em", textTransform: "uppercase" }}>Figures</span>
//                       </div>
//                       <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//                         <div style={{ border: "1px solid #EEF3F7", borderRadius: 11, background: "#fff", padding: "12px 12px 9px" }}>
//                           <div>{histogram("Distribution of Age")}</div>
//                           <div style={{ fontSize: 12, color: "#64748B", textAlign: "center", marginTop: 6, fontWeight: 600 }}>Figure 1a — Distribution of Age</div>
//                         </div>
//                         <div style={{ border: "1px solid #EEF3F7", borderRadius: 11, background: "#fff", padding: "12px 12px 9px" }}>
//                           <div>{groupedBar("Age Group", [{ label: "≥ 40", control: 81.2, failure: 92.3 }, { label: "< 40", control: 18.8, failure: 7.7 }])}</div>
//                           <div style={{ fontSize: 12, color: "#64748B", textAlign: "center", marginTop: 6, fontWeight: 600 }}>Figure 1b — Distribution of Age Group</div>
//                         </div>
//                         <div style={{ border: "1px solid #EEF3F7", borderRadius: 11, background: "#fff", padding: "12px 12px 9px" }}>
//                           <div>{groupedBar("Sex Distribution", [{ label: "Female", control: 78.2, failure: 92.3 }, { label: "Male", control: 21.8, failure: 7.7 }])}</div>
//                           <div style={{ fontSize: 12, color: "#64748B", textAlign: "center", marginTop: 6, fontWeight: 600 }}>Figure 1c — Proportional Distribution of Sex</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* BLOCK 2 */}
//                 <div data-emr-card="1" style={{ flexShrink: 0, background: "#fff", border: "1px solid #E6EDF3", borderRadius: 14, boxShadow: "0 1px 3px rgba(16,42,61,.06)", overflow: "hidden" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", borderBottom: "1px solid #EEF3F7", background: "#FBFDFE" }}>
//                     <div style={{ width: 30, height: 30, borderRadius: 8, background: "#EAF3FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                       <Ico size={16} stroke="#0077B6"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></Ico>
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div style={{ fontWeight: 700, fontSize: 14.5, color: "#0F2A3D", lineHeight: 1.2 }}>Statistical Table_2</div>
//                       <div style={{ fontSize: 11.5, color: "#7B93A3", marginTop: 1 }}>Created 31 May 2026</div>
//                     </div>
//                     <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 6, background: "#E4F6EC", color: "#1F8A5B", fontSize: 10.5, fontWeight: 700 }}>Statistical</span>
//                     <button onClick={() => editTable("Statistical Table_2")} className="emr-ghostbtn" style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 30, padding: "0 12px", borderRadius: 8, border: "1px solid #D3E4F0", background: "#F0F6FB", color: "#0077B6", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
//                       <Ico size={13} stroke="currentColor" d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} />Edit
//                     </button>
//                   </div>
//                   <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 15 }}>
//                     <div style={{ fontWeight: 700, fontSize: 13.5, color: "#0F2A3D", lineHeight: 1.5 }}>Table 2: Clinical characteristics of patients with intracranial meningiomas treated with stereotactic radiosurgery</div>
//                     <div>{buildTable(t2, [{ key: "p", label: "p-value" }, { key: "ci", label: "95% CI" }, { key: "es", label: "Effect size" }])}</div>
//                     <div>
//                       <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
//                         <Ico size={15} stroke="#0077B6" d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} />
//                         <span style={{ fontWeight: 700, fontSize: 12.5, color: "#0077B6", letterSpacing: ".03em", textTransform: "uppercase" }}>Interpretation</span>
//                       </div>
//                       <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "#334A5A" }}>Of the 215 patients, 206 (96.28%) were symptomatic overall; 193 (98.0%) in the control group and 13 (100.0%) in the failure group. Four patients (1.86%) were asymptomatic and 1 (0.47%) was detected incidentally, both in the control group. Most were treated in Era 2 (2016–2024): 187 overall (86.98%), 178 in the control group (88.1%), and 9 in the failure group (69.2%). Era 1 (2009–2015) accounted for 28 cases overall (13.02%), 24 in the control group (11.9%), and 4 in the failure group (30.8%). All 215 patients (100%) were on baseline steroids. Among 3 syndromic patients, NF-2 was present in 2 (66.67%) and Gardner syndrome in 1 (33.33%). The median time from diagnosis to GKRS was 2.43 months (IQR: 0.82–4.2) overall, 2.45 months (IQR: 0.85–4.23) in the control group, and 1.35 months (IQR: 0.46–3.32) in the failure group.</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* BLOCK 3 — Kaplan–Meier */}
//                 <div data-emr-card="1" style={{ flexShrink: 0, background: "#fff", border: "1px solid #E6EDF3", borderRadius: 14, boxShadow: "0 1px 3px rgba(16,42,61,.06)", overflow: "hidden" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", borderBottom: "1px solid #EEF3F7", background: "#FBFDFE" }}>
//                     <div style={{ width: 30, height: 30, borderRadius: 8, background: "#F1EDFB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                       <Ico size={16} stroke="#6D28D9" d={["M3 3v18h18", "M4 13h4v-3h4V7h4V4h4"]} />
//                     </div>
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <div style={{ fontWeight: 700, fontSize: 14.5, color: "#0F2A3D", lineHeight: 1.2 }}>Kaplan–Meier — Local Control</div>
//                       <div style={{ fontSize: 11.5, color: "#7B93A3", marginTop: 1 }}>Created 31 May 2026</div>
//                     </div>
//                     <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 6, background: "#F1EDFB", color: "#6D28D9", fontSize: 10.5, fontWeight: 700 }}>Survival</span>
//                     <button onClick={() => editTable("Kaplan–Meier — Local Control")} className="emr-ghostbtn" style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 30, padding: "0 12px", borderRadius: 8, border: "1px solid #D3E4F0", background: "#F0F6FB", color: "#0077B6", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
//                       <Ico size={13} stroke="currentColor" d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} />Edit
//                     </button>
//                   </div>
//                   <div style={{ padding: "16px 16px 18px", display: "flex", flexDirection: "column", gap: 15 }}>
//                     <div style={{ fontWeight: 700, fontSize: 13.5, color: "#0F2A3D", lineHeight: 1.5 }}>Figure 3: Kaplan–Meier estimate of local control by treatment era</div>
//                     <div style={{ border: "1px solid #EEF3F7", borderRadius: 11, background: "#fff", padding: "12px 12px 9px" }}>
//                       <div>{kmCurve()}</div>
//                       <div style={{ fontSize: 12, color: "#64748B", textAlign: "center", marginTop: 6, fontWeight: 600 }}>Kaplan–Meier local control estimate with censoring marks and number at risk</div>
//                     </div>
//                     <div>
//                       <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
//                         <Ico size={15} stroke="#0077B6" d={["M12 20h9", "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"]} />
//                         <span style={{ fontWeight: 700, fontSize: 12.5, color: "#0077B6", letterSpacing: ".03em", textTransform: "uppercase" }}>Interpretation</span>
//                       </div>
//                       <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: "#334A5A" }}>Kaplan–Meier estimates show higher local control in the recent treatment era. At 24 months, local control was 93% for Era 2 (2016–2024) versus 80% for Era 1 (2009–2015), and 88% versus 70% at 36 months. The difference between eras was statistically significant (log-rank p = 0.03). Median follow-up was 21 months.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* chat column */}
//               <div className="emr-chat-col" style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: "0 1 auto" }}>
//                 {chat.length > 0 && (
//                   <div className="emr-conv-pane" style={{ flex: "0 1 auto", minHeight: 0, maxHeight: "40vh", display: "flex", flexDirection: "column", borderTop: "1px solid #E6EDF3", background: "#fff" }}>
//                     <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 8, padding: "11px 16px 8px" }}>
//                       <Ico size={15} stroke="#0077B6" d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.1L4.5 10l5.6-1.4z" />
//                       <span style={{ fontWeight: 700, fontSize: 12.5, color: "#0F2A3D" }}>Conversation</span>
//                       <span style={{ fontSize: 11.5, color: "#9BB0BF" }}>{chat.length} messages</span>
//                       <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#0077B6", background: "#EAF3FA", border: "1px solid #D3E4F0", borderRadius: 6, padding: "2px 7px" }}>Command layer</span>
//                       <button onClick={clearChat} className="emr-ghostbtn" style={{ fontSize: 11.5, fontWeight: 600, color: "#64748B", border: "1px solid #E6EDF3", background: "#fff", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontFamily: "inherit" }}>New</button>
//                     </div>
//                     <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "4px 16px 12px" }}>{renderChat()}</div>
//                   </div>
//                 )}

//                 {/* composer */}
//                 <div style={{ flexShrink: 0, borderTop: "1px solid #E6EDF3", background: "#fff", padding: "12px 16px 14px" }}>
//                   {chat.length === 0 && (
//                     <>
//                       <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
//                         <Ico size={15} stroke="#0077B6" d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17l-1.9-5.1L4.5 10l5.6-1.4z" />
//                         <span style={{ fontWeight: 700, fontSize: 12.5, color: "#0F2A3D" }}>AI Assistant</span>
//                         <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "#0077B6", background: "#EAF3FA", border: "1px solid #D3E4F0", borderRadius: 6, padding: "2px 7px" }}>Command layer</span>
//                       </div>
//                       <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 11, padding: "9px 11px", background: "#F7FAFC", border: "1px solid #EAF0F5", borderRadius: 10 }}>
//                         <Ico size={15} stroke="#0077B6" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></Ico>
//                         <span style={{ fontSize: 11, lineHeight: 1.55, color: "#64748B" }}>This doesn&rsquo;t run any analysis with AI. It only turns your request into a command for your statistics engine, which computes the results from your saved data — every value shown comes from your backend, never AI-generated.</span>
//                       </div>
//                       <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 10 }}>
//                         {[
//                           { label: "+ p-value to Table 1", q: "Add the p-value column to Table 1" },
//                           { label: "+ 95% CI", q: "Add the 95% CI to Table 1" },
//                           { label: "+ Effect size", q: "Add the effect size to Table 1" },
//                           { label: "Summarize findings", q: "Summarize the significant findings" },
//                         ].map((c) => (
//                           <button key={c.label} onClick={() => sendChat(c.q)} className="emr-ghostbtn" style={{ padding: "6px 11px", borderRadius: 9, border: "1px solid #D3E4F0", background: "#F0F6FB", color: "#0077B6", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{c.label}</button>
//                         ))}
//                       </div>
//                     </>
//                   )}
//                   <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #D3DFE8", borderRadius: 12, background: "#fff", padding: "6px 6px 6px 14px" }}>
//                     <input ref={chatInputRef} onKeyDown={chatKey} type="text" placeholder="Type a request — e.g. add p-value to Table 1…" style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 13, color: "#0F2A3D", fontFamily: "inherit" }} />
//                     <button aria-label="Send" onClick={chatSend} style={{ width: 34, height: 34, borderRadius: 9, border: "none", background: "#0077B6", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
//                       <Ico size={17} stroke="currentColor" d={["M22 2 11 13", "M22 2 15 22l-4-9-9-4z"]} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </>
//       )}
//     </div>
//   );
// }
