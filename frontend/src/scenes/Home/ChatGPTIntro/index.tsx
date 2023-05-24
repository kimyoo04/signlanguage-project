import Image from "next/image";

export default function ChatGPTIntro() {
  return (
    <div className="col-center py-8">
      <div className="flex w-full border-b pb-2">
        <h1 className="text-3xl font-medium">챗봇 서비스</h1>
      </div>

      <div className="row-center py-8">
        <Image
          src={"/images/chatgpt_logo.png"}
          width={110}
          height={90}
          alt={"chatgpt_logo"}
        />
        <Image
          src={"/images/bardai.png"}
          width={500}
          height={200}
          alt={"bardai"}
        />
      </div>

      <div>
        <p>
          ChatGPT는 OpenAI가 제공하는 서비스, Bard는 Google에서 제공하는
          서비스입니다.
        </p>
        <p>
          ChatGPT API와 Bard API는 개발자들이 대화형 인공지능 모델에 액세스하여
        </p>
        <p>
          다양한 애플리케이션과 서비스에서 자연어 처리 기능을 활용할 수 있도록
          도와줍니다.
        </p>
      </div>
    </div>
  );
}
