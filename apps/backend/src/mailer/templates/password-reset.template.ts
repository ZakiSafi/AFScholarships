export function passwordResetTemplate(resetUrl: string) {
  const subject = 'Reset your AfScholarships password'
  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color: #4338ca;">Reset your password</h2>
      <p>You requested a password reset for your AfScholarships account.</p>
      <p><a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;">Reset password</a></p>
      <p style="color:#64748b;font-size:14px;">This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
    </div>
  `
  const text = `Reset your AfScholarships password: ${resetUrl}`

  return { subject, html, text }
}
