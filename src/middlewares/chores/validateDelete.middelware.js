import choresModel from "../../repositories/chores.repository.js";

const validateDeleteChoreMiddleware = (req, res, next) => {

    if (!req.params.id) {
        res.status(400).json({ error: 'Missing chore ID' });
        return;
    }

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid chore ID' });
        return;
    }

    const chore = choresModel.getById(id);

    if (!chore) {
        res.status(400).json({ error: "Chore was not found." });
        return;
    }

    req.params.id = id;

    next();
};

export default validateDeleteChoreMiddleware;