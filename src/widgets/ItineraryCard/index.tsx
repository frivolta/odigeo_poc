import { Itinerary } from "@/types/models/Itinerary";
import { FC, memo } from "react";
import styles from "./index.module.scss";
import { formatDateTime } from "@/types/common/DateTime";
import LocationCard from "./components/Location";
import PriceCard from "./components/Price";

interface ItineraryCardProps {
  itinerary: Itinerary;
}

const ItineraryCard: FC<ItineraryCardProps> = memo(({ itinerary }) => {
  return (
    <div
      className={`itinerary ${styles.ItineraryCard}`}
      data-testid={`itinerary-${itinerary.id}`}
    >
      <div className={styles.ItineraryCardLocationWrapper}>
        <LocationCard
          title="DEPARTURE"
          date={formatDateTime(itinerary.departureDate)}
          location={itinerary.departureLocation}
        />
        <div className={styles.ItineraryCardSpacer}></div>
        <LocationCard
          title="ARRIVAL"
          date={formatDateTime(itinerary.arrivalDate)}
          location={itinerary.arrivalLocation}
        />
      </div>
      <div className={styles.ItineraryCardPriceWrapper}>
        <PriceCard title="PRICE" price={itinerary.price} />
      </div>
    </div>
  );
});

ItineraryCard.displayName = "ItineraryCard";

export default ItineraryCard;
