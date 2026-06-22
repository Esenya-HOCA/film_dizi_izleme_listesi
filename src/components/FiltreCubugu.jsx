// src/Components/FiltreCubugu.jsx
// Arama ve filtreleme bileşeni

import React from "react";
import { KATEGORI_LISTESI, DURUM_LISTESI } from "../interfaces/IcerikArayuzu";

function FiltreCubugu({ filtreler, filtreDegistir, toplamSonuc }) {
  return (
    <div className="filtre-cubugu">
      <div className="arama-alan">
        <span className="arama-ikon">🔍</span>
        <input
          type="text"
          placeholder="Film veya dizi ara..."
          value={filtreler.aramaMetni}
          onChange={(e) => filtreDegistir("aramaMetni", e.target.value)}
          className="arama-input"
        />
        {filtreler.aramaMetni && (
          <button className="temizle-btn" onClick={() => filtreDegistir("aramaMetni", "")}>
            ✕
          </button>
        )}
      </div>

      <div className="filtre-secenekler">
        <select
          value={filtreler.kategori}
          onChange={(e) => filtreDegistir("kategori", e.target.value)}
          className="filtre-select"
        >
          <option value="">Tüm Kategoriler</option>
          {KATEGORI_LISTESI.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>

        <select
          value={filtreler.durum}
          onChange={(e) => filtreDegistir("durum", e.target.value)}
          className="filtre-select"
        >
          <option value="">Tüm Durumlar</option>
          {DURUM_LISTESI.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <select
          value={filtreler.siralama}
          onChange={(e) => filtreDegistir("siralama", e.target.value)}
          className="filtre-select"
        >
          <option value="yeni">En Yeni Eklenen</option>
          <option value="baslik">Başlığa Göre (A-Z)</option>
          <option value="puan">Puana Göre</option>
          <option value="yil">Yıla Göre</option>
        </select>
      </div>

      <p className="sonuc-sayisi">
        <strong>{toplamSonuc}</strong> içerik bulundu
      </p>
    </div>
  );
}

export default FiltreCubugu;
