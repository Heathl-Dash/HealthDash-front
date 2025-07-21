import { TabItem } from "@/components/Tabs";
import {
  getNutriToDo
} from "@/lib/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useTodo = () => {
  const [currentTab, setCurrentTab] = useState("todo");

  const TABS: TabItem[] = [
    { key: "habit", label: "Hábitos" },
    { key: "todo", label: "tarefas" },
  ];

};

export default useTodo;