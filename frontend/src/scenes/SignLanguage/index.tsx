import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function SignLanguage() {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles) => {
    // 선택된 파일을 미리보기 이미지로 변환
    const imagePreviews = acceptedFiles.map((file: File) =>
      URL.createObjectURL(file)
    );
    setPreviewImages((prevImages) => [...prevImages, ...imagePreviews]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form className="col-center w-full gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">수어 사진을 올려보세요!</h1>

        <button
          type="submit"
          className="rounded-full bg-main_color px-4 py-1 text-font_white"
        >
          수어 번역하기
        </button>
      </div>

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
  );
}
