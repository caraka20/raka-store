const fs = require('fs')

module.exports = {
    deleteFiles: (files) => {
        console.log(files);
            fs.unlinkSync(files)
    }
}