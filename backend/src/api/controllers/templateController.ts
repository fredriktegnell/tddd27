import { Response, Request } from "express";
import { TemplateModel } from "../models/templateModel";

export const getTemplates = async (req: Request, res: Response) => {
    try {
        const templates = await TemplateModel.find();
        return res.json(templates);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const addTemplate = async (req: Request, res: Response) => {
    console.log("in create template");
    try {
        const templateData = req.body;
        const createdTemplate = await TemplateModel.create(templateData);
        return res.json(createdTemplate);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateTemplate = async (req: Request, res: Response) => {
    try {
        const templateId = req.params.id;
        const updatedData = req.body;

        const updatedTemplate = await TemplateModel.findByIdAndUpdate(
            templateId,
            updatedData,
            { new: true }
        );

        if (!updatedTemplate) {
            return res.status(404).json({ error: 'Template not found' });
        }

        return res.json(updatedTemplate);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteTemplate = async (req: Request, res: Response) => {
    try {
        const templateId = req.params.id;

        const deletedTemplate = await TemplateModel.findByIdAndDelete(templateId);

        if (!deletedTemplate) {
            return res.status(404).json({ error: 'Template not found' });
        }

        return res.json({ message: 'Template deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
