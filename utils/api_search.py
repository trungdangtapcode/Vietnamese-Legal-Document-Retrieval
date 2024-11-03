import requests
import pickle
import codecs
import json

URL_SERVER = ""

def text_seach(text: str, k: int):
    headers = {
        "ngrok-skip-browser-warning": "69420",
    }
    params = {
        "text": text,
        "k": k
    }
    response = requests.get(URL_SERVER+'/text/', headers=headers, params=params)
    try:
        response.raise_for_status()
    except:
        return None
    encoded = response.text
    pickled = json.loads(encoded)   
    unpickled = pickle.loads(codecs.decode(pickled.encode(), "base64"))    
    return unpickled

def cid_seach(text: str, k: int):
    headers = {
        "ngrok-skip-browser-warning": "69420",
    }
    params = {
        "text": text,
        "k": k
    }
    response = requests.get(URL_SERVER+'/cid/', headers=headers, params=params)
    try:
        response.raise_for_status()
    except:
        return None
    encoded = response.text
    pickled = json.loads(encoded)   
    unpickled = pickle.loads(codecs.decode(pickled.encode(), "base64"))    
    return unpickled