import json
import os
import re
import base64
import getpass
import grpc
import Comms_pb2
import Comms_pb2_grpc
from NetworkTools import IPExtractor
from DataModules import CalendarModule, EmailModule
from DataModules.FaceTesting import facecapture, trainclassifier


def notify_active_clients():
    host_data = []

    with open('active_hosts.json') as hosts:
        data = json.load(hosts)
        for ip in data['host_addresses']:
            host_data.append(ip)


    ip = IPExtractor.extract_local_IP()
    discovery_port = ':4536'

    for address in host_data:
        with grpc.insecure_channel(address + discovery_port) as channel:
            stub = Comms_pb2_grpc.ConnectionCommsStub(channel)
            response = stub.FTPConnection(Comms_pb2.FTPRequest(connect = 1, nodeHostIP=ip))
            print(response)


def train_on_user(user:str = None):
    facecapture.run_analyser(user)
    trainclassifier.generate_training_data()
    notify_active_clients()


def create_user_folder(data:dict):
    user_folder = 'User'
    user_directory = "./DataModules/UsersFolder"
    training_directory = "./DataModules/FaceTesting/images"
    created_user_directory = None
    current_structure = []

    for root, dirs, files in os.walk(user_directory):
        print(dirs)
        current_structure = dirs
        break


    for i in range(1,50):
        new_user_folder = user_folder + str(i)
        if new_user_folder not in current_structure:
            created_user_directory = user_directory + '/' + new_user_folder
            created_training_directory = training_directory + '/' + new_user_folder
            os.mkdir(created_user_directory)
            os.mkdir(created_training_directory)
            with open(created_user_directory + '/' + new_user_folder + '.json', 'w') as new_user:
                json.dump(data, new_user)
            CalendarModule.check_account_token(new_user_folder)
            if train_on_user(new_user_folder):
                trainclassifier.generate_training_data()
            break
        else:
          continue  


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