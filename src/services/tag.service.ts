import {Tag} from "../db/models/tag.js";
import tagRepository from "../repository/tag.repository.js";
import {Transaction} from "sequelize";

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

    async deleteTag(tagName: string): Promise<boolean> {
        const deletedRows = await tagRepository.deleteTag(tagName);
        return deletedRows > 0;
    }
}

export default new TagService();