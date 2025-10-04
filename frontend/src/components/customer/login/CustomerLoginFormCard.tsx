import CustomerLoginFormCardDesktop from "./CustomerLoginFormCardDesktop";
import CustomerLoginFormCardMobile from "./mobile/CustomerLoginFormCardMobile";

export default function CustomerLoginFormCard() {
  return (
    <>
      <CustomerLoginFormCardDesktop />
      <CustomerLoginFormCardMobile />
    </>
  );
}
