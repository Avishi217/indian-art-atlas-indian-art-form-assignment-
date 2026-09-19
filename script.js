const artLocations = [
  {
    id: 1,
    name: "Ajanta Caves",
    region: "Maharashtra",
    coords: [20.5519, 75.7033],
    tradition: "Buddhist mural painting",
    period: "2nd century BCE – 6th century CE",
    description: "The Ajanta caves preserve some of the finest surviving examples of ancient Indian mural painting. Their walls and ceilings contain narrative scenes connected with the Buddha and Jataka stories.",
    features: "Narrative murals, expressive figures, rich ornamentation and Buddhist themes.",
    works: "Bodhisattva Padmapani; Jataka narratives; painted cave interiors.",
    source: "UNESCO World Heritage Centre; Archaeological Survey of India"
  },
  {
    id: 2,
    name: "Ellora Caves",
    region: "Maharashtra",
    coords: [20.0268, 75.1780],
    tradition: "Rock-cut art & sculpture",
    period: "6th – 10th century CE",
    description: "Ellora is a major rock-cut complex containing Buddhist, Hindu and Jain monuments. Its sculptures and architecture show the interaction of multiple religious artistic traditions.",
    features: "Monumental rock-cut architecture, sculptural panels and multi-religious heritage.",
    works: "Kailasa Temple; Buddhist viharas; Jain cave sculptures.",
    source: "UNESCO World Heritage Centre; Archaeological Survey of India"
  },
  {
    id: 3,
    name: "Mithila / Madhubani",
    region: "Bihar",
    coords: [26.35, 85.55],
    tradition: "Madhubani (Mithila) painting",
    period: "Living folk tradition",
    description: "Madhubani painting developed in the Mithila region of Bihar. Traditionally made on walls and floors, it later expanded to paper, cloth and other surfaces.",
    features: "Dense patterns, bold outlines, geometric borders, nature and mythological imagery.",
    works: "Scenes of Rama and Sita, Krishna, Durga, fish, birds, plants and ceremonial motifs.",
    source: "Google Arts & Culture; Ministry of Culture / CCRT"
  },
  {
    id: 4,
    name: "Raghurajpur",
    region: "Odisha",
    coords: [19.8850, 85.8430],
    tradition: "Pattachitra painting",
    period: "Long-standing temple-linked tradition",
    description: "Raghurajpur is a renowned craft village associated with Pattachitra, a detailed painting tradition on prepared cloth. The art is closely connected with the Jagannath tradition of Odisha.",
    features: "Strong outlines, elaborate borders, flat colour fields and mythological storytelling.",
    works: "Jagannath themes, Krishna Leela, Dashavatara and scenes from the Ramayana.",
    source: "Google Arts & Culture; Ministry of Culture / CCRT"
  },
  {
    id: 5,
    name: "Srikalahasti",
    region: "Andhra Pradesh",
    coords: [13.7499, 79.6984],
    tradition: "Kalamkari",
    period: "Medieval to modern craft tradition",
    description: "Srikalahasti is associated with the pen-drawn form of Kalamkari, traditionally produced on cotton and used for narrative and temple-related imagery.",
    features: "Hand-drawn lines, natural dyes and large narrative compositions.",
    works: "Ramayana and Mahabharata scenes, temple hangings and mythological figures.",
    source: "Ministry of Culture / CCRT"
  },
  {
    id: 6,
    name: "Thanjavur",
    region: "Tamil Nadu",
    coords: [10.7870, 79.1378],
    tradition: "Tanjore / Thanjavur painting",
    period: "Developed strongly under South Indian court and temple patronage",
    description: "Thanjavur painting is known for devotional subjects and a highly decorative surface. Traditional works often combine rich colours with gold foil and relief-like ornament.",
    features: "Gold foil, raised decoration, vivid colours and devotional imagery.",
    works: "Images of Hindu deities, especially Krishna and other temple-associated subjects.",
    source: "Ministry of Culture / CCRT; Indian art history references"
  },
  {
    id: 7,
    name: "Warli Region",
    region: "Maharashtra",
    coords: [19.60, 73.10],
    tradition: "Warli tribal painting",
    period: "Living community tradition",
    description: "Warli painting is associated with Adivasi communities in Maharashtra. Its visual language uses simplified geometric figures to represent everyday life, rituals, agriculture and nature.",
    features: "White figures on an earthen background; circles, triangles and lines create people, animals and scenes.",
    works: "Tarpa dance, farming, weddings, hunting and community life.",
    source: "Ministry of Culture / CCRT; Indian visual-arts references"
  },
  {
    id: 8,
    name: "Mewar / Udaipur",
    region: "Rajasthan",
    coords: [24.5854, 73.7125],
    tradition: "Rajasthani miniature painting",
    period: "Medieval and early modern court tradition",
    description: "The Rajput painting traditions of Rajasthan developed in royal courts and produced illustrated manuscripts, devotional scenes and courtly imagery.",
    features: "Strong colours, detailed figures, courtly settings and narrative compositions.",
    works: "Illustrated manuscripts, Krishna themes, court scenes and landscapes.",
    source: "Indian art history references; Ministry of Culture / CCRT"
  },
  {
    id: 9,
    name: "Gond Art Region",
    region: "Madhya Pradesh",
    coords: [22.72, 80.20],
    tradition: "Gond painting",
    period: "Living tribal tradition",
    description: "Gond art is associated with the Gond communities of central India. Contemporary paintings often transform animals, plants and stories into rhythmic compositions filled with dots, lines and internal patterns.",
    features: "Pattern-filled forms, dots and lines, nature imagery and storytelling.",
    works: "Trees, animals, birds, village life and stories from the natural world.",
    source: "Indian visual-arts references; Ministry of Culture / CCRT"
  },
  {
    id: 10,
    name: "Delhi / Mughal Court",
    region: "Delhi",
    coords: [28.6139, 77.2090],
    tradition: "Mughal miniature painting",
    period: "16th – 19th century",
    description: "Mughal court ateliers developed a sophisticated miniature painting tradition that combined Persian influences with Indian subjects, techniques and artists.",
    features: "Fine detail, portraiture, manuscript illustration, naturalistic observation and court scenes.",
    works: "Illustrated manuscripts, royal portraits, hunting scenes and historical narratives.",
    source: "National Museum; Ministry of Culture / CCRT"
  }
];

