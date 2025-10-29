import HeaderTittel from "../../krkba/HeaderTittel";
import ContactsContant from "./ContactsContant";

export default function Contacts() {
  let tittle = "contacts";
  return (
    <>
      <div className="mt-20 flex flex-col gap-20">
        <HeaderTittel tittle={tittle} />
        <ContactsContant/>
      </div>
    </>
  );
}
