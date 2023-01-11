import { rest } from 'msw';

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    ctx.status(200);
    return res(ctx.json(true));
  }),
];
