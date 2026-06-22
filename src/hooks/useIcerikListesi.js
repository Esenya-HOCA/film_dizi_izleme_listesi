// src/hooks/useIcerikListesi.js
// LocalStorage ile CRUD işlemlerini yöneten özel hook

import { useState, useEffect } from "react";

const DEPOLAMA_ANAHTARI = "izleme_listesi";

export function useIcerikListesi() {
  const [icerikListesi, setIcerikListesi] = useState([]);

  // Uygulama açıldığında LocalStorage'dan verileri yükle
  useEffect(() => {
    const kaydedilenVeri = localStorage.getItem(DEPOLAMA_ANAHTARI);
    if (kaydedilenVeri) {
      setIcerikListesi(JSON.parse(kaydedilenVeri));
    } else {
      // Örnek başlangıç verileri
      const ornekVeriler = [
        {
          id: "1",
          baslik: "Inception",
          kategori: "Film",
          tur: "Bilim Kurgu",
          yil: 2010,
          puan: 9,
          durum: "İzlendi",
          notlar: "Harika bir zihin bükücü film!",
          olusturmaTarihi: new Date().toISOString(),
        },
        {
          id: "2",
          baslik: "Breaking Bad",
          kategori: "Dizi",
          tur: "Suç",
          yil: 2008,
          puan: 10,
          durum: "İzlendi",
          notlar: "Tüm zamanların en iyi dizisi.",
          olusturmaTarihi: new Date().toISOString(),
        },
        {
          id: "3",
          baslik: "Dune: Part Two",
          kategori: "Film",
          tur: "Bilim Kurgu",
          yil: 2024,
          puan: 0,
          durum: "İzlenecek",
          notlar: "",
          olusturmaTarihi: new Date().toISOString(),
        },
      ];
      setIcerikListesi(ornekVeriler);
      localStorage.setItem(DEPOLAMA_ANAHTARI, JSON.stringify(ornekVeriler));
    }
  }, []);

  // LocalStorage'ı her değişiklikte güncelle
  const listeGuncelle = (yeniListe) => {
    setIcerikListesi(yeniListe);
    localStorage.setItem(DEPOLAMA_ANAHTARI, JSON.stringify(yeniListe));
  };

  // EKLE işlemi
  const icerikEkle = (yeniIcerik) => {
    const icerikId = Date.now().toString();
    const eklenecekIcerik = {
      ...yeniIcerik,
      id: icerikId,
      olusturmaTarihi: new Date().toISOString(),
    };
    const yeniListe = [...icerikListesi, eklenecekIcerik];
    listeGuncelle(yeniListe);
    return eklenecekIcerik;
  };

  // GÜNCELLE işlemi
  const icerikGuncelle = (guncelIcerik) => {
    const yeniListe = icerikListesi.map((icerik) =>
      icerik.id === guncelIcerik.id ? guncelIcerik : icerik
    );
    listeGuncelle(yeniListe);
  };

  // SİL işlemi
  const icerikSil = (icerikId) => {
    const yeniListe = icerikListesi.filter((icerik) => icerik.id !== icerikId);
    listeGuncelle(yeniListe);
  };

  // İSTATİSTİKLER
  const istatistikler = {
    toplamSayi: icerikListesi.length,
    izlenenSayi: icerikListesi.filter((i) => i.durum === "İzlendi").length,
    izlenilenSayi: icerikListesi.filter((i) => i.durum === "İzleniyor").length,
    izlenecekSayi: icerikListesi.filter((i) => i.durum === "İzlenecek").length,
    ortalamaPuan:
      icerikListesi.filter((i) => i.puan > 0).length > 0
        ? (
            icerikListesi
              .filter((i) => i.puan > 0)
              .reduce((t, i) => t + i.puan, 0) /
            icerikListesi.filter((i) => i.puan > 0).length
          ).toFixed(1)
        : "0",
  };

  return {
    icerikListesi,
    icerikEkle,
    icerikGuncelle,
    icerikSil,
    istatistikler,
  };
}
