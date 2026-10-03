import fitz # PyMuPDF or pdf2image or pypdf
import os

pdf_path = "personality development quiz.pdf"
doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

os.makedirs("assets/questions", exist_ok=True)

for page_idx in range(len(doc)):
    page = doc[page_idx]
    image_list = page.get_images(full=True)
    if image_list:
        print(f"Page {page_idx+1} has {len(image_list)} images")
        for img_idx, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image_filename = f"assets/questions/page_{page_idx+1}_img_{img_idx+1}.{image_ext}"
            with open(image_filename, "wb") as f:
                f.write(image_bytes)
            print(f"  Saved {image_filename} ({len(image_bytes)} bytes)")
