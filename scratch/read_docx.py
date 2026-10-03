import zipfile
import xml.etree.ElementTree as ET

z = zipfile.ZipFile('Dhruva_Quotient_Result_Content_Revised.docx')
tree = ET.fromstring(z.read('word/document.xml'))
namespaces = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

paragraphs = []
for p in tree.findall('.//w:p', namespaces):
    texts = [t.text for t in p.findall('.//w:t', namespaces) if t.text]
    if texts:
        paragraphs.append(''.join(texts))

print(f"Total paragraphs: {len(paragraphs)}")
print("\nFirst 15 paragraphs:")
for p in paragraphs[:15]:
    print("- ", p)
