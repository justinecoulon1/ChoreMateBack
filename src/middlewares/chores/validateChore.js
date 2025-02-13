const validateChore = (req, res, next) => {
    if (!req.body.name) {
        return res.json({ error: "Chore name is required." });
    }

    req.body.name = req.body.name.trim();

    if (req.body.assignee.trim() && !isNaN(req.body.assignee)) {
        req.body.assignee = parseInt(req.body.assignee);
        // check if usersModel.getById(req.body.assignee) existe, sinon req.body.assignee = [];
    } else {
        req.body.assignee = [];
    }

    if (!req.body.date) req.body.date = "";

    next();
};

export default validateChore;