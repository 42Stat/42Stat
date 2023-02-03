import { atom } from 'jotai';
import { RequestUserSummaryResponse } from '../api/requestUserSummary';

export const myInfoAtom = atom<RequestUserSummaryResponse | null>(null);
