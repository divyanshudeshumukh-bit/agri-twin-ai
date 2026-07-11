export type ScenarioKey = "healthy" | "dry" | "disease";

export interface Scenario {
  key: ScenarioKey;
  name: string;
  emoji: string;
  description: string;
  sensors: {
    soilMoisture: number;
    soilTemp: number;
    airTemp: number;
    humidity: number;
    soilPh: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    windSpeed: number;
    rainProb: number;
    plantHealth: number;
    growth: number;
    harvestDays: number;
  };
  weather: { condition: string; temp: number };
  farm: {
    plantCount: number;
    healthy: number;
    warning: number;
    diseased: number;
    waterTank: number;
    droneStatus: "Idle" | "Scanning" | "Offline";
    sensorStatus: "Online" | "Degraded" | "Offline";
  };
  disease: {
    suspected: number;
    confirmed: number;
    highRiskAreas: number;
    breakdown: { name: string; value: number; severity: "low" | "medium" | "high"; info: string }[];
  };
  alerts: { id: string; severity: "info" | "warning" | "critical"; title: string; time: string }[];
  healthScore: number;
}

export const scenarios: Record<ScenarioKey, Scenario> = {
  healthy: {
    key: "healthy",
    name: "Healthy Farm",
    emoji: "🌱",
    description: "Optimal conditions across all sensors",
    sensors: {
      soilMoisture: 68, soilTemp: 24, airTemp: 27, humidity: 62,
      soilPh: 6.7, nitrogen: 82, phosphorus: 74, potassium: 79,
      windSpeed: 8, rainProb: 20, plantHealth: 94, growth: 72, harvestDays: 24,
    },
    weather: { condition: "Sunny", temp: 27 },
    farm: { plantCount: 149, healthy: 132, warning: 14, diseased: 3, waterTank: 84, droneStatus: "Idle", sensorStatus: "Online" },
    disease: {
      suspected: 6, confirmed: 3, highRiskAreas: 1,
      breakdown: [
        { name: "Healthy", value: 132, severity: "low", info: "132 plants showing full canopy vigor with no visible stress markers." },
        { name: "Leaf Rust", value: 2, severity: "medium", info: "Small orange pustules on lower leaves. Isolated to row 4. Apply preventive fungicide." },
        { name: "Powdery Mildew", value: 1, severity: "low", info: "Single plant with early white spotting. Increase airflow and monitor for 48h." },
      ],
    },
    alerts: [
      { id: "a1", severity: "info", title: "Optimal watering window at 06:00 tomorrow", time: "2m ago" },
      { id: "a2", severity: "warning", title: "Row 7 pH drifted to 6.3 — recheck", time: "18m ago" },
      { id: "a3", severity: "info", title: "Drone battery fully charged", time: "1h ago" },
    ],
    healthScore: 92,
  },
  dry: {
    key: "dry",
    name: "Dry Farm",
    emoji: "☀️",
    description: "Low moisture, irrigation recommended",
    sensors: {
      soilMoisture: 22, soilTemp: 34, airTemp: 38, humidity: 28,
      soilPh: 6.2, nitrogen: 55, phosphorus: 48, potassium: 61,
      windSpeed: 14, rainProb: 5, plantHealth: 68, growth: 54, harvestDays: 32,
    },
    weather: { condition: "Hot & Dry", temp: 38 },
    farm: { plantCount: 149, healthy: 98, warning: 39, diseased: 12, waterTank: 32, droneStatus: "Scanning", sensorStatus: "Online" },
    disease: {
      suspected: 21, confirmed: 12, highRiskAreas: 3,
      breakdown: [
        { name: "Healthy", value: 98, severity: "low", info: "Plants holding despite drought stress." },
        { name: "Leaf Curl", value: 18, severity: "medium", info: "Curling leaves from water stress. Not pathogenic yet — irrigate immediately." },
        { name: "Sunscald", value: 9, severity: "high", info: "Tissue damage from prolonged direct sun. Deploy 30% shade netting." },
        { name: "Bacterial Wilt", value: 3, severity: "high", info: "Confirmed in west quadrant. Remove affected plants and disinfect tools." },
      ],
    },
    alerts: [
      { id: "d1", severity: "critical", title: "West quadrant soil moisture at 18% — critical", time: "just now" },
      { id: "d2", severity: "warning", title: "Water tank at 32%, refill within 24h", time: "12m ago" },
      { id: "d3", severity: "critical", title: "Air temp exceeds crop threshold (38°C)", time: "40m ago" },
    ],
    healthScore: 64,
  },
  disease: {
    key: "disease",
    name: "Disease Outbreak",
    emoji: "🍂",
    description: "Fungal disease detected in NE quadrant",
    sensors: {
      soilMoisture: 74, soilTemp: 26, airTemp: 29, humidity: 84,
      soilPh: 5.8, nitrogen: 68, phosphorus: 52, potassium: 70,
      windSpeed: 6, rainProb: 78, plantHealth: 52, growth: 60, harvestDays: 40,
    },
    weather: { condition: "Humid & Rainy", temp: 29 },
    farm: { plantCount: 149, healthy: 74, warning: 41, diseased: 34, waterTank: 68, droneStatus: "Scanning", sensorStatus: "Degraded" },
    disease: {
      suspected: 48, confirmed: 34, highRiskAreas: 5,
      breakdown: [
        { name: "Healthy", value: 74, severity: "low", info: "Uninfected plants concentrated in south quadrant." },
        { name: "Late Blight", value: 22, severity: "high", info: "Fungus Phytophthora infestans. Dark lesions expanding under high humidity. Apply copper hydroxide tonight." },
        { name: "Powdery Mildew", value: 8, severity: "medium", info: "White powdery growth on upper leaves. Reduce canopy density and apply sulfur spray." },
        { name: "Root Rot", value: 4, severity: "high", info: "Soil moisture too high. Reduce irrigation 20% and improve drainage." },
      ],
    },
    alerts: [
      { id: "x1", severity: "critical", title: "Blight outbreak confirmed in NE quadrant", time: "5m ago" },
      { id: "x2", severity: "critical", title: "Humidity 84% — extreme fungal risk", time: "20m ago" },
      { id: "x3", severity: "warning", title: "Sensor S-07 signal degraded", time: "1h ago" },
      { id: "x4", severity: "info", title: "Rain expected in 4h — pause irrigation", time: "1h ago" },
    ],
    healthScore: 48,
  },
};

