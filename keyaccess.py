color_range = {
        "Merah": [0, 5],
        "Oren": [5, 22],
        "Kuning": [23, 32],
        "Hijau Muda": [33, 46],
        "Hijau": [47, 70],
        "Biru Muda": [71, 97],
        "Biru": [98, 128],
        "Ungu": [129, 152],
        "Pink": [153, 169],
    }

huecolor = 45

# for key, value in color_range.items():
#     # print(f'key: {key}, values: {value[0]}')
#     if huecolor >= value[0] and huecolor <= value[1]:
#         print(f'the color is: {key}')
#         print(f'the value is: {huecolor}')
#         break
#     else:
#         print(f'nothing is found, hue color: {huecolor}')
        
for key in color_range:
    print(f'key: {key} and {color_range[key][0]}')