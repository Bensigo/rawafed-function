const nodeMailer = require("nodemailer");

async function sendMessage(email, message, title) {
  try {
    let transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PWD
      }
    });
    const send = await transporter.sendMail({
      from: '"Rawafed School"<' + email + ">",
      to: process.env.EMAIL,
      subject: title + " <CONTACT US FORM>",
      html: `
        <p>${message}</p>
      `
    });
    if (send) {
      console.log("message sent successfully");
      return { status: 200, msg: "sent successufly" };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, msg: "faliled to send" };
  }
}

exports.handler = async function(event, context, callback) {
  const { email, title, message } = JSON.parse(event.body);
  console.log(email, title, message);
  const res = await sendMessage(email, message, title);
  if (res) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(res)
    });
  }
};
