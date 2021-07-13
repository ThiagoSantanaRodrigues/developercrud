module.exports = {

    validDate(dateToValidate) {
        var day = dateToValidate.split("/")[0];
        var month = dateToValidate.split("/")[1];
        var year = dateToValidate.split("/")[2];
        var validDate = new Date(year, month - 1, day);
        if ((validDate.getMonth() + 1 != month)
            || (validDate.getDate() != day)
            || (validDate.getFullYear() != year))
            return false
        else
            return true;
    }
} 