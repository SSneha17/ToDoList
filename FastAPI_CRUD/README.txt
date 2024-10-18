pip install pyJWT python-decouple



(for secrets: )
(type in terminal) : 
python
(then):
import secrets
secrets.token_hex(16)
(this will generate a 16 character token, say; we can pass 20 or any other number)
then use algorithm


(To verify that the routes are protected, we need to ensure the requests are authorized):

'Depend' package will ensure only logged in users can take action not any random user. Hence, need to import 'Depends'
