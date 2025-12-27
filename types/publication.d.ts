declare interface IPublication {
  id:number;
  description: string;
  profileId: number;
  isPublic: boolean;
  type: "toDo" | "habit" | "normal";
  attach: IAttach;
  isLike?: boolean;
  likesCount: number;
  commentsCount: number
}
