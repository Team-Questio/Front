import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";

// useDispatch를 사용할 때 Thunk가 적용된 dispatch 타입을 사용하도록 설정
export const useAppDispatch: () => AppDispatch = useDispatch;
