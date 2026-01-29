
import { STORAGE_KEYS } from './config.js';

export class ThemeManager {
    constructor() {
        this.theme = 'dark'; // Default
        this.storageKey = 'theme_preference';
    }

    init() {
        // 1. Check storage
        const storedTheme = localStorage.getItem(this.storageKey);

        if (storedTheme) {
            this.theme = storedTheme;
        } else {
            // 2. Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                this.theme = 'light';
            }
        }

        this.applyTheme();
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(this.storageKey, this.theme);
        this.applyTheme();
        return this.theme;
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);

        // Update meta theme-color if exists (optional polish)
        // const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        // if(metaThemeColor) {
        //     metaThemeColor.setAttribute('content', this.theme === 'dark' ? '#0f0f23' : '#f0f2f5');
        // }
    }

    getTheme() {
        return this.theme;
    }
}
