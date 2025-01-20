import type { TrustFactorDefinition } from '../types/restRequestTypes';

export const baseTrustFactorDefinitions: Array<TrustFactorDefinition> = [
  {
    name: 'video_injection',
    type: 'BOOLEAN',
    booleanConfiguration: 'REJECT_IF_TRUE',
  },
  {
    name: 'document_liveness',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.01,
    },
  },
  {
    name: 'document_not_expired',
    type: 'BOOLEAN',
    booleanConfiguration: 'REJECT_IF_FALSE',
  },
  {
    name: 'mrz_checksum_valid',
    type: 'BOOLEAN',
    booleanConfiguration: 'REJECT_IF_FALSE',
  },
  {
    name: 'document_face_match',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.325,
      reviewLow: 0.35,
    },
  },
  {
    name: 'age_validation',
    type: 'SCORE',
    scoreConfiguration: {
      rejectHigh: 20,
      reviewHigh: 15,
    },
  },
];

export const magnifeyeLivenessTrustFactorDefinitions: Array<TrustFactorDefinition> = [
  {
    name: 'magnifeye_liveness',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.82,
    },
  },
  {
    name: 'magnifeye_liveness_similarity_thr',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.6,
    },
  },
];

export const smileLivenessTrustFactorDefinitions: Array<TrustFactorDefinition> = [
  {
    name: 'smile_liveness',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.8,
      reviewLow: 0.84,
    },
  },
  {
    name: 'smile_liveness_matching_thr',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.6,
    },
  },
  {
    name: 'smile_liveness_expression_neutral_thr',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.5,
    },
  },
  {
    name: 'smile_liveness_expression_smile_thr',
    type: 'SCORE',
    scoreConfiguration: {
      rejectHigh: 0.5,
    },
  },
  {
    name: 'smile_liveness_expression_difference_thr',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.2,
    },
  },
];

export const passiveLivenessTrustFactorDefinitions: Array<TrustFactorDefinition> = [
  {
    name: 'passive_liveness',
    type: 'SCORE',
    scoreConfiguration: {
      rejectLow: 0.8,
      reviewLow: 0.84,
    },
  },
];
