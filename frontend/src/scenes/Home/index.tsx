import Introduce from "./Introduce";
import ChatGPTIntro from "./ChatGPTIntro";
import SignLanguageIntro from "./SignLanguageIntro";
import Team from "./Team";

export default function Home() {
  return (
    <div className="container px-5">
      <Introduce />
      <ChatGPTIntro />
      <SignLanguageIntro />
      <Team />
    </div>
  );
}
