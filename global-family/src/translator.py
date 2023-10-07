from tkinter import *
from PIL import Image, ImageTk
import pytesseract
from googletrans import Translator

# Initialize the translator
translator = Translator()

# Function to extract text from an image and translate it
def extract_and_translate():
    # Get the selected language from the dropdown
    selected_language = language_var.get()
    
    # Read the text from the image using pytesseract
    text = pytesseract.image_to_string(Image.open(image_path))
    
    # Translate the text to the selected language
    translated_text = translator.translate(text, dest=selected_language).text
    
    # Display the translated text
    result_text.config(text=translated_text)

# Create a Tkinter window
window = Tk()
window.title("Image Text Translator")

# Load the image
image_path = "assets\\your_image.png"
img = Image.open(image_path)
img = img.resize((300, 300), Image.ANTIALIAS)
photo = ImageTk.PhotoImage(img)

# Display the image
image_label = Label(window, image=photo)
image_label.pack()

# Dropdown for selecting the target language
language_var = StringVar()
languages = ["en", "fr", "es", "de"]  # Add languages as needed
language_dropdown = OptionMenu(window, language_var, *languages)
language_var.set("en")  # Set the default language
language_dropdown.pack()

# Button to extract and translate text
translate_button = Button(window, text="Translate", command=extract_and_translate)
translate_button.pack()

# Display the translated text
result_text = Label(window, text="", wraplength=300)
result_text.pack()

# Start the Tkinter main loop
window.mainloop()