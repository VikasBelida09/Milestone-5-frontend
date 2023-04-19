import "./App.css";
import Navbar from "./components/Navbar";
import Visualizations from "./components/Visualizations";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopicModelling from "./components/TopicModelling";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Visualizations />} />
          <Route path="/topics" element={<TopicModelling />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
