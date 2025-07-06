import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types/order-types";

type OrderReceiptToPDFProps = {
  order: Order;
  base64Logo?: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  logo: {
    objectFit: "cover",
    width: 30,
    height: 30,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: 700,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default function OrderReceiptToPDF({
  order,
  base64Logo,
}: OrderReceiptToPDFProps) {
  return (
    <Document language="en" title={`Order # ${order.order_code} Receipt`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <View style={styles.headingRow}>
            {base64Logo && <Image src={base64Logo} style={styles.logo} />}
            <Text style={styles.subtitle}>QuickBite</Text>
          </View>

          <Text>Address: Via Dante Alighieri, 23, 50100 Florence, Italy</Text>
          <Text>Email: support@quickbite.com</Text>
        </View>

        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Order # {order.order_code}</Text>

          <Text>
            Customer: {order.first_name} {order.last_name}
          </Text>

          <Text>
            Order date: {new Date(order.created_at).toLocaleDateString("it-IT")}
          </Text>

          <View style={{ flexDirection: "row", gap: 2 }}>
            <Text>Payment method:</Text>
            <Text style={{ textTransform: "capitalize" }}>
              {order.payment_method}
            </Text>
          </View>
        </View>

        {/* Items */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Your items</Text>

          {order.order_items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text>
                {item.quantity} {item.name}
              </Text>

              <Text>{formatCurrency(item.item_total)}</Text>
            </View>
          ))}
        </View>

        {/* Fees and Totals */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Fees and discounts</Text>

          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(order.subtotal)}</Text>
          </View>

          <View style={styles.row}>
            <Text>Delivery fee</Text>
            <Text>
              {order.delivery_fee > 0
                ? formatCurrency(order.delivery_fee)
                : "Free"}
            </Text>
          </View>

          {order.service_fee > 0 && (
            <View style={styles.row}>
              <Text>Service fee</Text>
              <Text>{formatCurrency(order.service_fee)}</Text>
            </View>
          )}

          {order.discount > 0 && (
            <View style={styles.row}>
              <Text>Discount</Text>
              <Text>-{formatCurrency(order.discount)}</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* Total */}
        <View style={styles.row}>
          <Text style={styles.bold}>Total</Text>
          <Text style={styles.bold}>{formatCurrency(order.total)}</Text>
        </View>
      </Page>
    </Document>
  );
}
