import React, { useEffect } from "react";
import styles from "./BuscarLixeiras.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function BuscarLixeiras() {
  useEffect(() => {
    // Coordenadas aproximadas para Praia de Itaparica, Vila Velha
    const initialCoords = [-20.323352, -40.286738];

    // Inicializa o mapa
    const map = L.map("map").setView(initialCoords, 14);

    // Adiciona o mapa base (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Adiciona um marcador para Praia de Itaparica
    L.marker(initialCoords)
      .addTo(map)
      .bindPopup("Praia de Itaparica, Vila Velha")
      .openPopup();

    // Adiciona marcadores para lixeiras
    const trashBins = [
      { coords: [-20.325, -40.29], name: "Lixeira 1" },
      { coords: [-20.326, -40.285], name: "Lixeira 2" },
      { coords: [-20.318, -40.29], name: "Lixeira 3" },
      { coords: [-20.324, -40.287], name: "Lixeira 4" },
      // Adicione mais lixeiras conforme necessário
    ];

    trashBins.forEach((bin) => {
      L.marker(bin.coords)
        .addTo(map)
        .bindPopup(bin.name);
    });
  }, []); // Executa apenas uma vez no carregamento

  return (
    <div className={styles.buscarlixeiras_container}>
      <h1>Buscar Lixeiras proximas</h1>
      <div id="map" className={styles.map}></div>
    </div>
  );
}

export default BuscarLixeiras;


