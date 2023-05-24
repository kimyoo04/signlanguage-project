import { TUserId, TUsername } from "./signin";

// 자유게시판 데이터
export interface IPostData {
  id: TId;
  title: TTitle;
  content: TContent;
  createdAt: TCreatedAt;
  views: TViews;

  userId: TUserId;
  username: TUsername;
}

export interface IPostDataArr {
  data: IPostData[];
}

//게시글 업로드 폼
export interface IPostForm {
  title: TTitle;
  content: TContent;
}
//게시글 업데이트 폼
export interface IUpdatePostForm {
  postId: TPostId;
  title: TTitle;
  content: TContent;
}

// 게시글 삭제 시 전송할 데이터
export interface IDeletePostDetail {
  postId: TPostId;
}

export type TId = number;
export type TPostId = string;
export type TPassword = string;
export type TTitle = string;
export type TContent = string;
export type TViews = number;
export type TCreatedAt = string;

// 게시글 디테일 페이지 데이터
export interface IPostDetail {
  id: TId;
  title: TTitle;
  content: TContent;
  createdAt: TCreatedAt;
  views: TViews;

  userId: TUserId;
  username: TUsername;
}
