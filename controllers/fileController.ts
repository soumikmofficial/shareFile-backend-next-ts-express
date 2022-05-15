import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import CustomError from "../errors/customAPIError";
import fs from "fs";
import File from "../models/File";
import https from "https";

import sendMail from "../utils/sendMail";

// todo: upload file
export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new CustomError(StatusCodes.BAD_REQUEST, `Please upload a file`);
  }

  const uploadFile: UploadApiResponse = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "share-file-project",
      resource_type: "auto",
    }
  );
  fs.unlinkSync(req.file.path);

  const { bytes, secure_url, format } = uploadFile;

  const file = await File.create({
    name: req.file.filename,
    sizeInBytes: bytes,
    secure_url,
    format,
  });

  res
    .status(StatusCodes.OK)
    .json({ id: file._id, url: `${process.env.ORIGIN}${file._id}` });
};

export const getFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = await File.findOne({ _id: id });
  if (!file)
    throw new CustomError(StatusCodes.NOT_FOUND, `The file couldn't be found`);
  const { sizeInBytes, name, format, _id } = file;
  res.status(200).json({ sizeInBytes, name, format, id: _id });
};

// todo: download file
export const downloadFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = await File.findOne({ _id: id });
  if (!file)
    throw new CustomError(StatusCodes.NOT_FOUND, `The file couldn't be found`);

  https.get(file.secure_url, (fileStream) => fileStream.pipe(res));
};

// todo: email download link
export const emailDownloadLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { to, from, url } = req.body;
  console.log(url);
  const file = await File.findOne({ _id: id });
  if (!file) {
    throw new CustomError(StatusCodes.NOT_FOUND, `The file couldn't be found`);
  }
  await sendMail(from, to, url, file.sizeInBytes, file.name);

  res.status(200).json({ status: "success" });
};
