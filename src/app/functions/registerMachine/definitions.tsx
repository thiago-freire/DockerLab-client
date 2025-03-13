import { z } from 'zod';

/**
 * Esquema para validar formulário utilizando a biblioteca Zod
 */

export const MachineFormSchema = z.object({
    nome: z
        .string()
        .email({ message: 'Digite um e-mail válido.' }), // Verifica se é um email válido
    password: z
        .string()
        .min(1, { message: 'O campo de senha não deve estar vazio.' }) // Garante que a senha não seja vazia
});