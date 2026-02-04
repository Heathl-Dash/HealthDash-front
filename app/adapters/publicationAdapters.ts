const normalizeType = (rawType?: string): IPublication["type"] => {
  if (!rawType) return "normal";
  const value = rawType.toLowerCase();
  if (value === "todo" || value === "to_do" || value === "to-do" || value === "to do") {
    return "toDo";
  }
  if (value === "habit") return "habit";
  return "normal";
};

const normalizeAttach = (rawAttach?: any): IAttach | null => {
  if (!rawAttach) return null;

  const id =
    rawAttach.id ??
    rawAttach.attachId ??
    rawAttach.attachmentId ??
    rawAttach.todoId ??
    rawAttach.habitId;
  if (id == null) return null;

  return {
    id: Number(id),
    title: rawAttach.title ?? rawAttach.name ?? "",
    description: rawAttach.description ?? undefined,
    done: rawAttach.done ?? rawAttach.isDone ?? undefined,
    isPositive: rawAttach.isPositive ?? rawAttach.positive ?? undefined,
    isNegative: rawAttach.isNegative ?? rawAttach.negative ?? undefined,
    positiveCount: rawAttach.positiveCount ?? rawAttach.positive_count ?? undefined,
    negativeCount: rawAttach.negativeCount ?? rawAttach.negative_count ?? undefined,
  };
};

export const adaptPostToPublication = (post: any): IPublication => {
  const type = normalizeType(post?.type);
  const rawAttach = post?.attach ?? post?.attachment ?? post?.habit ?? post?.todo ?? post?.toDo;
  const attach = normalizeAttach(rawAttach);

  return {
    id: post.id,
    description: post.description,
    profileId: post.profile.id,
    profileName: post.profile.socialName,
    profileAvatar: post.profile.avatarUrl,
    isPublic: post.isPublic,
    type,
    images: post.imagesUrls?.length ? post.imagesUrls : null,
    attach,
    isLike: post.isLiked,
    isCollected: post.isCollected,
    likesCount: post.likesCount,
    commentsCount: post.commentariesCount,
  };
};
