import useStorage from "@/hooks/useStorage";
import Axios from "axios";

const API_URL = `http://${process.env.EXPO_PUBLIC_IP_MAQUINA}:8004/api/v1/`;

const apiGateway = Axios.create({
  baseURL: API_URL,
  // headers: {
  //   Authorization: `Bearer ${process.env.EXPO_PUBLIC_KEY}`,
  // },
});

const {
  getTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} = useStorage();

apiGateway.interceptors.request.use(
  async (config) => {
    const token = await getTokens();

    if (token?.access) {
      config.headers["Authorization"] = `Bearer ${token.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiGateway.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 ||  error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = await getRefreshToken();

      if (refresh) {
        try {
          console.log("REFRESH:", refresh)
          const response = await Axios.post(`${API_URL}profiles/token/refresh/`, {
            DashboardProfileRefresh: refresh,
          });
          console.log(response.data)
          if (response.status !== 200) {
            await removeAccessToken();
            await removeRefreshToken();
            return Promise.reject(error);
          }
          const newAccessToken = response.data.DashboardProfileAccess;
          const newRefreshToken = response.data.DashboardProfileRefresh;

          await setAccessToken(newAccessToken);
          await setRefreshToken(newRefreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiGateway(originalRequest);
        } catch (err) {
          await removeAccessToken();
          await removeRefreshToken();
          console.log("Erro ao fazer refresh do token:", err);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const getWaterGoal = () => {
  return apiGateway
    .get<IWaterGoal>("nutri/water_goal/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar meta de agua: ", err);
      throw err;
    });
};
export const editWaterGoal = (data: Partial<IWaterGoal>) => {
  return apiGateway
    .patch<IWaterGoal>("nutri/water_goal/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao editar meta de agua: ", err);
      throw err;
    });
};

export const getWaterIntakes = (today:string) => {
  return apiGateway
  .get('nutri/water_goal/intakes/', {params: {reference: today}})
  .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar intakes de consumo de água: ", err);
      throw err;
    });
}


export const getBottles = () => {
  return apiGateway
    .get("nutri/water_bottle/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar garrafas: ", err);
      throw err;
    });
};

export const editWaterBottle = (id: number, data: Partial<IBottle>) => {
  return apiGateway
    .patch(`nutri/water_bottle/${id}`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao editar garrafa ", err);
      throw err;
    });
};


export const deleteWaterBottle = (id:number) => {
  return apiGateway
    .delete(`nutri/water_bottle/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao deletar garrafa ", err);
      throw err;
    });
}

export const createBottles = (data: Partial<IBottle>) => {
  return apiGateway
    .post("nutri/water_bottle/", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao criar garrafas: ", err);
      throw err;
    });
};

export const postNutritionInfo = (data: { aliment: string }) => {
  return apiGateway
    .post("nutri/nutrition-info-ai-request", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao pesquisar informações nutricionais: ", err);
      throw err;
    });
};

export const getNutriHabits = () => {
  return apiGateway
    .get<IHabit[]>("nutri/habit/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar hábitos nutricionais: ", err);
      throw err;
    });
};

export const addNutriPositiveCounter = (id: number) => {
  return apiGateway
    .patch(`nutri/habit/${id}/add-positive-counter`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador positivo de habito nutricional: ", err);
      throw err;
    });
};

export const addNutriNegativeCounter = (id: number) => {
  return apiGateway
    .patch(`nutri/habit/${id}/add-negative-counter`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador negativo de habito nutricional: ", err);
      throw err;
    });
};

export const getFitHabits = () => {
  return apiGateway
    .get("fit/habit/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar hábitos de exercício: ", err);
      throw err;
    });
};

export const addFitPositiveCounter = (id: number) => {
  return apiGateway
    .patch(`fit/habit/${id}/add_positive_counter/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador positivo de habito de exercício: ", err);
      throw err;
    });
};

export const addFitNegativeCounter = (id: number) => {
  return apiGateway
    .patch(`fit/habit/${id}/add_negative_counter/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao somar contador negativo de habito de exercício: ", err);
      throw err;
    });
};

export const getNutriToDo = () => {
  return apiGateway
    .get<IToDo[]>("nutri/todo/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar tarefas nutricionais: ", err);
      throw err;
    });
};

export const nutriToggleMarkTodoDone = (id: number) => {
  return apiGateway
    .patch(`nutri/todo/${id}/done-toggle`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao trocar o valor do marcador de feito em tarefas nutricionais: ", err);
      throw err;
    });
};

export const getFitToDo = () => {
  return apiGateway
    .get<IToDo[]>("fit/todo/")
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao buscar tarefas de exercícios: ", err);
      throw err;
    });
};

