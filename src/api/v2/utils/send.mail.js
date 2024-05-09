'use strict'

const nodemailer = require('nodemailer')
const { app: { emailName, emailAppPassword } } = require('~/config/environment.config')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailName,
    pass: emailAppPassword
  }
})

const sendMail = async ({ from, email, subject, text, html }) => {
  return await transporter.sendMail({ from, to: email, subject, text, html })
}

module.exports = sendMail
