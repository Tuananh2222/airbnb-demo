import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export default async function getFavoriteListing() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const safeFavorites = favorites.map((favorite: any) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
}
