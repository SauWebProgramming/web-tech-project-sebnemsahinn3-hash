# 🎬 SineArşiv | Modern Medya Portalı

![Versiyon](https://img.shields.io/badge/Versiyon-1.0.0-red)
![Lisans](https://img.shields.io/badge/Ders-Web_Teknolojileri-black)
![Teknoloji](https://img.shields.io/badge/Mimari-SPA-blue)

SineArşiv, en güncel sinema verilerini (2023-2025) kullanıcıya sunan, hız ve kullanıcı deneyimi odaklı geliştirilmiş bir **Single Page Application (SPA)** platformudur.

---

## ✨ Temel Yetenekler

| Özellik | Açıklama |
| :--- | :--- |
| **Dinamik Katalog** | `data.json` üzerinden asenkron veri çekimi. |
| **Anlık Arama** | Başlık ve türe göre gerçek zamanlı süzme. |
| **Akıllı Filtre** | Kategori butonları ile tek tıkla içerik gruplama. |
| **Favori Havuzu** | `LocalStorage` entegrasyonu ile kalıcı veri saklama. |
| **Detay Modülü** | Sayfa yenilenmeden dinamik film detay kartları. |

---

## 🛠️ Teknik Altyapı (Tech Stack)

Proje, belirlenen tüm modern web standartlarına uygun olarak kodlanmıştır:

* **HTML5 & CSS3:** Semantik etiket yapısı (`<article>`, `<section>`) ve Responsive Grid sistemleri.
* **JavaScript (ES6+):** Arrow functions, `async/await` mimarisi ve `fetch` API kullanımı.
* **Veri Yönetimi:** JSON tabanlı yerel veritabanı.
* **Dağıtım:** GitHub Pages üzerinden canlı yayın.

---

## 📂 Dosya Organizasyonu

```text
📁 WebProjem
├── 📄 index.html    <-- Anlamsal yapı ve iskelet
├── 📄 style.css     <-- Modern Dark Theme ve Grid layout
├── 📄 app.js        <-- SPA mantığı ve API operasyonları
├── 📄 data.json     <-- Medya veritabanı (Özet/Puan/Oyuncu)

└── 📁 img           <-- Yüksek çözünürlüklü film afişleri
