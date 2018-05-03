const numberCSV = require('./numberInformation.json');

export const getDataPerNumber = (number) => {
    const numAA = parseInt(number.substring(2, 10), 10);
    return Object.values(numberCSV).find(item => item.sortCode === numAA);
};