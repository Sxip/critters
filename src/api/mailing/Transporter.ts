import { MAILING_CACHE, MAILING_HOST, MAILING_PASSWORD, MAILING_PORT, MAILING_SECURE, MAILING_USERNAME } from '@config/Env'
import { createTransport } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'
import * as path from 'path'
import EmailTemplates from 'swig-email-templates'

export interface ITemplate {
  html?: string
  text?: string
  subject?: string
}

/**
 * Templates.
 * 
 * @constant
 */
const templates = new EmailTemplates({
  root: path.join(__dirname, '.', 'templates'),
  cache: MAILING_CACHE,
})

/**
 * Mail transporter.
 * 
 * @constant
 */
const transporter = createTransport({
  host: MAILING_HOST,
  port: MAILING_PORT,
  secure: MAILING_SECURE,
  auth: {
    user: MAILING_USERNAME,
    pass: MAILING_PASSWORD,
  },
})

/**
 * Sends a new email.
 * 
 * @param mailOptions 
 * @public
 */
export function sendMail (mailOptions: MailOptions): Promise<void> {
  return Promise.resolve(transporter.sendMail(mailOptions))
}

/**
 * Renders a new template.
 * 
 * @param name 
 * @param context 
 * @public
 */
export function renderTemplate (name: string, context?: any): Promise<ITemplate> {
  return new Promise<ITemplate>((resolve, reject) => templates.render(`${name}.html`, context,
    (error: Error, html?: string, text?: string, subject?: string) => {
      if (error) reject(error)
      else resolve({ html, text, subject })
    })
  )
}
