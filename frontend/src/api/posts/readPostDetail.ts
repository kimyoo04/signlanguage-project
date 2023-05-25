import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IPostDetail } from "@type/posts";

export const readPostDetail = async (id: string) => {
  const response = await axios.get(`/posts/${id}/`);
  return response.data;
};

export const useReadPostDetail = (id: string) => {
  return useQuery<IPostDetail>({
    queryKey: ["postDetail", id],
    queryFn: () => readPostDetail(id),
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
  });
};
