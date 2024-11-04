import { getCurrentUser } from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservation({ userId: currentUser.id });

  console.log(reservations)

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you havent reservations on your properties."
        />
      </ClientOnly>
    )
  }
  return ( 
    <ClientOnly>
      <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly >
   );
}

export default ReservationsPage;