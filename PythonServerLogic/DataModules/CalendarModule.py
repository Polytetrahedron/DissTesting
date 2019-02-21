import pickle
import datetime
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import logging

logging.getLogger('googleapiclient.discovery_cache').setLevel(logging.ERROR)

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'] # this dictates the scope of the token for the account e.g. read only

def check_account_token(user:str):
    credentials = None
    if os.path.exists('./UsersFolder/'  +user + '/token.pickle'):
        with open('./UsersFolder/' + user + '/token.pickle', 'rb') as token:
            credentials = pickle.load(token)
    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                './tokens/credentials.json', SCOPES)
            credentials = flow.run_local_server()
            with open('./UsersFolder/' + user + '/token.pickle', 'wb') as token:
                pickle.dump(credentials, token)
        return credentials

def get_calendar_events(user:str):
    events_passback = []
    credentials = check_account_token(user)
    calendar_service = build('calendar', 'v3', credentials=credentials)
    event_time = datetime.datetime.utcnow().isoformat() + 'Z'

    print("For: " + user + " getting calendar events")
    retrieved_events = calendar_service.events().list(calendarId='primary', timeMin=event_time, maxResults=5, singleEvents=True, orderBy='startTime').execute()

    event_list = retrieved_events.get('items', [])

    if not event_list:
        return "No upcoming events"
    else:
        for events in event_list:
            start = events['start'].get('dateTime', events['start'].get('date'))
            events_passback.append(events['summary'])
        return events_passback

# print(get_calendar_events('User2'))   