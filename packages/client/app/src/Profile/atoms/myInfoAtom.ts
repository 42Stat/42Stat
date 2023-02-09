import { atom } from 'jotai';
import { ResponseUserSummary } from '../api/requestUserSummary';

export const myInfoAtom = atom<ResponseUserSummary | null>(null);
