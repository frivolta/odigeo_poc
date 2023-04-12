import { FC } from "react";
import styles from "./index.module.scss";

interface ActionCardProps {
  children: React.ReactNode;
  className?: string;
}
const ActionCard: FC<ActionCardProps> = ({ children, className }) => {
  return (
    <div className={`${styles.ActionCard} ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default ActionCard;
