import {
  App,
  getAllTags,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
} from "obsidian";
import { TagDetailsModal } from "./TagDetailsModal";
import { TagPageFinder } from "./TagPageFinder";
import { getTagContent, isTagElement } from "./utils/isTagElement";
interface TagPagePreviewSettings {
  mySetting: string;
}
const DEFAULT_SETTINGS: TagPagePreviewSettings = {
  mySetting: "default",
};
export default class TagPagePreview extends Plugin {
  settings: TagPagePreviewSettings;
  async onload() {
    console.log("loading plugin");
    await this.loadSettings();
    this.addRibbonIcon("dice", "Sample Plugin", () => {
      new Notice("This is a notice!");
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
    this.registerCodeMirror((cm: CodeMirror.Editor) => {
      console.log("codemirror", cm);
    });
    this.registerDomEvent(document, "click", (evt: MouseEvent) => {
      console.log("click", evt);
      const target = evt.target as HTMLElement;
      if (!isTagElement(target)) return;

      const tag = getTagContent(target);

      new TagDetailsModal(
        this.app,
        tag,
        new TagPageFinder(this.app, tag)
      ).open();
    });
    this.registerInterval(
      window.setInterval(() => console.log("setInterval"), 5 * 60 * 1000)
    );
  }
  onunload() {
    console.log("unloading plugin");
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
}
class SampleSettingTab extends PluginSettingTab {
  plugin: TagPagePreview;
  constructor(app: App, plugin: TagPagePreview) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display(): void {
    let { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for my awesome plugin." });
    new Setting(containerEl)
      .setName("Setting #1")
      .setDesc("It's a secret")
      .addText((text) =>
        text
          .setPlaceholder("Enter your secret")
          .setValue("")
          .onChange(async (value) => {
            console.log("Secret: " + value);
            this.plugin.settings.mySetting = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
