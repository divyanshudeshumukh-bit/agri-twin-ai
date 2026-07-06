import { createContext, useContext, useState, type ReactNode } from "react";
import { scenarios, type ScenarioKey, type Scenario } from "./mock-data";

interface Ctx {
  scenario: Scenario;
  scenarioKey: ScenarioKey;
  setScenario: (k: ScenarioKey) => void;
}

const FarmCtx = createContext<Ctx | null>(null);

export function FarmProvider({ children }: { children: ReactNode }) {
  const [key, setKey] = useState<ScenarioKey>("healthy");
  return (
    <FarmCtx.Provider value={{ scenario: scenarios[key], scenarioKey: key, setScenario: setKey }}>
      {children}
    </FarmCtx.Provider>
  );
}

export function useFarm() {
  const ctx = useContext(FarmCtx);
  if (!ctx) throw new Error("useFarm must be inside FarmProvider");
  return ctx;
}
