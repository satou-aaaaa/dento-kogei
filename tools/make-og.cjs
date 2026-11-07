// SNS で貼られたときの絵（og.png 1200×630）を作る。今日の問題（答え）は入れず、焼き物・漆器・織物の形の絵だけ。
// 使い方: node tools/make-og.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const art = `
    <path d="M40 40 h70 l-8 22 q20 30 0 70 h-54 q-20 -40 0 -70 z" fill="#8a5a3c"/>
    <rect x="170" y="70" width="130" height="62" rx="10" fill="#a8261c"/><rect x="170" y="70" width="130" height="14" rx="6" fill="#2a2420"/>
    <g fill="#1f3a5c">${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${350 + i * 18}" y="40" width="10" height="92"/>`).join("")}</g>
    <g fill="#c79a3a">${[0, 1, 2].map((i) => `<rect x="${344}" y="${56 + i * 26}" width="110" height="8"/>`).join("")}</g>`;
  await p.setContent(`<body style="margin:0;font-family:'Noto Sans CJK JP','IPAPGothic',sans-serif">
  <div style="width:1200px;height:630px;box-sizing:border-box;padding:56px 64px;background:#f6f1e7;color:#2a2420;display:flex;flex-direction:column;gap:36px;justify-content:center">
    <div>
      <div style="font-size:32px;color:#86291a;letter-spacing:.06em">焼き物？漆器？どこの県？を当てる1日5問</div>
      <div style="font-size:112px;font-weight:900;margin-top:4px;color:#1f3a5c;white-space:nowrap">伝統工芸品<span style="color:#b8402a">あて</span></div>
      <div style="font-size:30px;margin-top:8px;white-space:nowrap">種類・読み方・都道府県・特徴</div>
    </div>
    <svg width="470" height="150" viewBox="0 0 470 150" style="align-self:flex-end;transform:scale(1.3);transform-origin:right bottom">${art}</svg>
  </div></body>`);
  await p.screenshot({ path: path.join(__dirname, "..", "og.png") });
  await b.close();
})();