const map = L.map("map", {
  zoomControl: true,
  minZoom: 4,
  maxZoom: 10
}).setView([22.8, 79.2], 5);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markers = new Map();
const list = document.getElementById("locationList");
const details = document.getElementById("details");

function markerIcon(number) {
  return L.divIcon({
    className: "",
    html: `<div class="numbered-marker"><span>${number}</span></div>`,
    iconSize: [32, 42],
    iconAnchor: [16, 39],
    popupAnchor: [0, -34]
  });
}

function popupHtml(item) {
  return `
    <div>
      <div class="popup-number">LOCATION ${item.id}</div>
      <div class="popup-title">${item.name}</div>
      <div class="popup-sub">${item.tradition} · ${item.region}</div>
    </div>
  `;
}

function showDetails(item, scroll = true) {
  details.innerHTML = `
    <div class="detail-content">
      <div class="detail-top">
        <div class="detail-number">${item.id}</div>
        <div>
          <h2 class="detail-title">${item.name}</h2>
          <div class="detail-region">${item.region} · ${item.tradition}</div>
        </div>
      </div>
      <div class="detail-grid">
        <div class="detail-box">
          <h4>Historical context</h4>
          <p>${item.description}</p>
        </div>
        <div class="detail-box">
          <h4>Key characteristics</h4>
          <p>${item.features}</p>
        </div>
        <div class="detail-box">
          <h4>Representative works / themes</h4>
          <p>${item.works}</p>
        </div>
      </div>
      <div class="detail-footer">
        <strong>Period:</strong> ${item.period} &nbsp; · &nbsp;
        <strong>Reference:</strong> ${item.source}
      </div>
    </div>
  `;

  document.querySelectorAll(".location-item").forEach(el => {
    el.classList.toggle("active", Number(el.dataset.id) === item.id);
  });

  if (scroll && window.innerWidth < 851) {
    details.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function selectLocation(item) {
  map.flyTo(item.coords, 6.5, { duration: 0.7 });
  markers.get(item.id).openPopup();
  showDetails(item);
}

artLocations.forEach(item => {
  const marker = L.marker(item.coords, { icon: markerIcon(item.id) })
    .addTo(map)
    .bindPopup(popupHtml(item));

  marker.on("click", () => showDetails(item, false));
  markers.set(item.id, marker);

  const button = document.createElement("button");
  button.className = "location-item";
  button.dataset.id = item.id;
  button.innerHTML = `
    <span class="location-number">${item.id}</span>
    <span>
      <strong>${item.name}</strong>
      <small>${item.tradition}</small>
    </span>
  `;
  button.addEventListener("click", () => selectLocation(item));
  list.appendChild(button);
});

document.getElementById("resetBtn").addEventListener("click", () => {
  map.flyTo([22.8, 79.2], 5, { duration: 0.7 });
  document.querySelectorAll(".location-item").forEach(el => el.classList.remove("active"));
  details.innerHTML = `
    <div class="details-placeholder">
      <div class="placeholder-icon">✦</div>
      <div>
        <span class="section-label">SELECT A LOCATION</span>
        <h2>Choose a numbered point on the map</h2>
        <p>The information about the selected art tradition will appear here.</p>
      </div>
    </div>
  `;
});

window.addEventListener("resize", () => map.invalidateSize());
