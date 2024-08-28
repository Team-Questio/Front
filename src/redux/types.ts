export interface QuestionForm {
  questId: number;
  question: string;
  feedback?: number;
}

export interface PortfolioForm {
  portfolioId: number;
  content: string;
}

export interface PortfolioDataForm {
  portfolio: PortfolioForm;
  quests: QuestionForm[];
}

export interface PortfolioStateForm {
  portfolio: PortfolioDataForm[];
  selectedPortfolioIndex: number | null;
  loading: boolean;
  error: any;
}
