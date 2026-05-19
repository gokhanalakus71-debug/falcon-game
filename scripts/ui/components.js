function renderRiskBar(risk){

  const percent = Math.min(100, Math.floor(risk * 100));

  let color = "#22c55e"; // green safe

  if(percent > 30) color = "#f59e0b"; // orange warning
  if(percent > 60) color = "#ef4444"; // red danger

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
          transition:0.3s;
        "></div>
      </div>

      <small style="opacity:0.8;">
        Injury Risk: ${percent}%
      </small>
    </div>
  `;
}