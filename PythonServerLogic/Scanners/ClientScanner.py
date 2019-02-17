import re
import socket

def scan_for_clients(ip:str):
    """
    This method takes in the current host IP as an argument and 
    uses it to generate every possible other host on the network. This
    is only really feasible for a Class C address as it has a possible 255
    address values and only 252 if you account for default gateway and broadcast
    and current host. Class A and B networks are much larger by comparison but 
    this product is not intended for networks of that size.
    """
    potential_client_addresses = []
    extracted_octets = ip.split('.')
    host_address = extracted_octets[3] 

    for i in range(1, 254): # standard class C address space
        
        if(i != host_address):
            new_client = ip.replace()


        print(extracted_octets)
        