import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type HashiraTheme = 
  | "tanjiro"
  | "nezuko"
  | "rengoku"
  | "giyu"
  | "shinobu"
  | "muichiro"
  | "zenitsu"
  | "tengen"
  | "gyomei"
  | "sanemi";

interface HashiraColors {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  gradient: string;
}

export const hashiraThemes: Record<HashiraTheme, { name: string; japaneseName: string; title: string; colors: HashiraColors; description: string }> = {
  tanjiro: {
    name: "Tanjiro Kamado",
    japaneseName: "竈門炭治郎",
    title: "水の呼吸",
    description: "Water Breathing - Calm yet powerful",
    colors: {
      primary: "180 80% 45%",
      secondary: "160 50% 30%",
      accent: "200 90% 55%",
      glow: "180 80% 50%",
      gradient: "linear-gradient(135deg, hsl(180, 80%, 45%), hsl(200, 90%, 55%))",
    },
  },
  nezuko: {
    name: "Nezuko Kamado",
    japaneseName: "竈門禰豆子",
    title: "血鬼術",
    description: "Blood Demon Art - Gentle and protective",
    colors: {
      primary: "340 70% 55%",
      secondary: "350 60% 45%",
      accent: "330 80% 70%",
      glow: "340 80% 60%",
      gradient: "linear-gradient(135deg, hsl(340, 70%, 55%), hsl(330, 80%, 70%))",
    },
  },
  rengoku: {
    name: "Kyojuro Rengoku",
    japaneseName: "煉獄杏寿郎",
    title: "炎の呼吸",
    description: "Flame Breathing - Set your heart ablaze",
    colors: {
      primary: "25 95% 55%",
      secondary: "0 85% 50%",
      accent: "45 100% 55%",
      glow: "25 100% 60%",
      gradient: "linear-gradient(135deg, hsl(45, 100%, 55%), hsl(25, 95%, 55%), hsl(0, 85%, 50%))",
    },
  },
  giyu: {
    name: "Giyu Tomioka",
    japaneseName: "冨岡義勇",
    title: "水の呼吸",
    description: "Water Breathing - Flow like water",
    colors: {
      primary: "210 80% 50%",
      secondary: "200 70% 40%",
      accent: "220 90% 60%",
      glow: "210 90% 55%",
      gradient: "linear-gradient(135deg, hsl(200, 70%, 40%), hsl(220, 90%, 60%))",
    },
  },
  shinobu: {
    name: "Shinobu Kocho",
    japaneseName: "胡蝶しのぶ",
    title: "蟲の呼吸",
    description: "Insect Breathing - Swift and deadly",
    colors: {
      primary: "280 60% 55%",
      secondary: "270 50% 45%",
      accent: "290 70% 70%",
      glow: "280 70% 60%",
      gradient: "linear-gradient(135deg, hsl(270, 50%, 45%), hsl(290, 70%, 70%))",
    },
  },
  muichiro: {
    name: "Muichiro Tokito",
    japaneseName: "時透無一郎",
    title: "霞の呼吸",
    description: "Mist Breathing - Ethereal and swift",
    colors: {
      primary: "180 30% 60%",
      secondary: "190 25% 50%",
      accent: "170 40% 70%",
      glow: "180 35% 65%",
      gradient: "linear-gradient(135deg, hsl(190, 25%, 50%), hsl(170, 40%, 70%))",
    },
  },
  zenitsu: {
    name: "Zenitsu Agatsuma",
    japaneseName: "我妻善逸",
    title: "雷の呼吸",
    description: "Thunder Breathing - Lightning speed",
    colors: {
      primary: "50 100% 50%",
      secondary: "45 90% 45%",
      accent: "55 100% 60%",
      glow: "50 100% 55%",
      gradient: "linear-gradient(135deg, hsl(45, 90%, 45%), hsl(55, 100%, 60%))",
    },
  },
  tengen: {
    name: "Tengen Uzui",
    japaneseName: "宇髄天元",
    title: "音の呼吸",
    description: "Sound Breathing - Flamboyant style",
    colors: {
      primary: "320 70% 55%",
      secondary: "15 80% 55%",
      accent: "340 80% 65%",
      glow: "320 80% 60%",
      gradient: "linear-gradient(135deg, hsl(15, 80%, 55%), hsl(340, 80%, 65%))",
    },
  },
  gyomei: {
    name: "Gyomei Himejima",
    japaneseName: "悲鳴嶼行冥",
    title: "岩の呼吸",
    description: "Stone Breathing - Unwavering strength",
    colors: {
      primary: "30 35% 45%",
      secondary: "25 30% 35%",
      accent: "35 40% 55%",
      glow: "30 40% 50%",
      gradient: "linear-gradient(135deg, hsl(25, 30%, 35%), hsl(35, 40%, 55%))",
    },
  },
  sanemi: {
    name: "Sanemi Shinazugawa",
    japaneseName: "不死川実弥",
    title: "風の呼吸",
    description: "Wind Breathing - Fierce and relentless",
    colors: {
      primary: "140 50% 45%",
      secondary: "130 40% 35%",
      accent: "150 60% 55%",
      glow: "140 55% 50%",
      gradient: "linear-gradient(135deg, hsl(130, 40%, 35%), hsl(150, 60%, 55%))",
    },
  },
};

interface HashiraThemeContextType {
  theme: HashiraTheme;
  setTheme: (theme: HashiraTheme) => void;
  colors: HashiraColors;
  themeInfo: typeof hashiraThemes[HashiraTheme];
}

const HashiraThemeContext = createContext<HashiraThemeContextType | undefined>(undefined);

export const HashiraThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<HashiraTheme>(() => {
    const saved = localStorage.getItem("hashira-theme");
    return (saved as HashiraTheme) || "tanjiro";
  });

  const themeInfo = hashiraThemes[theme];
  const colors = themeInfo.colors;

  useEffect(() => {
    localStorage.setItem("hashira-theme", theme);
    
    // Update CSS custom properties
    const root = document.documentElement;
    root.style.setProperty("--hashira-primary", colors.primary);
    root.style.setProperty("--hashira-secondary", colors.secondary);
    root.style.setProperty("--hashira-accent", colors.accent);
    root.style.setProperty("--hashira-glow", colors.glow);
  }, [theme, colors]);

  return (
    <HashiraThemeContext.Provider value={{ theme, setTheme, colors, themeInfo }}>
      {children}
    </HashiraThemeContext.Provider>
  );
};

export const useHashiraTheme = () => {
  const context = useContext(HashiraThemeContext);
  if (!context) {
    throw new Error("useHashiraTheme must be used within HashiraThemeProvider");
  }
  return context;
};