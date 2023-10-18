import "./App.css";
import { useState } from "react";
import Home from "./Pages/Home";
import Content from "./Pages/Content";

function App() {
  const [tab, setTab] = useState(1);

  return (
    <div className="App" style={{ height: "100vh" }}>
      {tab === 1 && <Home setTab={setTab} tab={tab} />}
      {tab === 2 && <Content setTab={setTab}  />}
    </div>
  );
}

export default App;
