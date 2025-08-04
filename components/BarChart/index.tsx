import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";
import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { useFont } from "@shopify/react-native-skia";


interface BarChartProps {
  data: any[];
  xKey: string;
  ykeys: string | number;
  formatYLabel?: (val:any) => string 
  formatXLabel?: (val:any) => string 
}

const BarChart = ({data, xKey, ykeys, formatXLabel, formatYLabel}:BarChartProps) => {
  const font = useFont(spaceMono, 12);
  return (
    <View style={{ width: "100%", height: 200 }}>
      <CartesianChart
        data={data}
        xKey={xKey}
        yKeys={[ykeys]}
        domainPadding={{ right: 20, bottom: 0, top: 20, left: 15 }}
        axisOptions={{
          font,
          formatYLabel,
          formatXLabel,
        }}
      >

        {({ points, chartBounds }) => (
          //👇 pass a PointsArray to the Bar component, as well as options.
          <Bar
            points={points[ykeys as string]}
            chartBounds={chartBounds}
            color={Colors.light.secondary}
            barWidth={30}
            roundedCorners={{ topLeft: 10, topRight: 10 }}
          />
        )}
      </CartesianChart>
    </View>
  );
};

export default BarChart;

const styles = StyleSheet.create({});
