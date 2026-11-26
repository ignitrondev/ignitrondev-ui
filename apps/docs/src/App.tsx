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
import { type FormEvent, type ReactNode, useEffect, useState } from "react";

const installCommand = "npm install @ignitrondev/ui";

type PageId = "getting-started" | "buttons" | "forms" | "display" | "overlays";

type Page = {
  id: PageId;
  label: string;
  title: string;
  crumbs: readonly string[];
  lede: string;
};

const pages: readonly Page[] = [
  {
    id: "getting-started",
    label: "Getting started",
    title: "Getting started",
    crumbs: ["Getting started"],
    lede: "Install the package, import the stylesheet once, then use the components.",
  },
  {
    id: "buttons",
    label: "Buttons",
    title: "Buttons",
    crumbs: ["Components", "Buttons"],
    lede: "Square actions. The primary fill turns ignition amber on hover.",
  },
  {
    id: "forms",
    label: "Forms",
    title: "Forms",
    crumbs: ["Components", "Forms"],
    lede: "Fields, checkbox, and switch. Nothing on this page is sent anywhere.",
  },
  {
    id: "display",
    label: "Display",
    title: "Display",
    crumbs: ["Components", "Display"],
    lede: "Kickers, badges, tags, status, and the hairline card.",
  },
  {
    id: "overlays",
    label: "Overlays",
    title: "Overlays",
    crumbs: ["Components", "Overlays"],
    lede: "Dialog, menu, and tooltip. Focus stays inside a dialog until it closes.",
  },
];

const componentPages = pages.filter((page) => page.id !== "getting-started");

function findPage(id: PageId): Page {
  const match = pages.find((page) => page.id === id);
  if (!match) {
    throw new Error(`Unknown docs page: ${id}`);
  }
  return match;
}

function pageFromHash(): PageId {
  const id = window.location.hash.replace(/^#\/?/, "");
  const match = pages.find((page) => page.id === id);
  return match?.id ?? "getting-started";
}

export function App() {
  const [pageId, setPageId] = useState<PageId>("getting-started");
  const [menuOpen, setMenuOpen] = useState(false);
  const page = findPage(pageId);

  useEffect(() => {
    if (!window.location.hash) {
      history.replaceState(null, "", "#/getting-started");
    }
    setPageId(pageFromHash());
    const onHash = () => {
      setPageId(pageFromHash());
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.title = `${page.title} — Ignitron UI`;
  }, [page.title]);

  return (
    <div className="min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:border focus:border-line-strong focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-3 border-b border-line bg-background/80 px-4 backdrop-blur-md md:px-6">
        <Button
          size="sm"
          variant="outline"
          className="md:hidden"
          aria-expanded={menuOpen}
          aria-controls="docs-sidebar"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </Button>
        <a href="#/getting-started" className="text-base font-semibold tracking-[-0.03em]">
          Ignitron<span className="text-text-3">UI</span>
        </a>
        <Button asChild size="sm" className="ml-auto">
          <a href="https://github.com/ignitrondev/ignitrondev-ui" target="_blank" rel="noreferrer">
            GitHub
            <span className="ign-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </Button>
      </header>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-x-0 top-14 bottom-0 z-30 bg-black/60 md:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <Sidebar open={menuOpen} pageId={pageId} />

      <div className="pt-14 md:pl-60">
        <main id="content" className="px-4 py-8 md:px-10 md:py-10">
          <Breadcrumb crumbs={page.crumbs} />
          <h1
            tabIndex={-1}
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] outline-none md:text-4xl"
          >
            {page.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-2">{page.lede}</p>
          <div className="mt-8">{pageContent(page.id)}</div>
        </main>
        <footer className="border-t border-line px-4 py-6 md:px-10">
          <p className="font-mono text-[11px] tracking-[0.12em] text-text-3 uppercase">
            Ignitron UI 0.1
          </p>
        </footer>
      </div>
    </div>
  );
}

function Sidebar({ open, pageId }: { open: boolean; pageId: PageId }) {
  return (
    <aside
      id="docs-sidebar"
      className={`fixed top-14 bottom-0 left-0 z-40 w-60 overflow-y-auto border-r border-line bg-background px-3 py-6 ${
        open ? "block" : "hidden"
      } md:block`}
    >
      <nav aria-label="Docs">
        <SidebarLink pageId="getting-started" current={pageId}>
          Getting started
        </SidebarLink>
        <p className="mt-8 mb-2 px-3 font-mono text-[10px] font-medium tracking-[0.14em] text-text-4 uppercase">
          Components
        </p>
        <ul className="grid gap-0.5">
          {componentPages.map((page) => (
            <li key={page.id}>
              <SidebarLink pageId={page.id} current={pageId}>
                {page.label}
              </SidebarLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function SidebarLink({
  pageId,
  current,
  children,
}: {
  pageId: PageId;
  current: PageId;
  children: ReactNode;
}) {
  const active = pageId === current;
  return (
    <a
      href={`#/${pageId}`}
      aria-current={active ? "page" : undefined}
      className={`block border-l px-3 py-2 text-sm transition-colors ${
        active
          ? "border-brand text-foreground"
          : "border-transparent text-text-2 hover:text-foreground"
      }`}
    >
      {children}
    </a>
  );
}

function Breadcrumb({ crumbs }: { crumbs: readonly string[] }) {
  const items = ["Ignitron UI", ...crumbs];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span className="text-text-4" aria-hidden="true">
                  /
                </span>
              ) : null}
              {last ? (
                <span className="text-foreground" aria-current="page">
                  {item}
                </span>
              ) : index === 0 ? (
                <a href="#/getting-started" className="text-text-3 hover:text-foreground">
                  {item}
                </a>
              ) : (
                <span className="text-text-3">{item}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function pageContent(id: PageId) {
  switch (id) {
    case "getting-started":
      return <GettingStarted />;
    case "buttons":
      return <Buttons />;
    case "forms":
      return <Forms />;
    case "display":
      return <Display />;
    case "overlays":
      return <Overlays />;
  }
}

function GettingStarted() {
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
    <div className="grid max-w-3xl gap-6">
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
            <a href="#/buttons">
              Buttons
              <span className="ign-arrow" aria-hidden="true">
                →
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
