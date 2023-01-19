import { rest } from 'msw';

export const handlers = [
  rest.get('/profile', async (req, res, ctx) => {
    return res(ctx.status(403));
  }),
];
