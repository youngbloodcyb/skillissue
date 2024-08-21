import React from "react";
import { ProgressBar } from "react95";

export const LoadingBar = () => {
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPercent((previousPercent) => {
        if (previousPercent === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(previousPercent + diff, 100);
      });
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (percent === 100) {
    return null;
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#c3c3c3] absolute top-0 left-0 z-50">
      <ProgressBar
        className=" max-w-5xl"
        variant="tile"
        value={Math.floor(percent)}
      />
    </div>
  );
};
