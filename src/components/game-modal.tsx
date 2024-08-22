import React from "react";
import { Window, WindowHeader, Button } from "react95";
import { Digger } from "./digger";
import { DosProps } from "../types/dos";

interface GameModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const GameModal: React.FC<GameModalProps> = ({ open, setOpen }) => {
  const [dosProps, setDosProps] = React.useState<DosProps | null>(null);

  const handleClose = () => {
    if (dosProps) {
      dosProps.stop().then(() => {
        console.log("DOS Program Terminated");
        setDosProps(null); // Clear the dosProps after stopping the program
        setOpen(false);
      });
    } else {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <Window
      key={open ? "open" : "closed"}
      className="window h-[800px] w-[800px]"
    >
      <WindowHeader className="window-title">
        <span>digger.exe</span>
        <Button onClick={handleClose}>
          <span className="close-icon" />
        </Button>
      </WindowHeader>
      <Digger onInit={setDosProps} />
    </Window>
  );
};
