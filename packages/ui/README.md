# @ignitrondev/ui

React components for the IgnitronDev dark engineering system: near-black canvas, hairline borders, mono indexes, square controls, and one ignition-amber accent (`#ffb224`).

The primitives follow the shadcn shape (Radix, `class-variance-authority`, Tailwind tokens, `cn()`). The skin is the landing page at ignitrondev.space, not the default shadcn theme.

Dark only. Radius is `0`.

## Install

```bash
bun add @ignitrondev/ui
```

Peer dependencies: `react` and `react-dom` 18.3 or 19.

Load Geist if you want the same type as the site:

```bash
bun add @fontsource-variable/geist @fontsource-variable/geist-mono
```

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
| `Button` | `primary`, `outline`, `ghost`, `secondary`. Sizes `sm`, `default`, `lg`, `icon`. |
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

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `#08080a` | Page |
| `--raised` | `#0d0d10` | Dialogs |
| `--surface` | `#111114` | Cards, fields |
| `--surface-2` | `#17171b` | Secondary buttons, menus |
| `--foreground` | `#ededef` | Primary text, primary button fill |
| `--brand` / `--accent` | `#ffb224` | Amber. Primary buttons turn this color on hover. |
| `--ok` | `#4ade80` | Live status |
| `--line-strong` | white at 14% | Borders |

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
