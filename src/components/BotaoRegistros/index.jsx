import { useState } from "react";
import styles from "./ContainerInputLabel.module.css";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const ContainerInputLabel = ({
  type = "text",
  require,
  id,
  children,
  forHtml = "text",
  handleChange,
  name,
  min,
  valued,
  isPassword = false,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isHide, setIsHide] = useState(true);

  const handleClickIcon = () => {
    setIsHide((prev) => (prev = !prev));
  };

  const onLister = (e) => {
    !e.target.value ? setIsActive(false) : setIsActive(true);
    handleChange(e);
  };

  return (
    <div className={styles.container_form}>
      <input
        value={valued}
        type={isPassword ? (isHide ? "password" : "text") : type}
        required={require}
        autoComplete={isPassword ? "current-password" : ""}
        id={id}
        name={name}
        onChange={(e) => onLister(e)}
        minLength={min}
      />
      <label className={isActive ? styles.Active : ""} htmlFor={forHtml}>
        {children}
      </label>
      {isPassword ? (
        isHide ? (
          <BiSolidHide
            onClick={handleClickIcon}
            className={styles.hide}
            size={24}
          />
        ) : (
          <BiSolidShow
            onClick={handleClickIcon}
            className={styles.hide}
            size={24}
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default ContainerInputLabel;
