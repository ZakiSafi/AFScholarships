"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digestTemplate = digestTemplate;
function digestTemplate(params) {
    const subject = 'Your AfScholarships weekly digest';
    const rows = params.items
        .map((item) => `<li style="margin-bottom:8px;"><a href="${item.url}">${item.title}</a> — deadline ${item.deadlineAt}</li>`)
        .join('');
    const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #4338ca;">Weekly scholarship digest</h2>
      <p>Hi ${params.userName || 'there'}, here are upcoming deadlines from your saved scholarships:</p>
      <ul>${rows}</ul>
      <p style="color:#64748b;font-size:14px;">Manage reminders in your AfScholarships dashboard.</p>
    </div>
  `;
    const text = params.items
        .map((item) => `${item.title} — ${item.deadlineAt} — ${item.url}`)
        .join('\n');
    return { subject, html, text: `Weekly digest:\n${text}` };
}
//# sourceMappingURL=digest.template.js.map