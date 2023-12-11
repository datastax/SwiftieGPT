from bs4 import BeautifulSoup

for counter in range(1,5):
	filename = str(counter) + ".html"

	with open(filename) as fh:
		soup = BeautifulSoup(fh, 'html.parser')
	
	textLines = (line.strip() for line in soup.get_text().splitlines())
	textfile = str(counter) + ".txt"

	#print("lines in file #{} = {}",counter,soup.get_text().count("\n"))

	with open(textfile,"w") as ft:
		for line in textLines:
			ft.write(str(line))
			ft.write("\n")
