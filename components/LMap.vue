<template>
  <div>
    <div id="map" style="height: 90vh"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.heat/dist/leaflet-heat.js";
import "leaflet-velocity";

const initialMap = ref(null);
let markers = [];
const heatData = [
  [-3.71839, -38.5434], // Fortaleza, Ceará
  [-22.9068, -43.1729], // Rio de Janeiro, Rio de Janeiro
  [-15.7942, -47.8825], // Brasília, Distrito Federal
  [-12.9714, -38.5014], // Salvador, Bahia
  [-23.5505, -46.6333], // São Paulo, São Paulo
  [-3.1279, -60.0234], // Manaus, Amazonas
  [-30.0331, -51.23], // Porto Alegre, Rio Grande do Sul
  [-16.6864, -49.2643], // Goiânia, Goiás
  [-5.7945, -35.211], // Natal, Rio Grande do Norte
  [-21.1357, -47.7819], // Ribeirão Preto, São Paulo
  [-25.4296, -49.2713], // Curitiba, Paraná
  [-8.0476, -34.877], // Recife, Pernambuco
  [-15.601, -56.0974], // Cuiabá, Mato Grosso
  [-7.2291, -35.8808], // João Pessoa, Paraíba
  [-1.4557, -48.4902], // Belém, Pará
  [-8.0578, -34.8829], // Olinda, Pernambuco
  [-22.9043, -43.1889], // Niterói, Rio de Janeiro
  [-22.9309, -43.1792], // São Gonçalo, Rio de Janeiro
  [-22.9083, -43.1964], // Itaboraí, Rio de Janeiro
  [-20.3039, -40.3126], // Vitória, Espírito Santo
  [-3.7319, -38.5267], // Aquiraz, Ceará
  [-7.2402, -35.909], // Cabedelo, Paraíba
  [-7.1367, -34.845], // Jaboatão dos Guararapes, Pernambuco
  [-23.3159, -47.1623], // Sorocaba, São Paulo
  [-8.9041, -36.4925], // Caruaru, Pernambuco
  [-23.4162, -51.9337], // Londrina, Paraná
  [-3.1064, -60.0264], // Manacapuru, Amazonas
  [-8.7297, -63.9], // Porto Velho, Rondônia
  [-12.609, -41.9031], // Irecê, Bahia
  [-16.5973, -49.2631], // Trindade, Goiás
  [-16.7676, -49.3282], // Goianira, Goiás
  [-16.6913, -49.3271], // Senador Canedo, Goiás
  [-19.9216, -43.9362], // Belo Horizonte, Minas Gerais
  [-3.7568, -38.5391], // Eusébio, Ceará
  [-16.673, -49.2673], // Goiânia, Goiás
  [-22.7945, -43.4513], // Nova Iguaçu, Rio de Janeiro
  [-22.7976, -43.0423], // Itaguaí, Rio de Janeiro
  [-22.7176, -43.7098], // Duque de Caxias, Rio de Janeiro
  [-22.7469, -43.4163], // São João de Meriti, Rio de Janeiro
  [-22.7535, -42.8644], // Angra dos Reis, Rio de Janeiro
  [-22.7199, -42.5646], // Paraty, Rio de Janeiro
  [-22.8668, -42.0458], // Campos dos Goytacazes, Rio de Janeiro
  [-22.7286, -41.9187], // Macaé, Rio de Janeiro
  [-22.935, -42.0276], // Cabo Frio, Rio de Janeiro
  [-22.5157, -42.9825], // Petrópolis, Rio de Janeiro
  [-22.4064, -42.9803], // Teresópolis, Rio de Janeiro
  [-22.4615, -43.173], // Nova Friburgo, Rio de Janeiro
  [-22.5479, -43.1132], // Guapimirim, Rio de Janeiro
  [-22.9219, -42.3167], // Rio das Ostras, Rio de Janeiro
  [-22.5184, -42.9718], // Itaipava, Rio de Janeiro
  [-21.9374, -42.0072], // Resende, Rio de Janeiro
  [-22.9812, -42.8286], // Barra Mansa, Rio de Janeiro
  [-22.6827, -43.1008], // Miguel Pereira, Rio de Janeiro
  [-22.2758, -42.5381], // Volta Redonda, Rio de Janeiro
  [-22.4776, -43.124], // Paraíba do Sul, Rio de Janeiro
  [-22.9083, -43.1964], // Itaboraí, Rio de Janeiro
  [-22.5561, -43.1132], // Magé, Rio de Janeiro
  [-21.6463, -42.0807], // Barra do Piraí, Rio de Janeiro
  [-22.8747, -43.2535], // São Pedro da Aldeia, Rio de Janeiro
  [-22.4973, -44.0553], // Vassouras, Rio de Janeiro
  [-22.7324, -43.4662], // Nilópolis, Rio de Janeiro
  [-22.4722, -43.826], // Seropédica, Rio de Janeiro
  [-21.8022, -41.9132], // Paraíba do Sul, Rio de Janeiro
  [-22.7251, -42.5567], // Nova Friburgo, Rio de Janeiro
  [-22.9873, -42.8278], // Resende, Rio de Janeiro
  [-22.4754, -44.4468], // Valença, Rio de Janeiro
  [-22.7579, -43.5955], // Belford Roxo, Rio de Janeiro
  [-22.7455, -43.4444], // Mesquita, Rio de Janeiro
  [-22.8497, -43.2255], // Saquarema, Rio de Janeiro
  [-22.8035, -42.918], // Tanguá, Rio de Janeiro
  [-22.6946, -43.1823], // Queimados, Rio de Janeiro
  [-22.6708, -43.7225], // São Gonçalo, Rio de Janeiro
  [-22.5292, -44.1677], // Mendes, Rio de Janeiro
  [-22.7033, -43.7158], // Niterói, Rio de Janeiro
  [-22.5842, -44.1098], // Paty do Alferes, Rio de Janeiro
  [-22.7579, -43.4404], // São João de Meriti, Rio de Janeiro
  [-22.6619, -43.5478], // Rio Bonito, Rio de Janeiro
  [-22.8734, -43.224], // Araruama, Rio de Janeiro
  [-22.6362, -43.2852], // Maricá, Rio de Janeiro
  [-22.7733, -42.8649], // Itaguaí, Rio de Janeiro
  [-22.6443, -43.7029], // Itaboraí, Rio de Janeiro
  [-22.8835, -43.1739], // Cabo Frio, Rio de Janeiro
  [-22.8976, -42.0439], // Rio das Ostras, Rio de Janeiro
  [-22.6486, -43.2034], // São Pedro da Aldeia, Rio de Janeiro
  [-22.7542, -43.7261], // Itaperuna, Rio de Janeiro
  [-22.8339, -43.4231], // Três Rios, Rio de Janeiro
  [-22.4714, -44.4513], // Vassouras, Rio de Janeiro
  [-22.8997, -43.1016], // Saquarema, Rio de Janeiro
  [-22.4714, -42.9828], // Petrópolis, Rio de Janeiro
  [-22.5487, -44.1718], // Mendes, Rio de Janeiro
  [-22.5756, -44.1775], // Engenheiro Paulo de Frontin, Rio de Janeiro
  [-22.6444, -43.0356], // Maricá, Rio de Janeiro
  [-22.7123, -42.858], // Mangaratiba, Rio de Janeiro
  [-22.7332, -42.8574], // Angra dos Reis, Rio de Janeiro
  [-22.4776, -42.0143], // Rio Claro, Rio de Janeiro
  [-22.5318, -42.9524], // Paraíba do Sul, Rio de Janeiro
  [-22.7445, -43.854], // Seropédica, Rio de Janeiro
  [-22.4946, -43.1769], // Teresópolis, Rio de Janeiro
  [-22.7824, -43.4418], // Mesquita, Rio de Janeiro
  [-22.7272, -42.899],
];

