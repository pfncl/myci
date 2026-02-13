export interface Service {
  title: string;
  price: string;
  popupId: string;
}

export const services: Service[] = [
  {
    title: 'Mytí výloh',
    price: 'od 19 Kč/m2',
    popupId: 'myti-vyloh',
  },
  {
    title: 'Mytí oken',
    price: 'od 25 Kč/m2',
    popupId: 'myti-oken',
  },
  {
    title: 'Výškové práce',
    price: 'od 30 Kč/m2',
    popupId: 'vyskove-prace',
  },
  {
    title: 'Stop pavoukům',
    price: 'od 20 Kč/m2',
    popupId: 'stop-pavoukum',
  },
];
