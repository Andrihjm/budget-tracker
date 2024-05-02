"use server";

import prisma from "@/lib/prisma";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  DeleteCategorySchemaType,
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

export async function DeleteCategory(form: DeleteCategorySchemaType) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const persedBody = DeleteCategorySchemaType.safeParse(form);
  if (!persedBody.success) {
    throw new Error("bad request");
  }

  return await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name: persedBody.data.name,
        type: persedBody.data.type,
      },
    },
  });
}