export const fitToggleMarkTodoDone = (id: number) => {
  return apiGateway
    .patch(`fit/todo/${id}/done_toggle/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao trocar o valor do marcador de feito em tarefas de exercícios: ", err);
      throw err;
    });
};

export const getProfile = () => {
  return apiGateway
    .get(`profiles/retrieveprofile/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("erro ao receber perfil: ", err);
      throw err;
    });
};

export type IProfileIMC = Pick<IProfile, "calc_IMC" | "imc_classification">;

export const getProfileIMC = async (): Promise<IProfileIMC | null> => {
  try {
    const { data } = await apiGateway.get<IProfile>("profiles/retrieveprofile/");
    return {
      calc_IMC: data.calc_IMC,
      imc_classification: data.imc_classification,
    };
  } catch (error: any) {
    console.error("Erro ao pegar imc:", error);
    return null;
  }
};

export type profileForm = Omit<
  IProfile,
  "calc_IMC" | "imc_classification" | "imc_degree" | "id" | "email"
>;

export const updateProfile = async (data: profileForm) => {
  return apiGateway
    .patch(`profiles/updateprofile/`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao atualizar o perfil: ", err);
      throw err;
    });
};

export const googleLogin = (googleToken: string) => {
  return apiGateway
    .post(`profiles/googlelogin/`, { token: googleToken })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar token do google: ", err);
      throw err;
    });
};

export type habitForm = Pick<IHabit, "title" | "description" | "positive" | "negative">;
export type toDoForm = Pick<IToDo, "title" | "description">

export const createNutriHabit = (habitData: habitForm) => {
  return apiGateway
  .post(`nutri/habit/`, habitData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar hábito de nutrição: ", err)
    throw err;
  })
};

export const editNutriHabit = (habitData: habitForm, id:number) => {
  return apiGateway
  .patch(`nutri/habit/${id}`, habitData)
  .then(res=> res.data)
  .catch(err => {
    console.error("Erro ao alterar hábito de nutrição: ", err)
    throw err;
  })
};

export const deleteNutriHabit = (id:number) => {
  return apiGateway
  .delete(`nutri/habit/${id}`)
  .then(res=>res.data)
  .catch(err=>{
    console.error("Erro ao deletar hábito de nutrição: ", err)
    throw err;
  })
}

export const createNutriToDo = (toDoData:toDoForm) => {
  return apiGateway
  .post(`nutri/todo/`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar tarefa de nutrição: ", err)
    throw err;
  })
};

export const editNutriToDo = (toDoData:toDoForm, id:number) => {
  return apiGateway
  .patch(`nutri/todo/${id}`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao editar tarefa de nutrição: ", err)
    throw err;
  })
};

export const deleteNutriToDo = (id:number) => {
  return apiGateway
  .delete(`nutri/todo/${id}`)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao deletar tarefa de nutrição: ", err)
    throw err;
  })
}

export const createFitHabit = (habitData: habitForm) => {
  return apiGateway
  .post(`fit/habit/`, habitData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar hábito de exercício: ", err)
    throw err;
  })
};

export const editFitHabit = (habitData: habitForm, id:number) => {
  return apiGateway
  .patch(`fit/habit/${id}/`, habitData)
  .then(res=> res.data)
  .catch(err => {
    console.error("Erro ao alterar hábito de exercício: ", err)
    throw err;
  })
};

export const deleteFitHabit = (id:number) => {
  return apiGateway
  .delete(`fit/habit/${id}/`)
  .then(res=>res.data)
  .catch(err=>{
    console.error("Erro ao deletar hábito de exercício: ", err)
    throw err;
  })
}

export const createFitToDo = (toDoData:toDoForm) => {
  return apiGateway
  .post(`fit/todo/`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao criar tarefa de exercício: ", err)
    throw err;
  })
};

export const editFitToDo = (toDoData:toDoForm, id:number) => {
  return apiGateway
  .patch(`fit/todo/${id}/`, toDoData)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao editar tarefa de exercício: ", err)
    throw err;
  })
};

export const deleteFitToDo = (id:number) => {
  return apiGateway
  .delete(`fit/todo/${id}/`)
  .then(res => res.data)
  .catch(err => {
    console.error("Erro ao deletar tarefa de exercício: ", err)
    throw err;
  })
}

export const getFitData = () => {
  return apiGateway
    .get(`fit/fitdata/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar dados de fit: ", err);
      throw err;
    });
};


export const createFitData = (data:IFitData) => {
  return apiGateway
    .post(`fit/fitdata/`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Erro ao buscar dados de fit: ", err);
      throw err;
    });
};