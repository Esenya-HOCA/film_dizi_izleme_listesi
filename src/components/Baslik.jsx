

import React from "react";

function Baslik({ istatistikler }) {
  return (
    <header className="app-header">
      <div className="header-icerik">
        <div className="logo-alan">
          <span className="logo-ikon">🎬</span>
          <div>
            <h1 className="site-adi">SineLog</h1>
            <p className="site-aciklama">Film & Dizi İzleme Listesi</p>
          </div>
        </div>

        <div className="istatistik-alan">
          <div className="istatistik-kart">
            <span className="istatistik-sayi">{istatistikler.toplamSayi}</span>
            <span className="istatistik-etiket">Toplam</span>
          </div>
          <div className="istatistik-kart izlendi">
            <span className="istatistik-sayi">{istatistikler.izlenenSayi}</span>
            <span className="istatistik-etiket">İzlendi</span>
          </div>
          <div className="istatistik-kart izleniyor">
            <span className="istatistik-sayi">{istatistikler.izlenilenSayi}</span>
            <span className="istatistik-etiket">İzleniyor</span>
          </div>
          <div className="istatistik-kart bekliyor">
            <span className="istatistik-sayi">{istatistikler.izlenecekSayi}</span>
            <span className="istatistik-etiket">Bekliyor</span>
          </div>
          <div className="istatistik-kart puan">
            <span className="istatistik-sayi">⭐ {istatistikler.ortalamaPuan}</span>
            <span className="istatistik-etiket">Ort. Puan</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Baslik;
