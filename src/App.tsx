import { useEffect, useState } from "react";
import { Desktop } from "./Desktop";
import { Projects } from "./Projects";

export const App = (): JSX.Element => {
  const [route, setRoute] = useState<string>(window.location.hash || "#/");

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "#/projects" || route === "#/projects/") return <Projects />;
  return <Desktop />;
};

export default App;
