import Image from "next/image";

export default function SignLanguageIntro() {
  return (
    <div className="col-center py-8">
      <div className="flex w-full border-b pb-2">
        <h1 className="text-3xl font-medium">수화 번역 서비스</h1>
      </div>

      <div className="flex w-full flex-col items-start justify-center py-8">
        <div className="flex w-full flex-col items-start">
          <p>4조의 수어 번역 서비스는 혁신적인 방식을 사용합니다.</p>
          <p>▶ 이미지를 입력하면 mlflow의 모델을 통해 알파벳을 인식합니다.</p>
          <p>
            ▶ 알파벳에 대한 정보를 ChatGPT API와 BARD API로 전송하여 답변을 받을
            수 있습니다.
          </p>
          <p>
            이 서비스는 수어 사용자들에게 효과적인 의사 소통 도구로 사용될 수
            있습니다.
          </p>
        </div>

        <Image
          src={"/images/수어번역서비스 모델 설명.png"}
          width={700}
          height={700}
          alt={"수어번역서비스 모델 설명"}
        />
      </div>
    </div>
  );
}
