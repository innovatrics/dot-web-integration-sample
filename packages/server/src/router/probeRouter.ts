import type { Request, Response } from 'express';

import { Router } from 'express';

const probeRouter = Router();

probeRouter.use((_: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

export default probeRouter;