onMounted(() => {
  // Inicializar o mapa
  initialMap.value = L.map("map").setView([-22.9043, -43.1889], 5);

  if (initialMap.value) {
    // Adicionar camada de mosaico ao mapa
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 12,
      minZoom: 4,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(initialMap.value);

    initialMap.value.on("click", function (event) {
      const latLng = event.latlng;
      addMarker(latLng);
    });

    // Adicionar mapa de calor
    L.heatLayer(heatData, { radius: 25 }).addTo(initialMap.value);

    // Adicionar camada de vento
    
    initialMap.value.on("moveend", updateMarkersPosition);
    initialMap.value.on("zoomend", updateMarkersPosition);

    addWindLayer();
  }
});

const addMarker = (latLng) => {
  const marker = L.marker(latLng).addTo(initialMap.value);
  marker
    .bindPopup(
      "Latitude: " +
        latLng.lat.toFixed(4) +
        ", Longitude: " +
        latLng.lng.toFixed(4)
    )
    .openPopup();

  marker.on("click", () => removeMarker(marker));

  markers.push(marker);
};

const removeMarker = (marker) => {
  marker.removeFrom(initialMap.value);
  markers = markers.filter((m) => m !== marker);
};

const updateMarkersPosition = () => {
  markers.forEach((marker) => {
    const latLng = marker.getLatLng();
    const newLatLng = initialMap.value.latLngToContainerPoint(latLng);
    marker.setLatLng(initialMap.value.containerPointToLatLng(newLatLng));
  });
};

const generateSimulatedWindData = () => {
  const nx = 100;
  const ny = 100;
  const uData = new Array(nx * ny).fill(0).map(() => Math.random() * 10 - 5);
  const vData = new Array(nx * ny).fill(0).map(() => Math.random() * 10 - 5);

  const header = {
    parameterCategory: 2,
    parameterNumber: 2,
    lo1: -180,
    la1: 90,
    dx: 1.8,
    dy: 1.8,
    nx: nx,
    ny: ny,
    refTime: "2024-04-11T12:00:00Z",
  };

  const windData = {
    header: header,
    data: [uData, vData],
  };

  return windData;
};

const addWindLayer = () => {
  const velocityData = generateSimulatedWindData();

  L.velocityLayer({
    displayValues: true,
    displayOptions: {
      velocityType: "Global Wind",
      position: "bottomleft",
      emptyString: "No velocity data",
      angleConvention: "bearingCW",
      showCardinal: false,
      speedUnit: "ms",
      directionString: "Direction",
      speedString: "Speed",
    },
    data: [velocityData],
    minVelocity: 0,
    maxVelocity: 10,
    velocityScale: 0.005,
    colorScale: [],
    opacity: 0.97,
    paneName: "overlayPane",
  }).addTo(initialMap.value);
};


</script>
