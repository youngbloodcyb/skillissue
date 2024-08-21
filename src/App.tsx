import React from "react";
import { nanoid } from "nanoid";

// component imports
import { LoadingBar } from "./components/loading-bar";
import { BottomNav } from "./components/bottom-nav";

// themeing
import { styleReset } from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

type IconPosition = {
  x: number;
  y: number;
};

type Icon = {
  id: string;
  name: string;
  position: IconPosition;
  image: string;
};

const defaultIcons: Icon[] = [
  {
    id: nanoid(6),
    name: "Videos",
    position: { x: 20, y: 35 },
    image: "/icons/video-camera.png",
  },
  {
    id: nanoid(6),
    name: "Blog",
    position: { x: 100, y: 235 },
    image: "/icons/blog.png",
  },
];

function App() {
  const [icons, setIcons] = React.useState<Icon[]>(defaultIcons);
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState<IconPosition | null>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string
  ) => {
    setDragging(id);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (!dragging || !dragStart) return;

    const newIcons = icons.map((icon) => {
      if (icon.id === dragging) {
        return {
          ...icon,
          position: {
            x: icon.position.x + event.clientX - dragStart.x,
            y: icon.position.y + event.clientY - dragStart.y,
          },
        };
      }
      return icon;
    });

    setIcons(newIcons);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragStart(null);
  };

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <div
          className="w-full h-full relative  bg-[#008080]"
          onDragOver={(e) => e.preventDefault()}
        >
          <LoadingBar />
          {icons.map((icon) => (
            <div
              className={`absolute cursor-pointer flex flex-col gap-2 p-2 rounded-sm ${
                icon.id === dragging ? "border-dashed border" : ""
              }`}
              onDragStart={(event) => handleDragStart(event, icon.id)}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              key={icon.id}
              style={{
                left: icon.position.x,
                top: icon.position.y,
              }}
            >
              <img src={icon.image} alt={icon.name} />
              <p className="text-xs text-center">{icon.name}</p>
            </div>
          ))}
          <div className="bottom-0 left-0 absolute w-full">
            <BottomNav />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
