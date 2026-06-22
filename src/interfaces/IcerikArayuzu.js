// src/Interfaces/Icerik.ts
// Film ve dizi için temel veri modeli

export const KATEGORI_LISTESI = ["Film", "Dizi", "Belgesel", "Anime"];

export const DURUM_LISTESI = ["İzlenecek", "İzleniyor", "İzlendi"];

export const TUR_LISTESI = [
  "Aksiyon",
  "Komedi",
  "Dram",
  "Korku",
  "Bilim Kurgu",
  "Romantik",
  "Gerilim",
  "Animasyon",
  "Belgesel",
  "Suç",
];

/**
 * @typedef {Object} Icerik
 * Film veya dizi kaydı için kullanılan arayüz
 */
export const boslkIcerik = () => ({
  id: "",
  baslik: "",
  kategori: "Film",
  tur: "Aksiyon",
  yil: new Date().getFullYear(),
  puan: 0,
  durum: "İzlenecek",
  notlar: "",
  olusturmaTarihi: new Date().toISOString(),
});
