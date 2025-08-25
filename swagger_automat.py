import requests
import json
import time
from colorama import Fore, Style, init


init(autoreset=True)


test_files = ['test1.json', 'test2.json', 'test3.json', 'test4.json']  


username = 'E7500116'
password = 'Mamatata1234!'


session = requests.Session()
session.auth = (username, password)


timeout_seconds = 10

# Funkcja do stylizacji komunikatów
def print_status(message, status_code=None):
    if status_code == 200:
        print(f"{Style.BRIGHT}{Fore.GREEN}{message}")
    elif status_code == 500:
        print(f"{Style.BRIGHT}{Fore.YELLOW}{message}")
    elif status_code == 400:
        print(f"{Style.BRIGHT}{Fore.RED}{message}")
    elif status_code is not None:
        print(f"{Style.BRIGHT}{Fore.BLUE}{message}")
    else:
        print(f"{Style.BRIGHT}{message}")


def run_tests(file_name):
    print_status(f"Rozpoczynam testy z pliku: {file_name}")

    try:
        
        with open(file_name) as f:
            data = json.load(f)

        
        payload = {
            "id": 123,  
            "name": "Testowy użytkownik",  
            "isActive": True  
        }

        
        for path, methods in data['paths'].items():
            url = f"http://{data['host']}{path}"

            if 'post' in methods:  
                try:
                    
                    response = session.post(url, json=payload, timeout=timeout_seconds)
                    print_status(f"POST {url}, Status: {response.status_code}", response.status_code)
                except requests.exceptions.Timeout:
                    print_status(f"POST Timeout: {url} - Żądanie trwało zbyt długo (ponad {timeout_seconds} sekund)", 500)
                except requests.exceptions.RequestException as e:
                    print_status(f"POST Error: {url}, Exception: {e}", 500)

                
                time.sleep(5)

            if 'get' in methods:  
                try:
                    response = session.get(url, timeout=timeout_seconds)
                    print_status(f"GET {url}, Status: {response.status_code}", response.status_code)
                except requests.exceptions.Timeout:
                    print_status(f"GET Timeout: {url} - Żądanie trwało zbyt długo (ponad {timeout_seconds} sekund)", 500)
                except requests.exceptions.RequestException as e:
                    print_status(f"GET Error: {url}, Exception: {e}", 500)

                
                time.sleep(5)
    except FileNotFoundError:
        print_status(f"Błąd: Plik {file_name} nie został znaleziony.", 500)
    except json.JSONDecodeError:
        print_status(f"Błąd: Plik {file_name} zawiera błędny JSON.", 400)


for test_file in test_files:
    run_tests(test_file)
    print_status(f"Zakończono testy z pliku: {test_file}")
    
    time.sleep(2)

print_status("Wszystkie testy zakończone.", 200)
