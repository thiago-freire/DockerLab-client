/**
 * Author: @MatheusLevy
 */
import 'server-only'
import { z } from 'zod';

/**
 * Esquema para validar formulário utilizando a biblioteca Zod
 */
export const MachinepFormSchema = z.object({
        Nome: z
                .string()
                .min(2, { message: 'Nome da Máquina deve ter pelo menos 2 caracteres.' })
                .trim(),

        login: z
                .string()
                .min(2, { message: 'Login da máquina deve ter ao menos 2 caracteres.' })
                .trim(),

        porta: z
                .number()
                .int({ message: 'Deve ser um valor inteiro.'})
                .positive({ message: 'Deve ser um valor positivo.'}),

        senha: z
                .string(),

        Network: z
                .string()
                .ip({message: 'Deve ser im número de IP.'}),

})