import { axiosInstance } from '../../axiosConfig';

type RequestLoginKey = {
  queryKey: ['login', { googleCredential: CredentialResponse | null }];
};

type ResponseLogin = {
  refreshToken: string;
  needFtOAuth: boolean;
};

const LOGIN_EP = 'auth/login';

export const requestLogin = async ({ queryKey }: RequestLoginKey) => {
  // eslint-disable-next-line
  const [_key, { googleCredential }] = queryKey;

  const response = await axiosInstance.post<ResponseLogin>(
    LOGIN_EP,
    googleCredential
  );

  return response.data;
};
