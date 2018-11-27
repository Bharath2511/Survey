const sendgrid = require("sendgrid");
const helper = sendgrid.mail;

const keys = require("../config/keys");

//class called mailer extending mail classprovided inside the sendgrid library
//it takes in many objects and spits out one
class Mailer extends helper.Mail {}

module.exports = Mailer;
