from pathlib import Path
from io import BytesIO
import base64
import re
from PIL import Image, ImageEnhance, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"

for name in ("antes", "depois-natural", "mecha-loira", "tesoura", "tesoura-fechada"):
    source = ASSETS / f"{name}.png"
    target = ASSETS / f"{name}.webp"
    with Image.open(source) as image:
        image.save(target, "WEBP", quality=84, method=6, lossless=name.startswith("tesoura") or name == "mecha-loira")

with Image.open(ASSETS / "antes.png") as image:
    image = image.convert("RGB")
    ratio = 1200 / 630
    crop_height = int(image.width / ratio)
    top = max(0, (image.height - crop_height) // 2)
    image = image.crop((0, top, image.width, top + crop_height)).resize((1200, 630), Image.Resampling.LANCZOS)
    image = ImageEnhance.Brightness(image).enhance(0.58)
    overlay = Image.new("RGBA", image.size, (29, 28, 27, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, 0, 1200, 630), fill=(29, 28, 27, 70))
    image = Image.alpha_composite(image.convert("RGBA"), overlay).convert("RGB")
    image.save(ROOT / "public" / "og-image.jpg", "JPEG", quality=86, optimize=True, progressive=True)

print("Assets otimizados com sucesso.")

svg_sizes = {"logo.svg": 512, "logo-footer.svg": 512, "favicon.svg": 256}
for svg_name, max_width in svg_sizes.items():
    svg_path = ROOT / "public" / svg_name
    source = svg_path.read_text(encoding="utf-8")
    match = re.search(r"data:image/(?:png|webp);base64,([^\"']+)", source)
    if not match:
        continue
    with Image.open(BytesIO(base64.b64decode(match.group(1)))) as image:
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        output = BytesIO()
        image.save(output, "WEBP", lossless=True, method=6)
    encoded = base64.b64encode(output.getvalue()).decode("ascii")
    optimized = source[:match.start()] + f"data:image/webp;base64,{encoded}" + source[match.end():]
    svg_path.write_text(optimized, encoding="utf-8")

print("Logos SVG otimizados sem perda visual.")
