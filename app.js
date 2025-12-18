/**
 * SineArşiv - Modern JavaScript (ES6+) Uygulaması [cite: 45]
 * Tüm değişkenler const ve let ile tanımlanmıştır[cite: 46].
 */
let tumMedyalar = [];

// Verileri JSON dosyasından asenkron olarak çekme [cite: 10, 48, 49]
async function verileriYukle() {
    try {
        const cevap = await fetch('data.json'); // fetch() API kullanımı [cite: 49]
        tumMedyalar = await cevap.json();
        sayfaDegistir("home"); 
    } catch (hata) {
        console.error("Veri yükleme hatası:", hata);
    }
}

// Medyaları ekrana article etiketleri içinde basma (Anlamsal HTML) [cite: 43, 50]
function ekranaBas(liste) {
    const medyaListesi = document.getElementById('medya-listesi');
    medyaListesi.innerHTML = "";
    const favoriler = JSON.parse(localStorage.getItem('favorilerim')) || []; // localStorage kullanımı [cite: 11, 52]

    if (liste.length === 0) {
        medyaListesi.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Sonuç bulunamadı...</p>";
        return;
    }

    liste.forEach(film => {
        const isFav = favoriler.includes(film.id);
        const kart = document.createElement('article'); // Semantic HTML5: article [cite: 43]
        kart.className = 'medya-kart';
        
        kart.innerHTML = `
            <img src="${film.resim}" alt="${film.baslik}" onclick="detayGoster(${film.id})">
            <div class="kart-icerik">
                <div onclick="detayGoster(${film.id})" style="cursor:pointer">
                    <h3>${film.baslik}</h3>
                    <p>${film.yil} | ${film.tur}</p>
                </div>
                <button class="fav-btn ${isFav ? 'sil-btn' : 'ekle-btn'}" onclick="favoriYonet(this, ${film.id})">
                    ${isFav ? 'Çıkar' : 'Favorilere Ekle'}
                </button>
            </div>
        `;
        medyaListesi.appendChild(kart);
    });
}

// SPA Mantığı: Ayrı HTML dosyası olmadan dinamik detay sayfası [cite: 25, 26]
function detayGoster(id) {
    const film = tumMedyalar.find(m => m.id === id);
    const liste = document.getElementById('medya-listesi');
    document.getElementById('filtre-alani').style.display = 'none'; // Arama ve filtreleri gizle
    
    document.body.dataset.page = "detail";
    liste.innerHTML = `
        <article class="detay-sayfasi" style="grid-column: 1/-1; padding: 20px; background: #1f1f1f; border-radius: 15px;">
            <button onclick="sayfaDegistir('home')" class="fav-btn sil-btn" style="width:auto; margin-bottom:20px; background: #333;">← Geri Dön</button>
            <div style="display: flex; gap: 30px; flex-wrap: wrap;">
                <img src="${film.resim}" style="width: 300px; border-radius: 10px;">
                <div style="flex: 1; min-width: 300px; text-align: left;">
                    <h2 style="font-size: 36px; color: #e50914; margin-bottom:10px;">${film.baslik}</h2>
                    <p style="margin: 5px 0;"><strong>Yıl:</strong> ${film.yil} | <strong>Tür:</strong> ${film.tur}</p>
                    <p style="line-height: 1.8; margin: 15px 0;"><strong>Özet:</strong> ${film.ozet}</p>
                    <p><strong>Başrol:</strong> ${film.oyuncular}</p>
                    <p style="margin-top: 15px; font-size: 20px; color: #f1c40f;">⭐ Puan: ${film.puan}/10</p>
                </div>
            </div>
        </article>
    `;
}

// Favori Yönetimi (localStorage) [cite: 28, 52]
function favoriYonet(buton, id) {
    let favoriler = JSON.parse(localStorage.getItem('favorilerim')) || [];
    if (favoriler.includes(id)) {
        favoriler = favoriler.filter(fId => fId !== id);
    } else {
        favoriler.push(id);
    }
    localStorage.setItem('favorilerim', JSON.stringify(favoriler));
    sayfaDegistir(document.body.dataset.page || "home");
}

// Tür Filtreleme (Zorunlu İşlev) [cite: 24]
function turFiltrele(tur) {
    if (tur === 'hepsi') ekranaBas(tumMedyalar);
    else ekranaBas(tumMedyalar.filter(m => m.tur.includes(tur)));
}

// Navigasyon Yönetimi
function sayfaDegistir(sayfaAdi) {
    document.body.dataset.page = sayfaAdi;
    document.getElementById('filtre-alani').style.display = 'block';
    const favoriIdler = JSON.parse(localStorage.getItem('favorilerim')) || [];

    if (sayfaAdi === "home") ekranaBas(tumMedyalar);
    else if (sayfaAdi === "favs") ekranaBas(tumMedyalar.filter(m => favoriIdler.includes(m.id)));
}

// Arama Girişi (Event Listener) [cite: 24]
document.getElementById('arama-kutusu').addEventListener('input', (e) => {
    const kelime = e.target.value.toLowerCase();
    ekranaBas(tumMedyalar.filter(m => m.baslik.toLowerCase().includes(kelime)));
});

// Menü Tıklamaları
document.getElementById('ana-sayfa').onclick = (e) => { e.preventDefault(); sayfaDegistir("home"); };
document.getElementById('favoriler').onclick = (e) => { e.preventDefault(); sayfaDegistir("favs"); };
document.querySelector('.logo').onclick = () => sayfaDegistir("home");

window.onload = verileriYukle;