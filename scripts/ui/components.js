function renderRiskBar(risk = 0) {
  const percent = Math.max(0, Math.min(100, Math.floor(risk * 100)));

  const color =
    percent > 60 ? "#ef4444" :   // red danger
    percent > 30 ? "#f59e0b" :   // orange warning
    "#22c55e";                   // green safe

  return `
    <div style="margin-top:6px;">
      <div style="
        width:100%;
        height:8px;
        background:rgba(255,255,255,0.08);
        border-radius:999px;
        overflow:hidden;
      ">
        <div style="
          width:${percent}%;
          height:100%;
          background:${color};
          transition:width 0.3s ease;
        "></div>
      </div>

      <small style="opacity:0.8;">
        Injury Risk: ${percent}%
      </small>
    </div>
  `;
}