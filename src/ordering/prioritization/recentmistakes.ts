import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {
  /**
   * Computes the most recent mistake's time stamp for a card and helps in
   * determining the sequence of cards in the next iteration, based on the
   * rules that those answered incorrectly in the last round appear first.
   *
   * @param cardStatus The {@link CardStatus} object with failing
   * @return The most recent incorrect response time stamp
   */
    function mostRecentMistake (cardStatus: CardStatus): boolean {
      const results = cardStatus.getResults()
      if(results.length === 0)
        return false;
      return results[results.length - 1];
    }
  return {
    /**
     * Orders the cards by the time of most recent incorrect answers provided for them.
     *
     * @param cards The {@link CardStatus} objects to order.
     * @return The ordered cards.
     */
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const c = cards.slice();
      c.sort((a, b) =>
      {
        const aMistake = mostRecentMistake(a) ? 1 : 0;
        const bMistake = mostRecentMistake(b) ? 1 : 0;
        return aMistake - bMistake;
      });
      return c;
    }
  }
};

export { newRecentMistakesFirstSorter }
