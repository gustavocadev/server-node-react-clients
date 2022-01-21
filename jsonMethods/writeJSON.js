const fs = require("fs/promises");

const writeJSON = async (newArray) => {
    const newData = {
        clients: newArray,
    };
    await fs.writeFile("./db.json", JSON.stringify(newData));
};

module.exports = writeJSON;
