"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq, SiteData } from "@prisma/client";
import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const FAQ = ({ faq }: { faq: Faq[] }) => {
  let { t } = useTranslation();
  return (
    <>
      <section id="faq" className="container py-24 sm:py-32">
        <h2 className=" flex text-3xl md:text-4xl font-bold mb-4 gap-2 md:gap-5">
          <span>{t(`the_questions`)}</span>
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            {t(`popular`)}
          </span>
        </h2>

        <Accordion type="single" collapsible className="w-full AccordionRoot">
          {Array.isArray(faq) &&
            faq.map(({ question, answer, id }: Faq) => (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger className="text-left">{question}</AccordionTrigger>

                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        <h3 className="font-medium mt-4 flex gap-3">
          <span>{t(`Still have questions?`)}</span>
          <Link
            href="/contact-us"
            className="text-primary transition-all border-primary hover:border-b-2  underline"
          >
            {t(`contact`)}
          </Link>
        </h3>
      </section>
    </>
  );
};
