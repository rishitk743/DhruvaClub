import fitz

doc = fitz.open("personality development quiz.pdf")
print("Total pages in PDF:", len(doc))
for i in range(min(5, len(doc))):
    print(f"--- PAGE {i+1} ---")
    print(doc[i].get_text()[:300])
