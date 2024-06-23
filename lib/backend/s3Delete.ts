import s3 from "@/s3";
import { DeleteObjectCommand  } from "@aws-sdk/client-s3";

export default async function handleDeleteFileS3({
  key,
}: {
  key: string; // The key of the file to delete
}) {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: key,
    });
    await s3.send(command);
    return { success: true, ok: true };
  } catch (error) {
    console.log(error);
    return { error: error, ok: false };
  }
}

// export async function handleDeleteMultipleFilesS3(keys: string[]) {
//   try {
//     const params = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME as string,
//       Delete: {
//         Objects: keys.map((key) => ({ Key: key })),
//         Quiet: false, // Set to true if you don't want error information for deleted objects
//       },
//     };

//     const response = await s3.deleteObjects(params).promise();
//     console.log("Deleted objects:", response.Deleted);
//     console.log("Errors:", response.Errors);
//   } catch (error) {
//     console.error("Error deleting objects from S3:", error);
//   }
// }
