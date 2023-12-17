import styles from "./signup.module.css";
import logo from "@/public/img/png/Linkbrary.png";
import google from "@/public/img/png/Component 2.png";
import kakao from "@/public/img/png/Component 3.png";
import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";

import { API_URL } from "@/config/apiUrl";
import { SignLayout } from "@/components/Layout";
import { useForm } from "react-hook-form";

const SignupContainer = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState,
    watch,
  } = useForm({
    mode: "onBlur",
  });
  const { isSubmitting } = formState;
  const passwordCh = watch('password')

  const handleSubmit = async (data: any) => {
    const { email, password, passwordCheck } = data;
    const newData = {
      email,
      password
    }


    if (email && password && passwordCh) {
      try {
        const res = await fetch(`${API_URL}sign-up`, {
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
          throw new Error("회원가입 실패");
        }
      } catch {
        console.log("회원가입 실패");
      }
    } else {
      console.log("회원가입 못함");
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
            <div className={styles.inputBox}>
              <label className={styles.inputBoxLabel} htmlFor="password-check">
                비밀번호 확인
              </label>
              <Input
                type={"passwordCheck"}
                register={register}
                formState={formState}
                watch={passwordCh}
              />
            </div>
            <button
              className={styles.joinBtn}
              type="submit"
              disabled={isSubmitting}
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
