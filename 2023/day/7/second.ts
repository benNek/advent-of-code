import getLines from "../../../helpers/readFile";

const lines = await getLines();

type Ranking = Record<string, number>;

const CARD_RANK: Ranking = {
  "2": 1,
  "3": 2,
  "4": 3,
  "5": 4,
  "6": 5,
  "7": 6,
  "8": 7,
  "9": 8,
  T: 9,
  J: 0,
  Q: 11,
  K: 12,
  A: 13,
};

type Hand = {
  cards: string;
  bet: number;
};

type HandWithStrength = {
  cards: string;
  bet: number;
  strength: number;
};

const hands: Hand[] = [];

for (const line of lines) {
  const [cards, bet] = line.split(" ");

  hands.push({
    cards,
    bet: Number.parseInt(bet),
  });
}

let sum = 0;

hands
  .map(calcStrength)
  .sort(comparator)
  .forEach((hand, index) => {
    sum += (index + 1) * hand.bet;
  });
console.log(sum);

function calcStrength(hand: Hand): HandWithStrength {
  const counts: Record<string, number> = {};
  let jokers = 0;
  for (let i = 0; i < hand.cards.length; i++) {
    const card = hand.cards[i];
    if (card === "J") jokers++;
    else if (counts[card]) {
      counts[card]++;
    } else {
      counts[card] = 1;
    }
  }

  const [max = 0, second = 0] = Object.values(counts).sort((a, b) => b - a);
  return {
    ...hand,
    strength: 2 * (max + jokers) + second,
  };
}

function comparator(a: HandWithStrength, b: HandWithStrength) {
  if (a.strength !== b.strength) {
    return a.strength - b.strength;
  }

  for (let i = 0; ; i++) {
    if (a.cards[i] !== b.cards[i]) {
      return CARD_RANK[a.cards[i]] - CARD_RANK[b.cards[i]];
    }
  }
}
