import darksky
import weather
import datetime

def darksky_config():
    API_KEY = "0208ba7f74f919e0411ff251ce738b7f"
    location = darksky.forecast(API_KEY, 56.1190300, -3.9368200)
    weekday = datetime.date.today()
    with location as stirling:
        print(stirling.daily.summary, end='\n---\n')
        for day in stirling.daily:
            day = dict(day = datetime.date.strftime(weekday, '%a'),
            sum = day.summary,
            temp_min = day.temperatureMin,
            temp_max = day.temperatureMax)
            print('{day}: {sum} Temp Range: {temp_min} - {temp_max}'.format(**day));
            weekday += datetime.timedelta(days=1)
        return day
        
darksky_config()