// ------- Sensor Network devices ---------

export interface Device {
  id: string;
  name: string;
  type: string;
  status: "Online" | "Warning" | "Offline";
  battery: number;
  signal: number;
  health: number;
  lastUpdate: string;
  location: string;
}

export function devicesFor(key: ScenarioKey): Device[] {
  const degraded = key === "disease";
  const dry = key === "dry";
  const j = (n: number, off = 0) => Math.max(0, Math.min(100, n + off));
  return [
    { id: "SS-01", name: "Soil Sensor Array", type: "Soil Sensors", status: "Online", battery: j(84), signal: j(92), health: j(96), lastUpdate: "12s ago", location: "Zone A" },
    { id: "WS-01", name: "Weather Station", type: "Weather Station", status: "Online", battery: j(91), signal: j(88), health: j(98), lastUpdate: "8s ago", location: "Rooftop" },
    { id: "DR-α", name: "Scout Drone α", type: "Drone", status: key === "healthy" ? "Online" : "Online", battery: j(dry ? 42 : 78), signal: j(85), health: j(94), lastUpdate: "30s ago", location: "Aerial" },
    { id: "WP-01", name: "Main Water Pump", type: "Water Pump", status: dry ? "Warning" : "Online", battery: 100, signal: j(96), health: j(dry ? 72 : 95), lastUpdate: "1m ago", location: "Reservoir" },
    { id: "IR-01", name: "Irrigation Controller", type: "Irrigation Controller", status: "Online", battery: 100, signal: j(94), health: j(97), lastUpdate: "45s ago", location: "Field Hub" },
    { id: "CM-01", name: "Smart Camera", type: "Smart Camera", status: degraded ? "Warning" : "Online", battery: j(69), signal: j(degraded ? 58 : 90), health: j(degraded ? 74 : 96), lastUpdate: "20s ago", location: "Zone B" },
    { id: "NPK-01", name: "NPK Sensor", type: "NPK Sensor", status: "Online", battery: j(76), signal: j(87), health: j(95), lastUpdate: "1m ago", location: "Zone C" },
    { id: "PH-01", name: "pH Sensor", type: "pH Sensor", status: "Online", battery: j(81), signal: j(89), health: j(97), lastUpdate: "20s ago", location: "Zone A" },
    { id: "TMP-01", name: "Temperature Probe", type: "Temperature Sensor", status: "Online", battery: j(78), signal: j(91), health: j(96), lastUpdate: "10s ago", location: "Zone B" },
    { id: "HUM-01", name: "Humidity Sensor", type: "Humidity Sensor", status: degraded ? "Warning" : "Online", battery: j(85), signal: j(degraded ? 62 : 93), health: j(degraded ? 70 : 96), lastUpdate: "15s ago", location: "Greenhouse" },
  ];
}

