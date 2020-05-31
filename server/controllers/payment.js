const insta = require('instamojo-nodejs');
insta.setKeys(
  'test_37fc40662264cf832e6183cd83a',
  'test_d697f273fc2190d2c32ab622151'
);

exports.makePayment = (req, res) => {
  const data = new insta.PaymentData();
  insta.isSandboxMode(true);
  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.send_email = false;
  data.send_sms = false;
  data.allow_repeated_payments = false;
  data.webhooks = 'http://www.example.com/webhook/';

  insta.createPayment(data, (err, response) => {
    if (err) throw err;
    console.log(response);
    const resposeData = JSON.parse(response);
    const redirectUrl = resposeData.payment_request.longurl;
    console.log(redirectUrl);

    return res.json(redirectUrl);
  });
};
