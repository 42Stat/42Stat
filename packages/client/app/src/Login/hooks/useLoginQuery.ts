import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { requestLogin } from '../api/requestLogin';
import { googleCredentialAtom } from '../atoms/googleCredentialAtom';
import { needFtOAuthAtom } from '../atoms/needFtOAuthAtom';
import { refreshTokenAtom } from '../atoms/refreshTokenAtom';

export const useLoginQuery = () => {
  const googleCredential = useAtomValue(googleCredentialAtom);
  const setRefreshToken = useSetAtom(refreshTokenAtom);
  const setNeedFtOAuth = useSetAtom(needFtOAuthAtom);
  const loginQuery = useQuery({
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
