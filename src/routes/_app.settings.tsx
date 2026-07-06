import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings · AgriTwin AI" }] }),
  component: Settings,
});

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
      <div className="mt-5 grid gap-4">{children}</div>
    </div>
  );
}

function Settings() {
  const [theme, setTheme] = useState("system");
  const [lang, setLang] = useState("en");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your AgriTwin experience</p>
      </div>

      <Section title="Appearance" desc="Theme and language preferences">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger className="rounded-xl mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>

      <Section title="Notifications" desc="Choose which alerts you receive">
        {[
          ["Disease alerts", true],
          ["Irrigation reminders", true],
          ["Weather warnings", true],
          ["Weekly reports", false],
        ].map(([label, def]) => (
          <div key={label as string} className="flex items-center justify-between rounded-xl border border-border/50 p-3">
            <span className="text-sm font-medium">{label}</span>
            <Switch defaultChecked={def as boolean} />
          </div>
        ))}
      </Section>

      <Section title="Farm Profile" desc="Update farm information">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Farm Name</Label>
            <Input defaultValue="Greenfield Acres" className="rounded-xl mt-1" />
          </div>
          <div>
            <Label>Location</Label>
            <Input defaultValue="Sonoma, CA" className="rounded-xl mt-1" />
          </div>
          <div>
            <Label>Size (hectares)</Label>
            <Input type="number" defaultValue={42} className="rounded-xl mt-1" />
          </div>
          <div>
            <Label>Primary Crop</Label>
            <Input defaultValue="Tomato" className="rounded-xl mt-1" />
          </div>
        </div>
      </Section>

      <Section title="API Settings" desc="Connect external services">
        <div>
          <Label>Fireworks API Key</Label>
          <Input type="password" placeholder="fw-••••••••••••" className="rounded-xl mt-1" />
        </div>
        <div>
          <Label>Weather API Key</Label>
          <Input type="password" placeholder="••••••••••••" className="rounded-xl mt-1" />
        </div>
      </Section>

      <div className="flex justify-end">
        <Button className="rounded-xl gradient-primary text-primary-foreground shadow-glow" onClick={() => toast.success("Settings saved")}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
