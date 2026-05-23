export function reminderTemplate(params: {
  scholarshipTitle: string
  deadlineAt: string
  scholarshipUrl: string
}) {
  const subject = `Reminder: ${params.scholarshipTitle} deadline approaching`
  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #4338ca;">Scholarship deadline reminder</h2>
      <p><strong>${params.scholarshipTitle}</strong> has an upcoming deadline on <strong>${params.deadlineAt}</strong>.</p>
      <p><a href="${params.scholarshipUrl}" style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;">View scholarship</a></p>
      <p style="color:#64748b;font-size:14px;">You set this reminder on AfScholarships.</p>
    </div>
  `
  const text = `Reminder: ${params.scholarshipTitle} deadline ${params.deadlineAt}. ${params.scholarshipUrl}`

  return { subject, html, text }
}
