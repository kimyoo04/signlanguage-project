import axios from "@api/axiosInstance";
import { IDeletePostDetail } from "@type/posts";

export const deletePostDetail = async (data: IDeletePostDetail) => {
  try {
    await axios.delete(`/posts/${data.postId}`);
    return true;
  } catch (err) {
    return false;
  }
};
