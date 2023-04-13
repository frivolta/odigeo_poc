import { FC, memo } from "react";
import styles from "./index.module.scss";

const LocationCard: FC<{ title: string; date: string; location: string }> =
  memo(({ title, date, location }) => {
    return (
      <div className={styles.ItineraryCardLocation}>
        <span className={styles.ItineraryCardLocationTitle}>{title}</span>
        <span className={styles.ItineraryCardLocationLabel}>{date}</span>
        <span className={styles.ItineraryCardLocationText}>{location}</span>
      </div>
    );
  });

LocationCard.displayName = "LocationCard";

export default LocationCard;
