import replicate
import os
import base64
import requests

model = replicate.models.get("stability-ai/stable-diffusion")
# version = model.versions.get(
#     "27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478")

url = model.predict(
    prompt="This armor is made of an advanced composite material that is designed to absorb the force of any blast or impact. It is lightweight, yet strong enough to protect its wearer from any type of attack. The armor is also equipped with a state-of-the-art energy shield that can deflect and absorb energy-based attacks. It can also self-repair and regenerate, so it can quickly recover from any damage. The armor is also designed to be comfortable and ergonomic, allowing its wearer to move with ease and agility. Finally, the armor is also equipped with a powerful computer system that can analyze incoming threats and provide its wearer with the best course of action.")[0]
response = requests.get(url)
open('./img_output/result.jpg', 'wb').write(response.content)
print('done ')
