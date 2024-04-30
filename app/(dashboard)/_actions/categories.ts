"use server";

import prisma from "@/lib/prisma";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const user = await currentUser();
  if (!user) {
    redirect("sign-in");
  }

  const persedBody = CreateCategorySchema.safeParse(form);
  if (!persedBody.success) {
    throw new Error("bad request");
  }

  const { name, icon, type } = persedBody.data;
  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
}
