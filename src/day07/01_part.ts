/*

Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.

If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.

So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card).

To play Camel Cards, you are given a list of hands and their corresponding bid (your puzzle input). For example:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
This example shows five hands; each hand is followed by its bid amount. Each hand wins an amount equal to its bid multiplied by its rank, where the weakest hand gets rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand. Because there are five hands in this example, the strongest hand will have rank 5 and its bid will be multiplied by 5.

So, the first step is to put the hands in order of strength:

32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
Now, you can determine the total winnings of this set of hands by adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.

Find the rank of every hand in your set. What are the total winnings?

*/
enum CombinedWinningCards {
  FiveOfAkind = 7,
  FourOfAkind = 6,
  FullHouse = 5,
  ThreeOfAkind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1,
}

function getCardStrength(card: string): number {
  const cards = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  return cards[card];
}

interface CardPair {
  cards: string;
  bid: number;
}

function getCardBids(args: string[]): CardPair[] {
  return args.map((el) => {
    const split = el.split(" ");
    return {
      cards: split[0],
      bid: +split[1],
    };
  });
}

interface Bid {
  bid: number;
  hand: string;
}

interface FiveOfAkindPair extends Bid {
  type: CombinedWinningCards.FiveOfAkind;
}

interface FourOfAkindPair extends Bid {
  type: CombinedWinningCards.FourOfAkind;
}

interface FullHousePair extends Bid {
  type: CombinedWinningCards.FullHouse;
}

interface ThreeOfAkindPair extends Bid {
  type: CombinedWinningCards.ThreeOfAkind;
}

interface TwoPairs extends Bid {
  type: CombinedWinningCards.TwoPair;
}

interface OnePair extends Bid {
  type: CombinedWinningCards.OnePair;
}

interface HighCards extends Bid {
  type: CombinedWinningCards.HighCard;
}

type All =
  | FiveOfAkindPair
  | FourOfAkindPair
  | FullHousePair
  | ThreeOfAkindPair
  | TwoPairs
  | OnePair
  | HighCards;

function getCardsCount(cardPair: CardPair) {
  const map = new Map<string, number>();
  cardPair.cards.split("").forEach((card) => {
    if (map.get(card)) {
      const times = map.get(card);
      map.set(card, times + 1);
    } else {
      map.set(card, 1);
    }
  });
  return map;
}

function getWinningType(cardPair: CardPair) {
  const mapCardsCount = getCardsCount(cardPair);

  let threeOfAkindCounter = 0;
  let pairsCounter = 0;

  for (const [_card, cardTimes] of mapCardsCount) {
    if (cardTimes === 5) {
      return CombinedWinningCards.FiveOfAkind;
    } else if (cardTimes === 4) {
      return CombinedWinningCards.FourOfAkind;
    } else if (cardTimes === 3) {
      threeOfAkindCounter++;
    } else if (cardTimes === 2) {
      pairsCounter++;
    } else if (cardTimes === 1 && mapCardsCount.size === 5) {
      return CombinedWinningCards.HighCard;
    }
  }

  const isFullHouse = threeOfAkindCounter === 1 && pairsCounter === 1;

  if (isFullHouse) {
    return CombinedWinningCards.FullHouse;
  }

  if (threeOfAkindCounter === 1) {
    return CombinedWinningCards.ThreeOfAkind;
  }

  if (pairsCounter === 2) {
    return CombinedWinningCards.TwoPair;
  }

  if (pairsCounter === 1) {
    return CombinedWinningCards.OnePair;
  }

  return CombinedWinningCards.HighCard;
}

function getHandStrength(cardPair: CardPair): All {
  const winningType = getWinningType(cardPair);

  return {
    type: winningType,
    bid: cardPair.bid,
    hand: cardPair.cards,
  };
}

function compareCardHandsStrengths(card1: string, card2: string) {
  for (let i = 0; i < card1.length; i++) {
    const card1strength = getCardStrength(card1[i]);
    const card2strength = getCardStrength(card2[i]);
    if (card1strength > card2strength) {
      return 1;
    } else if (card2strength > card1strength) {
      return -1;
    }
  }
  return 0;
}

function sortWinningCombinationArray(allSorted: All[]) {
  allSorted.sort((a, b) => {
    if (a.type === b.type) {
      return compareCardHandsStrengths(a.hand, b.hand);
    }
    return a.type - b.type;
  });
}

function getSum(arr: All[]) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].bid * (i + 1);
  }

  return sum;
}
function main(args: string[]) {
  const cardPairs = getCardBids(args);
  const allResults: All[] = [];
  for (let i = 0; i < cardPairs.length; i++) {
    const result = getHandStrength(cardPairs[i]);
    allResults.push(result);
  }

  sortWinningCombinationArray(allResults);

  const result = getSum(allResults);

  return result;
}

export default main;
