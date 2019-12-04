const paytm = require('paytm-nodejs')
 
const config = {
    MID : 'bPdqef86135815495874', // Get this from Paytm console
    KEY : 'P4h0OGPNnNit1E4C', // Get this from Paytm console
    ENV : 'dev', // 'dev' for development, 'prod' for production
    CHANNEL_ID : 'WAP',
    INDUSTRY : 'Retail',  
    WEBSITE : 'Default',
    CALLBACK_URL : 'http://localhost:3000/paytm/webhook',  // webhook url for verifying payment
}
 
// Webhook controller function
exports.webhook = function(req,res){ 
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Success Page</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<div>Payment Done!</div>')
    res.write('<a href="http://localhost:3001/">Go to homepage</a>')
    res.write('</body>');
    res.write('</html>');
    paytm.validate(config,req.body,function(err,data){
        if(err){
            // handle err
        }
        // if(data){
        //     if(data.status == 'verified'){
        //         // mark payment done in your db
        //         console.log(data)
        //     }
        // }
    })
 
}