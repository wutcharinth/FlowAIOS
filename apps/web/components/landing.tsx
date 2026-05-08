'use client';

import { useState } from 'react';

type AgentKey = 'service' | 'ops' | 'growth';

const agents: Record<
  AgentKey,
  {
    title: string;
    subtitle: string;
    state: string;
    heading: string;
    description: string;
    capabilities: [string, string][];
    mini: [string, string][];
  }
> = {
  service: {
    title: 'Customer Service Agent',
    subtitle: 'AI ตัวหลักสำหรับดูแลลูกค้าทุกช่องทาง',
    state: 'Main Character',
    heading: 'ตอบลูกค้าเร็วขึ้น โดยยังรักษาคุณภาพและบริบทของแบรนด์',
    description:
      'Customer Service Agent ช่วยตอบคำถาม แนะนำคำตอบ สรุปบทสนทนา วิเคราะห์ intent ตรวจจับ sentiment แปลภาษา จดจำบริบทลูกค้า และแจ้งเตือนเมื่อควรส่งต่อให้มนุษย์',
    capabilities: [
      ['Auto Reply', 'ตอบคำถามที่ปลอดภัยและเกิดซ้ำได้ทันที'],
      ['Approval Draft', 'ร่างคำตอบให้ทีมตรวจในเคสสำคัญ'],
      ['Customer Memory', 'จำประวัติ ความสนใจ และปัญหาเดิม'],
      ['Sentiment & Intent', 'รู้ว่าลูกค้ากำลังถามอะไรและรู้สึกอย่างไร'],
    ],
    mini: [
      ['เหมาะกับ', 'LINE OA, TikTok Shop, Shopee, Lazada, Facebook, Instagram และ Email'],
      ['ตัวอย่างเคส', 'ถามสินค้า โปรโมชั่น ค่าจัดส่ง วิธีชำระเงิน และ complaint เบื้องต้น'],
      ['ผลลัพธ์', 'ลดเวลาตอบซ้ำ ทำให้ agent ใหม่ตอบได้เหมือนคนมีประสบการณ์'],
    ],
  },
  ops: {
    title: 'Operations Agent',
    subtitle: 'AI ที่เปลี่ยนข้อความลูกค้าให้กลายเป็นงานหลังบ้าน',
    state: 'Action Engine',
    heading: 'จากคำถามลูกค้าไปสู่ออเดอร์ ticket API และ workflow',
    description:
      'Operations Agent ช่วยตรวจสอบข้อมูล สร้าง ticket assign งาน เรียก API ส่ง webhook แจ้งทีมภายใน หรือ trigger workflow เมื่อลูกค้าถามเรื่องออเดอร์ การจัดส่ง refund return คูปอง หรือปัญหาหลังการขาย',
    capabilities: [
      ['Order Lookup', 'ตรวจสอบสถานะออเดอร์และเลข tracking'],
      ['Workflow Trigger', 'สร้าง ticket, assign งาน และแจ้งทีม'],
      ['API & Webhook', 'เชื่อมต่อระบบหลังบ้านและ marketplace'],
      ['Return & Refund', 'จัดการขั้นตอนคืนสินค้าและ complaint'],
    ],
    mini: [
      ['เหมาะกับ', 'ทีม support, operation, warehouse และผู้จัดการร้านค้า'],
      ['ตัวอย่างเคส', 'เช็กพัสดุ ขอคืนสินค้า ส่งคูปอง เปลี่ยนที่อยู่ หรือแจ้งปัญหาจัดส่ง'],
      ['ผลลัพธ์', 'AI ไม่ได้แค่ตอบ แต่ช่วยทำงานต่อจากบทสนทนาได้จริง'],
    ],
  },
  growth: {
    title: 'Growth Agent',
    subtitle: 'AI ที่เปลี่ยนบทสนทนาให้เป็นโอกาสทางรายได้',
    state: 'Revenue Intelligence',
    heading: 'หาโอกาสขายจากคำถาม ความสนใจ และพฤติกรรมลูกค้า',
    description:
      'Growth Agent วิเคราะห์ความสนใจ คำถามซ้ำ พฤติกรรมลูกค้า และข้อมูลจาก marketplace เพื่อแนะนำสินค้า โปรโมชั่น upsell cross-sell follow-up และ content ที่ควรปรับปรุง',
    capabilities: [
      ['Product Recommendation', 'แนะนำสินค้าที่เหมาะกับบริบทลูกค้า'],
      ['Promotion Suggestion', 'เสนอคูปองหรือโปรโมชันที่มีโอกาสปิดการขาย'],
      ['Follow-up Signal', 'ตรวจจับลูกค้าที่สนใจแต่ยังไม่ซื้อ'],
      ['Content Insight', 'แนะนำ FAQ และ product content ที่ควรเพิ่ม'],
    ],
    mini: [
      ['เหมาะกับ', 'ecommerce, social commerce, marketplace seller และ brand team'],
      ['ตัวอย่างเคส', 'ลูกค้าถามสินค้าซ้ำ เปรียบเทียบรุ่น สนใจแต่ยังไม่จ่าย หรือถามโปรโมชัน'],
      ['ผลลัพธ์', 'ทำให้แชทลูกค้าเป็นแหล่ง insight สำหรับ sales และ marketing'],
    ],
  },
};

