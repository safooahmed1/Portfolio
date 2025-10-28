export default function SkillMap({ el }) {
  return (
    <>
      <div className="border border-[#ABB2BF] flex flex-col items-center h-fit">
        <h1 className="px-3 py-2 border-b border-[#ABB2BF] font-semibold w-full">
          {el.type}
        </h1>
        {/* skill */}
        <div className="px-3 py-2 flex gap-10 flex-wrap">
          {el.skill.map((el, index) => {
            return <span key={index}>{el}</span>;
          })}
        </div>
      </div>
    </>
  );
}
