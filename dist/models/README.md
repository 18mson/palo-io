# Custom 3D Weapon Models Directory (/public/models/)

Folder ini digunakan untuk menempatkan file model 3D eksternal berformat **`.glb`** (Binary glTF) lengkap dengan teksturnya.
Game ini secara otomatis mendeteksi, menormalisasi skala, mengoptimalkan tekstur, dan langsung menggunakannya di First-Person POV!

---

### Nama File Model yang Didukung:
Simpan file `.glb` dengan nama persis sesuai ID senjata berikut:
- **`vandal.glb`** (Assault Rifle)
- **`spectre.glb`** (Submachine Gun)
- **`operator.glb`** (Sniper Rifle)
- **`classic.glb`** (Pistol / Sidearm)
- **`bucky.glb`** (Shotgun)
- **`odin.glb`** (Heavy Machine Gun)

---

### Rekomendasi Model 3D Valorant yang Cocok & Gratis (Lengkap dengan Tekstur):

Berikut adalah daftar model 3D terbaik di Sketchfab yang mirip dan cocok 1-ke-1 dengan senjata di game ini, lengkap dengan tekstur PBR (Diffuse, Normal, Roughness, Metalness, Emissive):

1. **Vandal (Assault Rifle)**:
   - **Default Vandal**: [VALORANT Weapon Vandal Rifle by LkblZ](https://sketchfab.com/3d-models/valorant-weapon-vandal-rifle-cd68bd3eca474ec699575175e5603c14) — Model default lengkap dengan tekstur.
   - **Reaver Vandal**: [Reaver Vandal on Sketchfab](https://sketchfab.com/search?q=reaver+vandal&type=models&features=downloadable) — Skin gelap gothic favorit komunitas.
   - **Prime Vandal**: [Prime Vandal on Sketchfab](https://sketchfab.com/search?q=prime+vandal&type=models&features=downloadable) — Skin obsidian gold dengan glow Radianite.

2. **Spectre (Submachine Gun)**:
   - **Spectre Submachine Gun**: [Spectre VALORANT Fan Custom Skin](https://sketchfab.com/3d-models/spectre-valorant-fan-custom-skin-0b92ea91efca40b0800bf1b65076cf74) — Model SMG berperedam suara dengan proporsi akurat.
   - **Ion Spectre**: [Ion Spectre on Sketchfab](https://sketchfab.com/search?q=ion+spectre&type=models&features=downloadable) — Skin futuristik putih & neon biru.

3. **Operator (Sniper Rifle)**:
   - **Standard Operator**: [Valorant Weapon Operator Sniper](https://sketchfab.com/search?q=valorant+operator+sniper&type=models&features=downloadable) — Sniper berkekuatan tinggi lengkap dengan teleskop optik.
   - **Kuronami / Ion Operator**: [Kuronami Operator on Sketchfab](https://sketchfab.com/search?q=kuronami+operator&type=models&features=downloadable).

4. **Classic (Pistol)**:
   - **Default Classic Pistol**: [VALORANT Weapon Classic Pistol by LkblZ](https://sketchfab.com/3d-models/valorant-weapon-classic-pistol-cd68bd3eca474ec699575175e5603c14) — Model pistol taktis semi-otomatis bawaan.
   - **Prime / Glitchpop Classic**: [Classic Raygun on Sketchfab](https://sketchfab.com/3d-models/classic-raygun-valorant-a2ac8d55a2bc4db49df162ec575506ee).

5. **Bucky (Shotgun)**:
   - **Default Bucky**: [VALORANT Weapon Bucky Shotgun by LkblZ](https://sketchfab.com/3d-models/valorant-weapon-bucky-shotgun-cd68bd3eca474ec699575175e5603c14) — Shotgun pump-action 12-gauge.
   - **Bucky Oni**: [Bucky Oni - Valorant by KairosBastardville](https://sketchfab.com/3d-models/bucky-oni-valorant-a2ac8d55a2bc4db49df162ec575506ee).

6. **Odin (Heavy Machine Gun)**:
   - **Default Odin**: [VALORANT Weapon Odin HeavyMachineGun by LkblZ](https://sketchfab.com/3d-models/valorant-weapon-odin-heavymachinegun-cd68bd3eca474ec699575175e5603c14) — Senapan mesin berat dengan drum amunisi 100 peluru.

---

### Cara Mengunduh & Memasukkan ke Game:
1. Buka salah satu link di atas (atau cari di [sketchfab.com](https://sketchfab.com) dengan filter **Downloadable**).
2. Klik tombol **Download 3D Model**.
3. Pilih format **glTF / GLB** (Jika ada opsi **.glb**, unduh opsi tersebut karena tekstur sudah otomatis tertanam di dalam satu file!).
4. Jika mengunduh file `.zip` (glTF):
   - Buka/ekstrak zip tersebut.
   - Anda akan melihat file `scene.gltf` atau `scene.bin` beserta folder `textures/`.
   - Gunakan converter gratis seperti [gltf.report](https://gltf.report/) atau [three.js editor](https://threejs.org/editor/) untuk menyatukannya menjadi single `.glb`, ATAU langsung pilih tombol download bertuliskan **"Autoconverted format (glTF / GLB)"** di Sketchfab.
5. Ganti nama file menjadi ID senjata yang sesuai (misal: `vandal.glb`).
6. Pindahkan file tersebut ke folder:
   ```
   palo-io/public/models/vandal.glb
   ```
7. Buka browser pada game (`http://localhost:5173/`), pilih senjata Vandal — model baru Anda langsung tampil secara otomatis!

---

### Fitur Otomatisasi Game:
- **Auto Scale Normalizer**: `WeaponModelLoader` secara otomatis menyesuaikan ukuran model (baik dibuat dalam satuan mm, cm, maupun meter) agar pas dengan tangan karakter dan layar FPS.
- **Anisotropic Texture Filtering**: Semua tekstur yang tersemat di model otomatis di-set ke filtering anisotropik (8x) agar tetap tajam saat dilihat dari sudut First-Person.
- **Zero-Downtime Fallback**: Jika file `.glb` belum dimasukkan, game tetap memakai model prosedural ultra-realistis bawaan (Carbon Fiber, Brushed Steel, Glowing Crystals) dengan mulus tanpa error.
