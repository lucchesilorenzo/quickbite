import OrderStepsDesktop from "./OrderStepsDesktop";
import OrderStepsMobile from "./mobile/OrderStepsMobile";

export default function OrderSteps() {
  return (
    <>
      <OrderStepsDesktop />
      <OrderStepsMobile />
    </>
  );
}
