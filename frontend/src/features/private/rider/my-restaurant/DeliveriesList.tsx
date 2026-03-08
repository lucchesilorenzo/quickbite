import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { useGetDeliveryHistory } from "../hooks/restaurant/deliveries/useGetDeliveryHistory";
import DeliveryItem from "./DeliveryItem";

import CustomPagination from "@/components/common/CustomPagination";
import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";

export default function DeliveriesList() {
  const [page, setPage] = useState(1);

  const {
    data: deliveryHistoryData,
    isLoading: isLoadingDeliveryHistory,
    error: deliveryHistoryError,
  } = useGetDeliveryHistory({ page });

  if (isLoadingDeliveryHistory) {
    return <Spinner />;
  }

  if (deliveryHistoryError) {
    return <FullPageErrorMessage message={deliveryHistoryError.message} />;
  }

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {!deliveryHistoryData?.deliveries.data.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No deliveries found yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {deliveryHistoryData?.deliveries.data.map((delivery) => (
            <DeliveryItem key={delivery.id} delivery={delivery} />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={deliveryHistoryData?.deliveries.last_page}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
