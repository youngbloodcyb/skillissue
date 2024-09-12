import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  MenuList,
  MenuListItem,
  Separator,
} from "react95";

export const BottomNav = () => {
  const [open, setOpen] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(
    new Date().toLocaleString()
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <AppBar position="relative">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold" }}
          >
            <img
              src="/icons/globe.png"
              alt="skill issue studio logo"
              style={{ height: "20px", marginRight: 4 }}
            />
            Skill Issue Studio
          </Button>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "0",
                top: "-200px",
                width: "180px",
              }}
              onClick={() => setOpen(false)}
            >
              <MenuListItem>
                <span role="img" aria-label="👨‍💻">
                  👨‍💻
                </span>
                <a href="https://9d8.dev/" target="_blank">
                  Business
                </a>
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="👨‍💻">
                  🌎
                </span>
                <a href="https://atka.co/" target="_blank">
                  More business
                </a>
              </MenuListItem>
              <MenuListItem>
                <span role="img" aria-label="📁">
                  📁
                </span>
                <a href="https://cameron.so/" target="_blank">
                  My account
                </a>
              </MenuListItem>
              <Separator />
              <MenuListItem disabled>
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>
        <p>{currentTime}</p>
      </Toolbar>
    </AppBar>
  );
};
