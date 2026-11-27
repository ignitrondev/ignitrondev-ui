# @ignitrondev/ui

React components for the IgnitronDev dark engineering system: near-black canvas, hairline borders, mono indexes, square controls, and one ignition-amber accent (`#ffb224`).

Built on **shadcn/ui v4** (`components.json`, Radix primitives, `lucide-react`, `class-variance-authority`, Tailwind CSS v4 tokens, `data-slot`), customized with the IgnitronDev skin from ignitrondev.space.

Standard shadcn theme convention: `:root` is light, `.dark` is dark (`@custom-variant dark`), with `ThemeProvider` and `useTheme` included. Radius is `0`.

## Install

### Option 1 — npm package

```bash
bun add @ignitrondev/ui
```

### Option 2 — shadcn CLI Registry

Register the `@ignitrondev` namespace in your `components.json`:

```json
{
  "registries": {
    "@ignitrondev": "https://ignitrondev.github.io/ignitrondev-ui/r/{name}.json"
  }
}
```

Then install components directly into your `components/ui/` folder:

```bash
npx shadcn@latest add @ignitrondev/theme @ignitrondev/button @ignitrondev/card
```

Peer dependencies: `react` and `react-dom` 18.3 or 19.

Load Geist if you want the same type as the site:

```bash
bun add @fontsource-variable/geist @fontsource-variable/geist-mono
```

With **Tailwind CSS v4** (recommended — zero duplicate CSS):

```css
@import "tailwindcss";
@import "@ignitrondev/ui/theme.css";
```

Or **without Tailwind** (standalone precompiled bundle):

```ts
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@ignitrondev/ui/styles.css";
```

`styles.css` ships the tokens and the utilities the components use. It does not include Tailwind preflight.

## Use

```tsx
import { Button, Kicker, Status } from "@ignitrondev/ui";

export function HeroActions() {
  return (
    <div>
      <Kicker index="[00]">Independent engineering studio</Kicker>
      <Status>In production</Status>
      <Button>
        See the work <span className="ign-arrow">→</span>
      </Button>
    </div>
  );
}
```

`Button` renders `<button type="button">`. Pass `asChild` to hand the styles to a link:

```tsx
<Button asChild>
  <a href="/products">See the work</a>
</Button>
```

An element with the class `ign-arrow`, and any inline SVG, shifts 3px right on hover. Icon-sized buttons do not.

## Components

| Export | Role |
| --- | --- |
| `Button` | `default` (`primary`), `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes `sm`, `default`, `lg`, `icon`. |
| `ThemeProvider`, `useTheme` | Standard shadcn light/dark/system theme provider (`defaultTheme="dark"`). |
| `Input`, `Textarea`, `Label`, `Field`, `Checkbox`, `Switch` | Square fields. `aria-invalid` turns the border red. |
| `Kicker`, `SectionHead`, `Badge`, `Tag`, `Status` | Mono labels, availability chips, live dot. |
| `Card` and its header, title, description, content, footer | Hairline panel. `corners` adds the registration ticks. |
| `Separator` | Horizontal or vertical hairline. |
| `Tabs` | Square segmented control. |
| `Dialog` | Focus trap, Escape to close, overlay click to close. |
| `DropdownMenu` | Keyboard menu. |
| `Tooltip` | Opens on hover and keyboard focus. |

`Status` always has a text label. The dot is not the only signal.

## Tokens

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `--background` | `#08080a` | `#fafafa` | Page |
| `--raised` | `#0d0d10` | `#ffffff` | Dialogs |
| `--surface` | `#111114` | `#ffffff` | Cards, fields |
| `--surface-2` | `#17171b` | `#f4f4f5` | Secondary buttons, menus |
| `--foreground` | `#ededef` | `#09090b` | Primary text, primary button fill |
| `--brand` / `--accent` | `#ffb224` | `#b45309` | Amber. Primary buttons turn this color on hover. |
| `--ok` | `#4ade80` | `#16a34a` | Live status |
| `--line-strong` | white at 14% | ink at 16% | Borders |

Wrap your app in `ThemeProvider` (defaults to `dark`) and switch themes with `useTheme`:

```tsx
import { ThemeProvider, useTheme } from "@ignitrondev/ui";

export function Root({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
```

Tailwind classes: `bg-surface`, `text-text-2`, `border-line-strong`, `text-brand`, `bg-ok`.

## Catalog

From the repo root:

```bash
bun install
bun run dev
```

The catalog runs at `http://127.0.0.1:4178`.

## Build the package

```bash
bun --cwd packages/ui build
```

That emits `dist/` (ESM, types, and `styles.css`).
