const numberCSV = require('./numberInformation.json');

export const getDataPerNumber = (number) => {
    const numAA = parseInt(number.substring(2, 10), 10);
    const defaultInformation = {
        bankName: 'Probably wrong number',
        outpost: '',
        address: '',
        postal: '',
        phone: ''
    };
    const information = Object.values(numberCSV).find(item => item.sortCode === numAA);

    return information ? information : defaultInformation;
};