const css = `
  .landing-root :where(*, *::before, *::after) { box-sizing: border-box; }
  .landing-root {
    --paper:    #FAFAF7;
    --paper-2:  #F2F1EB;
    --paper-3:  #E8E6DF;
    --ink:      #14181A;
    --ink-2:    #4A4F52;
    --muted:    #888B85;
    --hairline: #DCDAD2;
    --hairline-2:#A9A69B;
    --warm:     #B8632A;
    --warm-2:   #D27A3D;
    --warm-soft:#F2E6D8;
    --mint:     #2C8A6B;
    --mint-soft:#E1F0E8;
    --rose:     #B8484E;
    --max:      1240px;
    background:
      radial-gradient(ellipse 1400px 700px at 50% -300px, rgba(184,99,42,0.05), transparent 65%),
      var(--paper);
    color: var(--ink);
    font: 14.5px/1.65 Inter, ui-sans-serif, -apple-system, "Sukhumvit Set", "Noto Sans Thai", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: "ss01", "cv11";
    min-height: 100vh;
    scroll-behavior: smooth;
  }
  .landing-root ::selection { background: var(--warm); color: var(--paper); }

  .landing-root .wrap { width: min(var(--max), calc(100% - 48px)); margin: 0 auto; }

  .landing-root h1, .landing-root h2, .landing-root h3, .landing-root h4 { margin: 0; font-weight: 500; letter-spacing: -0.018em; line-height: 1.1; }
  .landing-root .display { font-size: clamp(40px, 5.6vw, 78px); font-weight: 600; letter-spacing: -0.028em; line-height: 1.04; }
  .landing-root .display em { font-style: normal; color: var(--warm); }
  .landing-root .h2 { font-size: clamp(28px, 3.4vw, 44px); font-weight: 500; letter-spacing: -0.018em; }
  .landing-root .lead { font-size: 16px; line-height: 1.65; color: var(--ink-2); max-width: 56ch; }
  .landing-root .mono { font-family: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace; }
  .landing-root .label {
    font-family: "JetBrains Mono", ui-monospace, monospace;
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--muted); font-weight: 500;
  }

  .landing-root .nav {
    position: sticky; top: 0; z-index: 10;
    background: rgba(250,250,247,0.86); backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--hairline);
  }
  .landing-root .nav-inner {
    display: grid; grid-template-columns: auto 1fr auto; gap: 40px;
    align-items: center; padding: 14px 0;
  }
  .landing-root .brand {
    display: inline-flex; align-items: center; gap: 10px;
    text-decoration: none; color: var(--ink); font-size: 15px; font-weight: 600;
    letter-spacing: -0.005em;
  }
  .landing-root .brand-mark {
    display: inline-flex; align-items: center; justify-content: center;
    width: 26px; height: 26px; border-radius: 7px;
    background: linear-gradient(140deg, var(--warm) 0%, var(--warm-2) 100%);
    color: var(--paper); font-family: "JetBrains Mono", monospace; font-weight: 700; font-size: 11px;
    letter-spacing: -0.02em;
  }
  .landing-root .nav-links { display: flex; gap: 28px; font-size: 13px; }
  .landing-root .nav-links a {
    color: var(--ink-2); text-decoration: none; padding: 6px 0;
    transition: color .2s; position: relative;
  }
  .landing-root .nav-links a:hover { color: var(--ink); }
  .landing-root .nav-links a::after {
    content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 1px;
    background: var(--warm); transform: scaleX(0); transform-origin: left;
    transition: transform .25s;
  }
  .landing-root .nav-links a:hover::after { transform: scaleX(1); }
  .landing-root .nav-end { display: flex; gap: 14px; align-items: center; }
  .landing-root .btn {
    text-decoration: none; transition: all .2s ease;
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13px; line-height: 1; letter-spacing: 0;
  }
  .landing-root .btn-ghost { color: var(--ink-2); padding: 9px 14px; }
  .landing-root .btn-ghost:hover { color: var(--ink); }
  .landing-root .btn-warm {
    background: var(--ink); color: var(--paper); padding: 9px 16px; border-radius: 7px;
    font-weight: 500;
  }
  .landing-root .btn-warm:hover { background: var(--warm); }

  .landing-root .hero { padding: 96px 0 80px; position: relative; }
  .landing-root .hero-grid {
    display: grid; grid-template-columns: 1fr 1.15fr; gap: 56px;
    align-items: center;
  }
  @media (max-width: 1000px) { .landing-root .hero-grid { grid-template-columns: 1fr; gap: 48px; } }
  .landing-root .hero-text .label {
    display: inline-flex; align-items: center; gap: 10px; padding: 6px 12px;
    border: 1px solid var(--hairline); border-radius: 999px; color: var(--ink-2);
    margin-bottom: 32px; background: var(--paper);
  }
  .landing-root .hero-text .label::before {
    content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--mint);
    box-shadow: 0 0 8px var(--mint);
    animation: landing-pulse 2.4s infinite;
  }
  @keyframes landing-pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
  .landing-root .hero h1 { color: var(--ink); }
  .landing-root .hero .lead { margin-top: 24px; }
  .landing-root .hero-actions { margin-top: 36px; display: flex; gap: 14px; align-items: center; }
  .landing-root .btn-cta {
    background: var(--warm); color: var(--paper);
    padding: 14px 22px; border-radius: 9px; font-weight: 500; font-size: 14px;
  }
  .landing-root .btn-cta:hover {
    background: var(--warm-2); transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(184,99,42,0.22);
  }
  .landing-root .btn-link-warm { color: var(--ink); padding: 14px 16px; }
  .landing-root .btn-link-warm::after {
    content: " →"; transition: transform .2s; display: inline-block;
  }
  .landing-root .btn-link-warm:hover { color: var(--warm); }
  .landing-root .btn-link-warm:hover::after { transform: translateX(4px); }

  .landing-root .promises {
    margin-top: 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px;
    padding: 20px 24px; border: 1px solid var(--hairline); border-radius: 12px;
    background: linear-gradient(180deg, var(--paper-2) 0%, var(--paper) 100%);
  }
  .landing-root .promise { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--ink-2); }
  .landing-root .promise i {
    width: 6px; height: 6px; border-radius: 50%; background: var(--warm);
    box-shadow: 0 0 6px rgba(184,99,42,0.45);
  }

  .landing-root .term {
    background: var(--paper);
    border: 1px solid var(--hairline);
    border-radius: 14px;
    overflow: hidden;
    box-shadow:
      0 28px 70px rgba(20,24,26,0.10),
      0 8px 22px rgba(20,24,26,0.06);
    position: relative;
  }
  .landing-root .term::before {
    content: ""; position: absolute; left: 0; right: 0; top: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,99,42,0.40), transparent);
  }
  .landing-root .term-bar {
    display: flex; justify-content: space-between; align-items: center;
    padding: 11px 14px; background: var(--paper-2);
    border-bottom: 1px solid var(--hairline);
  }
  .landing-root .term-bar-left { display: flex; align-items: center; gap: 14px; }
  .landing-root .dots { display: flex; gap: 6px; }
  .landing-root .dots i { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .landing-root .dots i:nth-child(1) { background: #FF5F57; }
  .landing-root .dots i:nth-child(2) { background: #FEBC2E; }
  .landing-root .dots i:nth-child(3) { background: #28C840; }
  .landing-root .term-bar small {
    font-family: "JetBrains Mono", monospace; font-size: 11px;
    color: var(--muted); letter-spacing: 0.05em;
  }
  .landing-root .term-bar small b { color: var(--ink-2); font-weight: 500; }
  .landing-root .status {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: "JetBrains Mono", monospace; font-size: 10.5px;
    color: var(--mint); letter-spacing: 0.12em; text-transform: uppercase;
    padding: 4px 10px; border-radius: 999px; background: var(--mint-soft);
    border: 1px solid rgba(44,138,107,0.22);
  }
  .landing-root .status::before {
    content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--mint);
    box-shadow: 0 0 6px rgba(44,138,107,0.5);
  }

  .landing-root .term-grid {
    display: grid; grid-template-columns: 110px 1fr 230px;
    background:
      repeating-linear-gradient(0deg, transparent 0, transparent 24px, rgba(20,24,26,0.012) 24px, rgba(20,24,26,0.012) 25px);
    min-height: 420px;
  }
  @media (max-width: 760px) { .landing-root .term-grid { grid-template-columns: 1fr; min-height: auto; } }
  .landing-root .term-col + .term-col { border-left: 1px solid var(--hairline); }

  .landing-root .channel-rail { padding: 14px 12px; display: flex; flex-direction: column; gap: 6px; }
  .landing-root .channel-rail .label { padding: 0 6px 8px; }
  .landing-root .ch {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 11px; border-radius: 7px;
    font-size: 12.5px; color: var(--ink-2); cursor: pointer;
    transition: background .2s, color .2s;
  }
  .landing-root .ch:hover { background: var(--paper-2); color: var(--ink); }
  .landing-root .ch.active {
    background: var(--warm-soft); color: var(--ink);
    box-shadow: inset 0 0 0 1px rgba(184,99,42,0.30);
  }
  .landing-root .ch small {
    font-family: "JetBrains Mono", monospace; font-size: 10.5px;
    color: var(--muted); font-variant-numeric: tabular-nums;
  }
  .landing-root .ch.active small { color: var(--warm); }

  .landing-root .threads-col { padding: 14px; display: flex; flex-direction: column; gap: 8px; }
  .landing-root .threads-col .label { padding: 0 4px 6px; display: flex; justify-content: space-between; }
  .landing-root .threads-col .label i { color: var(--mint); font-style: normal; }
  .landing-root .row {
    padding: 11px 13px; border-radius: 8px; background: var(--paper);
    border: 1px solid var(--hairline);
    transition: border-color .2s, transform .2s;
  }
  .landing-root .row:hover { border-color: var(--hairline-2); transform: translateX(2px); }
  .landing-root .row.hot { border-left: 2px solid var(--warm); }
  .landing-root .row-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
  .landing-root .row-head b { font-size: 12.5px; font-weight: 500; color: var(--ink); }
  .landing-root .row p { margin: 0; font-size: 12px; color: var(--ink-2); line-height: 1.5; }
  .landing-root .tag {
    font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 999px;
    border: 1px solid var(--hairline); color: var(--muted); background: var(--paper);
  }
  .landing-root .tag.auto    { color: var(--mint); border-color: rgba(44,138,107,0.32); background: var(--mint-soft); }
  .landing-root .tag.review  { color: var(--warm); border-color: rgba(184,99,42,0.32); background: var(--warm-soft); }
  .landing-root .tag.escalate{ color: var(--rose); border-color: rgba(184,72,78,0.32); background: rgba(184,72,78,0.06); }

  .landing-root .intel-col { padding: 14px; display: flex; flex-direction: column; gap: 12px; }
  .landing-root .intel-col .label { padding-bottom: 4px; }
  .landing-root .intel-card {
    padding: 12px 14px; border-radius: 9px; background: var(--paper);
    border: 1px solid var(--hairline);
  }
  .landing-root .intel-card h4 {
    font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--ink); margin-bottom: 6px;
  }
  .landing-root .intel-card p { margin: 0; font-size: 12px; color: var(--ink-2); line-height: 1.5; }
  .landing-root .intel-card ul { margin: 6px 0 0; padding: 0; list-style: none; }
  .landing-root .intel-card li {
    font-size: 12px; color: var(--ink-2); padding: 3px 0 3px 14px; position: relative;
  }
  .landing-root .intel-card li::before {
    content: ""; position: absolute; left: 0; top: 12px; width: 7px; height: 1px;
    background: var(--warm);
  }
  .landing-root .conf {
    margin-top: 10px; height: 4px; background: var(--paper-3); border-radius: 999px;
    position: relative; overflow: hidden;
  }
  .landing-root .conf i {
    position: absolute; left: 0; top: 0; bottom: 0; width: 91%;
    background: linear-gradient(90deg, var(--warm), var(--mint));
    border-radius: 999px;
  }
  .landing-root .conf small {
    position: absolute; right: 6px; top: -16px; font-family: "JetBrains Mono", monospace;
    font-size: 10px; color: var(--mint); letter-spacing: 0.05em;
  }

  .landing-root .section { padding: 120px 0; border-top: 1px solid var(--hairline); }
  .landing-root .section-head {
    display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: end;
    margin-bottom: 60px;
  }
  @media (max-width: 900px) { .landing-root .section-head { grid-template-columns: 1fr; gap: 24px; } }
  .landing-root .section-head .label { color: var(--warm); display: inline-block; margin-bottom: 18px; }
  .landing-root .section-head h2 { color: var(--ink); }

  .landing-root .panel {
    border: 1px solid var(--hairline); border-radius: 14px;
    background: var(--paper);
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(20,24,26,0.04);
  }
  .landing-root .panel-tabs {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid var(--hairline);
    background: var(--paper-2);
  }
  .landing-root .agent-tab {
    background: transparent; border: 0; cursor: pointer;
    text-align: left; padding: 22px 24px;
    font: inherit; color: var(--ink-2);
    border-right: 1px solid var(--hairline);
    transition: background .2s, color .2s;
    position: relative;
  }
  .landing-root .agent-tab:last-child { border-right: 0; }
  .landing-root .agent-tab:hover { background: var(--warm-soft); color: var(--ink); }
  .landing-root .agent-tab .num {
    font-family: "JetBrains Mono", monospace; font-size: 10.5px; letter-spacing: 0.16em;
    color: var(--muted); display: block; margin-bottom: 8px;
  }
  .landing-root .agent-tab strong {
    display: block; font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 4px;
    letter-spacing: -0.005em;
  }
  .landing-root .agent-tab span { display: block; font-size: 13px; color: var(--ink-2); line-height: 1.55; }
  .landing-root .agent-tab[aria-selected="true"] {
    background: var(--paper); color: var(--ink);
  }
  .landing-root .agent-tab[aria-selected="true"] .num { color: var(--warm); }
  .landing-root .agent-tab[aria-selected="true"]::after {
    content: ""; position: absolute; left: 24px; right: 24px; bottom: -1px; height: 2px;
    background: var(--warm); border-radius: 2px;
  }
  @media (max-width: 760px) {
    .landing-root .panel-tabs { grid-template-columns: 1fr; }
    .landing-root .agent-tab { border-right: 0; border-bottom: 1px solid var(--hairline); }
    .landing-root .agent-tab[aria-selected="true"]::after { display: none; }
    .landing-root .agent-tab[aria-selected="true"] { box-shadow: inset 3px 0 0 var(--warm); }
  }

  .landing-root .panel-body { padding: 36px 36px 40px; }
  .landing-root .panel-top {
    display: flex; justify-content: space-between; align-items: baseline;
    padding-bottom: 22px; margin-bottom: 28px; border-bottom: 1px solid var(--hairline);
  }
  .landing-root .panel-top strong { font-size: 20px; font-weight: 600; }
  .landing-root .panel-top p { margin: 4px 0 0; font-size: 13px; color: var(--muted); }
  .landing-root .state-pill {
    font-family: "JetBrains Mono", monospace; font-size: 10.5px; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--warm); padding: 5px 11px;
    border: 1px solid rgba(184,99,42,0.32); border-radius: 999px;
    background: var(--warm-soft);
  }

  .landing-root .panel-body-inner {
    display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px;
  }
  @media (max-width: 800px) { .landing-root .panel-body-inner { grid-template-columns: 1fr; } }
  .landing-root .panel-body-inner h3 {
    font-size: 24px; font-weight: 600; letter-spacing: -0.012em; line-height: 1.2;
  }
  .landing-root .panel-body-inner > div > p {
    margin: 16px 0 0; font-size: 15px; line-height: 1.7; color: var(--ink-2);
  }
  .landing-root .caps {
    margin-top: 32px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
  }
  .landing-root .cap {
    padding: 16px 18px; border-radius: 10px; background: var(--paper-2);
    border: 1px solid var(--hairline);
    transition: border-color .2s;
  }
  .landing-root .cap:hover { border-color: var(--hairline-2); }
  .landing-root .cap strong {
    display: block; font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 4px;
  }
  .landing-root .cap span { font-size: 12.5px; line-height: 1.55; color: var(--ink-2); }

  .landing-root .mini { display: flex; flex-direction: column; gap: 14px; }
  .landing-root .mini-row {
    padding: 14px 16px; border-radius: 10px; background: var(--paper-2);
    border-left: 2px solid var(--warm);
  }
  .landing-root .mini-row strong {
    display: block; font-family: "JetBrains Mono", monospace;
    font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--warm); margin-bottom: 6px;
  }
  .landing-root .mini-row span { font-size: 13px; color: var(--ink-2); line-height: 1.6; }

  .landing-root .foot { padding: 40px 0 56px; border-top: 1px solid var(--hairline); margin-top: 80px; }
  .landing-root .foot-inner {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: var(--muted);
  }
  .landing-root .foot-inner b { color: var(--ink-2); font-weight: 500; }
`;

