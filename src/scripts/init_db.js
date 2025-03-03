import { db } from "../model/index.js";
async function initDB() {
    try {
        await db.connectDB();

        await db.models.User.bulkCreate([
            { name: "Paul", email: "p@gmail.com", password: "123" },
            { name: "Mireille", email: "m@gmail.com", password: "123" },
            { name: "Jean", email: "j@gmail.com", password: "123" }
        ], { validate: true });

        await db.models.Group.bulkCreate([
            { id: 1, name: "La famille de Paul", admin_id: 1 },
            { id: 2, name: "Amis", admin_id: 3 }
        ], { validate: true });

        await db.models.Member.bulkCreate([
            { id: 1, groupId: 1, userId: 1, role: "ADMIN", score: 2 },
            { id: 2, groupId: 1, userId: 2, role: "USER", score: 8 },
            { id: 3, groupId: 2, userId: 3, role: "ADMIN", score: 10 }
        ],);

        await db.models.Chore.bulkCreate([
            { id: 1, name: "Faire la vaisselle", status: "TODO", dueDate: "2025-03-04", groupId: 1 },
            { id: 2, name: "Tondre la pelouse", status: "DONE", dueDate: "2025-03-04", groupId: 1 },
            { id: 3, name: "Nourrir les chats", status: "TODO", dueDate: "2025-03-04", groupId: 2 },
        ], { validate: true });
        await db.models.MemberChore.bulkCreate([
            { memberId: 1, choreId: 1 },
            { memberId: 2, choreId: 2 },
        ], { validate: true });

    } catch (error) {
        console.error("Error initializing DB:", error);
    }
}
await initDB();
