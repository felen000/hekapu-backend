export default function (page: number = 1, limit: number = 10) {
    const offset = (page-1) * limit;

    return offset
}