import React from "react";
import { DosFn, DosProps } from "../types/dos";

declare global {
  interface Window {
    Dos: DosFn;
  }
}

interface DiggerProps {
  onInit: (dosProps: DosProps | null) => void;
}

export const Digger: React.FC<DiggerProps> = ({ onInit }) => {
  React.useEffect(() => {
    let dosProps: DosProps | null = null;

    const loadScript = (src: string, onLoad: () => void) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        onLoad();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    loadScript("https://v8.js-dos.com/latest/js-dos.js", () => {
      const dosElement = document.getElementById("dos") as HTMLDivElement;
      if (dosElement && window.Dos) {
        dosProps = window.Dos(dosElement, {
          url: "https://cdn.dos.zone/original/2X/9/9ed7eb9c2c441f56656692ed4dc7ab28f58503ce.jsdos",
          noCloud: true,
          autoStart: true,
          kiosk: true,
          noNetworking: true,
          server: "newyork",
        });
        onInit(dosProps); // Pass the dosProps to the parent component
      }
    });

    // Cleanup function to stop the game and clean up resources
    return () => {
      if (dosProps) {
        dosProps.stop().then(() => {
          console.log("DOS KILLED");
          dosProps = null; // Ensure the instance is cleared
        });
      }
    };
  }, [onInit]);

  return (
    <div id="dos" style={{ width: "100%", height: "96%" }}>
      <link rel="stylesheet" href="https://v8.js-dos.com/latest/js-dos.css" />
    </div>
  );
};
