import { z } from "zod";

/**
 * return type of createItem
 */
export const CreateItemReturnSchema = z.object({
    status: z.union([z.number(), z.undefined()])
});

export type CreateItemReturnType = z.infer<typeof CreateItemReturnSchema>;

/**
 * return type of deleteItem
 */
export const DeleteItemReturnSchema = z.object({
    status: z.union([z.number(), z.undefined()])
});
export type DeleteItemReturnType = z.infer<typeof DeleteItemReturnSchema>;

/**
 * return typr of getItem
 */
export const GetItemReturnSchema = CreateItemReturnSchema.extend({});

export type GetItemReturnType = z.infer<typeof GetItemReturnSchema>;

/**
 * paramter type of updateItem
 */
export interface UpdateItemAttributes {
    content?: string;
    attributes?: Record<string, unknown>;
}

export const UpdateItemReturnSchema = CreateItemReturnSchema;
export type UpdateItemReturnType = z.infer<typeof UpdateItemReturnSchema>;
