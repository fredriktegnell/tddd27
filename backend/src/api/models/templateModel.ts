const mongoose = require('mongoose');
import { Model, model, Schema, Document } from 'mongoose';

export interface Template extends Document {
    name: string;
    description: string;
}

const TemplateSchema: Schema = new Schema<Template>({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

export const TemplateModel: Model<Template> = model<Template>('templates', TemplateSchema);
