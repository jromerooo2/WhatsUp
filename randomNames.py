import requests

url = 'https://svnweb.freebsd.org/csrg/share/dict/words?view=co&content-type=text%2Fplain'

r = requests.get(url)

text = r.text

print(text)