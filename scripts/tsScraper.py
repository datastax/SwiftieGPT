from urllib.request import urlretrieve

urls = [
	"https://en.wikipedia.org/wiki/Taylor_Swift",
	"https://en.wikipedia.org/wiki/Taylor_Swift_albums_discography",
#	"https://www.taylorswift.com/tour/",
	"https://time.com/6342806/person-of-the-year-2023-taylor-swift/"
]

urlCounter = 0

for url in urls:
	urlCounter = urlCounter + 1
	filename = str(urlCounter) + ".html"
	urlretrieve(url, filename)
	print ("file #{} COMPLETE!",urlCounter)
