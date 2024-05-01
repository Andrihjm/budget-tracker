import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const periods = await getHistoryPediods(user.id);
  return Response.json(periods);
}

export type GetHistoryPediodsResponseType = Awaited<
  ReturnType<typeof getHistoryPediods>
>;

export async function getHistoryPediods(userId: string) {
  const result = await prisma.monthHistory.findMany({
    where: {
      userId,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: [
      {
        year: "asc",
      },
    ],
  });

  const years = result.map((el) => el.year);
  if (years.length === 0) {
    // Mengembalikan Tahun Mata Uang
    return [new Date().getFullYear()];
  }

  return years;
}
