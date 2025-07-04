import { Theme } from '../types/theme';

type ThemeConfigFunction = (isDark: boolean) => Partial<Theme>;

class ThemeRegistry {
  private static instance: ThemeRegistry;
  private presets: Map<string, ThemeConfigFunction> = new Map();

  static getInstance(): ThemeRegistry {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!ThemeRegistry.instance) {
      ThemeRegistry.instance = new ThemeRegistry();
    }
    return ThemeRegistry.instance;
  }

  registerPreset(name: string, config: ThemeConfigFunction): void {
    this.presets.set(name, config);
  }

  getPreset(name: string): ThemeConfigFunction | undefined {
    return this.presets.get(name);
  }

  getAllPresets(): string[] {
    return Array.from(this.presets.keys());
  }

  hasPreset(name: string): boolean {
    return this.presets.has(name);
  }

  deletePreset(name: string): void {
    this.presets.delete(name);
  }

  clearPresets(): void {
    this.presets.clear();
  }
}

export const themeRegistry = ThemeRegistry.getInstance();