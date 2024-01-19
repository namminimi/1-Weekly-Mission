import { useState } from "react";
import styles from "./input.module.css";
import Image from "next/image";
import eyeOffIcon from "@/public/img/svg/eye-off.svg";
import eyeOnIcon from "@/public/img/svg/eye-on.svg";

import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormTrigger,
} from "react-hook-form";
import { useRouter } from "next/router";
import { UserFormType } from "./authType";

interface InputType {
  field:
    | ControllerRenderProps<UserFormType, "email">
    | ControllerRenderProps<UserFormType, "password">
    | ControllerRenderProps<UserFormType, "passwordCh">;
  fieldState: ControllerFieldState;
  checkEmail?: (email: string) => Promise<void>;
  trigger?: UseFormTrigger<UserFormType>;
}

const Input = ({ field, fieldState, checkEmail, trigger }: InputType) => {
  const [changeEyeIcon, setChangeEyeIcon] = useState<boolean>(false);
  const router = useRouter();
  const isSignin = router.pathname.includes("signin");

  const handleClick = () => {
    setChangeEyeIcon(!changeEyeIcon);
  };

  const isPassword = field.name === "email";

  return (
    <>
      <div className={styles.Wrap}>
        <input
          className={styles.input}
          type={changeEyeIcon || isPassword ? "text" : "password"}
          name={field.name}
          value={field.value}
          onChange={(e) => {
            field.onChange(e);
            if (field.name !== "passwordCh") return;
            trigger && trigger("passwordCh");
          }}
          onBlur={(e) => {
            field.onBlur();
            if (!isSignin && isPassword && checkEmail) {
              checkEmail(e.target.value);
            }
          }}
          placeholder={isPassword ? "이메일" : "비밀번호"}
          autoComplete="off"
        />
        {isPassword ? null : (
          <Image
            className={styles.eyeIcon}
            src={changeEyeIcon ? eyeOnIcon : eyeOffIcon}
            alt="눈아이콘"
            onClick={handleClick}
          />
        )}
      </div>
      {fieldState.error && (
        <small className={styles.errorMessage}>
          {fieldState.error.message}
        </small>
      )}
    </>
  );
};

export default Input;
