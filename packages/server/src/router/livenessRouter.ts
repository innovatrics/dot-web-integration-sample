import type { Request, Response } from 'express';

import { Router } from 'express';
import { appLogger } from '../logger.ts';

const probeRouter = Router();

probeRouter.use((_: Request, res: Response) => {
  res.status(200).json({ ok: true });
  appLogger.info('Health endpoint served!');
});

export default probeRouter;
