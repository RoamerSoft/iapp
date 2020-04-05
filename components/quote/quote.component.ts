import {Component, OnInit} from '@angular/core';
import {QuoteService} from '../../services/quote/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  // Quote object to show in view.
  public quote;
  Quote;

  constructor(
    private quoteService: QuoteService
  ) {
  }

  ngOnInit() {
    this.getQuote();
  }

  /**
   * Set this.quote with a new quote from the QuoteService.
   */
  public getQuote(): void {
    this.quote = this.quoteService.getQuote();
  }

}
