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
    diseased: number;
    waterTank: number;
    droneStatus: "Idle" | "Scanning" | "Offline";
    sensorStatus: "Online" | "Degraded" | "Offline";
  };
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
    farm: { plantCount: 1240, healthy: 1198, diseased: 42, waterTank: 84, droneStatus: "Idle", sensorStatus: "Online" },
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
    farm: { plantCount: 1240, healthy: 940, diseased: 120, waterTank: 32, droneStatus: "Scanning", sensorStatus: "Online" },
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
    farm: { plantCount: 1240, healthy: 780, diseased: 340, waterTank: 68, droneStatus: "Scanning", sensorStatus: "Degraded" },
    healthScore: 48,
  },
};

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
