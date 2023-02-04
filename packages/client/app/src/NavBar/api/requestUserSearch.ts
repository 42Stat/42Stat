import { axiosInstance } from '../../axiosConfig';

export type UserSearchParam = {
  login: string;
  page?: number;
};

type RequestUserSearchKey = {
  queryKey: ['user', 'search', UserSearchParam];
};

export type UserSearchResult = {
  id: number;
  // todo: could be null at backend
  imageUrl: string;
  login: string;
};

export type ResponseUserSearch = UserSearchResult[];

const USER_SEARCH_EP = (login: string, page?: number) =>
  `/users/search?login=${login}${page ? '&page=' + page.toString() : ''}`;

export const requestUserSearch = async ({ queryKey }: RequestUserSearchKey) => {
  // eslint-disable-next-line
  const [_user, _search, { login, page }] = queryKey;

  const response = await axiosInstance.get<ResponseUserSearch>(
    USER_SEARCH_EP(login, page)
  );

  return response.data;
};
