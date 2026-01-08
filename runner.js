const cypress = require('cypress');
const nodemailer = require('nodemailer');

// 1. Configure your Email Service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'qamukesh01@gmail.com',
    pass: 'octd oslj zrjd uuzz' // Not your login password, a Google App Password
  }
});

// 2. Run Cypress via Node API
cypress.run({
  spec: './cypress/e2e/plugintest.cy.js',
  headed: true,  // This forces the browser to run in headed mode
  browser: 'chrome'
}).then((results) => {
  const status = results.totalFailed > 0 ? 'FAILED' : 'PASSED';
  const color = status === 'PASSED' ? '✅' : '❌';

  const mailOptions = {
    from: 'qamukesh01@gmail.com',
    to: 'qamihir@gmail.com', //contact+testqa5@premio.io,
    subject: `${color} Mukesh K.(Coupon X) Cypress Test Result: ${status}`,
    text: `The Coupon X Automation test has finished.\n\nResult: ${status}\nTotal Tests: ${results.totalTests}\nPassed: ${results.totalPassed}\nFailed: ${results.totalFailed}\nDuration: ${results.totalDuration / 1000} seconds.`
  };

  // 3. Send the Email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}).catch((err) => {
  console.error(err);
});