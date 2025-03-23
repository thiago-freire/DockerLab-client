import { z } from 'zod';

/**
 * Esquema para validar formulário utilizando a biblioteca Zod
 */
export const SignupFormSchema = z.object({
        name: z
                .string()
                .min(2, { message: 'Primeiro nome deve ter pelo menos 2 caracteres.' })
                .trim(),

        email: z
                .string()
                .email({ message: 'Digite um e-mail válido.' })
                .trim(),

        password: z
                .string()
                .min(8, { message: 'Senha deve ter no mínimo 8 caracteres.' })
                .regex(/[a-zA-Z]/, { message: 'Senha deve ter ao menos uma letra.' })
                .regex(/[0-9]/, { message: 'Senha deve ter ao menos um número.' })
                .regex(/[^a-zA-Z0-9]/, { message: 'Senha deve ter ao menos um caractere especial.' })
                .trim(),

        profile: z
                .enum(["A", "U", "N"])
                .exclude(["N"], {message: 'Escolha uma opção.'}),

        login: z
                .string()
                .min(2, { message: 'O prefixo do e-mail deve ter pelo menos 2 caracteres.' })
                .trim(),

})