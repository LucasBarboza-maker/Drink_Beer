
export function CurrentDateFormat() {
    let date = new Date();
    let formattedDate = "";
    formattedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

    return formattedDate;
}

export function CurrentHourToCard() {
    let date = new Date();
    let formattedDate = "";
    if (date.getMinutes() <= 9) {
        formattedDate = date.getHours() + ":0" + date.getMinutes() + "Hrs";
        return formattedDate;
    }
    formattedDate = date.getHours() + ":" + date.getMinutes() + "Hrs";
    return formattedDate;
}

export function DateFormatAmerican(date) {
    date = date.split('-')
    formattedDate = date[1]+"/"+date[2]+"/"+date[0]

    return formattedDate;
}

export function DateFormatBrasil(date) {
    date = date.split('-')
    formattedDate = date[1]+"/"+date[2]+"/"+date[0]

    return formattedDate;
}
