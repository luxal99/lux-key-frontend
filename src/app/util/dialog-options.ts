import { MatDialogConfig } from "@angular/material/dialog";

export class DialogOptions {
  static setDialogConfig(config: MatDialogConfig): MatDialogConfig {
    if (window.screen.width <= 570) {
      return {
        width: "100%",
        minWidth: "100%",
        height: "80vh",
        position: { bottom: "0" },
        data: config.data
      };
    } else if (window.screen.width >= 1024 && window.screen.width <= 1440) {
      config.height = config.height === "100vh" ? "100%" : config.height;
      return config;
    } else {
      return config;
    }
  }
}
