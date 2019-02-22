/*
    This is the client clock class that is set from the server
*/

let newTime = new Date();
let months = ['January', 'February', 'March', 'April',' May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let thirty = ['September', 'April', 'June', 'November'];

class ClientClock
{
    constructor(hours, minutes, seconds, day, month, year)
    {
        newTime.setHours(hours);
        newTime.setMinutes(minutes);
        newTime.setSeconds(seconds)

        newTime.setDate(day);
        newTime.setMonth(month);
        newTime.setFullYear(year);
    }

    /*
        This function manipulates the date and time to match it with the clock on the server
    */
    checkTime() 
    {
        var seconds = newTime.getSeconds();
        var minutes = newTime.getMinutes();
        var hours = newTime.getHours();

        if(seconds != 59)
        {
            newTime.setSeconds(++seconds);
        }
        else if(minutes != 59)
        {
            newTime.setMinutes(++minutes);
            newTime.setSeconds(0);
        }
        else
        {
            if (hours >= 1 && hours < 23 || hours == 0)
            {
                newTime.setHours(++hours);
                newTime.setMinutes(0);
                newTime.setSeconds(0);
            }
            else
            {
                newTime.setHours(0);
                newTime.setMinutes(0);
                newTime.setSeconds(0);

                this.checkDay();
            }         
        }
        return newTime;
    }

    checkDay()
    {
        var currentMonth = newTime.getMonth();
        var currentDay = newTime.getDate();
        var currentYear = newTime.getFullYear();

        if(currentMonth == 3 || currentMonth == 5 || currentMonth == 8 || currentMonth == 10)
        {
            if(currentDay == 30)
            {
                newTime.setDate(1);
                newTime.setMonth(++currentMonth);
            }
            else
            {
                newTime.setDate(++currentDay);

            }
        }
        else if(currentMonth == 1)
        {
            if(currentDay == 28)
            {
                newTime.setDate(1);
                newTime.setMonth(++currentMonth);
            }
            else
            {
                newTime.setData(++currentDay);
            }
        }
        else if(currentDay == 31)
        {
            newTime.setDate(1);
            newTime.setMonth(++currentMonth);
            if(currentMonth == 12)
            {
                newTime.setFullYear(++currentYear)
            }
        }
        else
        {
            newTime.setDate(++currentDay);
        }
    }
}
module.exports = ClientClock;