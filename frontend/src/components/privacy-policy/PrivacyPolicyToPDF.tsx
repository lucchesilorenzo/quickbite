import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { privacyPolicy } from "@/lib/constants/content";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 700,
  },
  section: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  titleIndex: {
    fontWeight: 700,
    marginRight: 4,
  },
  titleText: {
    fontWeight: 700,
  },
  paragraph: {
    marginBottom: 4,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 2,
  },
});

export default function PrivacyPolicyToPDF() {
  return (
    <Document language="en" title="Privacy Policy">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Privacy Policy</Text>

        {privacyPolicy.map(({ title, content }, titleIndex) => (
          <View key={titleIndex} style={styles.section}>
            <View style={styles.titleRow}>
              <Text style={styles.titleIndex}>{titleIndex + 1}.</Text>
              <Text style={styles.titleText}>{title}</Text>
            </View>

            {content.map((item, itemIndex) => (
              <View key={itemIndex}>
                {item.type === "paragraph" && (
                  <Text style={styles.paragraph}>{item.text}</Text>
                )}

                {item.type === "list" &&
                  item.items?.map((listItem, listItemIndex) => (
                    <Text key={listItemIndex} style={styles.listItem}>
                      &bull; {listItem}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
