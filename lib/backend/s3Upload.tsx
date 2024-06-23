import s3 from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import generateUniqueId from "../date_id";

export default async function handleUploadFilesS3({
  buffer,
  filename,
  identifier,
  tableName,
}: {
  buffer: any;
  filename: string;
  identifier: string;
  tableName: string;
}) {
  try {
    let newFileName = `${tableName}_${identifier}_${generateUniqueId()}_${filename.replaceAll(
      " ",
      "_"
    )}`;
    let command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: newFileName,
      Body: buffer,
    });
    await s3.send(command);
    return { name: newFileName, ok: true };
  } catch (error) {
    console.log(error);
    return { error: error, ok: false };
  }
}
