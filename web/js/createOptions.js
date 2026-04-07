import { fetchNui } from "./fetchNui.js";

const optionsWrapper = document.getElementById("options-wrapper");

function onClick() {
  this.style.pointerEvents = "none";
  fetchNui("select", [this.targetType, this.targetId, this.zoneId]);
  setTimeout(() => (this.style.pointerEvents = "auto"), 100);
}

export function createOptions(type, data, id, zoneId) {
  if (data.hide) return;

  const option = document.createElement("div");
  option.className = "option-container";

  const iconColor = data.iconColor ? `style="color:${data.iconColor}"` : "";
  option.innerHTML = `
    <i class="fa-fw ${data.icon || "fa-solid fa-circle-dot"} option-icon" ${iconColor}></i>
    <span class="option-label">${data.label}</span>
  `;

  option.targetType = type;
  option.targetId = id;
  option.zoneId = zoneId;
  option.addEventListener("click", onClick);

  optionsWrapper.appendChild(option);
}
