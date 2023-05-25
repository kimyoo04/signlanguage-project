import axios from "@api/axiosInstance";

export const signLanguage = async (files: File[]) => {
  try {
    const response = await axios.post(
      "/chat/",
      { files },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
