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
  remainToUpload: number;
  selectedPortfolioIndex: number | null;
  isFetchingPortfolio: boolean;
  isAddingPortfolio: boolean;
  isUpdatingFeedback: boolean;
  error: any;
}
