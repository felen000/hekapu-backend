import {Tag} from "../db/models/tag.js";
import {Op, Transaction} from "sequelize";

class TagRepository {
    async findAll(): Promise<Tag[]> {
        return await Tag.findAll();
    }

    async findTagsIncludingQuery(tagQuery=''): Promise<Tag[]> {
        return await Tag.findAll({where: {name: {[Op.substring]: tagQuery}}});
    }

    async findTagsByName(tagNames: string[], transaction?: Transaction): Promise<Tag[]> {
        return await Tag.findAll({where: {name: tagNames}, transaction});
    }

    async createTagsBulk(tags: { name: string }[], transaction?: Transaction): Promise<Tag[]> {
        return await Tag.bulkCreate(tags, {transaction});
    }

    async createTag(tagName: string): Promise<Tag> {
        return await Tag.create({name: tagName});
    }

    async deleteTag(tagName: string): Promise<number> {
        return await Tag.destroy({where: {name: tagName}});
    }
}

export default new TagRepository();