export const adaptCommentToComment = (comment: any): IComment => ({
  id: comment.id,
  profileId: comment.profile?.id ?? 0,
  content: comment.content,
  profileAvatar: comment.profile?.avatarUrl ?? null,
  profileUserName: comment.profile?.socialName ?? "",
  createdAt: comment.createdAt,
});
