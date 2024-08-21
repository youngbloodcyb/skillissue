import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Toolbar,
  Frame,
} from "react95";

export const WindowModal = () => {
  return (
    <Window className="window">
      <WindowHeader className="window-title">
        <span>react95.exe</span>
        <Button>
          <span className="close-icon" />
        </Button>
      </WindowHeader>
      <Toolbar>
        <Button variant="menu" size="sm">
          File
        </Button>
        <Button variant="menu" size="sm">
          Edit
        </Button>
        <Button variant="menu" size="sm" disabled>
          Save
        </Button>
      </Toolbar>
      <WindowContent>
        <p>When you set &quot;resizable&</p>
      </WindowContent>
      <Frame variant="well" className="footer">
        Put some useful information here
      </Frame>
    </Window>
  );
};
