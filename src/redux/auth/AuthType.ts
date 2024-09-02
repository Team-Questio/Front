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

export interface AuthStateForm {
  accessToken: string;
  refreshToken: string;
  authLoading: boolean;
  error: any;
}
