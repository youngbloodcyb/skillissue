import React from "react";
import { nanoid } from "nanoid";

// component imports
import { LoadingBar } from "./components/loading-bar";
import { BottomNav } from "./components/bottom-nav";
import { GameModal } from "./components/game-modal";

// themeing
import { styleReset } from "react95";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

// analytic
import { Analytics } from "@vercel/analytics/react";

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
  {
    id: nanoid(6),
    name: "Game",
    position: { x: 652, y: 176 },
    image: "/icons/game.png",
  },
];

function App() {
  const [icons, setIcons] = React.useState<Icon[]>(defaultIcons);
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [dragStart, setDragStart] = React.useState<IconPosition | null>(null);
  const [gameModal, setGameModal] = React.useState<boolean>(false);
  const [showDesktopView, setShowDesktopView] = React.useState(
    window.innerWidth > 768
  );

  React.useEffect(() => {
    const handleResize = () => {
      setShowDesktopView(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleDoubleClick = (iconName: string) => {
    switch (iconName) {
      case "Game":
        setGameModal(true);
        break;
      case "Blog":
        window.open("https://cameron.so/posts", "_blank");
        break;
      case "Videos":
        window.open("https://www.youtube.com/@skillissuestudio", "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {showDesktopView ? (
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
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.title = "Double click";
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.title = "";
                }}
                onDragStart={(event) => handleDragStart(event, icon.id)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onDoubleClick={() => handleDoubleClick(icon.name)}
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
            <GameModal open={gameModal} setOpen={setGameModal} />
            <div className="bottom-0 left-0 absolute w-full">
              <BottomNav />
            </div>
          </div>
        ) : (
          <div className="p-4 text-black">
            <h1>skill issue studio</h1>
            <ul className="block">
              <li className="underline">
                <a href="https://www.youtube.com/@skillissuestudio">videos</a>
              </li>
              <li className="underline">
                <a href="https://cameron.so">cameron.so</a>
              </li>
              <li className="underline">
                <a href="https://9d8.dev">9d8.dev</a>
              </li>
              <li className="underline">
                <a href="https://atka.co">atka.co</a>
              </li>
            </ul>
          </div>
        )}
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default App;
