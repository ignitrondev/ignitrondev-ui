import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const uiRoot = resolve(here, "..");
const repoRoot = resolve(uiRoot, "../..");
const componentsDir = join(uiRoot, "src/components");
const outDir = join(repoRoot, "apps/docs/public/r");
const baseUrl = "https://ignitrondev.github.io/ignitrondev-ui/r";

type RegistryItemDef = {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  readonly file: string;
  readonly dependencies?: readonly string[];
  readonly registryDependencies?: readonly string[];
};

const items: readonly RegistryItemDef[] = [
  {
    name: "badge",
    title: "Badge",
    description: "Mono availability chip with hairline border.",
    file: "badge.tsx",
    dependencies: ["class-variance-authority"],
  },
  {
    name: "button",
    title: "Button",
    description: "Square action button with ignition-amber hover.",
    file: "button.tsx",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
  },
  {
    name: "card",
    title: "Card",
    description: "Hairline panel with optional corner registration ticks.",
    file: "card.tsx",
  },
  {
    name: "checkbox",
    title: "Checkbox",
    description: "Square Radix checkbox with ignition-amber checked state.",
    file: "checkbox.tsx",
    dependencies: ["@radix-ui/react-checkbox", "lucide-react"],
  },
  {
    name: "dialog",
    title: "Dialog",
    description: "Square modal dialog with focus trap and hairline border.",
    file: "dialog.tsx",
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
  },
  {
    name: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Keyboard-accessible Radix dropdown menu.",
    file: "dropdown-menu.tsx",
    dependencies: ["@radix-ui/react-dropdown-menu"],
  },
  {
    name: "field",
    title: "Field",
    description: "Form field wrapper with label, hint, and error state.",
    file: "field.tsx",
    registryDependencies: [`${baseUrl}/label.json`],
  },
  {
    name: "input",
    title: "Input",
    description: "Square text input with amber focus border.",
    file: "input.tsx",
  },
  {
    name: "kicker",
    title: "Kicker",
    description: "Indexed mono section kicker with trailing hairline rule.",
    file: "kicker.tsx",
  },
  {
    name: "label",
    title: "Label",
    description: "Radix form label.",
    file: "label.tsx",
    dependencies: ["@radix-ui/react-label"],
  },
  {
    name: "section",
    title: "Section Head",
    description: "Two-column editorial section header with kicker and lede.",
    file: "section.tsx",
    registryDependencies: [`${baseUrl}/kicker.json`],
  },
  {
    name: "separator",
    title: "Separator",
    description: "Horizontal or vertical hairline separator.",
    file: "separator.tsx",
    dependencies: ["@radix-ui/react-separator"],
  },
  {
    name: "status",
    title: "Status",
    description: "Live status indicator with pulsing dot and mono label.",
    file: "status.tsx",
  },
  {
    name: "switch",
    title: "Switch",
    description: "Square Radix toggle switch.",
    file: "switch.tsx",
    dependencies: ["@radix-ui/react-switch"],
  },
  {
    name: "tabs",
    title: "Tabs",
    description: "Square segmented control built on Radix Tabs.",
    file: "tabs.tsx",
    dependencies: ["@radix-ui/react-tabs"],
  },
  {
    name: "tag",
    title: "Tag",
    description: "Compact mono metadata tag.",
    file: "tag.tsx",
  },
  {
    name: "textarea",
    title: "Textarea",
    description: "Square multiline text area.",
    file: "textarea.tsx",
  },
  {
    name: "theme-provider",
    title: "Theme Provider",
    description: "Light, dark, and system theme provider with localStorage persistence.",
    file: "theme-provider.tsx",
  },
  {
    name: "tooltip",
    title: "Tooltip",
    description: "Square Radix tooltip for hover and keyboard focus.",
    file: "tooltip.tsx",
    dependencies: ["@radix-ui/react-tooltip"],
  },
];

function rewriteImports(source: string): string {
  return source
    .replaceAll('"../lib/utils.js"', '"@/lib/utils"')
    .replace(/"\.\/([a-z0-9-]+)\.js"/g, '"@/components/ui/$1"');
}

