import api from "./api"; // API 유틸리티
import { toast } from "react-toastify";

// 피드백 전송 API 호출
export const sendServiceFeedback = async (feedback: string) => {
  try {
    await api.post("/feedback", JSON.stringify({ feedback }));
  } catch (error) {
    toast.error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
    throw error; // 호출한 컴포넌트에서 추가 처리를 할 수 있도록 오류를 throw
  }
};
