const multer = require("multer");
const fs = require("fs");
// var public = require('.././public');

const defaultPath = "public"; // ini diisi dengan folder tujuan dimana kita akan ngesave uploadan user
const storage = multer.diskStorage({
  // Ini setup untuk storagenya, dimana letaknya kita akan menyimpan data
  destination: async (req, file, cb) => {
    const isDirectoryExist = fs.existsSync(defaultPath);
  //   if (file.fieldname === 'images') {
  //     uploadPath = 'public/images'; // Menyimpan gambar ke folder 'public/images'
  // }
  // console.log(file.fieldname);

    if (!isDirectoryExist) {
      //Kondisi jika directory belum dibuat atau gak ada, ini bakalan membuat directory baru
      await fs.promises.mkdir(defaultPath, { recursive: true });
    }
    cb(null, `${defaultPath}`);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

exports.multerUpload = multer({ storage: storage });
