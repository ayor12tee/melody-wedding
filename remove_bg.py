from PIL import Image

def remove_bg_floodfill(input_path, output_path, tolerance=40):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Assume top-left pixel is background
    bg = datas[0]
    
    new_data = []
    for item in datas:
        # Euclidean distance approximation
        dist = sum([abs(item[i] - bg[i]) for i in range(3)])
        if dist < tolerance:
            new_data.append((255, 255, 255, 0))
        else:
            # Add feathering for smooth edge
            if dist < tolerance + 30:
                alpha = int(255 * ((dist - tolerance) / 30))
                new_data.append((item[0], item[1], item[2], alpha))
            else:
                new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_bg_floodfill("public/images/wedding-rings-raw.png", "public/images/wedding-rings.png")
