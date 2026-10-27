import replicate

# Certifique-se de definir a variável de ambiente REPLICATE_API_TOKEN

output = replicate.run(
    "fofr/flux-gta:latest", # Exemplo de modelo do repositório
    input={
        "image": open("sua_imagem_comum.jpg", "rb"),
        "prompt": "GTA style digital painting artwork, highly detailed 2D vector art, sharp outlines, vibrant colors, Grand Theft Auto loading screen character",
        "image_strength": 0.35, # Controla o quanto mantém da foto original (0.0 a 1.0)
        "guidance_scale": 7.5
    }
)

print(f"Imagem gerada: {output[0]}")
