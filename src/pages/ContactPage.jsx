import ContactsContant from "../components/homePage/contacts/ContactsContant";
import TitlePage from "../components/krkba/TitlePage";

export default function ContactPage() {
  let title = "contacts";
  let paragraph = "Who am i?";
  return (
    <>
      <div className="flex flex-col gap-10">
        <TitlePage title={title} paragraph={paragraph} />
        <ContactsContant />
      </div>
    </>
  );
}
