import { useRouter } from "next/router";
import { ISignInForm } from "@type/signin";
import { useForm } from "react-hook-form";
import ErrorMsg from "@components/TextField/ErrorMsg";
import { TextField } from "@components/TextField";
import Link from "next/link";
import { useAppDispatch } from "@toolkit/hook";
import { authActions } from "@features/auth/authSlice";
import axios from "@api/axiosInstance";

export default function Signin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({
    defaultValues: {},
  });

  const onValid = async (data: ISignInForm) => {
    try {
      // get user
      const response = await axios.post("/account/signin/", {
        userId: data.userId,
        password: data.password,
      });

      // auth state
      dispatch(authActions.signin({ ...response.data }));

      console.log(response);
    } catch (error: any) {
      console.log(error);
      return;
    }

    router.replace("/");
    await new Promise((resolve) => setTimeout(resolve, 500));
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <TextField
        id="userId"
        label="ID"
        error={errors.userId?.message as string}
        inputProps={{
          ...register("userId", {
            required: "ID를 입력해주세요.",
            maxLength: {
              value: 16,
              message: "ID는 17 보다 작아야 합니다.",
            },
          }),
        }}
      />

      <TextField
        id="password"
        label="password"
        type="password"
        error={errors.password?.message as string}
        autoComplete="current-password"
        inputProps={{
          ...register("password", {
            required: "Password를 입력해주세요.",
            minLength: {
              value: 6,
              message: "Password는 5보다 길어야 합니다.",
            },
            maxLength: {
              value: 16,
              message: "Password는 17보다 짧아야 합니다.",
            },
          }),
        }}
      />

      <ErrorMsg>{errors?.extraError?.message}</ErrorMsg>

      <div className="mt-4 flex items-center justify-between">
        <Link href="/signup">
          <span>회원가입</span>
        </Link>
        <button type="submit">로그인</button>
      </div>
    </form>
  );
}
