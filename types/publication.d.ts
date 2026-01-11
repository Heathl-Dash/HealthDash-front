declare interface IPublication {
  id: number;
  description: string;
  profileId: number;
  profileName: string;
  profileAvatar: string | null;
  isPublic: boolean;
  type: "toDo" | "habit" | "normal";
  images: string[] | null;
  attach: IAttach;
  isLike?: boolean;
  likesCount: number;
  commentsCount: number;
}
