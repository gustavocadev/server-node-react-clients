const { Router } = require("express");
const readJSON = require("../jsonMethods/readJSON");
const writeJSON = require("../jsonMethods/writeJSON");
const { v4: uuidv4 } = require("uuid");

const router = Router();

router.get("/clients", async (req, res) => {
    const { clients } = await readJSON();

    res.json(clients);
});

router.get("/clients/:id", async (req, res) => {
    const { clients } = await readJSON();
    const { id } = req.params;

    const clientFound = clients.find((client) => client.id === id);

    if (!clientFound) return;
    res.json(clientFound);
});

router.post("/clients", async (req, res) => {
    const { clients } = await readJSON();

    const data = req.body;

    const newUser = {
        ...data,
        id: uuidv4(),
    };

    clients.push(newUser);

    await writeJSON(clients);

    res.json(clients);
});

router.put("/clients/:id", async (req, res) => {
    const { clients } = await readJSON();

    const data = req.body;

    const { id } = req.params;
    const clientFound = clients.find((client) => client.id === id);

    if (!clientFound) return;

    // I update the changes
    clientFound.name = data.name;
    clientFound.company = data.company;
    clientFound.email = data.email;
    clientFound.notes = data.notes;
    clientFound.telephone = data.telephone;

    await writeJSON(clients);

    res.json(clients);
});

router.delete("/clients/:id", async (req, res) => {
    const { clients } = await readJSON();
    const { id } = req.params;
    const clientFound = clients.find((client) => client.id === id);

    console.log(clientFound);
    if (!clientFound) return;

    const idx = clients.indexOf(clientFound);

    clients.splice(idx, 1);

    await writeJSON(clients);

    res.json(clients);
});

module.exports = router;
