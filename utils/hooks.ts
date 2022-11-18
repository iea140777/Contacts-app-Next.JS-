import { useRouter } from "next/router";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../store/store";

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function useServerRefresher(): () => void {
  const router = useRouter();

  return () => router.replace(router.asPath);
}

export { useAppDispatch, useAppSelector, useServerRefresher };
