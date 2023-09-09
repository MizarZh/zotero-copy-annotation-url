import { config } from "../../package.json";

export function registerReaderInitializer() {
  Zotero.debug("registerReaderInitializer");
  ztoolkit.ReaderInstance.register(
    "initialized",
    `${config.addonRef}-rightclick`,
    initializeReaderAnnotationRightClickEvent,
  );
  // Zotero.Reader._readers.forEach((r) => {
  //   initializeReaderAnnotationRightClickEvent(r);
  // });
}

// export function unregisterReaderInitializer() {
//   Zotero.Reader._readers.forEach((r) => {
//     unInitializeReaderAnnotationButton(r);
//   });
// }

async function initializeReaderAnnotationRightClickEvent(
  instance: _ZoteroTypes.ReaderInstance,
) {
  Zotero.debug("initializeReaderAnnotationRightClickEvent");
  await instance._initPromise;
  await instance._waitForReader();
  instance._iframeWindow?.document?.addEventListener(
    "contextmenu",
    async (ev: MouseEvent) => {
      Zotero.debug(ev.target);
      await addon.hooks.onReaderPopupBuild(instance);
      // Zotero.debug(`outside ${typeof ev.target}`);
      // if (
      //   ev.target instanceof HTMLDivElement &&
      //   ev.target.classList.contains("annotation")
      // ) {
      //   Zotero.debug(`inside ${ev.target instanceof HTMLDivElement}`);
      //   await addon.hooks.onReaderPopupBuild(instance);
      // }
    },
  );
}

// async function unInitializeReaderAnnotationRightClickEvent(
//   instance: _ZoteroTypes.ReaderInstance,
// ) {

// }
