import spaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { Colors } from "@/constants/Colors";
import { useFont } from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Bar, CartesianChart } from "victory-native";

interface BarChartProps {
  data: any[];
  xKey: string;
  ykeys: string | number;
  formatYLabel?: (val: any) => string;
  formatXLabel?: (val: any) => string;
  color?: string;
  domain?:
    | {
        x?: [number] | [number, number];
        y?: [number] | [number, number];
      }
    | undefined;
}

const BarChart = ({ data, xKey, ykeys, formatXLabel, formatYLabel, domain ,color}: BarChartProps) => {
  const font = useFont(spaceMono, 12);
  return (
    <View style={{ width: "100%", height: 200 }}>
      <CartesianChart
        data={data}
        xKey={xKey}
        yKeys={[ykeys]}
        domain={domain}
        domainPadding={{ right: 20, bottom: 0, top: 20, left: 15 }}
        axisOptions={{
          font,
          formatYLabel,
          formatXLabel,
        }}
      >
        {({ points, chartBounds }) => (
          <Bar
            points={points[ykeys as string]}
            chartBounds={chartBounds}
            color={color ?? Colors.light.secondary}
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
