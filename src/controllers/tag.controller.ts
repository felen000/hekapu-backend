import {Request, Response, NextFunction} from "express";
import tagService from "../services/tag.service.js";
import {CreateTagBody, DeleteTagParams, SearchTagQueryOptions} from "../types/tags/tags-request.type.js";
import {CreateTagResponse, GetTagsResponse} from "../types/tags/tags-response.type.js";

class TagController {
    async getTagsByQuery(
        req: Request<{}, {}, {}, SearchTagQueryOptions>,
        res: Response<GetTagsResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const {tag} = req.query;
            const tags = await tagService.getTagsIncludingQuery(tag);
            return res.status(200).json({tags});
        } catch (e) {
            next(e);
        }
    }

    async createTag(
        req: Request<{}, {}, CreateTagBody>,
        res: Response<CreateTagResponse>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const {name} = req.body;
            const newTag = await tagService.createTag(name);
            return res.status(201).json(newTag);
        } catch (e) {
            next(e);
        }
    }

    async deleteTag(
        req: Request<DeleteTagParams>,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const {tagName} = req.params;
            await tagService.deleteTag(tagName);
            return res.status(204).send();
        } catch (e) {
            next(e);
        }

    };
}

export default new TagController();