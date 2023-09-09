import { config } from "../package.json";
import { getString, initLocale } from "./utils/locale";
import { registerPrefsScripts } from "./modules/preferenceScript";
import { createZToolkit } from "./utils/ztoolkit";
import { buildReaderPopup } from "./modules/popup";
import { registerReaderInitializer } from "./modules/reader";

async function onStartup() {
  await Promise.all([
    Zotero.initializationPromise,
    Zotero.unlockPromise,
    Zotero.uiReadyPromise,
  ]);
  initLocale();
  Zotero.debug("onStartup");

  registerReaderInitializer();

  await onMainWindowLoad(window);
}

async function onMainWindowLoad(win: Window): Promise<void> {
  Zotero.debug("onMainWindowLoad");
  // Create ztoolkit for every window
  addon.data.ztoolkit = createZToolkit();
}

async function onMainWindowUnload(win: Window): Promise<void> {
  ztoolkit.unregisterAll();
}

async function onReaderPopupBuild(readerInstance: _ZoteroTypes.ReaderInstance) {
  Zotero.debug("onReaderPopupBuild");
  await buildReaderPopup(readerInstance);
}

function onShutdown(): void {
  ztoolkit.unregisterAll();
  // Remove addon object
  addon.data.alive = false;
  delete Zotero[config.addonInstance];
}

// Add your hooks here. For element click, etc.
// Keep in mind hooks only do dispatch. Don't add code that does real jobs in hooks.
// Otherwise the code would be hard to read and maintian.

export default {
  onStartup,
  onShutdown,
  onMainWindowLoad,
  onMainWindowUnload,
  onReaderPopupBuild,
};
