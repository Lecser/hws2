import React, { useState } from "react";
import s2 from "../../s1-main/App.module.css";
import s from "./HW13.module.css";
import SuperButton from "../hw04/common/c2-SuperButton/SuperButton";
import axios, { AxiosError } from "axios";
import success200 from "./images/200.svg";
import error400 from "./images/400.svg";
import error500 from "./images/500.svg";
import errorUnknown from "./images/error.svg";

/*
 * 1 - дописать функцию send
 * 2 - дизэйблить кнопки пока идёт запрос
 * 3 - сделать стили в соответствии с дизайном
 * */

const HW13 = () => {
  const [code, setCode] = useState("");
  const [text, setText] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const send = (x?: boolean | null) => () => {
    const url =
      x === null
        ? "https://xxxxxx.ccc" // имитация запроса на не корректный адрес
        : "https://samurai.it-incubator.io/api/3.0/homework/test";

    setCode("");
    setImage("");
    setText("");
    setInfo("...loading");
    setIsLoading(true);

    axios
      .post(url, { success: x })
      .then((res) => {
        console.log(res);
        setCode(`Код ${res.status}`);
        setImage(success200);
        setText(res.data.errorText);
        setInfo(res.data.info);
        // дописать
      })
      .catch((e: AxiosError) => {
        console.log(e);
        switch (e?.response?.status) {
          case 400:
            {
              setCode(`Код ${e.request.status}`);
              setInfo(e.response && (e.response.data as { info: string }).info);
              setText(
                e.response &&
                  (e.response.data as { errorText: string }).errorText
              );
              setImage(error400);
            }
            break;
          case 500:
            {
              setCode(`Код ${e.request.status}`);
              setInfo(e.response && (e.response.data as { info: string }).info);

              setText(
                e.response &&
                  (e.response.data as { errorText: string }).errorText
              );
              setImage(error500);
            }
            break;
          case 0: {
            setInfo(e.name);
            setText(e.message);
            setImage(errorUnknown);
            break;
          }
        }

        // дописать
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id={"hw13"}>
      <div className={s2.hwTitle}>Homework #13</div>

      <div className={s2.hw}>
        <div className={s.buttonsContainer}>
          <SuperButton
            id={"hw13-send-true"}
            onClick={send(true)}
            disabled={isLoading}
            xType={"secondary"}
            // дописать
          >
            Send true
          </SuperButton>
          <SuperButton
            id={"hw13-send-false"}
            onClick={send(false)}
            disabled={isLoading}
            xType={"secondary"}
            // дописать
          >
            Send false
          </SuperButton>
          <SuperButton
            id={"hw13-send-undefined"}
            onClick={send(undefined)}
            disabled={isLoading}
            xType={"secondary"}
            // дописать
          >
            Send undefined
          </SuperButton>
          <SuperButton
            id={"hw13-send-null"}
            onClick={send(null)} // имитация запроса на не корректный адрес
            disabled={isLoading}
            xType={"secondary"}
            // дописать
          >
            Send null
          </SuperButton>
        </div>

        <div className={s.responseContainer}>
          <div className={s.imageContainer}>
            {image && <img src={image} className={s.image} alt="status" />}
          </div>

          <div className={s.textContainer}>
            <div id={"hw13-code"} className={s.code}>
              {code}
            </div>
            <div id={"hw13-text"} className={s.text}>
              {text}
            </div>
            <div id={"hw13-info"} className={s.info}>
              {info}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HW13;
