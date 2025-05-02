import React from "react";
import {
  Document,
  Image,
  Page,
  pdf,
  PDFViewer,
  Text,
  View,
} from "@react-pdf/renderer";

import page1 from "../../assets/Pdf/page1.jpg";
import page2 from "../../assets/Pdf/Page2.jpg";
import page3 from "../../assets/Pdf/Page3.jpg";
import page4 from "../../assets/Pdf/Page4.jpg";

import Html from "react-pdf-html";

export default function Pdf({
  tourName,
  tourDay,
  tourNight,
  tourPrice,
  tourCode,
  tourGroupSize,
  tourCategory,
  tourItenary,
  tourIncludes,
  tourExcludes,
  specialNotes,
}) {
  return (
    <Document>
      <Page size="A4">
        <View style={{ width: "100%", height: "100%", padding: "40px" }}>
          <View style={{ position: "relative", height: "100%", width: "100%" }}>
            {/* Background Image */}
            <Image
              src={page1}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: -1,
              }}
            />

            {/* Foreground Content */}
            <Text
              style={{
                position: "absolute",
                bottom: 70,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "white",
                fontWeight: "900",
                textTransform: "uppercase",
                fontSize: 30,
              }}
            >
              {tourName}
            </Text>
          </View>
        </View>
      </Page>
      <Page size="A4">
        <View style={{ width: "100%", height: "100%", padding: "40px" }}>
          <View style={{ position: "relative", height: "100%", width: "100%" }}>
            {/* Background Image */}
            <Image
              src={page2}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: -1,
              }}
            />

            {/* Foreground Content */}
            <Text
              style={{
                fontSize: "20px",
                color: "#0d90d1",
                width: "50%",
                marginLeft: "45%",
                fontWeight: "900",
              }}
            >
              Package Details
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "40%",
                padding: "3px",
                textAlign: "center",
                fontWeight: "400px",
                marginLeft: "55%",
                border: "1px solid #73c4e9",
                borderRadius: "50px",
                backgroundColor: "#e1f3ff",
                marginTop: "10%",
              }}
            >
              Duration :
            </Text>

            <Text
              style={{
                fontSize: "26px",
                width: "50%",
                fontWeight: "400px",
                marginLeft: "50%",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              {tourDay} Days & {tourNight} Nights
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "40%",
                padding: "3px",
                textAlign: "center",
                fontWeight: "400px",
                marginLeft: "55%",
                border: "1px solid #73c4e9",
                borderRadius: "50px",
                backgroundColor: "#e1f3ff",
                marginTop: "10%",
              }}
            >
              Price :
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "50%",
                fontWeight: "400px",
                marginLeft: "50%",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              CHF {tourPrice}
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "40%",
                padding: "3px",
                textAlign: "center",
                fontWeight: "400px",
                marginLeft: "55%",
                border: "1px solid #73c4e9",
                borderRadius: "50px",
                backgroundColor: "#e1f3ff",
                marginTop: "10%",
              }}
            >
              Tour Code :
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "50%",
                fontWeight: "400px",
                marginLeft: "50%",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              {tourCode}
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "40%",
                padding: "3px",
                textAlign: "center",
                fontWeight: "400px",
                marginLeft: "55%",
                border: "1px solid #73c4e9",
                borderRadius: "50px",
                backgroundColor: "#e1f3ff",
                marginTop: "10%",
              }}
            >
              Group Size :
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "50%",
                fontWeight: "400px",
                marginLeft: "50%",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              {tourGroupSize}
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "40%",
                padding: "3px",
                textAlign: "center",
                fontWeight: "400px",
                marginLeft: "55%",
                border: "1px solid #73c4e9",
                borderRadius: "50px",
                backgroundColor: "#e1f3ff",
                marginTop: "10%",
              }}
            >
              Category :
            </Text>
            <Text
              style={{
                fontSize: "26px",
                width: "50%",
                fontWeight: "400px",
                marginLeft: "50%",
                textAlign: "center",
                marginTop: "2%",
              }}
            >
              {tourCategory}
            </Text>
          </View>
        </View>
      </Page>
      <Page size="A4" wrap={true}>
        <View wrap={true}>
          <Text
            style={{
              marginTop: "5%",
              fontSize: "20px",
              color: "#0d90d1",
              fontWeight: "900",
              paddingLeft: "3%",
            }}
          >
            Accomentation & Tour Plan
          </Text>
          <Image
            fixed={true}
            src={page3}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100%",
              zIndex: -1,
            }}
          />

          <Html
            style={{
              fontSize: 10,
              padding: "3%",
            }}
          >
            {tourItenary}
          </Html>
        </View>
      </Page>
      <Page size="A4">
        <View style={{ width: "100%", height: "100%", padding: "40px" }}>
          <View style={{ position: "relative", height: "100%", width: "100%" }}>
            {/* Background Image */}
            <Image
              src={page4}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: -1,
              }}
            />

            {/* Foreground Content */}
            <Text
              style={{
                fontSize: "20px",
                color: "#0d90d1",
                fontWeight: "900",
              }}
            >
              Travel Includes
            </Text>
            <Text style={{ marginTop: "2%" }}>
              {tourIncludes && tourIncludes.length > 0 ? (
                tourIncludes.map((item, index) => (
                  <Text key={index} style={{ fontSize: 10, marginBottom: 10 }}>
                    {"\u2022"} {item}
                    {"\n"}
                  </Text>
                ))
              ) : (
                <Text style={{ fontSize: 10 }}>No data available</Text>
              )}
            </Text>

            <Text
              style={{
                fontSize: "20px",
                color: "#0d90d1",
                fontWeight: "900",
                marginTop: "5%",
              }}
            >
              Travel Excludes
            </Text>
            <Text style={{ marginTop: "2%" }}>
              {tourExcludes && tourExcludes.length > 0 ? (
                tourExcludes.map((item, index) => (
                  <Text key={index} style={{ fontSize: 10, marginBottom: 10 }}>
                    {"\u2022"} {item}
                    {"\n"}
                  </Text>
                ))
              ) : (
                <Text style={{ fontSize: 10 }}>No data available</Text>
              )}
            </Text>
            <Text
              style={{
                backgroundColor: "#006cb7",
                fontSize: 10,
                padding: "10",
                color: "yellow",
                textAlign: "center",
                position: "absolute",
                bottom: "27%",
                width: "100%",
                fontWeight: 900,
              }}
            >
              Special Notes
            </Text>
            <Text
              style={{
                backgroundColor: "#006cb7",
                fontSize: 10,
                padding: "10",
                color: "white",
                position: "absolute",
                bottom: "18%",
              }}
            >
              {specialNotes}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
