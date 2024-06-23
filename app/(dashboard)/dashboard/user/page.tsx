// import React from 'react';
import { Users } from "./components/User";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "@/prisma/db";
// User
import s3 from "@/s3";
import { getQueryFromKeys } from "@/lib/utils";
import { userObj } from "@/lib/exampleObj";

export const dynamic = "force-dynamic";

const UserComponent = async ({ _, searchParams }: any) => {
  let keyword = searchParams?.keyword ?? ``;
  let query: any = {};
  if (keyword) {
    query = {
      OR: getQueryFromKeys(userObj, keyword),
    };
  }

  console.log(JSON.stringify(query));

  //
  const users = await prisma.user.findMany({
    where: query,
    take: 20,
  });
  try {
    const promises = users.map(async (user) => {
      try {
        if (user.profileImg) {
          let command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: user.profileImg as string,
          });
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
          user.profileImg = url;
        }
      } catch (err) {
        console.log(err);
      }
    });
    await Promise.all(promises);
  } catch (err) {
    console.log(`error in signed private url`, err);
  }

  

  return <Users keyword={keyword} tableData={users} />;
};

export default UserComponent;
