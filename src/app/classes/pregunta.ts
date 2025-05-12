// src/app/modelos/pregunta.ts
export class Pregunta {
  question!: { text: string };
  correctAnswer!: string;
  incorrectAnswers!: string[];
  opciones!: string[];

  constructor(data: any) {
    this.question = data.question;
    this.correctAnswer = data.correctAnswer;
    this.incorrectAnswers = data.incorrectAnswers;
    this.opciones = this.mezclar([
      data.correctAnswer,
      ...data.incorrectAnswers,
    ]);
  }

  private mezclar(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
