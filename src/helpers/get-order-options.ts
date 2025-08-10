export default function getOrderOptions(optionsString: string) {
    const existingOptions = ['createdAt', 'updatedAt', 'rating'];
    const result = [];
    for (let option of new Set(optionsString.split(','))) {
        option = option.trim();
        console.log(option)
        if (!existingOptions.includes(option.replace('-', ''))) continue;
        let optionValue: [string, 'ASC'|'DESC']  = [option, 'ASC']
        if (option.startsWith('-')) {
            optionValue[0] = option.substring(1);
            optionValue[1] = 'DESC'
        }
        result.push(optionValue);
    }

    return result;
}