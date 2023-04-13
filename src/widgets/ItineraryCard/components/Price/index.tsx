import { FC, memo } from "react";
import styles from "./index.module.scss";

const PriceCard: FC<{ title: string; price: number }> = memo(
  ({ title, price }) => {
    return (
      <div className={styles.ItineraryCardPrice}>
        <span className={styles.ItineraryCardPriceTitle}>{title}</span>
        <span className={styles.ItineraryCardPriceText}>{price}</span>
      </div>
    );
  }
);

PriceCard.displayName = "PriceCard";

export default PriceCard;
