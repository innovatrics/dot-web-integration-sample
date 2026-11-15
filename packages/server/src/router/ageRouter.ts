import path from 'node:path';
import { Router } from 'express';
import { appLogger } from '../logger.ts';
import { postAgeFeedbackResolver } from '../resolvers/postAgeFeedbackResolver.ts';
import { registerFaceResolver } from '../resolvers/registerFaceResolver.ts';
import { asyncHandler } from './asyncHandler.ts';
import { ageFeedbackBody, parseBody, registerFaceBody } from './requestBodies.ts';

const ageRouter = Router();

const tmpDir = path.join(process.cwd(), 'tmp', 'face-uploads');

ageRouter.post(
  '/registerFace',
  asyncHandler(async (req, res) => {
    const { image } = parseBody(registerFaceBody, req.body);
    const response = await registerFaceResolver(image, tmpDir);

    res.status(200).send(response);
  }),
);

ageRouter.post(
  '/ageFeedback',
  asyncHandler(async (req, res) => {
    const { age, id: sessionId } = parseBody(ageFeedbackBody, req.body);
    appLogger.info(`Posting age feedback with age ${age} and sessionId ${sessionId}`);

    const response = await postAgeFeedbackResolver(sessionId, tmpDir, age);

    res.status(200).send(response);
  }),
);

export default ageRouter;
