const { multerUpload } = require("./../lib/multerFile");
const { deleteFiles } = require("./../helper/deleteFile");

const upload = async (req, res, next) => {
  const result = multerUpload.fields([
    { name: "files", maxCount: 3 },
    { name: "images", maxCount: 3 },
  ]);
  result(req, res, function (err) {
    try {
      if (err) throw err;

      // Memeriksa dan memproses file
      if (req.files.files) {
        req.files.files.forEach((value) => {
          if (value.size > 100000)
            throw {
              message: `${value.originalname} is Too Large!`,
              files: req.files,
            };
        });
      }

      // Memeriksa dan memproses gambar
      if (req.files.images) {
        req.files.images.forEach((value) => {
          req.files.images.forEach((value) => {
            if (value.size > 1000000)
              throw {
                message: `${value.originalname} is Too Large!`,
                files: req.files,
              };
          });
        });
      }

      next();
    } catch (error) {;
      if (error.files.files) {
        deleteFiles(error.files.files[0].path);
      }
      if (error.files.images) {
        deleteFiles(error.files.images[0].path)
      }
      
      next(error);
    }
  });
};

module.exports = upload;
