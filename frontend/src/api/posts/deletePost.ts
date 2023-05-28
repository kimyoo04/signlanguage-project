import axios from "@api/axiosInstance";
import { IDeletePostDetail } from "@type/posts";

export const deletePost = async (data: IDeletePostDetail) => {
  try {
    await axios.delete(`/posts/${data.postId}/`);
    return true;
  } catch (err) {
    console.log("🚀 deletePostDetail.tsx", err);
    return false;
  }
};
