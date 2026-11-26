import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Field,
  Input,
  Kicker,
  Label,
  SectionHead,
  Separator,
  Status,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tag,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ignitrondev/ui";
import { type FormEvent, type ReactNode, useState } from "react";

const nav = [
  ["Install", "install"],
  ["Buttons", "buttons"],
  ["Forms", "forms"],
  ["Display", "display"],
  ["Overlays", "overlays"],
] as const;

const installCommand = "npm install @ignitrondev/ui";

export function App() {
  return (
    <>
      <a
        href="#catalog"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:border focus:border-line-strong focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to catalog
      </a>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:h-16 md:px-6 md:py-0">
          <a href="#top" className="text-base font-semibold tracking-[-0.03em]">
            Ignitron<span className="text-text-3">UI</span>
          </a>
          <nav
            className="order-3 flex w-full items-center gap-1 sm:order-none sm:ml-auto sm:w-auto"
            aria-label="Catalog"
          >
            {nav.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="px-2.5 py-1.5 text-[13.5px] text-text-2 transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm">
            <a href="https://github.com/ignitrondev" target="_blank" rel="noreferrer">
              GitHub
              <span className="ign-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="border-b border-line px-4 pt-36 pb-20 md:px-6 md:pt-44 md:pb-28">
          <div className="mx-auto w-full max-w-[1200px]">
            <SectionHead
              index="[00]"
              kicker="Component catalog"
              title={
                <>
                  Parts for the
                  <br />
                  <span className="text-text-3">dark engineering system.</span>
                </>
              }
              lede="Square controls, hairline borders, mono indexes, and one ignition-amber accent. The same language as the IgnitronDev site, packaged for React."
            />
          </div>
        </section>

        <div className="mx-auto w-full max-w-[1200px] px-4 py-16 md:px-6 md:py-24">
        <div id="catalog" className="grid gap-px border border-line-strong bg-line-strong">
          <Specimen id="install" index="01" title="Install">
            <Install />
          </Specimen>
          <Specimen id="buttons" index="02" title="Buttons">
            <Buttons />
          </Specimen>
          <Specimen id="forms" index="03" title="Forms">
            <Forms />
          </Specimen>
          <Specimen id="display" index="04" title="Display">
            <Display />
          </Specimen>
          <Specimen id="overlays" index="05" title="Overlays">
            <Overlays />
          </Specimen>
        </div>
        </div>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-6 md:px-6">
          <p className="font-mono text-[11px] tracking-[0.12em] text-text-3 uppercase">
            Ignitron UI 0.1
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-text-4">@ignitrondev/ui</p>
        </div>
      </footer>
    </>
  );
}

function Install() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid max-w-3xl gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border border-line-strong bg-surface px-4 py-3">
        <code className="font-mono text-sm text-foreground">{installCommand}</code>
        <Button size="sm" variant="outline" onClick={() => void copy()}>
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <p className="text-sm leading-relaxed text-text-2">
        React 18.3 or 19 is a peer dependency. Import the stylesheet once, then use the components.
      </p>
      <pre className="overflow-x-auto border border-line-strong bg-surface p-4 font-mono text-[13px] leading-relaxed text-text-2">
        <code>{`import "@ignitrondev/ui/styles.css";\nimport { Button } from "@ignitrondev/ui";`}</code>
      </pre>
    </div>
  );
}

function Specimen({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="bg-background px-5 py-7 md:px-7" aria-labelledby={`${id}-title`}>
      <h2
        id={`${id}-title`}
        className="mb-6 font-mono text-[11px] font-medium tracking-[0.12em] text-text-3 uppercase"
      >
        <span className="text-brand">{index}</span> {title}
      </h2>
      {children}
    </section>
  );
}

function Buttons() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">
          See the work
          <span className="ign-arrow" aria-hidden="true">
            →
          </span>
        </Button>
        <Button size="lg" variant="outline">
          Start a conversation
        </Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
        <Button size="icon" aria-label="Next">
          →
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          Disabled outline
        </Button>
      </div>
    </div>
  );
}

