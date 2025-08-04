import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { Colors } from "@/constants/Colors";
import { useFont } from "@shopify/react-native-skia";
import moment from "moment";
import "moment/locale/pt-br";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CartesianChart, Line } from "victory-native";
moment.locale("pt-br");


interface LineCharProps {
  data: any[];
  xKey: string;
  ykeys: string | number;
  formatYLabel?: (val:any) => string 
  formatXLabel?: (val:any) => string 
}

const LineChart = ({data, xKey, ykeys, formatXLabel, formatYLabel}:LineCharProps) => {
  const font = useFont(spaceMono, 12);

  return (
    <View style={{ width: "100%", height: 200 }}>
      <CartesianChart
        data={data}
        xKey={xKey}
        yKeys={[ykeys]}
        domainPadding={{ right: 20, bottom: 0, top: 20 }}
        axisOptions={{
          font,
          formatYLabel,
          formatXLabel,
        }}
      >
        {({ points }) => (
          <Line
            points={points[ykeys as string]}
            color={Colors.light.secondary}
            strokeWidth={3}
            animate={{ type: "timing", duration: 300 }}
          />
        )}
      </CartesianChart>
    </View>
  );
};

export default LineChart;

const styles = StyleSheet.create({});
