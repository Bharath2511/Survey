const keys = require("../../config/keys");

module.exports = survey => {
  return `<html>
  <body>
  <div style="text-align:center">
  <h3>Input</h3>
  <p>Answer</p>
  <p>${survey.body}</p>
  <div>
    <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
  </div>
  <div>
  <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
 
  </div>
  </div>
  </body>
  </html>`;
};
