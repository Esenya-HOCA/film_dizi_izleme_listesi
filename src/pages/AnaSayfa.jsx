
import React, { useState, useMemo } from "react";
import { useIcerikListesi } from "../hooks/useIcerikListesi";
import IcerikKarti from "../components/IcerikKarti";
import IcerikFormu from "../components/IcerikFormu";
import FiltreCubugu from "../components/FiltreCubugu";
import Baslik from "../components/Baslik";

function AnaSayfa() {
  const { icerikListesi, icerikEkle, icerikGuncelle, icerikSil, istatistikler } =
    useIcerikListesi();

  const [formAcikMi, setFormAcikMi] = useState(false);
  const [duzenlenecekIcerik, setDuzenlenecekIcerik] = useState(null);
  const [bildirim, setBildirim] = useState(null);

  const [filtreler, setFiltreler] = useState({
    aramaMetni: "",
    kategori: "",
    durum: "",
    siralama: "yeni",
  });

  const filtrelenmisListe = useMemo(() => {
    let liste = [...icerikListesi];

    if (filtreler.aramaMetni) {
      const aranan = filtreler.aramaMetni.toLowerCase();
      liste = liste.filter(
        (i) =>
          i.baslik.toLowerCase().includes(aranan) ||
          i.tur.toLowerCase().includes(aranan)
      );
    }

    if (filtreler.kategori) {
      liste = liste.filter((i) => i.kategori === filtreler.kategori);
    }

    if (filtreler.durum) {
      liste = liste.filter((i) => i.durum === filtreler.durum);
    }

    switch (filtreler.siralama) {
      case "baslik":
        liste.sort((a, b) => a.baslik.localeCompare(b.baslik, "tr"));
        break;
      case "puan":
        liste.sort((a, b) => b.puan - a.puan);
        break;
      case "yil":
        liste.sort((a, b) => b.yil - a.yil);
        break;
      default:
        liste.sort((a, b) => new Date(b.olusturmaTarihi) - new Date(a.olusturmaTarihi));
    }

    return liste;
  }, [icerikListesi, filtreler]);

  const filtreDegistir = (alan, deger) => {
    setFiltreler((onceki) => ({ ...onceki, [alan]: deger }));
  };

  const bildirimGoster = (mesaj, tur = "basari") => {
    setBildirim({ mesaj, tur });
    setTimeout(() => setBildirim(null), 3000);
  };

  const yeniIcerikAc = () => {
    setDuzenlenecekIcerik(null);
    setFormAcikMi(true);
  };

  const duzenlemeyeAc = (icerik) => {
    setDuzenlenecekIcerik(icerik);
    setFormAcikMi(true);
  };

  const kaydet = (formVerisi) => {
    if (duzenlenecekIcerik) {
      icerikGuncelle(formVerisi);
      bildirimGoster(`"${formVerisi.baslik}" güncellendi!`);
    } else {
      icerikEkle(formVerisi);
      bildirimGoster(`"${formVerisi.baslik}" listeye eklendi!`);
    }
  };

  const icerikSilIslem = (icerikId) => {
    const silinecek = icerikListesi.find((i) => i.id === icerikId);
    icerikSil(icerikId);
    bildirimGoster(`"${silinecek?.baslik}" silindi.`, "uyari");
  };

  return (
    <div className="uygulama">
      {/* Bildirim */}
      {bildirim && (
        <div className={`bildirim bildirim-${bildirim.tur}`}>
          {bildirim.tur === "basari" ? "✅" : "🗑️"} {bildirim.mesaj}
        </div>
      )}

      <Baslik istatistikler={istatistikler} />

      <main className="ana-icerik">
        <div className="ust-kontroller">
          <FiltreCubugu
            filtreler={filtreler}
            filtreDegistir={filtreDegistir}
            toplamSonuc={filtrelenmisListe.length}
          />
          <button className="btn-ekle" onClick={yeniIcerikAc}>
            ＋ Yeni Ekle
          </button>
        </div>

        {/* LİSTELEME */}
        {filtrelenmisListe.length === 0 ? (
          <div className="bos-durum">
            <p className="bos-ikon">🎬</p>
            <p className="bos-mesaj">
              {icerikListesi.length === 0
                ? "Henüz içerik eklemediniz. İlk filminizi ekleyin!"
                : "Aramanızla eşleşen içerik bulunamadı."}
            </p>
            {icerikListesi.length === 0 && (
              <button className="btn-ekle" onClick={yeniIcerikAc}>
                ＋ İlk İçeriği Ekle
              </button>
            )}
          </div>
        ) : (
          <div className="kart-izgarasi">
            {filtrelenmisListe.map((icerik) => (
              <IcerikKarti
                key={icerik.id}
                icerik={icerik}
                duzenlemeyeAc={duzenlemeyeAc}
                silinsinMi={icerikSilIslem}
              />
            ))}
          </div>
        )}
      </main>

      {/* Form Modalı */}
      <IcerikFormu
        gosterilsinMi={formAcikMi}
        kapatilsinMi={() => setFormAcikMi(false)}
        kaydedilsinMi={kaydet}
        duzenlenecekIcerik={duzenlenecekIcerik}
      />
    </div>
  );
}

export default AnaSayfa;
