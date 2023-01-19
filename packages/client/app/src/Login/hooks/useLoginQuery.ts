import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { googleCredentialAtom } from '../atoms/googleCredentialAtom';
import { AxiosError } from 'axios';
import {
  requestLogin,
  RequestLoginQueryKey,
  RequestLoginResponse,
} from '../api/requestLogin';
import { refreshTokenAtom } from '../atoms/refreshTokenAtom';
import { needFtOAuthAtom } from '../atoms/needFtOAuthAtom';

export const useLoginQuery = () => {
  const googleCredential = useAtomValue(googleCredentialAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setNeedFtOAuth = useSetAtom(needFtOAuthAtom);
  const loginQuery = useQuery<
    RequestLoginResponse,
    AxiosError,
    RequestLoginResponse,
    RequestLoginQueryKey['queryKey']
  >({
    queryKey: ['login', { googleCredential }],
    queryFn: requestLogin,
    // todo: check here
    cacheTime: 0,
    enabled: !!googleCredential,
    refetchOnWindowFocus: false,
    // todo: dev config
    retry: import.meta.env.DEV === true ? 3 : false,
    onSuccess: (data) => {
      setRefreshToken(data.refreshToken);
      setNeedFtOAuth(data.needFtOAuth);
    },
  });

  return loginQuery;
};
