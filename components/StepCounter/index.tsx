"use client";

import { Colors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface StepCounterProps {
  steps: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  completedColor?: string;
  backgroundColor?: string;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function StepCounter({
  steps,
  goal,
  size = 200,
  strokeWidth = 12,
  color = Colors.light.secondary,
  backgroundColor = "#dfdfdf",
  completedColor = Colors.light.primary,
}: StepCounterProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(steps / goal, 1); // Limita o progresso a 100%

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedValue]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const percentage = Math.round((steps / goal) * 100);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progress >= 1 ? completedColor : color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      <View style={styles.textContainer}>
        <Text style={styles.stepsText}>{steps.toLocaleString()}</Text>
        <Text style={styles.goalText}>de {goal.toLocaleString()}</Text>
        <Text style={[styles.percentageText, progress >= 1 && { color: `${completedColor}` }]}>
          {percentage}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  svg: {
    position: "absolute",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  stepsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.darkGray,
  },
  goalText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.secondary,
    marginTop: 4,
  },
});
