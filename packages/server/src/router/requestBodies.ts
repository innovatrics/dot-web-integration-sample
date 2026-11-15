import type { FaceDetectionProperties } from '@innovatrics/dis-client-sdk';
import { z } from 'zod';
import { RequestValidationError } from '../errors/index.ts';
import { appLogger } from '../logger.ts';
import { Liveness, Source } from '../types/index.ts';

const MAX_PLAUSIBLE_AGE = 150;

const nonEmptyString = z.string().min(1);
const optionalString = nonEmptyString.nullish().transform((value) => value ?? undefined);
const optionalBoolean = z
  .boolean()
  .nullish()
  .transform((value) => value ?? undefined);
const plainObject = (value: unknown) => typeof value === 'object' && value !== null && !Array.isArray(value);

const dimensions = z
  .object({ height: z.number().int().positive().optional(), width: z.number().int().positive().optional() })
  .optional();
const livenessType = z.enum(Liveness);
const imageLink = z.object({ dimensions, link: nonEmptyString }).optional();
const documentFields = {
  customerApiLink: optionalString,
  documentAdvice: z.record(z.string(), z.unknown()).optional(),
  isDocumentCreated: z.boolean(),
  sources: z.array(z.enum(Source)).optional(),
};

export const registerFaceBody = z.object({ image: z.base64().min(1) });

export const ageFeedbackBody = z.object({
  age: z.number().int().min(1).max(MAX_PLAUSIBLE_AGE),
  id: z.uuid(),
});

export const normalizedImagesBody = z.object({
  dimensions,
  pages: z.object({ back: optionalString, front: optionalString, unknown: optionalString }),
});

export const croppedImagesBody = z.object({
  imageLinks: z.object({ fingerprint: imageLink, ghostPortrait: imageLink, portrait: imageLink, signature: imageLink }),
});

export const documentPageContentBody = z.object({ ...documentFields, content: nonEmptyString });

export const documentPageImageBody = z.object({ ...documentFields, image: nonEmptyString, pageType: optionalString });

export const selfieBody = z
  .object({ image: optionalString, selfieLink: optionalString })
  .refine(({ image, selfieLink }) => Boolean(image) !== Boolean(selfieLink));

export const livenessRecordsBody = z.object({ content: nonEmptyString, isLivenessCreated: optionalBoolean });

export const livenessChallengeBody = z.object({ isLivenessCreated: optionalBoolean, type: livenessType });

export const livenessEvaluationBody = z.object({ type: livenessType });

export const trustEvaluationBody = z.object({ livenessType });

export const faceBody = z.object({
  detection: z.custom<FaceDetectionProperties>(plainObject).optional(),
  image: nonEmptyString,
});

export const cropBody = z.object({ dimensions });

export const parseBody = <T extends z.ZodType>(schema: T, body: unknown): z.output<T> => {
  const result = schema.safeParse(body);

  if (!result.success) {
    appLogger.info('Rejected request body', { fields: result.error.issues.map((issue) => issue.path.join('.')) });

    throw new RequestValidationError();
  }

  return result.data;
};
