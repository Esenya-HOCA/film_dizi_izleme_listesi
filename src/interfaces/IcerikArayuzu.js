
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