// ------- Intelligent percentage indicators ---------

export interface Metric {
  key: string;
  label: string;
  value: number; // 0-100
  tone: "good" | "warning" | "critical";
  tooltip: string;
}

function tone(v: number, opts?: { invert?: boolean }): "good" | "warning" | "critical" {
  const invert = opts?.invert ?? false;
  if (invert) {
    if (v <= 25) return "good";
    if (v <= 55) return "warning";
    return "critical";
  }
  if (v >= 70) return "good";
  if (v >= 40) return "warning";
  return "critical";
}

// Map raw sensor to a percentage relative to ideal band.
function idealBand(v: number, low: number, ideal: number, high: number) {
  if (v <= low || v >= high) return 15;
  const span = v < ideal ? ideal - low : high - ideal;
  const dist = Math.abs(v - ideal);
  return Math.round(Math.max(15, 100 - (dist / span) * 60));
}

export function metricsFor(s: Scenario): Metric[] {
  const sn = s.sensors;
  const items: Omit<Metric, "tone">[] = [
    { key: "moisture", label: "Soil Moisture", value: sn.soilMoisture, tooltip: `Live soil moisture ${sn.soilMoisture}%. Optimal band 55–75%.` },
    { key: "plant", label: "Plant Health", value: sn.plantHealth, tooltip: `Composite of leaf color, turgor and canopy density across ${s.farm.plantCount} plants.` },
    { key: "growth", label: "Growth", value: sn.growth, tooltip: `Growth index vs. baseline curve for the current crop stage.` },
    { key: "humidity", label: "Humidity", value: sn.humidity, tooltip: `Ambient humidity ${sn.humidity}%. Values >80% raise fungal risk.` },
    { key: "temp", label: "Temperature Status", value: idealBand(sn.airTemp, 5, 25, 40), tooltip: `Air temp ${sn.airTemp}°C. Ideal band 22–28°C for current crop mix.` },
    { key: "ph", label: "Soil pH Status", value: idealBand(sn.soilPh, 4.5, 6.5, 8), tooltip: `Soil pH ${sn.soilPh}. Target 6.2–6.8 for maximum nutrient uptake.` },
    { key: "n", label: "Nitrogen Level", value: sn.nitrogen, tooltip: `Nitrogen ppm normalized to seasonal target. Drives leaf and stem growth.` },
    { key: "p", label: "Phosphorus Level", value: sn.phosphorus, tooltip: `Phosphorus ppm. Critical for root development and flowering.` },
    { key: "k", label: "Potassium Level", value: sn.potassium, tooltip: `Potassium ppm. Improves stress tolerance and fruit quality.` },
    { key: "disease", label: "Disease Risk", value: Math.max(0, 100 - sn.plantHealth), tooltip: `AI-modeled disease probability across all zones. Lower is better.` },
    { key: "water", label: "Water Availability", value: s.farm.waterTank, tooltip: `Reservoir fill level ${s.farm.waterTank}%. Refill triggers below 40%.` },
    { key: "harvest", label: "Harvest Readiness", value: Math.round(Math.max(10, 100 - (sn.harvestDays / 60) * 100)), tooltip: `Projected harvest in ${sn.harvestDays} days. Increases as crop matures.` },
  ];
  return items.map((m) => ({
    ...m,
    tone: m.key === "disease" ? tone(m.value, { invert: true }) : tone(m.value),
  }));
}

export const timeSeries = (base: number, variance = 8, points = 24) =>
  Array.from({ length: points }, (_, i) => ({
    t: `${i.toString().padStart(2, "0")}:00`,
    value: Math.max(0, Math.round(base + Math.sin(i / 3) * variance + (Math.random() - 0.5) * variance)),
  }));