export function Landing() {
  const [active, setActive] = useState<AgentKey>('service');
  const a = agents[active];

  return (
    <div className="landing-root" lang="th">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="nav">
        <div className="wrap">
          <div className="nav-inner">
            <a className="brand" href="#top">
              <span className="brand-mark">360</span>
              CRMOS360
            </a>
            <nav className="nav-links">
              <a href="#ai-os">AI OS</a>
              <a href="#agents">Agents</a>
              <a href="#autopilot">Autopilot</a>
              <a href="#backoffice">Backoffice</a>
              <a href="#features">Features</a>
            </nav>
            <div className="nav-end">
              <a className="btn btn-ghost" href="/login">
                เข้าสู่ระบบ
              </a>
              <a className="btn btn-warm" href="/signup">
                ขอดูเดโม
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero-text">
              <span className="label">AI OS · Customer Operations</span>
              <h1 className="display">
                ระบบเดียวที่
                <br />
                <em>คิด ตอบ ทำ</em>
                <br />
                และเรียนรู้
              </h1>
              <p className="lead">
                รวมแชทลูกค้าจาก LINE OA, Facebook, Instagram, TikTok Shop, Shopee, Lazada และช่องทางอื่นไว้ในระบบเดียว
                พร้อม AI Agents ที่ตอบเองได้เมื่อมั่นใจ รออนุมัติเมื่อเคสสำคัญ ทำงานหลังบ้าน
                และเรียนรู้จากธุรกิจของคุณอย่างต่อเนื่อง
              </p>
              <div className="hero-actions">
                <a className="btn btn-cta" href="/signup">
                  ขอดูเดโม CRMOS360
                </a>
                <a className="btn btn-link-warm" href="#ai-os">
                  ดู USP หลัก
                </a>
              </div>
              <div className="promises">
                <span className="promise">
                  <i />
                  Auto-Reply แบบควบคุมได้
                </span>
                <span className="promise">
                  <i />
                  AI-managed Backoffice
                </span>
                <span className="promise">
                  <i />
                  Customer Memory
                </span>
                <span className="promise">
                  <i />
                  Marketplace Workflows
                </span>
              </div>
            </div>

            <div className="term" aria-hidden="true">
              <div className="term-bar">
                <div className="term-bar-left">
                  <div className="dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <small>
                    <b>crmos360.app</b> / inbox
                  </small>
                </div>
                <span className="status">AI OS Online</span>
              </div>
              <div className="term-grid">
                <div className="term-col channel-rail">
                  <div className="label">Channels</div>
                  <div className="ch active">
                    LINE <small>8</small>
                  </div>
                  <div className="ch">
                    TikTok <small>5</small>
                  </div>
                  <div className="ch">
                    Shopee <small>4</small>
                  </div>
                  <div className="ch">
                    Lazada <small>3</small>
                  </div>
                  <div className="ch">
                    Meta <small>6</small>
                  </div>
                  <div className="ch">
                    Email <small>2</small>
                  </div>
                </div>
                <div className="term-col threads-col">
                  <div className="label">
                    <span>Live · Inbox</span>
                    <i>● 4 active</i>
                  </div>
                  <div className="row hot">
                    <div className="row-head">
                      <b>คุณพิมพ์พร · LINE OA</b>
                      <span className="tag auto">Auto</span>
                    </div>
                    <p>ถามเลข tracking ของออเดอร์ล่าสุด ระบบเช็กข้อมูลและตอบได้ทันที</p>
                  </div>
                  <div className="row">
                    <div className="row-head">
                      <b>TikTok Shop Buyer</b>
                      <span className="tag review">Review</span>
                    </div>
                    <p>ลูกค้าขอเปลี่ยนสินค้า AI ร่างคำตอบพร้อมขั้นตอนให้ทีมอนุมัติ</p>
                  </div>
                  <div className="row">
                    <div className="row-head">
                      <b>Shopee Complaint</b>
                      <span className="tag escalate">Escalate</span>
                    </div>
                    <p>ลูกค้าไม่พอใจเรื่องจัดส่งล่าช้า ส่งต่อหัวหน้าทีมพร้อมสรุปเคส</p>
                  </div>
                  <div className="row">
                    <div className="row-head">
                      <b>Instagram Lead</b>
                      <span className="tag">Growth</span>
                    </div>
                    <p>AI แนะนำสินค้าที่เกี่ยวข้องและคูปองสำหรับ follow-up</p>
                  </div>
                </div>
                <div className="term-col intel-col">
                  <div className="label">Advisor</div>
                  <div className="intel-card">
                    <h4>Auto-Reply rule</h4>
                    <p>เปิด Auto-Reply สำหรับ tracking request ที่มั่นใจ &gt;85%</p>
                    <div className="conf">
                      <i />
                      <small>91%</small>
                    </div>
                  </div>
                  <div className="intel-card">
                    <h4>Customer Memory</h4>
                    <ul>
                      <li>ชอบโปรส่งฟรี</li>
                      <li>เคย complaint เรื่องส่งช้า</li>
                      <li>tone สุภาพและกระชับ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="agents">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="label">AI Agent Team</span>
              <h2 className="h2">
                ขับเคลื่อนด้วย{' '}
                <em style={{ color: 'var(--warm)', fontStyle: 'normal' }}>3 AI Agents</em>
                <br />
                ที่เข้าใจหน้าบ้านและหลังบ้าน
              </h2>
            </div>
            <p className="lead">
              ไม่ต้องสร้าง agent เยอะจนซับซ้อน CRMOS360 วาง agent เป็น 3 บทบาทหลักที่ธุรกิจเข้าใจง่าย:
              ดูแลลูกค้า ทำงานหลังบ้าน และช่วยสร้างรายได้จากบทสนทนา
            </p>
          </div>

          <div className="panel">
            <div className="panel-tabs" role="tablist" aria-label="AI agents">
              {(
                [
                  ['service', '01 / Service', 'Customer Service Agent', 'ตัวหลักสำหรับตอบลูกค้า จำบริบท และจัดการเคสประจำวัน'],
                  ['ops', '02 / Operations', 'Operations Agent', 'เชื่อมแชทกับออเดอร์ ticket API workflow และทีมหลังบ้าน'],
                  ['growth', '03 / Growth', 'Growth Agent', 'แนะนำสินค้า โปรโมชั่น follow-up และ insight เพื่อเพิ่มรายได้'],
                ] as [AgentKey, string, string, string][]
              ).map(([key, num, title, blurb]) => (
                <button
                  key={key}
                  className="agent-tab"
                  role="tab"
                  aria-selected={active === key}
                  onClick={() => setActive(key)}
                  type="button"
                >
                  <span className="num">{num}</span>
                  <strong>{title}</strong>
                  <span>{blurb}</span>
                </button>
              ))}
            </div>

            <div className="panel-body">
              <div className="panel-top">
                <div>
                  <strong>{a.title}</strong>
                  <p>{a.subtitle}</p>
                </div>
                <span className="state-pill">{a.state}</span>
              </div>
              <div className="panel-body-inner">
                <div>
                  <h3>{a.heading}</h3>
                  <p>{a.description}</p>
                  <div className="caps">
                    {a.capabilities.map(([n, c]) => (
                      <div className="cap" key={n}>
                        <strong>{n}</strong>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <aside className="mini">
                  {a.mini.map(([n, c]) => (
                    <div className="mini-row" key={n}>
                      <strong>{n}</strong>
                      <span>{c}</span>
                    </div>
                  ))}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-inner">
            <div>
              <b>CRMOS360</b> · An AI Operating System for Customer Operations
            </div>
            <div>Hybrid Light · Sunlit Cockpit — D2 paper × D3 density</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
