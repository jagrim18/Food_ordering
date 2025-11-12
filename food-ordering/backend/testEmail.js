const sendEmail = require("./utils/sendEmail");

(async () => {
  await sendEmail("jainagrim9854@gmail.com", "Foodify OTP Test", "1234", "Agrim");
})();
