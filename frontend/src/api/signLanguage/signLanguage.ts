import axios from "axios";

export const signLanguage = async (files: string[]) => {
  console.log(files);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/signLanguage",
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
