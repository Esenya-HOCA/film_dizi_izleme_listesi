
import React, { useState, useEffect } from "react";
import { KATEGORI_LISTESI, DURUM_LISTESI, TUR_LISTESI, boslkIcerik } from "../interfaces/IcerikArayuzu";

function IcerikFormu({ gosterilsinMi, kapatilsinMi, kaydedilsinMi, duzenlenecekIcerik }) {
  const [formVerisi, setFormVerisi] = useState(boslkIcerik());
  const [hataMesajlari, setHataMesajlari] = useState({});

  useEffect(() => {
    if (duzenlenecekIcerik) {
      setFormVerisi(duzenlenecekIcerik);
    } else {
      setFormVerisi(boslkIcerik());
    }
    setHataMesajlari({});
  }, [duzenlenecekIcerik, gosterilsinMi]);

  const alanDegistir = (e) => {
    const { name, value } = e.target;
    setFormVerisi((onceki) => ({
      ...onceki,
      [name]: name === "yil" || name === "puan" ? Number(value) : value,
    }));
    if (hataMesajlari[name]) {
      setHataMesajlari((onceki) => ({ ...onceki, [name]: "" }));
    }
  };

  const formDogrula = () => {
    const hatalar = {};
    if (!formVerisi.baslik.trim()) hatalar.baslik = "Başlık zorunludur.";
    if (!formVerisi.yil || formVerisi.yil < 1900 || formVerisi.yil > 2030)
      hatalar.yil = "Geçerli bir yıl giriniz (1900–2030).";
    if (formVerisi.puan < 0 || formVerisi.puan > 10)
      hatalar.puan = "Puan 0 ile 10 arasında olmalıdır.";
    return hatalar;
  };

  const formGonder = (e) => {
    e.preventDefault();
    const hatalar = formDogrula();
    if (Object.keys(hatalar).length > 0) {
      setHataMesajlari(hatalar);
      return;
    }
    kaydedilsinMi(formVerisi);
    kapatilsinMi();
  };

  if (!gosterilsinMi) return null;

  return (
    <div className="modal-arka-plan" onClick={kapatilsinMi}>
      <div className="modal-kutu" onClick={(e) => e.stopPropagation()}>
        <div className="modal-baslik">
          <h2>{duzenlenecekIcerik ? "✏️ İçerik Düzenle" : "➕ Yeni İçerik Ekle"}</h2>
          <button className="kapat-btn" onClick={kapatilsinMi}>✕</button>
        </div>

        <form onSubmit={formGonder} className="icerik-formu">
          {/* Başlık */}
          <div className="form-grup">
            <label className="form-etiket">Başlık *</label>
            <input
              type="text"
              name="baslik"
              value={formVerisi.baslik}
              onChange={alanDegistir}
              placeholder="Film veya dizi adı..."
              className={`form-input ${hataMesajlari.baslik ? "hata" : ""}`}
            />
            {hataMesajlari.baslik && <span className="hata-mesaji">{hataMesajlari.baslik}</span>}
          </div>

          {/* Kategori & Tür */}
          <div className="form-satir">
            <div className="form-grup">
              <label className="form-etiket">Kategori</label>
              <select name="kategori" value={formVerisi.kategori} onChange={alanDegistir} className="form-input">
                {KATEGORI_LISTESI.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="form-grup">
              <label className="form-etiket">Tür</label>
              <select name="tur" value={formVerisi.tur} onChange={alanDegistir} className="form-input">
                {TUR_LISTESI.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Yıl & Puan */}
          <div className="form-satir">
            <div className="form-grup">
              <label className="form-etiket">Yapım Yılı *</label>
              <input
                type="number"
                name="yil"
                value={formVerisi.yil}
                onChange={alanDegistir}
                min="1900"
                max="2030"
                className={`form-input ${hataMesajlari.yil ? "hata" : ""}`}
              />
              {hataMesajlari.yil && <span className="hata-mesaji">{hataMesajlari.yil}</span>}
            </div>
            <div className="form-grup">
              <label className="form-etiket">Puanım (0–10)</label>
              <input
                type="number"
                name="puan"
                value={formVerisi.puan}
                onChange={alanDegistir}
                min="0"
                max="10"
                step="0.5"
                className={`form-input ${hataMesajlari.puan ? "hata" : ""}`}
              />
              {hataMesajlari.puan && <span className="hata-mesaji">{hataMesajlari.puan}</span>}
            </div>
          </div>

          {/* Durum */}
          <div className="form-grup">
            <label className="form-etiket">İzleme Durumu</label>
            <div className="durum-secenekleri">
              {DURUM_LISTESI.map((d) => (
                <label key={d} className={`durum-etiket ${formVerisi.durum === d ? "aktif" : ""}`}>
                  <input
                    type="radio"
                    name="durum"
                    value={d}
                    checked={formVerisi.durum === d}
                    onChange={alanDegistir}
                    className="gizli-radio"
                  />
                  {d === "İzlenecek" ? "🕐" : d === "İzleniyor" ? "▶️" : "✅"} {d}
                </label>
              ))}
            </div>
          </div>

          {/* Notlar */}
          <div className="form-grup">
            <label className="form-etiket">Notlarım</label>
            <textarea
              name="notlar"
              value={formVerisi.notlar}
              onChange={alanDegistir}
              placeholder="Bu içerik hakkında düşünceleriniz..."
              rows={3}
              className="form-input"
            />
          </div>

          {/* Butonlar */}
          <div className="form-butonlar">
            <button type="button" className="btn-iptal" onClick={kapatilsinMi}>
              İptal
            </button>
            <button type="submit" className="btn-kaydet">
              {duzenlenecekIcerik ? "✓ Güncelle" : "✓ Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IcerikFormu;
