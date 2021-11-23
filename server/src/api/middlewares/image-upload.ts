import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { v4 } from 'uuid';

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint(process.env.S3_ENDPOINT as string),
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRETKEY,
  region: process.env.AWS_AWS_REGION,
});

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET as string,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',

  key(req:Request, file, cb) {
    const originFilename = file.originalname;
    const extension = originFilename.substring(originFilename.lastIndexOf('.'));
    cb(null, `uploads/profile-images/${new Date().getTime()}${v4()}${extension}`);
  },
});

export default multer({ storage });
