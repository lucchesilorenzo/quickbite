import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { termsOfService } from "@/lib/constants/content";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 700,
  },
  section: {
    marginBottom: 20,
  },
  headingRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  headingNumber: {
    fontWeight: 700,
    marginRight: 4,
  },
  headingText: {
    fontWeight: 700,
  },
  paragraphRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  paragraphNumber: {
    fontWeight: 700,
    marginRight: 4,
  },
  paragraphText: {
    flex: 1,
  },
});

export default function TermsAndConditionsToPDF() {
  return (
    <Document language="en" title="Terms and Conditions">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Terms and Conditions</Text>

        {termsOfService.map(({ title, content }, titleIndex) => (
          <View key={titleIndex} style={styles.section}>
            <View style={styles.headingRow}>
              <Text style={styles.headingNumber}>{titleIndex + 1}.</Text>
              <Text style={styles.headingText}>{title}</Text>
            </View>

            {content.map((paragraph, paragraphIndex) => (
              <View key={paragraphIndex} style={styles.paragraphRow}>
                <Text style={styles.paragraphNumber}>
                  {titleIndex + 1}.{paragraphIndex + 1}.
                </Text>
                <Text style={styles.paragraphText}>{paragraph}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
