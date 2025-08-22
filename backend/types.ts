import { z } from "zod";
const MAX_INPUT_TOKENS = 1000;


export type Role = "agent" | "user";

export type Message = {
    content: string,
    role: Role
}

export const CreateChatType = z.object({
    conversationId: z.uuid().optional(),
    message: z.string().max(MAX_INPUT_TOKENS)
})

