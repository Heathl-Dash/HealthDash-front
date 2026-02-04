import { postNutritionInfo } from "@/lib/nutri"; 
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

// 1. Defina a interface para o que a sua função de busca espera receber
interface SearchVariables {
  aliment: string;
}

const useSearchAliment = () => {
  const [alimentValue, setAlimentValue] = useState("");
  const [searchedAliment, setSearchedAliment] = useState("");

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const openSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const {
    mutate: searchAliment,
    isPending,
    isError,
    data,
  } = useMutation({
    mutationFn: (variables: SearchVariables) => postNutritionInfo(variables),
    onSuccess: (data, variables) => {
      setSearchedAliment(variables.aliment);
      openSheet();
    },
    onError: (error) => {
      console.error("Erro na busca de nutrientes:", error);
    }
  });

  const handleSearch = () => {
    const trimmedValue = alimentValue.trim();

    if (!trimmedValue) {
      console.warn("Valor inválido para pesquisa.");
      return;
    }

    searchAliment({ aliment: trimmedValue });
  };

  return {
    alimentValue,
    setAlimentValue,
    handleSearch,
    data,
    bottomSheetRef,
    searchedAliment,
    isPending,
    isError,
  };
};

export default useSearchAliment;