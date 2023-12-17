import { FormEventHandler, useState } from "react";
import logo from "@/public/img/png/Linkbrary.png";
import google from "@/public/img/png/Component 2.png";
import kakao from "@/public/img/png/Component 3.png";
import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import styles from "./signin.module.css";
import { API_URL } from "@/config/apiUrl";
import { useRouter } from "next/router";
import { SignLayout } from "@/components/Layout";
import { useForm } from "react-hook-form";

const SigninContainer = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState,
    watch,
  } = useForm({
    mode: "onBlur",
  });
  const { isSubmitting } = formState;

  const handleSubmit = async (data: any) => {
    console.log(data);
    const { email, password, passwordCh } = data;

    if (email && password) {
      try {
        const res = await fetch(`${API_URL}sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const result = await res.json();

          alert("환영합니다.");
          //router.push("/folder");
        } else {
          throw new Error("로그인 실패");
        }
      } catch {
        console.log("로그인 실패");
      }
    } else {
      console.log("로그인 못함");
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
              <Input type={"email"} register={register} formState={formState} />
            </div>
            <div className={styles.inputBox}>
              <label className={styles.inputBoxLabel} htmlFor="password">
                비밀번호
              </label>
              <Input
                type={"password"}
                register={register}
                formState={formState}
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
