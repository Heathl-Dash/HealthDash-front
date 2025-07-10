import { editWaterGoal, getWaterGoal } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

const useWater = () => {
  const [waterModalIsOpen, setWaterModalIsOpen] = useState(false);
  const [addBottleModalIsOpen, setAddBottleModalIsOpen] = useState(false);

  const { data: waterGoal, error } = useQuery({
    queryKey: ["waterGoal"],
    queryFn: getWaterGoal,
  });

  const queryClient = useQueryClient();

  const openWaterModal = async () => {
    setWaterModalIsOpen(true);
    await queryClient.refetchQueries({
      queryKey: ["waterGoal"],
    });

    if (error) {
      Alert.alert("Ops, aconteceu algum erro :(");
    }
  };

  const updateWaterGoalWithBottle = async (bottle: IBottle) => {
    if (!waterGoal) return;

    const newMlDrinked = waterGoal.ml_drinked + bottle.ml_bottle;

    try {
      await editWaterGoal({
        ml_drinked: newMlDrinked,
      });

      await queryClient.invalidateQueries({
        queryKey: ["waterGoal"],
      });
    } catch (err) {
      console.error("Erro ao atualizar ml_drinked:", err);
    }
  };

  const handleCloseWaterModal = () => {
    setWaterModalIsOpen(false);
  };
  const handleCloseAddBottleModal = () => {
    setAddBottleModalIsOpen(false);
  };

  const openAddBottle = () => {
    setAddBottleModalIsOpen(true);
  };

  return {
    openWaterModal,
    updateWaterGoalWithBottle,
    handleCloseWaterModal,
    handleCloseAddBottleModal,
    openAddBottle,
    waterGoal,
    waterModalIsOpen,
    addBottleModalIsOpen,
  };
};

export default useWater;
