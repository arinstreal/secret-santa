import styles from "./LoadingButton.module.scss";
import React, { FC } from "react";
import { FaGift } from "react-icons/fa";

interface ILoadingButton {
  type?: string,
  text: string,
  isLoading?: boolean
}

export const LoadingButton: FC<ILoadingButton> = ({ type = "submit", text, isLoading }) =>
  <button className={styles.loadingButton}>
    {isLoading ? <FaGift className={styles.loader}/> : text}
  </button>