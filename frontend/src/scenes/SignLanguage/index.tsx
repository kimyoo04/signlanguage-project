export default function SignLanguage() {
  let idNum = 0;

  function deepCopy() {
    // 'test' node 선택
    const fileModule = document.getElementById("file-module-" + idNum);

    if (fileModule !== null) {
      // 노드 복사하기 (deep copy)
      const newNode = fileModule.cloneNode(true);
      console.log(newNode);
      // 복사된 Node id 변경하기
      idNum++;
      newNode.id = "file-module-" + idNum;

      // 복사한 노드 붙여넣기
      fileModule.after(newNode);
    }
  }

  return (
    <div className="col-center gap-4">
      <h2>수어 사진을 업로드 해주세요.</h2>

      <button
        onClick={() => deepCopy()}
        type="button"
        className="col-center w-96 gap-4 rounded-xl bg-main_color p-4 transition-all hover:scale-110"
      >
        <span className="text-2xl font-bold text-font_white">이미지 추가</span>
      </button>

      <form
        method="post"
        encType="multipart/form-data"
        className="col-center w-96 gap-4 rounded-xl bg-sub_color p-4"
      >
        <div className="col-center flex-wrap md:flex-row">
          <span id="file-module-0">
            <label htmlFor="files" className="cursor-pointer rounded-full">
              파일 추가
            </label>
            <input
              id="files"
              name="files"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </span>
        </div>

        <input type="submit" value="ChatGPT에게 수어로 문의하기" />
      </form>
    </div>
  );
}
