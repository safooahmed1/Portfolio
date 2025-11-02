import TitlePage from "../components/krkba/TitlePage";
import Projects from "../components/workPage/Projects";

export default function WorkPage() {
  let title = "projects";
  let paragraph = "List of my projects";
  return (
    <>
      <div className="">
        <TitlePage title={title} paragraph={paragraph} />
        <Projects />
      </div>
    </>
  );
}
