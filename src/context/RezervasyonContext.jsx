import { createContext, useContext, useEffect, useReducer } from 'react';
import { v4 as uuidOlustur } from 'uuid';

const DEPOLAMA_ANAHTARI = 'otel_rezervasyonlari';

const localStorage_oku = () => {
  try {
    const veri = localStorage.getItem(DEPOLAMA_ANAHTARI);
    return veri ? JSON.parse(veri) : [];
  } catch {
    return [];
  }
};

const localStorage_yaz = (rezervasyonlar) => {
  localStorage.setItem(DEPOLAMA_ANAHTARI, JSON.stringify(rezervasyonlar));
};

const baslangicDurumu = {
  rezervasyonlar: localStorage_oku(),
  yukleniyor: false,
  hata: null,
};

const rezervasyonReducer = (durum, eylem) => {
  switch (eylem.tip) {
    case 'REZERVASYON_EKLE': {
      const yeniRezervasyonlar = [...durum.rezervasyonlar, eylem.veri];
      localStorage_yaz(yeniRezervasyonlar);
      return { ...durum, rezervasyonlar: yeniRezervasyonlar };
    }
    case 'REZERVASYON_GUNCELLE': {
      const guncellenmisler = durum.rezervasyonlar.map((r) =>
        r.id === eylem.veri.id ? eylem.veri : r
      );
      localStorage_yaz(guncellenmisler);
      return { ...durum, rezervasyonlar: guncellenmisler };
    }
    case 'REZERVASYON_SIL': {
      const kalanlar = durum.rezervasyonlar.filter((r) => r.id !== eylem.id);
      localStorage_yaz(kalanlar);
      return { ...durum, rezervasyonlar: kalanlar };
    }
    default:
      return durum;
  }
};

const RezervasyonContext = createContext(null);

export const RezervasyonSaglayici = ({ children }) => {
  const [durum, gonder] = useReducer(rezervasyonReducer, baslangicDurumu);

  const rezervasyonEkle = (formVerisi) => {
    const yeniRezervasyona = {
      ...formVerisi,
      id: uuidOlustur(),
      olusturmaTarihi: new Date().toISOString(),
    };
    gonder({ tip: 'REZERVASYON_EKLE', veri: yeniRezervasyona });
    return yeniRezervasyona;
  };

  const rezervasyonGuncelle = (id, formVerisi) => {
    const guncellenmis = { ...formVerisi, id };
    gonder({ tip: 'REZERVASYON_GUNCELLE', veri: guncellenmis });
  };

  const rezervasyonSil = (id) => {
    gonder({ tip: 'REZERVASYON_SIL', id });
  };

  const rezervasyonBul = (id) => {
    return durum.rezervasyonlar.find((r) => r.id === id) || null;
  };

  const geceSayisiHesapla = (giris, cikis) => {
    if (!giris || !cikis) return 0;
    const ms = new Date(cikis) - new Date(giris);
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  };

  const toplamFiyatHesapla = (odaTipi, geceSayisi) => {
    const FIYATLAR = { Standart: 800, Deluxe: 1200, Suite: 2500, Aile: 1800 };
    return (FIYATLAR[odaTipi] || 0) * geceSayisi;
  };

  const deger = {
    rezervasyonlar: durum.rezervasyonlar,
    rezervasyonEkle,
    rezervasyonGuncelle,
    rezervasyonSil,
    rezervasyonBul,
    geceSayisiHesapla,
    toplamFiyatHesapla,
  };

  return (
    <RezervasyonContext.Provider value={deger}>
      {children}
    </RezervasyonContext.Provider>
  );
};

export const useRezervasyonContext = () => {
  const context = useContext(RezervasyonContext);
  if (!context) throw new Error('useRezervasyonContext bir RezervasyonSaglayici içinde kullanılmalıdır');
  return context;
};
