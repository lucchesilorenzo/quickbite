import OrderStepsMobile from "../mobile/OrderStepsMobile";
import OrderStepsDesktop from "./OrderStepsDesktop";

export default function OrderSteps() {
  return (
    <>
      <OrderStepsDesktop />
      <OrderStepsMobile />
    </>
  );
}
