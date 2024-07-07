import HomePage from './components/HomePage';
import PortfolioUploadPageText from './components/PortfolioUploadPage';
import QuestionListPage from './components/QuestionListPage';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/portfolio-upload-text" element={<PortfolioUploadPageText/>} />
        {/* <Route path="/portfolio-upload-pdf" element={<PortfolioUploadPagePDF/>} /> */}
        <Route path="/question-list" element={<QuestionListPage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>

  );
};

export default App;