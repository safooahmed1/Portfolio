import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import Header from "./components/headre/Header";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <div className="bg-[#282C33] text-white">
      <div className="container mx-auto flex flex-col px-4 md:px-0 overflow-hidden">
        <BrowserRouter>
          <Header />
          <Layout />
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="work" element_={<WorkPage />} />
              <Route path="aboutME/" element_={<h1>my work</h1>}>
                {/* <Route path="project:/" */}
              </Route>
              <Route path="contacts" element_={<h1>my contacts</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
