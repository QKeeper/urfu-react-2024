export interface IPost {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IModalContext {
  children?: React.ReactNode;
  isOpen: boolean;
  toggle?: () => void;
  close?: () => void;
  open?: (children: React.ReactNode) => void;
}

export interface IPostsContext {
  posts: IPost[];
}

export interface IPostsActionsContext {
  setPosts?: (post: IPost[]) => void;
  createPost?: (post: IPost) => void;
  patchPost?: (post: IPost) => void;
  deletePost?: (id: string) => void;
}
