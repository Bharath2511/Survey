const sendgrid = require("sendgrid");
const helper = sendgrid.mail;

const keys = require("../config/keys");

//class called mailer extending mail classprovided inside the sendgrid library
//it takes in many objects and spits out one
class Mailer extends helper.Mail {
  //subject and recipients are recieved from survey route instance
  constructor({ subject, recipients }, content) {
    //any constructor on mail class is executed by calling super
    super();

    //it return an api object
    this.sgApi = sendgrid(keys.sendGridKey);

    this.from_email = new helper.Email("donotreply@emaily.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    //recipients from the mailer object itself is recipients
    //recipients is array of emails
    this.recipients = this.formatAddresses(recipients);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    //recipients is 19 recipient is helper.email thing
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });

    //on api object we call API method
    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = Mailer;
