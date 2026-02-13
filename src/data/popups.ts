export interface PopupData {
  id: string;
  content: string;
  size: 'tiny' | 'large';
}

export const popups: Record<string, PopupData> = {
  'myti-vyloh': {
    id: 'myti-vyloh',
    content: 'Běžné mytí výloh probíhá v pravidelných intervalech, týdně, 2x do měsíce a 1x za měsíc v závislosti na stupni znečistění.<br>Provádíme také jednorázové mytí.',
    size: 'tiny',
  },
  'objednavka-info': {
    id: 'objednavka-info',
    content: 'Obratem Vás kontaktuje hlavní manažer firmy na Vámi uvedený kontakt.',
    size: 'tiny',
  },
  'potvrzeni': {
    id: 'potvrzeni',
    content: 'Přijedeme osobně, využijeme aplikaci street view, zhodnotíme zakázku dle Vašeho popisu.<br>Naceníme požadovanou službu nejnižší možnou cenou při zachování nejvyšší kvality.',
    size: 'tiny',
  },
  'realizace': {
    id: 'realizace',
    content: 'Naši proškolení pracovníci realizovali zakázku v nejlepší možné kvalitě k Vaší plné spokojenosti. Jsme pojištěni pro krytí škody způsobené naší činností.',
    size: 'tiny',
  },
  'spokojeny': {
    id: 'spokojeny',
    content: 'Vedoucí pracovník Vám vystaví příjmový doklad pro hotovou platbu, nebo s Vámi vyplní předávací protokol, na základě kterého Vám bude vystavena faktura se splatností 14 dní. Vaše spokojenost je pro nás samozřejmostí a stojí vždy na prvním místě.',
    size: 'tiny',
  },
  'myti-oken': {
    id: 'myti-oken',
    content: 'Mytí oken probíhá v objektu objednavatele našimi proškolenými pracovníky v nejlepší možné kvalitě. Jsme pojištěni pro krytí škody způsobené naší činností.',
    size: 'tiny',
  },
  'vyskove-prace': {
    id: 'vyskove-prace',
    content: 'Mytí a čištění nepřístupných oken, fasád, výkladních a reklamních ploch, které probíhá v objektu objednavatele našimi proškolenými pracovníky v nejlepší možné kvalitě.',
    size: 'tiny',
  },
  'stop-pavoukum': {
    id: 'stop-pavoukum',
    content: 'Práce probíhá ve dvou fázích:<br>Tou první je pečlivé mechanické odstranění všech následků přítomnosti pavouků na Vašem obchodě/domě. Následuje aplikace hubícího prostředku, která zajistí beznávratné odstranění na dobu minimálně osmi týdnů. Po aplikaci zajistíme umytí prosklených ploch.',
    size: 'tiny',
  },
};
