import {Tag} from "../db/models/tag.js";
import tagRepository from "../repository/tag.repository.js";
import {Transaction} from "sequelize";
import {ApiError} from "../exceptions/api-error.js";

class TagService {
    async getAllTags(): Promise<Tag[]> {
        return await tagRepository.findAll();
    }

    async getTagsIncludingQuery(tagQuery: string): Promise<Tag[]> {
        return await tagRepository.findTagsIncludingQuery(tagQuery);
    }

    async getOrCreateTags(tagNames: string[], transaction?: Transaction): Promise<Tag[]> {
        tagNames = tagNames.map(tagName => tagName.toLowerCase().trim());
        const existingTags = await tagRepository.findTagsByName(tagNames, transaction);
        const existingTagNames = existingTags.map(tag => tag.name);
        const newTagNames = tagNames.filter(name => !existingTagNames.includes(name));
        let allTags = [...existingTags];
        if (newTagNames.length > 0) {
            const newTags = await tagRepository.createTagsBulk(newTagNames.map(name => ({name})), transaction);
            allTags = [...allTags, ...newTags];
        }
        return allTags;
    }


    async createTag(tagName: string): Promise<Tag> {
        return await tagRepository.createTag(tagName.toLowerCase());
    }

    async deleteTag(tagName: string): Promise<void> {
        const deleted = await tagRepository.deleteTag(tagName);
        if (deleted === 0) {
            throw ApiError.NotFoundError('Указанный тег не существует.');
        }
    }
}

export default new TagService();