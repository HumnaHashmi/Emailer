const nodemailer = require('nodemailer');
const fs = require('fs');
const csv = require('csv-parser');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'angela@360xpertsolutions.com',
    pass: 'Humna@123'
  }
});

// Function to send emails
function sendEmail(to, subject, html) {
  const mailOptions = {
    from: 'Angela Marte <angela@360xpertsolutions.com>', // Include sender's name
    to: to, // Include recipient's name and email address
    subject: subject,

    html: html
  };

   transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


// Read HTML email template file
fs.readFile('email.html', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading HTML template file:', err);
    return;
  }
  const htmlTemplate = data;



// Read CSV file
fs.createReadStream('Lead3.csv') // Update the file name as per your CSV file
  .pipe(csv())
  .on('data', (row) => {
    const email = row.email; // Assuming email addresses are in the 'email' column
    console.log('Processing email:', email); // Add this line to log the email being processed

    //customized html template with dynamic
    const customizedHtml=htmlTemplate
    .replace('{{name}}',row.First_Name)
    // .replace('{{base64Image}}',base64Image); // Insert base64 image data

    // console.log(base64Image)


        // Send email with custom HTML template
        sendEmail(sendEmail(email, 'Is Your Website Turning Patients Away? (Free Analysis Inside)', customizedHtml));
        

  }
  )

    
  .on('end', () => {
    console.log('CSV file successfully processed');
  })
  .on('error', (error) => {
    console.error(error);
  });
});