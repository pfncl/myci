export interface Step {
  title: string;
  subtitle: string;
  image: string;
  popupId: string;
}

export const steps: Step[] = [
  {
    title: 'Špinavé sklo',
    subtitle: 'čistíte prosklené plochy nebo výlohy v Praze?',
    image: '/images/krok1-2.png',
    popupId: 'myti-vyloh',
  },
  {
    title: 'Objednávka',
    subtitle: 'zavolám nebo odešlu objednávkový formulář',
    image: '/images/krok2.png',
    popupId: 'objednavka-info',
  },
  {
    title: 'Potvrzení nabídky',
    subtitle: 'potvrdím cenovou nabídku a termín',
    image: '/images/krok3-1.png',
    popupId: 'potvrzeni',
  },
  {
    title: 'Realizace',
    subtitle: 'komfortní čištění ploch dle objednávky, předání',
    image: '/images/krok4-1.png',
    popupId: 'realizace',
  },
  {
    title: 'Jsem spokojený',
    subtitle: 'platba na místě nebo bankovním převodem',
    image: '/images/krok5-3.png',
    popupId: 'spokojeny',
  },
];