function Forms() {
  const [name, setName] = useState("Bima");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [touched, setTouched] = useState(false);
  const [notesOn, setNotesOn] = useState(true);
  const [sent, setSent] = useState(false);
  const emailError = touched && !email.includes("@") ? "Enter an email address." : undefined;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!email.includes("@") || name.trim() === "") {
      setSent(false);
      return;
    }
    setSent(true);
  }

  return (
    <form className="grid max-w-xl gap-5" onSubmit={onSubmit} noValidate>
      <Field label="Name" htmlFor="name" hint="Shown on the note. Nothing leaves this page.">
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
        />
      </Field>
      <Field label="Email" htmlFor="email" error={emailError}>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="you@studio.dev"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          onBlur={() => setTouched(true)}
          onChange={(event) => {
            setEmail(event.target.value);
            setSent(false);
          }}
          autoComplete="email"
        />
      </Field>
      <Field label="Note" htmlFor="note">
        <Textarea
          id="note"
          name="note"
          value={note}
          placeholder="What should the system make obvious?"
          onChange={(event) => setNote(event.target.value)}
        />
      </Field>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2.5">
          <Checkbox
            id="followup"
            checked={notesOn}
            onCheckedChange={(checked) => setNotesOn(checked === true)}
          />
          <Label htmlFor="followup">Keep a local note</Label>
        </div>
        <div className="flex items-center gap-2.5">
          <Switch
            id="amber"
            checked={notesOn}
            onCheckedChange={setNotesOn}
            aria-label="Keep a local note"
          />
          <Label htmlFor="amber">{notesOn ? "Notes on" : "Notes off"}</Label>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">
          Record locally
          <span className="ign-arrow" aria-hidden="true">
            →
          </span>
        </Button>
        {sent ? (
          <Status tone="ok">Saved in this tab</Status>
        ) : (
          <Status tone="muted" pulse={false}>
            Not sent
          </Status>
        )}
      </div>
    </form>
  );
}

function Display() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <Kicker index="[03]">Engineering practice</Kicker>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">In development</Badge>
        <Badge tone="ok">In production</Badge>
        <Badge tone="research">Research</Badge>
        <Badge tone="planned">Planned</Badge>
        <Badge>Neutral</Badge>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Tag>React</Tag>
        <Tag>Tailwind</Tag>
        <Tag>Radix</Tag>
        <Tag>Geist</Tag>
      </div>
      <div className="flex flex-wrap gap-4">
        <Status>Live</Status>
        <Status tone="brand">Accent</Status>
        <Status tone="muted" pulse={false}>
          Idle
        </Status>
      </div>
      <Separator />
      <Card corners>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.12em] text-text-3 uppercase">
              01 · Kit
            </p>
            <Badge tone="ok">In the repo</Badge>
          </div>
          <CardTitle>@ignitrondev/ui</CardTitle>
          <CardDescription>
            Buttons, fields, cards, and overlays that already match the landing page. Import the
            stylesheet once, then compose.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-1.5">
          <Tag>Square</Tag>
          <Tag>Hairline</Tag>
          <Tag>Amber</Tag>
        </CardContent>
        <CardFooter>
          <Button asChild size="sm" variant="outline">
            <a href="#buttons">
              Back to buttons
              <span className="ign-arrow" aria-hidden="true">
                ↑
              </span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function Overlays() {
  const [surface, setSurface] = useState("Raised");

  return (
    <Tabs defaultValue="dialog">
      <TabsList aria-label="Overlay examples">
        <TabsTrigger value="dialog">Dialog</TabsTrigger>
        <TabsTrigger value="menu">Menu</TabsTrigger>
        <TabsTrigger value="tip">Tooltip</TabsTrigger>
      </TabsList>
      <TabsContent value="dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open a dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ask about the kit</DialogTitle>
              <DialogDescription>
                This dialog keeps focus inside, closes on Escape, and returns focus to the button
                that opened it.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TabsContent>
      <TabsContent value="menu" className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Surface
              <span className="ign-arrow" aria-hidden="true">
                ▾
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Canvas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Canvas", "Raised", "Surface"].map((item) => (
              <DropdownMenuItem key={item} onSelect={() => setSurface(item)}>
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Status tone="brand" pulse={false}>
          {surface}
        </Status>
      </TabsContent>
      <TabsContent value="tip">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Hover or focus</Button>
          </TooltipTrigger>
          <TooltipContent>Ignition amber, #ffb224</TooltipContent>
        </Tooltip>
      </TabsContent>
    </Tabs>
  );
}
