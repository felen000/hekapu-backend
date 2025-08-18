import {Request, Response, NextFunction} from "express";
import tagService from "../services/tag.service.js";
import {Tag} from "../db/models/tag.js";
import {CreateTagBody, SearchTagQuery} from "../types/tags/tags-request.type.js";
import {DeleteTagResponse} from "../types/tags/tags-response.type.js";

class TagController {
    async getTagsByQuery(
        req: Request<{}, {}, {}, SearchTagQuery>,
        res: Response<Tag[]>,
        next: NextFunction): Promise<Response<Tag[]> | void> {
        try {
            const {tag} = req.query;
            const tags = await tagService.getTagsIncludingQuery(tag);
            return res.status(200).json(tags);
        } catch (e) {
            next(e);
        }
    }

    async createTag(req: Request<{}, {}, CreateTagBody>, res: Response, next: NextFunction): Promise<Response<Tag> | void> {
        try {
            const {name} = req.body;
            const newTag = await tagService.createTag(name);
            return res.status(201).json(newTag);
        } catch (e) {
            next(e);
        }
    }

    async deleteTag(
        req: Request<{ tagName: string }>,
        res: Response<DeleteTagResponse>,
        next: NextFunction): Promise<Response<DeleteTagResponse> | void> {
        try {
            const {tagName} = req.params;
            const isDeleted = await tagService.deleteTag(tagName)
            return res.status(200).json({isDeleted})
        } catch (e) {
            next(e);
        }

    };
}

export default new TagController()