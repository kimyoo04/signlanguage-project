import { signLanguage } from "@api/signLanguage/signLanguage";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function SignLanguage() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [answer, setAnswer] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 선택된 파일을 미리보기 이미지로 변환 후 배열에 추가
    const imagePreviews = acceptedFiles.map((file: File) =>
      URL.createObjectURL(file)
    );
    setImageFiles((imageFiles) => [...imageFiles, ...acceptedFiles]);
    setPreviewImages((prevImages) => [...prevImages, ...imagePreviews]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    // 선택된 파일들을 formData로 변환
    const formData = new FormData();
    imageFiles.forEach((image) => {
      formData.append("files", image);
    });

    // 수어 번역 요청 후 답변 받아오기 및 미리보기 초기화
    const response = await signLanguage(formData);
    if (response) {
      setAnswer(response.result);
      setPreviewImages([]);
    }
  };

  // 미리보기 이미지 초기화
  const handleReset = async () => {
    setAnswer("");
    setPreviewImages([]);
  };

  return (
    <section className="col-center w-full gap-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold">수어 사진을 올려보세요!</h1>
      </div>

      <form className="col-center w-full gap-4">
        <div
          className="col-center w-full rounded-xl border border-dashed border-gray_3 p-12 hover:border-solid"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <i className="ri-image-add-line text-4xl"></i>
        </div>

        <div className="grid w-full grid-cols-4 flex-wrap gap-2 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {previewImages.map((previewUrl, index) => (
            <Image
              key={index}
              src={previewUrl}
              alt="이미지 미리보기"
              width={150}
              height={150}
            />
          ))}
        </div>
      </form>

      {/* 버튼들 */}
      <div className="flex w-full items-center justify-between gap-4">
        <button
          onClick={() => handleReset()}
          className="rounded-full bg-main_color px-4 py-1 text-font_white"
        >
          다시 물어보기
        </button>

        <button
          onClick={() => handleSubmit()}
          className="rounded-full bg-main_color px-4 py-1 text-font_white"
        >
          수어 번역하기
        </button>
      </div>

      {answer && (
        <div className="col-center w-full gap-4">
          <h1 className="text-2xl font-bold">수어 번역 결과</h1>
          <div className="w-full rounded-xl border border-dashed border-gray_3 p-12 hover:border-solid">
            <p className="text-2xl">{answer}</p>
          </div>
        </div>
      )}
    </section>
  );
}
