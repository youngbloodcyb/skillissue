export type DosEvent = "emu-ready" | "ci-ready" | "bnd-play";
export type ImageRendering = "pixelated" | "smooth";
export type RenderBackend = "webgl" | "canvas";
export type RenderAspect =
  | "AsIs"
  | "1/1"
  | "5/4"
  | "4/3"
  | "16/10"
  | "16/9"
  | "Fit";

export interface DosOptions {
  url: string;
  dosboxConf: string;
  background: string;
  pathPrefix: string;
  theme:
    | "light"
    | "dark"
    | "cupcake"
    | "bumblebee"
    | "emerald"
    | "corporate"
    | "synthwave"
    | "retro"
    | "cyberpunk"
    | "valentine"
    | "halloween"
    | "garden"
    | "forest"
    | "aqua"
    | "lofi"
    | "pastel"
    | "fantasy"
    | "wireframe"
    | "black"
    | "luxury"
    | "dracula"
    | "cmyk"
    | "autumn"
    | "business"
    | "acid"
    | "lemonade"
    | "night"
    | "coffee"
    | "winter";
  lang: "ru" | "en";
  backend: "dosbox" | "dosboxX";
  backendLocked: boolean;
  backendHardware: (backend: "dosbox" | "dosboxX") => Promise<string | null>;
  workerThread: boolean;
  mouseCapture: boolean;
  onEvent: (event: DosEvent, ci?: any /* CommandInterface */) => void;
  server: "netherlands" | "newyork" | "singapore";
  room: string;
  fullScreen: boolean;
  sockdriveBackend: {
    name: string;
    host: string;
  };
  loginUrl: string;
  autoStart: boolean;
  kiosk: boolean;
  imageRendering: ImageRendering;
  renderBackend: RenderBackend;
  renderAspect: RenderAspect;
  noNetworking: boolean;
  noCloud: boolean;
  scaleControls: number;
  mouseSensitivity: number;
}

export interface DosProps {
  setTheme(theme: DosOptions["theme"]): void;
  setLang(lang: DosOptions["lang"]): void;
  setBackend(backend: DosOptions["backend"]): void;
  setBackendLocked(locked: boolean): void;
  setWorkerThread(capture: DosOptions["workerThread"]): void;
  setMouseCapture(capture: DosOptions["mouseCapture"]): void;
  setServer(server: DosOptions["server"]): void;
  setRoom(room: DosOptions["room"]): void;
  setFrame(frame: "network"): void;
  setBackground(background: string | null): void;
  setFullScreen(fullScreen: boolean): void;
  setAutoStart(autoStart: boolean): void;
  setKiosk(kiosk: boolean): void;
  setImageRendering(rendering: ImageRendering): void;
  setRenderBackend(backend: RenderBackend): void;
  setRenderAspect(aspect: RenderAspect): void;
  setNoNetworking(noNetworking: boolean): void;
  setNoCloud(noCloud: boolean): void;
  setPaused(pause: boolean): void;
  setScaleControls(scaleControls: number): void;
  setMouseSensitivity(mouseSensitivity: number): void;

  stop(): Promise<void>;
}

export type DosFn = (
  element: HTMLDivElement,
  options: Partial<DosOptions>
) => DosProps;

// declare const Dos: DosFn;
