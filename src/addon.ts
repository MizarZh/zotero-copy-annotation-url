import hooks from "./hooks";
import { createZToolkit } from "./utils/ztoolkit";

class Addon {
  public data: {
    alive: boolean;
    // Env type, see build.js
    env: "development" | "production";
    ztoolkit: ZToolkit;
    locale?: {
      current: any;
    };
    popup: HTMLDivElement | null;
    // reader?: ReaderInstanceManager;
  };
  // Lifecycle hooks
  public hooks: typeof hooks;

  constructor() {
    this.data = {
      alive: true,
      env: __env__,
      ztoolkit: createZToolkit(),
      popup: null,
    };
    this.hooks = hooks;
  }
}

export default Addon;
