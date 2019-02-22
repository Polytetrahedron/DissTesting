import json
import os
import re
import base64
import getpass
import CalendarModule, EmailModule


def create_user_folder(data:dict):
    user_folder = 'User'
    user_directory = "./DataModules/UsersFolder"
    created_user_directory = None

    for root, dirs, files in os.walk(user_directory):
        for i in range(1,50):
            if user_folder + str(i) not in dirs:
                new_user_folder = user_folder + str(i)
                created_user_directory = user_directory + '/' + new_user_folder
                os.mkdir(created_user_directory)
                with open(created_user_directory + '/' + new_user_folder + '.json', 'w') as new_user:
                    json.dump(data, new_user)
                CalendarModule.check_account_token(new_user_folder)
                break
            else:
                continue  

    # var = base64.b64decode(user_data['password'])
    # print(var.decode())



def create_user():
    """
    This is not the optimal way of building these profiles as it is not very secure
    However given the time constraints on this project I do not have time to implement this
    how I would want to therefore this will have to do. At least it's something to talk about
    in the report..
    """
    user_data = {}
    email_regex = r"^(([a-zA-Z0-9]+)|([a-zA-Z0-9]+)\.([a-zA-Z0-9]+))(@)([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)|(\.[a-zA-Z0-9]+))*$"
    exit_flag = False

    while exit_flag == False:
        email = input("Please enter the email you would like to use with this profile: ")
        if re.search(email_regex, email):
            email_password = getpass.getpass("Please enter the password that you would like to use with this email: ")
            confirm_email_password = getpass.getpass("please re-enter your password: ")
            if email_password == confirm_email_password:
                email_password = base64.b64encode(email_password.encode())
                exit_flag = True
            else:
                print("Passwords did not match!")
        else:
            print("Email was not in the correct format")


    user_data["email"] = email
    user_data['password'] = email_password.decode()
    
    create_user_folder(user_data)
    
    
create_user()