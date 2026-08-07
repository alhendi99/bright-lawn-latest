import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { BUSINESS_EMAIL } from '@/lib/seo'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(1).max(40),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(1).max(5000),
})

function sanitize(value: string) {
  return value
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
    }

    const payload = await request.json()
    const parsed = contactSchema.safeParse(payload)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid contact form submission.' }, { status: 400 })
    }

    const data = {
      name: sanitize(parsed.data.name),
      email: sanitize(parsed.data.email),
      phone: sanitize(parsed.data.phone),
      service: sanitize(parsed.data.service),
      message: sanitize(parsed.data.message),
    }

    const resend = new Resend(apiKey)
    const html = `
      <h2>New contact form message</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Selected service:</strong> ${escapeHtml(data.service)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
    `

    const { error } = await resend.emails.send({
      from: 'Bright Lawn <onboarding@resend.dev>',
      to: [BUSINESS_EMAIL],
      subject: `New contact form message from ${data.name}`,
      replyTo: data.email,
      html,
      text: [
        'New contact form message',
        '',
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Selected service: ${data.service}`,
        '',
        'Message:',
        data.message,
      ].join('\n'),
    })

    if (error) {
      return NextResponse.json({ error: 'Unable to send contact message.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to process contact message.' }, { status: 500 })
  }
}
