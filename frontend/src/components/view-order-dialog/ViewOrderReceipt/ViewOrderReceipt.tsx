import { Alert, Button, Typography } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";

import OrderReceiptToPDF from "../OrderReceiptToPDF";

import { OrderResource } from "@/api/models";
import { useGetBase64RestaurantLogo } from "@/hooks/restaurants/useGetBase64RestaurantLogo";

type ViewOrderReceiptProps = {
  order: OrderResource;
};

export default function ViewOrderReceipt({ order }: ViewOrderReceiptProps) {
  const {
    data: logoData,
    isLoading: isLoadingLogo,
    error: logoError,
  } = useGetBase64RestaurantLogo({ restaurantId: order.restaurant?.id ?? "" });

  if (isLoadingLogo) {
    return (
      <Typography role="progressbar" variant="body2">
        Loading receipt...
      </Typography>
    );
  }

  if (logoError) {
    return <Alert severity="error">{logoError.message}</Alert>;
  }

  return (
    <PDFDownloadLink
      document={<OrderReceiptToPDF order={order} base64Logo={logoData?.logo} />}
      fileName={`order-${order.order_code}-receipt.pdf`}
    >
      {({ loading, error }) => (
        <Button
          variant="text"
          color={error ? "error" : "primary"}
          loading={loading}
          loadingIndicator="Loading..."
          size="large"
          sx={{ fontWeight: 700 }}
        >
          {!error ? "View receipt" : "There was an error saving your receipt"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
