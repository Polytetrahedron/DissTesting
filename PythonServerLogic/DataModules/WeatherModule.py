import darksky
import weather
import datetime
import re

def darksky_config(latitude:float, longitude:float):
    """
    This method connects to DarkSky using my API key and returns the current weather at 
    a chosen location. Right now it only returns stirling weather data.
    """
    requested_forecast = []
    regex = r"[0-9][°F]" #used for converting the summary string 
    regex_num = r"[0-9]" #used for converting the summary string numbers

    API_KEY = "0208ba7f74f919e0411ff251ce738b7f"
    location = darksky.forecast(API_KEY, latitude, longitude)
    weekday = datetime.date.today()
    with location:
        daily_sum = location.daily.summary
        for i in daily_sum.split():
            if(re.search(regex, i)):
                numbers = re.findall(regex_num, i)
                temperature = numbers[0] + numbers[1]
                new_temp = convert_units(int(temperature), 2)
                daily_sum = daily_sum.replace(i, new_temp)
        requested_forecast.append(daily_sum)
        for day in location.daily:
            day = dict(day = datetime.date.strftime(weekday, '%a'),
            sum = day.summary,
            temp_min = convert_units(day.temperatureMin),
            temp_max = convert_units(day.temperatureMax))
            requested_forecast.append('{day}: {sum} Temp Range: {temp_min} - {temp_max}'.format(**day)) # **kwargs for passing keyworded data
            weekday += datetime.timedelta(days=1)
        return requested_forecast


def convert_units(temperature:int, mode:int = 1):
    """
    This method converts the temperature units from the default (Fahrenheit) to Celsius
    """
    celsius = (temperature - 32) / 9 * 5
    if mode == 1:
        degree = '°'
    else:
        degree = u'\u2103' + " "
    string_convert = str(round(celsius)) + degree
    return string_convert
        
def get_weather(location:str):
    """
    This will be the run configuration I am hoping that I can store large 
    amounts of location information that would allow the user to choose their current
    location easily.
    """
    if(location == 'stirling'):
        stirling = [56.1190300, -3.9368200]
        return darksky_config(stirling[0], stirling[1])


#get_weather('stirling')