const validateChore = (req, res, next) => {
    if (!req.body.name) {
        return res.json({ error: "Chore name is required." });
    }

    req.body.name = req.body.name.trim();

    req.body.assignee = req.body.assignee.trim() && !isNaN(req.body.assignee) ? [parseInt(req.body.assignee)] : [];

    next();
};

export default validateChore;