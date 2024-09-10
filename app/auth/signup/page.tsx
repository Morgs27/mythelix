"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { signIn } from "next-auth/react";

const UserForm = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState({
    error: "",
    fine: false,
  });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ error: "", fine: false });

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    error: "",
    fine: false,
  });

  const [active, setActive] = useState(false);

  const [visible, setVisible] = useState(false);

  const [fadeActive, setFadeActive] = useState(false);

  let usernameTimeout: NodeJS.Timeout | null = null;
  let emailTimeout: NodeJS.Timeout | null = null;
  let passwordTimeout: NodeJS.Timeout | null = null;

  const checkDelay = 300;

  useEffect(() => {
    setFadeActive(true);
  }, []);

  const handleUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value.toLowerCase());
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    // check if there are any errors
    if (
      usernameError.fine != true ||
      emailError.fine != true ||
      passwordError.fine != true
    ) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [usernameError, emailError, passwordError]);

  useEffect(() => {
    if (usernameTimeout) {
      clearTimeout(usernameTimeout);
    }

    usernameTimeout = setTimeout(async () => {
      let value = username;

      if (value.length > 0) {
        // check if there are any spaces
        if (/\s/.test(value)) {
          setUsernameError({ fine: false, error: "Remove Spaces" });
        }

        // check to see if the value is only made of alphabet characters or numbers
        else if (!/^[a-z0-9]+$/i.test(value)) {
          setUsernameError({ fine: false, error: "Remove Special Characters" });
        }

        // check length
        else if (value.length < 4) {
          setUsernameError({
            fine: false,
            error: "Must be at least 4 Characters",
          });
        }

        // check length
        else if (value.length > 15) {
          setUsernameError({
            fine: false,
            error: "Cannot Exceed 15 Characters",
          });
        } else {
          // check to see if username is taken
          const res = await fetch(`/api/auth/checkUsername?name=${value}`);

          if (res.ok) {
            // Username should be fine
            setUsernameError({ error: "Username Available", fine: true });
          } else {
            // Username Taken
            setUsernameError({ fine: false, error: "Username Taken" });
          }
        }
      } else {
        setUsernameError({ fine: false, error: "" });
      }
    }, checkDelay);
  }, [username]);

  useEffect(() => {
    if (emailTimeout) {
      clearTimeout(emailTimeout);
    }

    emailTimeout = setTimeout(async () => {
      let value = email;

      // Check email is valid
      if (value.length > 0) {
        // check email dosen't contain spaces
        if (/\s/.test(value)) {
          setEmailError({ fine: false, error: "Remove Spaces" });
        }

        // check email is of the valid email format characters -> @ -> characters -> . -> characters
        else if (
          !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          setEmailError({ fine: false, error: "Invalid Email" });
        } else {
          // check to see if username is taken
          const res = await fetch(`/api/auth/checkEmail?email=${value}`);

          if (res.ok) {
            // Username should be fine
            setEmailError({ error: "Valid Email", fine: true });
          } else {
            // Username Taken
            setEmailError({ fine: false, error: "Email Already Used" });
          }
        }
      } else {
        setEmailError({ fine: false, error: "" });
      }
    }, checkDelay);
  }, [email]);

  useEffect(() => {
    if (passwordTimeout) {
      clearTimeout(passwordTimeout);
    }

    emailTimeout = setTimeout(async () => {
      let value = password;

      // Check password is 8 characters or greater
      if (value.length > 0) {
        if (value.length < 8) {
          setPasswordError({
            fine: false,
            error: "Must be at least 8 Characters",
          });
        }

        // Check password has at least one number
        else if (!/\d/.test(value)) {
          setPasswordError({
            fine: false,
            error: "Must contain at least one number",
          });
        }

        // Check password has at least one special character
        else if (!/[!@#$%^&=+*]/.test(value)) {
          setPasswordError({
            fine: false,
            error: "Must contain at least one special character",
          });
        } else {
          setPasswordError({ fine: true, error: "Password Valid" });
        }
      } else {
        setPasswordError({ fine: false, error: "" });
      }
    }, checkDelay);
  }, [password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      usernameError.fine != true ||
      emailError.fine != true ||
      passwordError.fine != true
    ) {
      return;
    }

    setErrorMessage("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    });

    const response = await res.json();

    if (!res.ok) {
      setErrorMessage(response.message);
    } else {
      await signIn("credentials", {
        username: response.username,
        password: response.password,
        callbackUrl: "http://localhost:3000",
      });
    }
  };

  const handleVisible = () => {
    setVisible((visible) => {
      return !visible;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="post" className="form">
        <div
          className={`form__title fade-delay-0 ${
            fadeActive ? "fade-in-normal-active" : "fade-in-normal"
          }`}
        >
          New Mythelix Account
        </div>
        <div
          className={`form__description fade-delay-15 ${
            fadeActive ? "fade-in-normal-active" : "fade-in-normal"
          }`}
        >
          Already have an accout? <Link href="./signin">Sign In</Link>
        </div>

        <div
          className={`form__input__container ${
            fadeActive
              ? "fade-in-normal-active fade-delay-3"
              : "fade-in-normal fade-delay-5"
          }  ${
            usernameError.fine == true
              ? "fine"
              : username.length > 0
              ? "red"
              : ""
          }`}
        >
          <input
            placeholder="Username"
            id="name"
            name="name"
            onChange={handleUsername}
            type="text"
            value={username}
          />
          <div className="form__error">{usernameError.error}</div>
        </div>

        <div
          className={`form__input__container ${
            fadeActive
              ? "fade-in-normal-active fade-delay-6"
              : "fade-in-normal fade-delay-8"
          } ${
            emailError.fine == true ? "fine" : email.length > 0 ? "red" : ""
          }`}
        >
          <input
            placeholder="Email"
            id="email"
            name="email"
            onChange={handleEmail}
            type="text"
            value={email}
          />
          <div className="form__error">{emailError.error}</div>
        </div>

        <div
          className={`form__input__container ${
            fadeActive
              ? "fade-in-normal-active fade-delay-9"
              : "fade-in-normal fade-delay-11"
          } ${
            passwordError.fine == true
              ? "fine"
              : password.length > 0
              ? "red"
              : ""
          }`}
        >
          <input
            placeholder="Password"
            id="password"
            name="password"
            onChange={handlePassword}
            type={visible ? "text" : "password"}
            value={password}
          />

          <div
            onClick={handleVisible}
            className={`eye ${password.length > 0 ? "active" : ""}`}
          >
            <FaEye></FaEye>
          </div>

          <div className="form__error">{passwordError.error}</div>
        </div>

        <div
          className={
            fadeActive
              ? "fade-in-normal-active fade-delay-12"
              : "fade-in-normal fade-delay-15"
          }
          style={{ width: "100%" }}
        >
          <input
            className={`form__button  ${active ? "active" : ""}`}
            type="submit"
            value="Create Account"
            onSubmit={handleSubmit}
          />
        </div>

        <div
          className={`form__main__error ${
            errorMessage.length > 0 ? "active" : ""
          }`}
        >
          {errorMessage}
        </div>
      </form>
    </>
  );
};

export default UserForm;
