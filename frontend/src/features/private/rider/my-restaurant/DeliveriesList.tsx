import { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";

import { useGetDeliveries } from "../hooks/restaurant/deliveries/useGetDeliveries";
import DeliveryItem from "./DeliveryItem";

import CustomPagination from "@/components/common/CustomPagination";
import FullPageErrorMessage from "@/components/common/FullPageErrorMessage";
import Spinner from "@/components/common/Spinner";

export default function DeliveriesList() {
  const [page, setPage] = useState(1);

  const {
    data: deliveriesData,
    isLoading: isLoadingDeliveries,
    error: deliveriesError,
  } = useGetDeliveries();

  if (isLoadingDeliveries) {
    return <Spinner />;
  }

  if (deliveriesError) {
    return <FullPageErrorMessage message={deliveriesError.message} />;
  }

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      {!deliveriesData?.deliveries.data.length ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No deliveries found yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {deliveriesData?.deliveries.data.map((delivery) => (
            <DeliveryItem key={delivery.id} delivery={delivery} />
          ))}

          <Box sx={{ alignSelf: "center" }}>
            <CustomPagination
              page={page}
              totalPages={deliveriesData?.deliveries.last_page}
              setPage={setPage}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
