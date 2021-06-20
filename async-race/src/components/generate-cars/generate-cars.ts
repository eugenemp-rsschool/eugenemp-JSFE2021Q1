const carBrands = ['Ford', 'BMW', 'Chrysler', 'Volkswagen', 'Open', 'Renault', 'Citroen', 'Tesla', 'Dodge', 'Honda'];
const CarModels = ['Fusiom', '7-series', '300C', 'Phaeton', 'Insignia', 'Megane', 'C4', 'Model X', 'Magnum', 'Civic'];

function generateName(): string {
  const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const model = CarModels[Math.floor(Math.random() * CarModels.length)];

  return `${brand} ${model}`;
}

function generateColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function generateCars(count: number): { name: string, color: string }[] {
  const cars = [];

  for (let i = 0; i < count; i += 1) {
    cars.push({ name: generateName(), color: generateColor() });
  }
  return cars;
}

export default generateCars;
