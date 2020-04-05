import {Injectable} from '@angular/core';
import {Quote} from '../../entities/quote/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  // Quotes array.
  public quotes: Quote[];

  // Counter to keep track of the returned quotes.
  public counter = 0;

  constructor() {
    this.addHardCodedQuotesToQuoteArray();
  }

  /**
   * Returns the next quote in the array or the first one when on arrays end.
   */
  public getQuote(): Quote {
    if (this.counter >= this.quotes.length) {
      // Reset counter
      this.counter = 0;
      // Return first quote from array and increase counter with 1.
      return this.quotes[this.counter++];
    } else {
      // Return next quote and increase counter with 1.
      return this.quotes[this.counter++];
    }
  }

  /**
   * Creates two quotes and adds them to the quotes array.
   */
  private addHardCodedQuotesToQuoteArray(): void {
    this.quotes = [
      new Quote('Alles wat meer licht geeft dan jijzelf, moet je uitzetten.', 'Remco Claassen'),
      new Quote('Als het niet kan zoals het moet, moet het maar zoals het kan.', 'Rene Eefting'),
    ];
  }
}
