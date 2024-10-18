# This file is responsible for Signing, encoding, decoding and returning JWTs

import time
import jwt
from decouple import config

# Read from env variable
JWT_SECRET=config("secret")
JWT_ALGORITHM = config("algorithm")


# this function returns generated token
def token_response(token: str):
    return{
        "access_token": token
    }


def signJWT(userID: str):
    payload= {
        "email": userID,
        "expiry": time.time()+ 600

    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)

def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(token,JWT_SECRET, algorithms=JWT_ALGORITHM)
        return decode_token if decode_token['expires'] >= time.time() else None
    except:
        return {}