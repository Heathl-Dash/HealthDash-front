import { getProfileIMC, IProfileIMC } from "@/lib/axios";
import { useEffect, useState } from "react";

export const useIMC = () => {
  const [imcData, setImcData] = useState<IProfileIMC | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfileIMC()
      .then(setImcData)
      .catch((error) => {
        console.error("Erro ao buscar IMC:", error);
        setImcData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { imcData, loading };
};

export default useIMC;