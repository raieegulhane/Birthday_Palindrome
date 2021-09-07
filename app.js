// STRING PREP
function dateValueTypeToString (date) {
    var newDate = { day: '', month: '', year: '' }

    if (date.day < 10) {
        newDate.day = "0" + date.day;
    } else {
        newDate.day = date.day.toString();
    }

    if (date.month < 10) {
        newDate.month = "0" + date.month;
    } else {
        newDate.month = date.month.toString();
    }

    newDate.year = date.year.toString();

    return newDate;
}

function getAllDateFormats (date) {
    date = dateValueTypeToString(date);

    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;

    dateAllFormarts = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

    allFormats = ["dd-mm-yyyy", "mm-dd-yyyy", "yyyy-mm-dd", "dd-mm-yy", "mm-dd-yy", "yy-mm-dd"];

    return [dateAllFormarts, allFormats];
}

// // PALINDROME CHECK
function reverseString (str) {
    return (str.split("").reverse().join(""));
}

function isPalindrome (dateStr) {
    var reversedDateStr = reverseString(dateStr);

    if (dateStr === reversedDateStr) {
        return true;
    } else {
        return false
    }
}

function checkPalindromeForAllFormats (date) {
    var dateAllFormarts = getAllDateFormats(date)[0];
    var allFormats = getAllDateFormats(date)[1];

    for (var i = 0; i < dateAllFormarts.length; i++) {
        if (isPalindrome(dateAllFormarts[i])) {
            return allFormats[i];
        }
    }
    return false;

} 

// NEXT PALLINDROME 
function checkLeapYear (year) {
    if (year % 400 === 0) {
        return true;
    } 

    if (year % 100 === 0) {
        return false;
    } 

    if (year % 4 === 0) {
        return true;
    }

    return false;
}

function findNextDay (date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(checkLeapYear(year)) {
        daysInMonth[1] = 29;
    } else {
        daysInMonth[1] = 28;
    }
    
    if (day > daysInMonth[month-1]) {
        day = 1;
        month++;
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    var nextDay = {
        day: day,
        month: month,
        year: year
    }

    return nextDay;
}

function nextPalindromeDate(date) {
    var numberOfDays = 0;
    var nextDay = findNextDay(date);

    while (true) {

        var checkPalindrome = checkPalindromeForAllFormats(nextDay);

        numberOfDays++

        if (checkPalindrome) {
            return [nextDay, numberOfDays];
        }

        nextDay = findNextDay(nextDay);
    }
}

// PREVIOUS PALINDROME
function findPreviousDay (date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(checkLeapYear(year)) {
        daysInMonth[1] = 29;
    } else {
        daysInMonth[1] = 28;
    }
    
    if (day < 1) {
        if (month === 1) {
            day = daysInMonth[11];
            month--;
        } else {
            day = daysInMonth[month-2];
            month--;
        }
    }

    if (month < 1) {
        month = 12;
        year--;
    }

    var previousDay = {
        day: day,
        month: month,
        year: year
    }

    return previousDay;
}

function previousPalindromeDate(date) {
    var numberOfDays = 0;
    var previousDay = findPreviousDay(date);

    while (true) {

        var checkPalindrome = checkPalindromeForAllFormats(previousDay);

        numberOfDays++

        if (checkPalindrome) {
            return [previousDay, numberOfDays];
        }

        previousDay = findPreviousDay(previousDay);
    }
}

const bdayInput = document.querySelector('#input-bday');
const checkButton = document. querySelector('#button-check');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');


function clickHandler () {
    var bday = bdayInput.value;

    if (bday) {
        bday = bday.split('-');

        var bdayDate = {
            day: Number(bday[2]),
            month: Number(bday[1]),
            year: Number(bday[0])
        }

        var palindromeCheck = checkPalindromeForAllFormats(bdayDate);

        if (palindromeCheck) {
            message1.innerText = "Yayy!! Your Birthday is a palindrome.";
            message2.innerText = ("The date format we considered is: " +palindromeCheck);
        } else {
            var [nextDate, nextDaysCount] = nextPalindromeDate(bdayDate);
            var [previousDate, previousDaysCount] = previousPalindromeDate(bdayDate);

            message1.innerText = "Oops!! Your Birthday is not a palindrome."
            message2.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${nextDaysCount} ${nextDaysCount > 1 ? "days" : "day"}. You also missed the previous palindrome date, ${previousDate.day}-${previousDate.month}-${previousDate.year}, by ${previousDaysCount} ${previousDaysCount > 1 ? "days" : "day"}.`;
        }

    } else {
        message1.innerText = "Enter a valid date to continue";
    }
}

checkButton.addEventListener('click', clickHandler);