import React from "react";
import {
  Document,
  Image,
  Page,
  pdf,
  PDFViewer,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

import page1 from "../../assets/Pdf/page1.jpg";
import page2 from "../../assets/Pdf/Page3.jpg";
import page3 from "../../assets/Pdf/Page3.jpg";
import page4 from "../../assets/Pdf/Page4.jpg";

import Html from "react-pdf-html";

export default function PdfVieTour({
  tourName,
  tourDay,
  tourNight,
  tourPrice,
  tourCode,
  tourGroupSize,
  tourItenary,
  tourIncludes,
  tourExcludes,
  specialNotes,
  tourCategory,
}) {
 
let twoCols = ["", ""];
if (tourItenary) {
  const parts = tourItenary.split("</p>");
  const mid = Math.ceil(parts.length / 2);

  twoCols[0] = parts.slice(0, mid).map(p => p + "</p>").join("");
  twoCols[1] = parts.slice(mid).map(p => p + "</p>").join("");
}

  return (
    <Document>
   <Page size="A4">
  <View style={{ width: "100%", height: "100%", position: "relative" }}>
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
    <View
      style={{
        position: "absolute",
        top: 550, 
        left: 60,
        right: 60,
        color: "white",
      }}
    >
      {/* Tour Name */}
      <Text
        style={{
          textAlign: "center",
          color: "#2272bd",
          fontWeight: "900",
          textTransform: "uppercase",
          fontSize: 30,
          marginBottom: 60, // added more space below the title
          textShadow: "1px 1px 3px rgba(0,0,0,0.6)", // makes text readable on any background
        }}
      >
        {tourName}
      </Text>

      {/* Details List */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          fontSize: 14,
          color: "black",
          lineHeight: 1.5,
        }}
      >
        <Text>
          <Text style={{ fontWeight: "bold" }}>Duration : </Text>
          {tourDay} Days & {tourNight} Nights
        </Text>

        <Text>
          <Text style={{ fontWeight: "bold" }}>Price : </Text>
          CHF {tourPrice}
        </Text>

        <Text>
          <Text style={{ fontWeight: "bold" }}>Tour Code : </Text>
          {tourCode}
        </Text>

        <Text>
          <Text style={{ fontWeight: "bold" }}>Group Size : </Text>
          {tourGroupSize}
        </Text>

        <Text>
          <Text style={{ fontWeight: "bold" }}>Category : </Text>
          {tourCategory}
        </Text>
      </View>
    </View>

    {/* Leave 20px empty space at bottom */}
    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        height: 20,
      }}
    />
  </View>
</Page>

      <Page size="A4"  style={{
    flexDirection: "row",
    paddingTop: 40,      
    paddingBottom: 40,   
  
                
  }} wrap={true}>
   <View
  style={{
    flexDirection: "row",
     
    paddingLeft: 35,     
    paddingRight: 35,   
    gap: 20,             
  }}
>

  {/* LEFT COLUMN */}
  <View style={{ width: "50%" }}>
    <Html
      style={{
        fontSize: 10,
        lineHeight: 1.4,
        textAlign: "justify", // JUSTIFY TEXT
      }}
    >
      {twoCols[0]}
    </Html>
  </View>

  {/* RIGHT COLUMN */}
  <View style={{ width: "50%" }}>
    <Html
      style={{
        fontSize: 10,
        lineHeight: 1.4,
        textAlign: "justify", // JUSTIFY TEXT
      }}
    >
      {twoCols[1]}
    </Html>
  </View>

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
