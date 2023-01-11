import { rest } from 'msw';

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
