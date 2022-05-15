import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate";
import { nodemailerConfig } from "./nodemailerConfig";

const sendMail: Function = async (
  from: string,
  to: string,
  url: string,
  size: number,
  fileName: string
) => {
  let transporter = nodemailer.createTransport(nodemailerConfig);

  const subject = "Download is ready! ";

  await transporter.sendMail({
    from,
    to,
    subject,
    html: emailTemplate(from, to, url, size, fileName),
  });
};

export default sendMail;
