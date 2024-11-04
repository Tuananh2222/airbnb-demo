import EmptyState from "../components/EmptyState";


import ClientOnly from "../components/ClientOnly";
import TripsClient from "./TripClient";
import { getCurrentUser } from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";


const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservation({ userId: currentUser.id });
  console.log(reservations)
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default TripsPage