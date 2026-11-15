import type { Request, Response } from 'express';

import { Router } from 'express';

const readinessRouter = Router();

// Static on purpose: probing DIS would tie readiness to DIS's external Auth0 tenant (SAIDVU-1009).
readinessRouter.use((_: Request, res: Response) => {
  res.status(200).json({ ready: true });
});

export default readinessRouter;
