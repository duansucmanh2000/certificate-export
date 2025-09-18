import { Open_Sans, Montserrat, Baloo_2, Inter } from "next/font/google";

// Configure fonts with fallbacks and error handling
export const openSans = Open_Sans({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: false, // Disable preloading to avoid timeout issues
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: false,
});

export const baloo = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: false,
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
  preload: false,
});