export const plants = Array.from({ length: 12 }, (_, i) => ({
  id: `PL-${(i + 1).toString().padStart(4, "0")}`,
  crop: ["Tomato", "Corn", "Wheat", "Soybean"][i % 4],
  age: 20 + i * 3,
  growth: 40 + ((i * 7) % 55),
  health: 55 + ((i * 11) % 44),
  diseaseRisk: (i * 13) % 60,
  disease: i % 4 === 0 ? "None" : ["Leaf Rust", "Blight", "None", "Powdery Mildew"][i % 4],
  waterToday: 1.2 + (i % 5) * 0.3,
  fertilizer: ["NPK 10-10-10", "Urea", "DAP", "MOP"][i % 4],
  harvestRemaining: 18 + ((i * 5) % 30),
  expectedYield: (2.4 + (i % 4) * 0.6).toFixed(1),
}));

// ------- Farm Zones ---------

export interface Zone {
  id: string;
  name: string;
  area: string;
  crop: string;
  health: number;
  disease: number;
  growth: number;
  water: "Optimal" | "Low" | "High";
  sensor: "Online" | "Warning" | "Offline";
  alert: "Normal" | "Warning" | "Critical";
  plants: number;
}

export function zonesFor(key: ScenarioKey): Zone[] {
  const base: Zone[] = [
    { id: "A", name: "Zone A", area: "1.2 ha", crop: "Tomato",  health: 94, disease: 6,  growth: 74, water: "Optimal", sensor: "Online",  alert: "Normal",   plants: 42 },
    { id: "B", name: "Zone B", area: "0.9 ha", crop: "Corn",    health: 88, disease: 12, growth: 68, water: "Optimal", sensor: "Online",  alert: "Normal",   plants: 36 },
    { id: "C", name: "Zone C", area: "1.4 ha", crop: "Wheat",   health: 82, disease: 18, growth: 70, water: "Low",     sensor: "Warning", alert: "Warning",  plants: 39 },
    { id: "D", name: "Zone D", area: "0.7 ha", crop: "Soybean", health: 78, disease: 22, growth: 61, water: "Optimal", sensor: "Online",  alert: "Warning",  plants: 32 },
  ];
  if (key === "dry") {
    base[0] = { ...base[0], health: 72, water: "Low", alert: "Warning" };
    base[2] = { ...base[2], health: 58, water: "Low", alert: "Critical", disease: 34 };
  }
  if (key === "disease") {
    base[3] = { ...base[3], health: 42, disease: 58, alert: "Critical", sensor: "Warning" };
    base[1] = { ...base[1], health: 66, disease: 34, alert: "Warning" };
  }
  return base;
}

// ------- Notifications ---------

export interface Notification {
  id: string;
  icon: "disease" | "irrigation-start" | "irrigation-done" | "fertilizer" | "report" | "weather" | "sensor";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export function baseNotifications(key: ScenarioKey): Notification[] {
  const common: Notification[] = [
    { id: "n1", icon: "report", title: "New Report Generated", body: "Weekly farm report is ready for review.", time: "3m ago", read: false },
    { id: "n2", icon: "irrigation-done", title: "Irrigation Completed", body: "Zone A irrigation cycle finished successfully.", time: "18m ago", read: false },
    { id: "n3", icon: "fertilizer", title: "Fertilizer Reminder", body: "Next NPK application scheduled for tomorrow.", time: "1h ago", read: true },
    { id: "n4", icon: "weather", title: "Weather Warning", body: "Heavy rain expected in 6 hours.", time: "2h ago", read: true },
  ];
  if (key === "disease") common.unshift({ id: "nd", icon: "disease", title: "Disease Alert", body: "Late Blight detected in NE quadrant. Immediate action recommended.", time: "just now", read: false });
  if (key === "dry") common.unshift({ id: "ns", icon: "sensor", title: "Sensor Offline", body: "Soil sensor SS-04 signal lost.", time: "5m ago", read: false });
  return common;
}

// ------- Reports ---------

export interface FarmReport {
  id: string;
  title: string;
  date: string;
  scenario: string;
  summary: string;
}

export const pastReports: FarmReport[] = [
  { id: "R-2028", title: "Weekly Health Summary", date: "Nov 28, 2025", scenario: "Healthy", summary: "Farm operating at 92% health. Yield forecast +21%." },
  { id: "R-2027", title: "Disease Response Report", date: "Nov 21, 2025", scenario: "Disease Outbreak", summary: "Late blight contained in NE quadrant after 3-day treatment." },
  { id: "R-2026", title: "Water Efficiency Review", date: "Nov 14, 2025", scenario: "Dry", summary: "34% reduction in water use vs baseline. Smart irrigation active." },
  { id: "R-2025", title: "Monthly Yield Forecast", date: "Nov 01, 2025", scenario: "Healthy", summary: "Projected harvest in 24 days. Confidence 92%." },
];
