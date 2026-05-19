import urllib.request

req = urllib.request.Request(
    'https://unsplash.com/photos/red-and-white-lighthouse-near-body-of-water-F_zec7P_OwA',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        import re
        match = re.search(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9-]+[^"\\]*', html)
        if match:
            print(match.group(0))
        else:
            print("Not found in HTML")
except Exception as e:
    print("Error:", e)
