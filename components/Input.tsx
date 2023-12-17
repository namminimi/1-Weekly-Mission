import { ChangeEvent, useState } from "react";
import styles from "./input.module.css";
import Image from "next/image";
import eyeOffIcon from "@/public/img/svg/eye-off.svg";
import eyeOnIcon from "@/public/img/svg/eye-on.svg";

import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import { REG_EXP } from "@/utils/constant";
import { API_URL } from "@/config/apiUrl";

interface InputType {
  type: string;
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
}

const Input = ({ type, register, formState }: InputType) => {
  const { isSubmitted, errors } = formState;
  const [changeEyeIcon, setChangeEyeIcon] = useState<boolean>(false);

  const onClick = () => {
    setChangeEyeIcon(!changeEyeIcon);
  };

  const isType = () => {
    return type === "email";
  };

  const checkDuplicateEmail = async (email: string) => {
    try {
      const res = await fetch(`${API_URL}check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        // 중복된 이메일이 없는 경우의 처리
        return false;
      } else {
        // 중복된 이메일이 있는 경우의 처리

        return true;
      }
    } catch (error) {
      return true;
    }
  };

  const message = errors[`${type}`]?.message;
  return (
    <>
      <div className={styles.Wrap}>
        <input
          className={styles.input}
          type={changeEyeIcon || isType() ? "text" : "password"}
          id={`${type}`}
          placeholder={isType() ? "이메일" : "비밀번호"}
          autoComplete="off"
          aria-invalid={
            isSubmitted ? (errors[`${type}`] ? "true" : "false") : undefined
          }
          {...register(`${type}`, {
            required: isType()
              ? "이메일을 입력해주세요"
              : "비밀번호를 입력해주세요",
            pattern: {
              value: REG_EXP[isType() ? "CHECK_EMAIL" : "CHECK_PASSWORD"],
              message: isType()
                ? "올바른 이메일 주소가 아닙니다."
                : "비밀번호는 영문, 숫자 조합 8자이상 입력해주세요.",
            },
            validate: async (value) => {
              if (type === "email") {
                const isDuplicate = await checkDuplicateEmail(value);
                return isDuplicate ? "이미 사용중인 이메일입니다." : true;
              }
            },
          })}
        />
        {isType() ? null : (
          <Image
            className={styles.eyeIcon}
            src={changeEyeIcon ? eyeOnIcon : eyeOffIcon}
            alt="눈아이콘"
            onClick={onClick}
          />
        )}
      </div>
      {errors[`${type}`] && (
        <small className={styles.errorMessage}>{message?.toString()}</small>
      )}
    </>
  );
};

export default Input;
