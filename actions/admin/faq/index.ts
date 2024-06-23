"use server";

import { prisma } from "@/prisma/db";
import { editGameAndPlatformSchema, faqSchema } from "@/lib/formSchemas";

export const editFaq = async (data: { question: string; answer: string }, id: string) => {
  let { question, answer } = data;
  faqSchema.validateSync(data);

  let updatedFaq = await prisma.faq.update({
    where: { id },
    data: {
      question,
      answer,
    },
  });
  return updatedFaq;
};

export const deleteFaq = async (id: string) => {
  let deletedFaq = await prisma.faq.delete({
    where: { id },
  });
  return deletedFaq;
};
