// import React from 'react';
import { Accounts } from "./components/Account";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import "@fontsource/inter";
import { getQueryFromKeys } from "@/lib/utils";
import { accountObj } from "@/lib/exampleObj";

import prisma from "@/prisma/db";
import s3 from "@/s3";

export const dynamic = "force-dynamic";

const Account = async ({ _, searchParams }: any) => {
  let keyword = searchParams?.keyword ?? ``;
  let status = searchParams?.status ?? ``;
  let query: any = {};

  if (keyword) {
    query.OR = getQueryFromKeys(accountObj, keyword);
  }

  if (status) {
    query.AND = [{ status }];
  }

  const accounts = await prisma.account.findMany({
    where: query,
    include: {
      platform: true,
      game: true,
      seller: true,
    },
  });

  try {
    const promises = accounts.map(async (account) => {
      try {
        let command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: account.accountImg as string,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
        account.accountImg = url;
      } catch (err) {
        console.log(err);
      }
    });
    await Promise.all(promises);
  } catch (err) {
    console.log(`error in signed private url`, err);
  }

  return <Accounts keyword={keyword} status={status} tableData={accounts} />;
};

export default Account;
