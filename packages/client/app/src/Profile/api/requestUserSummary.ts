import { axiosInstance } from '../../axiosConfig';

type RequestUserSummaryKey = {
  queryKey: ['user', 'summary', string];
};

export type CoalitionType = {
  id: number;
  name: string;
  imageUrl: string;
  color: string;
};

// todo: fix to ResponseUserSummary
/**
 * startedAt, blackholedAt: DateTime (2023-01-27T13:43:07.167Z)
 */
export type ResponseUserSummary = {
  id: number;
  imageUrl: string;
  login: string;
  name: string;
  rank: number;
  level: number;
  grade: string;
  coalition: CoalitionType;
  startedAt: string;
  daysSinceStarted: number;
  blackholedAt: string;
  daysUntilBlackholed: number;
};

// todo: fix api to users/:id/summary
const USER_SUMMARY_EP = (id: string) => `/users/${id}/profile`;

export const requestUserSummary = async ({
  queryKey,
}: RequestUserSummaryKey) => {
  // eslint-disable-next-line
  const [_user, _summary, id] = queryKey;

  const response = await axiosInstance.get<ResponseUserSummary>(
    USER_SUMMARY_EP(id)
  );

  return response.data;
};
