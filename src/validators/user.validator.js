import { z } from "zod";
export const UserRegisterSchema = z.object({
        name: z.string()
            .min(1, {message: 'Name is required'})
            .max(50, {message: 'Name is too long (50 characters maximum)'}),
        email: z.string()
                .min(1, {message: 'Email is required'})
                .max(50, {message: 'Email is too long (50 characters maximum)'})
                .email(),
        password: PasswordSchema
});

