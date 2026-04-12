import { Typography } from "@mui/material";

import { useGetActiveDelivery } from "../../hooks/restaurant/deliveries/useGetActiveDelivery";
import DeliveryItem from "./DeliveryItem";

import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";

export default function ActiveDeliveryContainer() {
  const {
    data: activeDeliveryData,
    isLoading: isLoadingActiveDelivery,
    error: activeDeliveryError,
  } = useGetActiveDelivery();

  if (isLoadingActiveDelivery) {
    return <Spinner />;
  }

  if (activeDeliveryError) {
    return <FullPageErrorMessage message={activeDeliveryError.message} />;
  }

  if (!activeDeliveryData?.delivery) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        No active delivery yet.
      </Typography>
    );
  }

  return <DeliveryItem delivery={activeDeliveryData.delivery} />;
}
