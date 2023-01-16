import { axiosInstance } from '../../axiosConfig';

export interface RequestLoginQueryKey {
  queryKey: [string, { googleCredential: CredentialResponse | null }];
}

export interface RequestLoginResponse {
  refreshToken: string;
  needFtOAuth: boolean;
}

export const requestLogin = async ({ queryKey }: RequestLoginQueryKey) => {
  const [_key, { googleCredential }] = queryKey;

  const response = await axiosInstance.post<RequestLoginResponse>(
    'login',
    googleCredential
  );

  return response.data;
};