function buildThemeRegistryItem() {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "theme",
    type: "registry:style",
    title: "IgnitronDev Theme",
    description: "IgnitronDev light and dark CSS tokens (0px radius, hairline borders, ignition amber).",
    cssVars: {
      theme: {
        "font-sans": '"Geist Variable", "Geist", system-ui, sans-serif',
        "font-mono": '"Geist Mono Variable", "Geist Mono", ui-monospace, monospace',
        "ease-ignition": "cubic-bezier(0.16, 1, 0.3, 1)",
        "radius-sm": "0px",
        "radius-md": "0px",
        "radius-lg": "0px",
        "radius-xl": "0px",
      },
      light: {
        radius: "0px",
        background: "#fafafa",
        foreground: "#09090b",
        card: "#ffffff",
        "card-foreground": "#09090b",
        popover: "#ffffff",
        "popover-foreground": "#09090b",
        primary: "#09090b",
        "primary-foreground": "#fafafa",
        secondary: "#f4f4f5",
        "secondary-foreground": "#09090b",
        muted: "#f4f4f5",
        "muted-foreground": "#52525b",
        accent: "#b45309",
        "accent-foreground": "#ffffff",
        destructive: "#dc2626",
        "destructive-foreground": "#ffffff",
        border: "rgba(9, 9, 11, 0.16)",
        input: "rgba(9, 9, 11, 0.16)",
        ring: "#b45309",
        raised: "#ffffff",
        surface: "#ffffff",
        "surface-2": "#f4f4f5",
        hover: "rgba(9, 9, 11, 0.04)",
        "hover-strong": "rgba(9, 9, 11, 0.06)",
        overlay: "rgba(9, 9, 11, 0.45)",
        line: "rgba(9, 9, 11, 0.08)",
        "line-strong": "rgba(9, 9, 11, 0.16)",
        "line-bright": "rgba(9, 9, 11, 0.32)",
        "text-2": "#52525b",
        "text-3": "#71717a",
        "text-4": "#a1a1aa",
        brand: "#b45309",
        "brand-foreground": "#ffffff",
        "brand-soft": "rgba(180, 83, 9, 0.08)",
        "brand-line": "rgba(180, 83, 9, 0.35)",
        "brand-glow": "rgba(180, 83, 9, 0.35)",
        ok: "#16a34a",
        "ok-glow": "rgba(22, 163, 74, 0.45)",
      },
      dark: {
        background: "#08080a",
        foreground: "#ededef",
        card: "#111114",
        "card-foreground": "#ededef",
        popover: "#17171b",
        "popover-foreground": "#ededef",
        primary: "#ededef",
        "primary-foreground": "#08080a",
        secondary: "#17171b",
        "secondary-foreground": "#ededef",
        muted: "#111114",
        "muted-foreground": "#a1a1aa",
        accent: "#ffb224",
        "accent-foreground": "#111111",
        destructive: "#f87171",
        "destructive-foreground": "#111111",
        border: "rgba(255, 255, 255, 0.14)",
        input: "rgba(255, 255, 255, 0.14)",
        ring: "#ffb224",
        raised: "#0d0d10",
        surface: "#111114",
        "surface-2": "#17171b",
        hover: "rgba(255, 255, 255, 0.04)",
        "hover-strong": "rgba(255, 255, 255, 0.06)",
        overlay: "rgba(0, 0, 0, 0.7)",
        line: "rgba(255, 255, 255, 0.075)",
        "line-strong": "rgba(255, 255, 255, 0.14)",
        "line-bright": "rgba(255, 255, 255, 0.26)",
        "text-2": "#a1a1aa",
        "text-3": "#71717a",
        "text-4": "#4b4b53",
        brand: "#ffb224",
        "brand-foreground": "#111111",
        "brand-soft": "rgba(255, 178, 36, 0.1)",
        "brand-line": "rgba(255, 178, 36, 0.35)",
        "brand-glow": "rgba(255, 178, 36, 0.55)",
        ok: "#4ade80",
        "ok-glow": "rgba(74, 222, 128, 0.7)",
      },
    },
  };
}

function buildComponentItem(def: RegistryItemDef) {
  const raw = readFileSync(join(componentsDir, def.file), "utf8");
  const content = rewriteImports(raw);
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: def.name,
    type: "registry:ui",
    title: def.title,
    description: def.description,
    ...(def.dependencies?.length ? { dependencies: def.dependencies } : {}),
    ...(def.registryDependencies?.length
      ? { registryDependencies: def.registryDependencies }
      : {}),
    files: [
      {
        path: `components/ui/${def.file}`,
        type: "registry:ui",
        content,
      },
    ],
  };
}

function main() {
  mkdirSync(outDir, { recursive: true });
  const themeItem = buildThemeRegistryItem();
  writeFileSync(join(outDir, "theme.json"), `${JSON.stringify(themeItem, null, 2)}\n`);

  const manifestItems: Array<Record<string, unknown>> = [
    {
      name: themeItem.name,
      type: themeItem.type,
      title: themeItem.title,
      description: themeItem.description,
    },
  ];

  for (const def of items) {
    const built = buildComponentItem(def);
    writeFileSync(join(outDir, `${def.name}.json`), `${JSON.stringify(built, null, 2)}\n`);
    manifestItems.push({
      name: def.name,
      type: "registry:ui",
      title: def.title,
      description: def.description,
      ...(def.dependencies?.length ? { dependencies: def.dependencies } : {}),
      ...(def.registryDependencies?.length
        ? { registryDependencies: def.registryDependencies }
        : {}),
    });
  }

  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "@ignitrondev/ui",
    homepage: "https://ignitrondev.github.io/ignitrondev-ui/",
    items: manifestItems,
  };
  writeFileSync(join(outDir, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
}

main();
