import { createBottles, editWaterBottle } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface useAddBottleModel {
  onClose: () => void;
  bottleToEdit?: IBottle | null;
}

const useAddBottleModel = ({ onClose, bottleToEdit }: useAddBottleModel) => {
  const [nameBottleValue, setNameBottleValue] = useState("");
  const [selectedBottleStyle, setSelectedBottleStyle] = useState(1);
  const [mlBottleValue, setMLBottleValue] = useState("0");

  const [nameBottleError, setNameBottleError] = useState("");
  const [mlBottleError, setMLBottleError] = useState("");

  useEffect(() => {
    if (bottleToEdit) {
      setNameBottleValue(bottleToEdit.bottle_name);
      setMLBottleValue(bottleToEdit.ml_bottle.toString());
      setSelectedBottleStyle(bottleToEdit.water_bottle_id);
    }
  }, [bottleToEdit]);

  const resetForm = () => {
    setNameBottleValue("");
    setMLBottleValue("0");
    setSelectedBottleStyle(1);
    setNameBottleError("");
    setMLBottleError("");
  };

  const queryClient = useQueryClient();

  const createBottleMutation = useMutation({
    mutationFn: createBottles,
    onSuccess: () => {
      resetForm();
      onClose();

      queryClient.invalidateQueries({ queryKey: ["waterGoal"] });
    },
    onError: (error) => {
      console.log("Erro ao criar garrafa:", error);
    },
  });

  const updateBottleMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IBottle> }) => editWaterBottle(id, data),
    onSuccess: () => {
      console.log(bottleToEdit ? "Garrafa atualizada!" : "Garrafa criada!");
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["waterGoal"] });
      onClose();
    },
  });

  const onSaveBottle = () => {
    let isValid = true;

    setNameBottleError("");
    setMLBottleError("");

    if (nameBottleValue.trim() === "") {
      setNameBottleError("O nome da garrafa é obrigatório.");
      isValid = false;
    }
    if (mlBottleValue.trim() === "" || Number(mlBottleValue) <= 0) {
      setMLBottleError("Informe um valor válido em mL.");
      isValid = false;
    }

    if (!isValid) return;

    setNameBottleError("");
    setMLBottleError("");

    const bottleData = {
      bottle_name: nameBottleValue,
      ml_bottle: Number(mlBottleValue),
      id_bottle_style: selectedBottleStyle,
    };

    if (bottleToEdit) {
      updateBottleMutation.mutate({ id: bottleToEdit.water_bottle_id, data: { ...bottleData } });
    } else {
      createBottleMutation.mutate(bottleData);
    }
  };
  return {
    nameBottleValue,
    selectedBottleStyle,
    nameBottleError,
    mlBottleError,
    mlBottleValue,
    onSaveBottle,
    setSelectedBottleStyle,
    setNameBottleValue,
    setMLBottleValue,
  };
};

export default useAddBottleModel;
