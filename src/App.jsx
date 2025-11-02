import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import LayoutScreen from "./components/LayoutScreen/LayoutScreen";
import Layout from "./components/layout/Layout";
import AboutmePage from "./pages/AboutmePage";

export default function App() {
  return (
    <div className="bg-[#282C33] text-white overflow-x-hidden">
      <BrowserRouter>
        <LayoutScreen />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<WorkPage />} />
            <Route path="about-me" element={<AboutmePage />}>
              {/* <Route path="project:/" */}
            </Route>
            <Route path="contacts" element={<h1>my contacts</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
