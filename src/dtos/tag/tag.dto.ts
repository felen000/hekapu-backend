import {Tag} from "../../db/models/tag.js";

export default class TagDto {
    name: string;

    constructor(tag:Tag) {
        this.name = tag.name;
    }
}