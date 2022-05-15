// todo: send in blue account yet to be activated. Thus ethereal

// export const nodemailerConfig = {
//   host: process.env.SIB_SMTP_SERVER,
//   port: Number(process.env.SIB_PORT),
//   auth: {
//     user: process.env.SIB_LOGIN,
//     pass: process.env.SIB_PASSWORD,
//   },
// };

export const nodemailerConfig = {
  host: process.env.Ethereal_SMTP_SERVER,
  port: Number(process.env.Ethereal_PORT),
  auth: {
    user: process.env.Ethereal_LOGIN,
    pass: process.env.Ethereal_PASSWORD,
  },
};
