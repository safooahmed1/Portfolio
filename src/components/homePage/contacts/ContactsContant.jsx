import discord from "../../../assets/logo/discord.png";
import mail from "../../../assets/logo/Email.png";

export default function ContactsContant() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
        <p className="text-[16px] text-[#ABB2BF] font-medium w-full md:w-5/12">
          I’m interested in freelance opportunities. However, if you have other
          request or question, don’t hesitate to contact me
        </p>
        <div className="flex gap-2 flex-col border border-[#ABB2BF] text-[#ABB2BF] p-5">
          <h2 className="font-semibold text-white text-center pb-3">Message me here</h2>
          <h3 className="flex gap-3">
            <img src={discord} />
            safo.o468
          </h3>
          <h3 className="flex gap-3">
            <img src={mail} />
            safoo468@icloud.com
          </h3>
        </div>
      </div>
    </>
  );
}
