import { rest } from 'msw';

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    const response = {
      refreshToken: 'generated refresh token',
      needFtOAuth: true,
    };

    return res(
      ctx.body(JSON.stringify(response)),
      ctx.cookie('access_token', 'generated')
    );
  }),

  rest.get('/profile', async (req, res, ctx) => {
    return res(ctx.status(403));
  }),
  rest.post('/refresh', async (req, res, ctx) => {
    const refreshToken = await req.json();

    if (refreshToken) {
      return res(ctx.cookie('42auth', 'done'));
    }

    return res(ctx.status(401));
  }),
];
