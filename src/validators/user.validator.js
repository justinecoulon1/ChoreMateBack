import { z } from "zod";

const PasswordSchema = z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password must be at most 64 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const UserRegisterSchema = z.object({
        name: z.string()
                .min(1, { message: 'Name is required' })
                .max(50, { message: 'Name is too long (50 characters maximum)' }),
        email: z.string()
                .trim()
                .min(1, { message: 'Email is required' })
                .max(50, { message: 'Email is too long (50 characters maximum)' })
                .email(),
        password: PasswordSchema
});

