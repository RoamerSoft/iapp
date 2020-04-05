import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {MultipleChoiceQuestionComponent} from './multiple-choice-question/multiple-choice-question.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {QuoteComponent} from './quote/quote.component';
import {ParticipantQuestionComponent} from './participant-question/participant-question.component';
import {FormsModule} from '@angular/forms';
import {AnswerFeedbackComponent} from './answer-feedback/answer-feedback.component';


@NgModule({
  declarations: [
    MultipleChoiceQuestionComponent,
    ProgressBarComponent,
    QuoteComponent,
    ParticipantQuestionComponent,
    AnswerFeedbackComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    MultipleChoiceQuestionComponent,
    ProgressBarComponent,
    QuoteComponent,
    ParticipantQuestionComponent,
    AnswerFeedbackComponent
  ],
})
export class ComponentsModule {
}
