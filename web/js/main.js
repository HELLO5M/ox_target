import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const panel = document.getElementById("target-panel");
const body = document.body;

window.addEventListener("message", (event) => {
  switch (event.data.event) {
    case "visible": {
      optionsWrapper.innerHTML = "";
      panel.classList.remove("visible");
      body.classList.remove("has-target");
      body.style.visibility = event.data.state ? "visible" : "hidden";
      return;
    }

    case "leftTarget": {
      optionsWrapper.innerHTML = "";
      panel.classList.remove("visible");
      body.classList.remove("has-target");
      return;
    }

    case "setTarget": {
      optionsWrapper.innerHTML = "";
      body.classList.add("has-target");

      let hasOptions = false;

      if (event.data.options) {
        let firstGroup = true;
        for (const type in event.data.options) {
          const group = event.data.options[type];
          if (!group || group.length === 0) continue;

          if (!firstGroup) {
            const sep = document.createElement("div");
            sep.className = "option-separator";
            optionsWrapper.appendChild(sep);
          }

          group.forEach((data, id) => {
            if (!data.hide) {
              createOptions(type, data, id + 1);
              hasOptions = true;
            }
          });

          firstGroup = false;
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            if (!data.hide) {
              createOptions("zones", data, id + 1, i + 1);
              hasOptions = true;
            }
          });
        }
      }

      if (hasOptions) {
        panel.classList.add("visible");
      }
    }
  }
});
