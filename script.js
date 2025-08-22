// Datos de los coches
const carData = {
  car1: {
    title: "Mazda 6 Luxury (2015)",
    description: "El más alto de gama, versión full full. Potente motor biturbo con un excelente equipamiento.",
    images: [
      "images/car1/1.webp",
      "images/car1/2.webp",
      "images/car1/3.webp",
      "images/car1/4.webp",
      "images/car1/5.webp",
      "images/car1/6.webp",
      "images/car1/7.webp",
      "images/car1/8.webp",
      "images/car1/9.webp",
      "images/car1/10.webp"
    ],
    specs: [
      { icon: "fas fa-car", label: "Sedán" },
      { icon: "fas fa-cogs", label: "Manual" },
      { icon: "fas fa-tachometer-alt", label: "260,000 km" },
      { icon: "fas fa-oil-can", label: "Diésel" },
      { icon: "fas fa-horse-head", label: "175 CV" },
      { icon: "fas fa-cogs", label: "Biturbo" },
      { icon: "fas fa-calendar-alt", label: "Año 2015" },
      { icon: "fas fa-cogs", label: "Alta gama (Full Full)" }
    ],
    damage: [
      { icon: "fas fa-exclamation-circle", label: "Estado general: Bueno" },
      { icon: "fas fa-air-freshener", label: "Airbags: No activados" },
      { icon: "fas fa-cogs", label: "Motor: Funciona correctamente" },
      { icon: "fas fa-cogs", label: "Caja de cambios: Revisada y operativa" },
      { icon: "fas fa-tire", label: "Llantas: Buen estado" }
    ],
    carCommercial: [
      { repair: "Revisión completa realizada. Se entrega con mantenimiento al día, listo para circular." },
      { price: "9.490 €" },
      { warranty: "1 año de garantía total" },
      { transfer: "Transferencia incluida" },
      { iva: "IVA deducible" }
    ],
  },

  car2: {
    title: "Furgón Trafic Diesel 2021 L2H1 (Caja Larga)",
    description: "Furgón en impecable estado, ideal para transporte de mercancías o vehículos. Motor potente y bajo kilometraje.",
    images: [
      "images/car2/1.webp",
      "images/car2/2.webp",
      "images/car2/3.webp",
      "images/car2/4.webp",
      "images/car2/5.webp",
      "images/car2/6.webp",
      "images/car2/7.webp",
      "images/car2/8.webp",
      "images/car2/9.webp",
      "images/car2/10.webp"
    ],
    specs: [
      { icon: "fas fa-truck", label: "Furgón" },
      { icon: "fas fa-cogs", label: "Manual" },
      { icon: "fas fa-tachometer-alt", label: "56,000 km" },
      { icon: "fas fa-oil-can", label: "Diésel" },
      { icon: "fas fa-horse-head", label: "120 CV" },
      { icon: "fas fa-calendar-alt", label: "Año 2021" },
      { icon: "fas fa-cogs", label: "Caja Larga" }
    ],
    damage: [
      { icon: "fas fa-exclamation-circle", label: "Estado general: Impecable" },
      { icon: "fas fa-cogs", label: "Motor: Funciona correctamente" },
      { icon: "fas fa-cogs", label: "Caja de cambios: Revisada y operativa" },
      { icon: "fas fa-tire", label: "Llantas: Buen estado" }
    ],
    carCommercial: [
      { repair: "Revisión completa realizada. Listo para circular." },
      { price: "24.000 €" },
      { warranty: "1 año de garantía total" },
      { transfer: "Transferencia incluida" },
      { iva: "IVA deducible" }
    ],
  }
};

// Obtener parámetros de la URL
const params = new URLSearchParams(window.location.search);
const carId = params.get("car");
const car = carData[carId];

function loadCarDetails() {
  if (!car) return console.error("El coche no existe o el parámetro no es válido.");

  const mainImg = document.getElementById("carImage");
  mainImg.src = car.images[0]; // Imagen principal al cargar la página

  document.getElementById("carTitle").textContent = car.title;
  document.getElementById("carDescription").textContent = car.description;

  // Especificaciones
  const specsList = document.getElementById("carSpecs");
  specsList.innerHTML = "";
  car.specs.forEach(spec => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="${spec.icon} mr-2"></i> ${spec.label}`;
    specsList.appendChild(li);
  });

  // Estado / Revisiones
  const damageList = document.getElementById("repairDetails");
  damageList.innerHTML = "";
  car.damage.forEach(d => {
    const p = document.createElement("p");
    p.innerHTML = `<i class="${d.icon} mr-2"></i> ${d.label}`;
    damageList.appendChild(p);
  });

  // Miniaturas (hasta 10 imágenes)
  const thumbs = document.getElementById("thumbnails");
  thumbs.innerHTML = ""; // Limpiar miniaturas existentes

  // Usar flexbox para alinear las miniaturas en 2 filas
  thumbs.style.display = 'flex';
  thumbs.style.flexWrap = 'wrap';  // Asegurarse de que se dividan en varias filas
  thumbs.style.gap = '8px';  // Espacio entre las miniaturas

  car.images.forEach((img, index) => {
    const thumb = document.createElement("img");
    thumb.src = img;
    thumb.alt = car.title;
    thumb.className = "w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer border transition duration-200";

    // Cambiar imagen principal al hacer clic
    thumb.addEventListener("click", () => {
      mainImg.src = img;

      // Eliminar el borde verde de todas las miniaturas
      document.querySelectorAll("#thumbnails img").forEach(i => {
        i.classList.remove("border-green-500", "border-2");
      });

      // Añadir el borde verde a la miniatura seleccionada
      thumb.classList.add("border-green-500", "border-2");
    });

    thumbs.appendChild(thumb);

    // Añadir clase activa a la primera miniatura
    if (index === 0) {
      thumb.classList.add("border-green-500", "border-2");
    }
  });

  // Info comercial
  const commercialList = document.getElementById("carCommercial");
  commercialList.innerHTML = "";
  car.carCommercial.forEach(item => {
    for (const key in item) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${item[key]}`;
      commercialList.appendChild(li);
    }
  });

  // Botón back
  document.getElementById("backButton").addEventListener("click", () => {
    window.history.back();
  });
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", loadCarDetails);
