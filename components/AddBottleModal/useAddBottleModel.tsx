import { createBottles } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface useAddBottleModel {
  onClose: () => void;
}

const useAddBottleModel = ({ onClose }: useAddBottleModel) => {
  const [nameBottleValue, setNameBottleValue] = useState("");
  const [selectedBottleStyle, setSelectedBottleStyle] = useState(1);
  const [mlBottleValue, setMLBottleValue] = useState("0");

  const [nameBottleError, setNameBottleError] = useState("");
  const [mlBottleError, setMLBottleError] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBottles,
    onSuccess: () => {
      console.log("Garrafa criada com sucesso!");

      setNameBottleValue("");
      setMLBottleValue("0");
      setSelectedBottleStyle(1);
      setNameBottleError("");
      setMLBottleError("");
      onClose();

      queryClient.invalidateQueries({ queryKey: ["waterGoal"] });
    },
    onError: (error) => {
      console.log("Erro ao criar garrafa:", error);
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
      water_bottle_id: selectedBottleStyle,
    };

    mutation.mutate(bottleData);
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
