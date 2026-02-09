import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    image?: string;
    imagePublicUrl?: string;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        image: String,

        imagePublicUrl: String,

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = model<IProduct>("Product", productSchema);
