import { postNutritionInfo } from '@/lib/axios';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useMutation } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'

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
    mutationFn: postNutritionInfo,
    onSuccess: (_, variables) => {
      setSearchedAliment(variables.aliment); // Atualiza somente quando a busca é bem-sucedida
      openSheet();
    },
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
  }
}

export default useSearchAliment