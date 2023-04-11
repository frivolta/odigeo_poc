import { Itinerary } from "@/types/models/Itinerary";
import { FC, memo } from "react";
import styles from "./index.module.scss";
import { formatDateTime } from "@/types/common/DateTime";

interface ItineraryCardProps {
  itinerary: Itinerary;
}

const ItineraryCard: FC<ItineraryCardProps> = memo(({ itinerary }) => {
  return (
    <div className={styles.ItineraryCard}>
      <div className={styles.ItineraryCardLocationWrapper}>
        <div className={styles.ItineraryCardLocation}>
          <span className={styles.ItineraryCardLocationTitle}>DEPARTURE</span>
          <span className={styles.ItineraryCardLocationLabel}>
            {formatDateTime(itinerary.departureDate)}
          </span>
          <span className={styles.ItineraryCardLocationText}>
            {itinerary.departureLocation}
          </span>
        </div>
        <div className={styles.ItineraryCardSpacer}></div>
        <div className={styles.ItineraryCardLocation}>
          <span className={styles.ItineraryCardLocationTitle}>ARRIVAL</span>
          <span className={styles.ItineraryCardLocationLabel}>
            {formatDateTime(itinerary.arrivalDate)}
          </span>
          <span className={styles.ItineraryCardLocationText}>
            {itinerary.arrivalLocation}
          </span>
        </div>
      </div>
      <div className={styles.ItineraryCardPriceWrapper}>
        <div className={styles.ItineraryCardPrice}>
          <span className={styles.ItineraryCardPriceTitle}>PRICE</span>
          <span className={styles.ItineraryCardPriceText}>
            {itinerary.price}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ItineraryCard;
