import { Button } from "@mui/material";
import { PartnerOrder } from "@partner/types/orders/order.types";
import { PDFDownloadLink } from "@react-pdf/renderer";

import OrderReceiptToPDF from "../OrderReceiptToPDF";

import { Order } from "@/features/private/shared/types/order.types";
import { useGetBase64RestaurantLogo } from "@/hooks/restaurants/useGetBase64RestaurantLogo";

type ViewOrderReceiptProps = {
  order: Order | PartnerOrder;
};

export default function ViewOrderReceipt({ order }: ViewOrderReceiptProps) {
  const { data } = useGetBase64RestaurantLogo({
    restaurantId: order.restaurant.id,
  });

  return (
    <PDFDownloadLink
      document={<OrderReceiptToPDF order={order} base64Logo={data?.logo} />}
      fileName={`order-${order.order_code}-receipt.pdf`}
    >
      {({ loading, error }) => (
        <Button
          variant="text"
          color={error ? "error" : "primary"}
          loading={loading}
          loadingIndicator="Saving..."
          size="large"
          sx={{ fontWeight: 700 }}
        >
          {!error ? "View receipt" : "There was an error saving your receipt"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
