// Storage bucket names and their allowed MIME types
export const BUCKETS = {
  PITCH_DECKS: 'pitch-decks',
  LP_VIDEOS: 'lp-videos',
  DEAL_MEMOS: 'deal-memos',
  TERM_SHEETS: 'term-sheets',
  DUE_DILIGENCE: 'due-diligence',
  PORTFOLIO_SUMMARIES: 'portfolio-summaries',
};

export const SUBMISSION_TYPES = {
  pitch_deck: {
    bucket: BUCKETS.PITCH_DECKS,
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
    ],
    maxSizeBytes: 50 * 1024 * 1024, // 50 MB
    pathway: 'startup',
    label: 'Pitch Deck',
  },
  lp_video: {
    bucket: BUCKETS.LP_VIDEOS,
    allowedMimeTypes: ['video/mp4', 'video/quicktime', 'video/mov'],
    maxSizeBytes: 2 * 1024 * 1024 * 1024, // 2 GB
    pathway: 'vc',
    label: 'LP Pitch Video',
  },
  deal_memo: {
    bucket: BUCKETS.DEAL_MEMOS,
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxSizeBytes: 20 * 1024 * 1024, // 20 MB
    pathway: 'vc',
    label: 'Deal Memo',
    requiresCompanyName: true,
  },
  term_sheet: {
    bucket: BUCKETS.TERM_SHEETS,
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxSizeBytes: 20 * 1024 * 1024,
    pathway: 'vc',
    label: 'Term Sheet',
    requiresCompanyName: true,
  },
  due_diligence: {
    bucket: BUCKETS.DUE_DILIGENCE,
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxSizeBytes: 20 * 1024 * 1024,
    pathway: 'vc',
    label: 'Due Diligence Notes',
    requiresCompanyName: true,
  },
  portfolio_summary: {
    bucket: BUCKETS.PORTFOLIO_SUMMARIES,
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxSizeBytes: 50 * 1024 * 1024,
    pathway: 'vc',
    label: 'Portfolio Summary',
  },
};

// Build storage file path: {team_id}/{timestamp}_{sanitized_filename}
export function buildStoragePath(teamId, originalFilename) {
  const timestamp = Date.now();
  const safe = originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `${teamId}/${timestamp}_${safe}`;
}
