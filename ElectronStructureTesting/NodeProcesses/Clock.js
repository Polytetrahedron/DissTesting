const ClientClock = require('../NodeAssets/ClientClock');

let clientDate = new Date();
let time;
let newTime;
let minutes;

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let months = ['January', 'February', 'March', 'April',' May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let full_days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

process.on('message', (data)=>{
    if(data[0] === "restart")
    {
        restartService();
    }
    else if(data[0] === "exit")
    {
        process.exit(1);
    }
    else if(data[0] === 'start')
    {
        time = new ClientClock(data[1],data[2],data[3],data[4],data[5],data[6]);
        //starts the ticking clock
        setInterval(grabTime, 1000)
        console.log("Starting Clock service")
    }
});

function grabTime()
{
    newTime = time.checkTime();
    clientDate.setTime(newTime.getTime());

    if(clientDate.getMinutes() !== minutes)
    {
        minutes = clientDate.getMinutes();

        timeSend = cleanTime(clientDate.getHours(),clientDate.getMinutes());

        dateSend = cleanDate(clientDate.toDateString());
       
        process.send(packageData(dateSend, timeSend));
    }
}

//the built in function for displaying the time was not suited for my needs so I wrote this one instead that does. Keeps messages to a minimum instead of one message eery second you now have one message every 60 seconds
function cleanTime(hours, minute)
{
    //var cleanedTime;
    var cleanHours = hours;
    var cleanMins = minute;

    if(minute >= 1 && minute <= 9 || minute === 0)
    {
        cleanMins = "0" + minute; 
    }
    if(hours === 0 || hours >=1 && hours <= 9)
    {
        cleanHours = "0" + hours;
    }

    return cleanedTime = cleanHours + ":" + cleanMins;
}

function cleanDate(dateString)
{
    var nameDay;
    var numDate;
    var month;
    var year = clientDate.getFullYear();

    for(i = 0; i < days.length; i++)
    {
        if(dateString.startsWith(days[i]))
        {
            nameDay = full_days[i];
            numDate = clientDate.getDate();
            if(numDate === 1 || numDate === 21 || numDate === 31)
            {
                numDate = numDate + "st" ;
            }
            else if(numDate === 2 || numDate === 22)
            {
                numDate = numDate + "nd";
            }
            else if(numDate === 3 || numDate === 23)
            {
                numDate = numDate + "rd";
            }
            else
            {
                numDate = numDate + "th";
            }
            month = months[clientDate.getMonth()];
            break;
        }
    }
    return nameDay + " the " + numDate + " of " + month + " " + year;
}

function packageData(date, clock)
{
    return timeData = [date, clock]
}

function restartService()
{
    time = new ClientClock("","","","","","")
}
