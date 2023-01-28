import { axiosInstance } from '../../axiosConfig';

type RequestLoginQueryKey = {
  queryKey: ['login', { googleCredential: CredentialResponse | null }];
};

type RequestLoginResponse = {
  refreshToken: string;
  needFtOAuth: boolean;
};

const LOGIN_EP = 'auth/login';

export const requestLogin = async ({ queryKey }: RequestLoginQueryKey) => {
  // eslint-disable-next-line
  const [_key, { googleCredential }] = queryKey;

  const response = await axiosInstance.post<RequestLoginResponse>(
    LOGIN_EP,
    googleCredential
  );

  return response.data;
};
