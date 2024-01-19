import logo from "@/public/img/png/Linkbrary.png";
import google from "@/public/img/png/Component 2.png";
import kakao from "@/public/img/png/Component 3.png";
import Input from "@/components/Input/Input";
import Link from "next/link";
import Image from "next/image";
import styles from "./signin.module.css";
import { useRouter } from "next/router";
import { SignLayout } from "@/components/Layout";
import { Controller, useForm } from "react-hook-form";
import { API_URL } from "@/config/apiUrl";
import { ERROR_MESSAGES, REG_EXP } from "@/components/Input/vaildation";
import { UserFormType } from "@/components/Input/authType";

const SigninContainer = () => {
  const {
    handleSubmit: onSubmit,
    formState,
    setError,
    control,
  } = useForm<UserFormType>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });
  const { isSubmitting } = formState;
  const router = useRouter();

  const reCheck = () => {
    setError("email", {
      type: "email",
      message: "이메일을 확인해주세요",
    });
    setError("password", {
      type: "password",
      message: "비밀번호를 확인해주세요",
    });
  };

  const handleSubmit = async (data: any) => {
    const { email, password } = data;

    if (email && password) {
      try {
        const res = await fetch(`${API_URL}auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log(res);
        if (!res.ok) {
          throw new Error("로그인 실패");
        }
        const result = await res.json();
        const { accessToken } = result;
        window.localStorage.setItem("user", accessToken);
        alert("환영합니다.");
        router.push("/folder");
      } catch {
        reCheck();
      }
    } else {
      reCheck();
    }
  };

  return (
    <SignLayout>
      <div className={styles.login}>
        <div className={styles.loginForm}>
          <h1 className={styles.loginFormH1}>
            <Link href="/" className={styles.loginFormH1A}>
              <Image className={styles.loginFormH1Img} src={logo} alt="logo" />
            </Link>
          </h1>
          <div className={styles.joinLink}>
            <h3 className={styles.joinLinkH3}>회원이 아니신가요?</h3>
            <Link href="/signup" className={styles.joinLinkA}>
              회원 가입하기
            </Link>
          </div>
          <form className={styles.form} onSubmit={onSubmit(handleSubmit)}>
            <div className={styles.inputBox}>
              <label className={styles.inputBoxLabel} htmlFor="email">
                이메일
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: ERROR_MESSAGES.email.emailField,
                  pattern: {
                    value: REG_EXP.CHECK_EMAIL,
                    message: ERROR_MESSAGES.email.emailPattern,
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input field={field} fieldState={fieldState} />
                  </>
                )}
              />
            </div>
            <div className={styles.inputBox}>
              <label className={styles.inputBoxLabel} htmlFor="password">
                비밀번호
              </label>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: ERROR_MESSAGES.password.passwordField,
                  pattern: {
                    value: REG_EXP.CHECK_PASSWORD,
                    message: ERROR_MESSAGES.password.passwordPattern,
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input field={field} fieldState={fieldState} />
                  </>
                )}
              />
            </div>
            <button
              className={styles.loginBtn}
              type="submit"
              disabled={isSubmitting}
            >
              로그인
            </button>
          </form>
          <div className={styles.loginFormSocial}>
            <h3 className={styles.loginFormSocialH3}>소셜 로그인</h3>
            <Link
              className={styles.loginFormSocialA}
              href="https://www.google.com/"
            >
              <Image
                className={styles.loginFormSocialImg}
                src={google}
                alt="구글 로그인 이미지"
              />
            </Link>
            <Link
              className={styles.loginFormSocialA}
              href="https://www.kakaocorp.com/page/"
            >
              <Image
                className={styles.loginFormSocialImg}
                src={kakao}
                alt="카카오톡 로그인 이미지"
              />
            </Link>
          </div>
        </div>
      </div>
    </SignLayout>
  );
};

export default SigninContainer;
