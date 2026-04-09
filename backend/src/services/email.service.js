import { env } from '../config/env.js';

let resendClient = null;

async function getClient() {
  if (!env.resendApiKey) return null;
  if (!resendClient) {
    const { Resend } = await import('resend');
    resendClient = new Resend(env.resendApiKey);
  }
  return resendClient;
}

const FROM_ADDRESS = 'Lobo VC Cup <noreply@lobovccup.unm.edu>';

export async function sendRegistrationConfirmation({ toEmail, teamName, pathway }) {
  const client = await getClient();
  if (!client) {
    console.log(`[Email disabled] Registration confirmation would be sent to ${toEmail}`);
    return;
  }

  const pathwayLabel = pathway === 'vc' ? 'VC Track' : 'Founder Track';

  await client.emails.send({
    from: FROM_ADDRESS,
    to: toEmail,
    subject: `You're registered for Lobo VC Cup 2026 — ${teamName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0a0f1e;">You're in! 🎉</h1>
        <p>Your team <strong>${teamName}</strong> is officially registered for the <strong>Lobo VC Cup 2026</strong> as a ${pathwayLabel} participant.</p>
        <h2>What's next?</h2>
        <ul>
          <li><strong>Education Week:</strong> March 2–6 (Virtual). Watch for Zoom links.</li>
          <li><strong>Pitch Prep Week:</strong> March 9–12 (Virtual).</li>
          <li><strong>Submission Deadline:</strong> March 13, 11:59 PM.</li>
          <li><strong>Discovery Days:</strong> March 25–26, MCM 1010, 5–7 PM.</li>
        </ul>
        <p>Log back in at <a href="${env.frontendUrl}/pages/submissions.html">lobovccup.unm.edu</a> to upload your materials before the deadline.</p>
        <p>Questions? Email <a href="mailto:delcampo@unm.edu">delcampo@unm.edu</a> or <a href="mailto:agajjo@unm.edu">agajjo@unm.edu</a>.</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Lobo VC Cup | Anderson School of Management, University of New Mexico</p>
      </div>
    `,
  });
}

export async function sendSubmissionConfirmation({ toEmail, teamName, submissionType }) {
  const client = await getClient();
  if (!client) {
    console.log(`[Email disabled] Submission confirmation would be sent to ${toEmail}`);
    return;
  }

  await client.emails.send({
    from: FROM_ADDRESS,
    to: toEmail,
    subject: `Submission received — ${submissionType} | Lobo VC Cup 2026`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0a0f1e;">Submission Received</h1>
        <p>We've received your <strong>${submissionType}</strong> for team <strong>${teamName}</strong>.</p>
        <p>You can re-upload before the deadline if needed. Log in at <a href="${env.frontendUrl}/pages/submissions.html">lobovccup.unm.edu</a>.</p>
        <p><strong>Deadline:</strong> March 13, 11:59 PM Mountain Time</p>
        <hr />
        <p style="font-size: 12px; color: #666;">Lobo VC Cup | Anderson School of Management, University of New Mexico</p>
      </div>
    `,
  });
}
