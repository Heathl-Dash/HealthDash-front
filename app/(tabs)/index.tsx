import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterButton from "../components/WaterButton";
import WaterModal from "../components/WaterModal";
import { getWaterGoal } from "../lib/axios";

const WATER_GOAL: { ml_drinked: number; water_goal: number } = {
  ml_drinked: 0,
  water_goal: 3500,
};

export default function HomeScreen() {
  const [waterModalIsOpen, setWaterModalIsOpen] = useState(false);

  const { data: waterGoal, error, refetch} = useQuery({
    queryKey: ["waterGoal"],
    queryFn: getWaterGoal,
  });

  // const {
  //   data: bottles,
  //   error,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["bottles"],
  //   queryFn: getBottles,
  //   enabled: false,
  // });

  const queryClient = useQueryClient();
  const handleWaterButton = async () => {
    setWaterModalIsOpen(true);
    await queryClient.refetchQueries({
    queryKey: ["waterGoal"],
  });
    
  };

  const handleClose = () => {
    setWaterModalIsOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", padding: 5 }}></View>
        <View style={{ width: "50%", padding: 5 }}>
          <WaterButton
            mlDrinked={waterGoal?.ml_drinked ?? 0}
            waterGoal={waterGoal?.ml_goal ?? 2000}
            onPress={handleWaterButton}
          />
        </View>
      </View>

      <WaterModal
        bottles={waterGoal?.bottles || []}
        onClose={handleClose}
        visible={waterModalIsOpen}
      />

      {error && <Text style={styles.error}>Ocorreu um erro ao buscar dados: {String(error)}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  text: {
    color: "black",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: 20,
  },
  resultTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
});
