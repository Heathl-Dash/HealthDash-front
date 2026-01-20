export const adaptPostToPublication = (post: any): IPublication => ({
  id: post.id,
  description: post.description,
  profileId: post.profile.id,
  profileName: post.profile.socialName,
  profileAvatar: post.profile.avatarUrl,
  isPublic: post.isPublic,
  type: post.type.toLowerCase(),
  images: post.imagesUrls?.length ? post.imagesUrls : null,
  attach: null,
  isLike: post.isLiked,
  likesCount: post.likesCount,
  commentsCount: post.commentariesCount,
});
