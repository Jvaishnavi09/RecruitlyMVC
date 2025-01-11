import multer from "multer";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "public/images/");
  },
  filename: (_, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({ storage });
