import Adw from 'gi://Adw';
import { buildPrefsWidget } from './common/prefs';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class MyPreferences extends ExtensionPreferences {
	override fillPreferencesWindow(prefsWindow: Adw.PreferencesWindow) {
		const UIDirPath = this.dir.get_path() ?? '';
		const settings = this.getSettings();
		buildPrefsWidget(prefsWindow, settings, UIDirPath);
	}
}
