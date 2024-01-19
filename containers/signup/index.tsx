import styles from "./signup.module.css";
import logo from "@/public/img/png/Linkbrary.png";
import google from "@/public/img/png/Component 2.png";
import kakao from "@/public/img/png/Component 3.png";
import Input from "@/components/Input/Input";
import Link from "next/link";
import Image from "next/image";
import { SignLayout } from "@/components/Layout";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { API_URL } from "@/config/apiUrl";
import { ERROR_MESSAGES, REG_EXP } from "@/components/Input/vaildation";

const SignupContainer = () => {
  const {
    handleSubmit: onSubmit,
    formState,
    setError,
    watch,
    control,
    trigger,
  } = useForm({
    defaultValues: { email: "", password: "", passwordCh: "" },
    mode: "onBlur",
  });
  const { isDirty, isValid } = formState;
  const isSignUp = isDirty && isValid;
  const passwordState = watch("password");
  const router = useRouter();

  const checkDuplicateEmail = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}users/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      console.log(email);
      console.log(res);
      if (res.status === 409) {
        setError("email", {
          type: "manual",
          message: "중복된 이메일입니다.",
        });
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    const newData = {
      email,
      password,
    };
    if (email && password && passwordState) {
      try {
        const res = await fetch(`${API_URL}auth/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        });
        console.log(res);
        if (!res.ok) {
          throw new Error("회원가입 실패");
        }
        const result = await res.json();
        console.log(result);
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
      <div className={styles.join}>
        <div className={styles.joinForm}>
          <h1 className={styles.joinFormH1}>
            <Link href="/" className={styles.joinFormH1A}>
              <Image className={styles.joinFormH1Img} src={logo} alt="logo" />
            </Link>
          </h1>
          <div className={styles.loginLink}>
            <h3 className={styles.loginLinkH3}>이미 회원이신가요?</h3>
            <Link className={styles.loginLinkA} href="/signin">
              로그인 하기
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
                    <Input
                      field={field}
                      fieldState={fieldState}
                      checkEmail={checkDuplicateEmail}
                    />
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
            <div className={styles.inputBox}>
              <label className={styles.inputBoxLabel} htmlFor="password-check">
                비밀번호 확인
              </label>
              <Controller
                name="passwordCh"
                control={control}
                rules={{
                  required: ERROR_MESSAGES.password.passwordField,
                  validate: (value) =>
                    value === passwordState || "비밀번호가 일치하지 않습니다",
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      field={field}
                      fieldState={fieldState}
                      trigger={trigger}
                    />
                  </>
                )}
              />
            </div>
            <button
              className={styles.joinBtn}
              type="submit"
              disabled={!isSignUp}
            >
              회원가입
            </button>
          </form>
          <div className={styles.joinFormSocial}>
            <h3 className={styles.joinFormSocialH3}>다른 방식으로 가입하기</h3>
            <Link
              className={styles.joinFormSocialA}
              href="https://www.google.com/"
            >
              <Image src={google} alt="구글 로그인 이미지" />
            </Link>
            <Link
              className={styles.joinFormSocialA}
              href="https://www.kakaocorp.com/page/"
            >
              <Image
                className={styles.joinFormSocialImg}
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

export default SignupContainer;
