declare interface IPublication{
  description: string;
    profileId: number;
    isPublic: boolean;
    type: "toDo" | "habit" | "normal";
    attach: IAttach
}