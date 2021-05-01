import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./CardExpirationInput.module.scss";

const cx = classNames.bind(styles);

const CardExpirationInput = ({ inputWidth = "100%", labelText, className, onCardExpirationChange, onCardExpirationInputStateUpdate, monthPlaceholder, yearPlaceholder }) => {
  const [cardExpirationInputState, setCardExpirationInputState] = useState({
    expirationMonthInput: "",
    expirationYearInput: "",
  });
  
  const onCardExpirationInputChange = (event) => {
    onCardExpirationChange(event, setCardExpirationInputState);
  };

  useEffect(() => onCardExpirationInputStateUpdate(cardExpirationInputState), [cardExpirationInputState]);

  return (
    <div className={`${cx("card-expiration-input")} ${className}`}>
      {!!labelText?.length && (
        <label className={cx("card-expiration-input__label")} name={labelText}>
          {labelText}
        </label>
      )}
      <div className={cx("card-expiration-input__input-wrapper")} style={{width: inputWidth}}>
        <input
          name={"expirationMonthInput"}
          type="text"
          className={cx("card-expiration-input__input")}
          maxLength={2}
          onChange={onCardExpirationInputChange}
          placeholder={monthPlaceholder}
          required
        />
        <span className={cx("card-expiration-input__input-separator")}>/</span>
        <input
          name={"expirationYearInput"}
          type="text"
          className={cx("card-expiration-input__input")}
          maxLength={2}
          onChange={onCardExpirationInputChange}
          placeholder={yearPlaceholder}
          required
        />
      </div>
    </div>
  );
};

export default CardExpirationInput;
