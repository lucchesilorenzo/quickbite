import CustomerRegisterFormCardMobile from "../mobile/CustomerRegisterFormCardMobile";
import CustomerRegisterFormCardDesktop from "./CustomerRegisterFormCardDesktop";

export default function CustomerRegisterFormCard() {
  return (
    <>
      <CustomerRegisterFormCardDesktop />
      <CustomerRegisterFormCardMobile />
    </>
  );
}
