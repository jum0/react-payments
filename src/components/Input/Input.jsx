import classNames from "classnames/bind";
import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

const Input = ({ textAlign = "center", placeholder, labelText, inputWidth, className = "", setCardInputState }) => {
  return (
    <div className={`${cx("input-wrapper")} ${className}`} style={{ width: inputWidth }}>
      {!!labelText?.length && (
        <label className={cx("input__label")} name={labelText}>
          {labelText}
        </label>
      )}
      <input className={cx("input")} style={{ textAlign }} placeholder={placeholder}></input>
    </div>
  );
};

export default Input;
