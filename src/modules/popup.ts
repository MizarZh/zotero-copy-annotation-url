import { config } from "../../package.json";
import { getString } from "../utils/locale";

export async function buildReaderPopup(
  readerInstance: _ZoteroTypes.ReaderInstance,
) {
  const popup = readerInstance._iframeWindow?.document.querySelector(
    ".context-menu",
  ) as HTMLDivElement;
  if (!popup) {
    return;
  }
  addon.data.popup = popup;
  popup.style.height = "-moz-fit-content";
  popup.setAttribute(
    `${config.addonRef}-prefix`,
    `${config.addonRef}-${readerInstance._instanceID}`,
  );

  ztoolkit.UI.appendElement(
    {
      tag: "div",
      classList: ["group"],
      children: [
        {
          tag: "button",
          properties: {
            innerHTML: getString("copy-annotation-url"),
            classList: ["row basic"],
            properties: {
              tabIndex: -1,
            },
          },
          listeners: [
            {
              type: "click",
              listener: (ev: Event) => {
                const annotation =
                  readerInstance._iframeWindow?.document.querySelector(
                    ".annotation.selected",
                  ) as HTMLDivElement;
                const annotationID = annotation.attributes.getNamedItem(
                  "data-sidebar-annotation-id",
                )?.value;
                const readerItemId = Zotero.Items.get(
                  Zotero.Reader.getByTabID(Zotero_Tabs.selectedID).itemID,
                )._key;
                new ztoolkit.Clipboard()
                  .addText(
                    `zotero://open-pdf/library/items/${readerItemId}?annotation=${annotationID}`,
                    "text/unicode",
                  )
                  .copy();
                popup.remove();
              },
            },
          ],
        },
      ],
    },
    popup,
  );
}
