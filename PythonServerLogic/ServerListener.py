import grpc
import subprocess
from NetworkTools import IPExtractor
from Scanners import ClientScanner

ClientScanner.scan_for_clients(IPExtractor.extract_local_IP())