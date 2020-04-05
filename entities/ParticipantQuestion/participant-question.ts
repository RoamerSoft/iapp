export class ParticipantQuestion {
  public name: string;
  public role: string;
  public question: string;
  public timeStamp: number;

  /**
   * Constructor, timestamp will be added automatically.
   * @param name - Name of the participant.
   * @param role - Role/function of the participant.
   * @param question - The question asked by the participant.
   */
  constructor(name: string, role: string, question: string) {
    this.name = name;
    this.role = role;
    this.question = question;
    this.timeStamp = Date.now();
  }

}
