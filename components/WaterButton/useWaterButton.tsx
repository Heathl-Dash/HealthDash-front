import { useEffect, useState } from "react";

interface UseWaterButtonProp {
  waterGoal: number;
  mlDrinked: number;
}

const useWaterButton = ({ mlDrinked, waterGoal }: UseWaterButtonProp) => {
  const [levelStyle, setLevelStyle] = useState("fistLevel");
  const waterLevel = Math.min((mlDrinked / waterGoal) * 100, 100);

  useEffect(() => {
    const handleLevelStyle = (waterLevel: number) => {
      if (waterLevel < 25) {
        setLevelStyle("fistLevel");
        return;
      }
      if (waterLevel < 50) {
        setLevelStyle("secondLevel");
        return;
      }
      if (waterLevel < 75) {
        setLevelStyle("thirdLevel");
        return;
      }
      if (waterLevel < 100) {
        setLevelStyle("fourthLevel");
        return;
      }
      if (waterLevel >= 100) {
        setLevelStyle("successLevel");
        return;
      }
    };
    handleLevelStyle(waterLevel);
  }, [mlDrinked, waterGoal, waterLevel]);

  return {
    levelStyle,
    waterLevel,
  };
};

export default useWaterButton;
