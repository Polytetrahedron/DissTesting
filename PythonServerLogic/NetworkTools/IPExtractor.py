import socket
import time

def extract_local_IP(timeout = 0): # default params for controlling retry behavior
    """
    This method retrieves a list of network interfaces and polls them to find the current in use local
    address. The IP is assumed to be a standard IPv4 "class" A, B, or C address. This method will always
    attempt to find a DHCP address before resorting to user intervention. This allows for a higher degree
    of user friendliness and autonomy. It also means that it will be able to self configure each power
    cycle. Which is nice because who wants to reconfigure every time you lose power amma right?
    """
    interfaces = socket.gethostbyname_ex(socket.gethostname())
    user_address = "null"

    timeout_counter = timeout
    max_retry = 5

    for current in interfaces:
        for i in current:
            if i.isalpha() == False:
                if i.startswith("127.") == False and i.startswith("169.") == False and i.startswith("0.") == False: # internal and loopback
                    if i.startswith("192.") == True or i.startswith("172.") == True or i.startswith("10.") == True: # class A. B, and C addresses
                        print("Acquired DHCP address: " + str(i)) # print IP address to console
                        return i # report IP of device
                    else:
                        if timeout_counter == 0:
                            print("ERROR: Could not acquire DHCP address")
                            if(timeout_counter != max_retry):
                                timeout_counter += 1
                                print("Retrying IP Acquisition... " + str(timeout_counter) + "/" + str(max_retry))
                                time.sleep(2)
                                extract_local_IP(timeout_counter)
                            else:
                                user_address = input("Failed to set server IP via DHCP, please provide one: ")
                                return user_address


#extract_local_IP()