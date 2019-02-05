import imaplib
import email
import time

"""
This file contains the logic for retrieving a users emails from a specific source 
for time and demonstration purpose this will contain a test email created with exactly
use in mind. The framework for adding new providers other than gmail will be created but
not used as it will require more work with regards to both user interaction and security
in order to make this as effective as possible.
"""

user_email = "RPITestMark@gmail.com"
user_email_password = "KillMe123" #ignore this it was late and legit I had been trying to make an account for hours
gmail_server_address = "imap.gmail.com"
current_email_list = [] #This stores the times and subjects of emails in the inbox

def extract_from_byte_data(message):
    """
    This method takes the bytes extracted from the IMAP fetch request and parses each email into 
    usable string data that will be formatted and displayed to the user via the front interface.
    """
    if message.is_multipart():
        return message.gets

def format_email():
    """
    This method will take the extracted string data from the bytes and format it into a way that is 
    both easy to work with/query and also make it pleasing and meaningful to the user to whom it is 
    displayed (This last bit is proably the most important :) )
    """
    return True

def fetch_email(connection_to_server):
    """
    This method will take the connection created in the starter method and use it to fetch the data 
    from the users mailbox. This will return the bytes of the email and these will need to be parsed in
    order to use them in any user meaningful way
    """
    email_list = []
    counter = 1
    while(True):
        fetch_counter = f'{counter}'
        result, data = connection_to_server.fetch(fetch_counter,'(RFC822)')
        if(result == False):
            print("ERROR: Could not fetch from server")
            break
        counter += 1
        #extracted_data = email.message_from_bytes(data[0][1])
        #extract_from_byte_data(extracted_data)
        #email_list.append()
        email_list.append(data)
        if(counter != 5):
            continue
        else:
            break
    return email_list

def connect_to_mail_server():
    """
    This method connects to the external mail service and collects a users emails 
    from their inbox. Only the inbox is scanned as nobody really cares about SPAM
    otherwise it wouldn't be spam.. Also outbox and sent emails are also ignored
    as these (especially outbox) would require more advanced user interaction than 
    this mirror is intended for.
    """
    connection = imaplib.IMAP4_SSL(gmail_server_address)
    connection.login(user_email, user_email_password)
    connection.select("inbox")
    return fetch_email(connection)


print(connect_to_mail_server())
