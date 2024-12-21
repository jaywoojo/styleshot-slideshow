from pdf2image import convert_from_path

# Convert PDF to images
images = convert_from_path('/Users/jaywoojo/nxn-styleshot/StyleShot 서비스 소개서.pdf')

# Save the images
for i, image in enumerate(images):
    image.save(f'page_{i+1}.jpg')