// src/Components/IcerikKarti.jsx
// Tek bir film/dizi kaydını gösteren kart bileşeni

import React, { useState } from "react";

function IcerikKarti({ icerik, duzenlemeyeAc, silinsinMi }) {
  const [silOnayiGoster, setSilOnayiGoster] = useState(false);

  const durumRengi = {
    "İzlendi": "durum-izlendi",
    "İzleniyor": "durum-izleniyor",
    "İzlenecek": "durum-bekliyor",
  };

  const durumIkonu = {
    "İzlendi": "✅",
    "İzleniyor": "▶️",
    "İzlenecek": "🕐",
  };

  const yildizlar = () => {
    if (icerik.puan === 0) return <span className="puan-yok">Puanlanmadı</span>;
    return (
      <span className="puan-goster">
        ⭐ <strong>{icerik.puan}</strong>/10
      </span>
    );
  };

  return (
    <div className="icerik-karti">
      <div className="karti-ust">
        <div className="kategori-rozet">{icerik.kategori}</div>
        <span className={`durum-rozet ${durumRengi[icerik.durum]}`}>
          {durumIkonu[icerik.durum]} {icerik.durum}
        </span>
      </div>

      <h3 className="karti-baslik">{icerik.baslik}</h3>

      <div className="karti-meta">
        <span className="meta-tur">🎭 {icerik.tur}</span>
        <span className="meta-yil">📅 {icerik.yil}</span>
      </div>

      <div className="karti-puan">{yildizlar()}</div>

      {icerik.notlar && (
        <p className="karti-not">💬 {icerik.notlar}</p>
      )}

      <div className="karti-aksiyonlar">
        <button
          className="btn-duzenle"
          onClick={() => duzenlemeyeAc(icerik)}
        >
          ✏️ Düzenle
        </button>

        {silOnayiGoster ? (
          <div className="sil-onayi">
            <span>Emin misin?</span>
            <button className="btn-evet" onClick={() => silinsinMi(icerik.id)}>
              Evet
            </button>
            <button className="btn-hayir" onClick={() => setSilOnayiGoster(false)}>
              Hayır
            </button>
          </div>
        ) : (
          <button className="btn-sil" onClick={() => setSilOnayiGoster(true)}>
            🗑️ Sil
          </button>
        )}
      </div>
    </div>
  );
}

export default IcerikKarti;
