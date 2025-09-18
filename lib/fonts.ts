import localFont from "next/font/local";

// Use local fonts to avoid Google Fonts timeout issues on VPS
// These fonts will work reliably without network dependencies

export const openSans = localFont({
  src: "../assets/font/vnf-caviar.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-open-sans",
});

export const montserrat = localFont({
  src: "../assets/font/vnf-caviar.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-montserrat",
});

export const baloo = localFont({
  src: "../assets/font/iCielNabila.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-baloo",
});

export const inter = localFont({
  src: "../assets/font/vnf-caviar.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-inter",
});

// CSS fallback classes for better font rendering
export const fontClasses = {
  openSans: "font-sans",
  montserrat: "font-sans",
  baloo: "font-sans",
  inter: "font-sans",
};
