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


def format_email(subject:str, sender:str):
    """
    This method will take the extracted string data from the bytes and format it into a way that is 
    both easy to work with/query and also make it pleasing and meaningful to the user to whom it is 
    displayed (This last bit is proably the most important :) )
    """
    return sender + ': ' + subject 

def search_inbox(connection_to_server:object):
    """
    This method searches the selected mailbox and and extracts all of the email id's
    it then selects the most recent one and returns it to the calling method
    """
    result, data = connection_to_server.search(None, 'all')
    email_ids = data[0]
    inbox_id_list = email_ids.split()
    return inbox_id_list[-1]
    



def fetch_email(connection_to_server:object):
    """
    This method will take the connection created in the starter method and use it to fetch the data 
    from the users mailbox. This will return the bytes of the email and these will need to be parsed in
    order to use them in any user meaningful way
    """
    email_list = []
    counter = int(search_inbox(connection_to_server))
    retrieval_counter = 1
    while(True):
        fetch_counter = f'{counter}'
        result, data = connection_to_server.fetch(fetch_counter,'(RFC822)')
        for response_part in data:
            if isinstance(response_part, tuple):
                header_data = response_part[1].decode('utf-8')
                retrieved_message = email.message_from_string(header_data)
                email_subject = retrieved_message['subject']
                email_from = retrieved_message['from']
                formatted_email = format_email(email_subject, email_from)
                email_list.append(formatted_email)
            else:
                if counter != 1:
                    counter -= 1
                retrieval_counter +=1
                break
        if(retrieval_counter != 10 and counter != 1):
            continue
        else:
            break
    return email_list

def connect_to_mail_server(user:str = None):
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


#print(connect_to_mail_server())
