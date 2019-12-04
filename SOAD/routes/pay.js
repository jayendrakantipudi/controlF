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
 
// your create payment controller function
exports.pay = function(req,res){ 
 
    let data = {
        TXN_AMOUNT : req.body.total_cost, // request amount
        ORDER_ID : req.body.order_id, // any unique order id 
        CUST_ID : req.body.user_id // any unique customer id		
    }
    // let data = {
    //     TXN_AMOUNT : 1200,
    //     ORDER_ID :"od12",
    //     CUST_ID :  "cu12"
    // }
 
    // create Paytm Payment
    paytm.createPayment(config,data,function(err,data){
        if(err){
            // handle err
        }
 
        //success will return
 
        /*{ 
            MID: '###################',
            WEBSITE: 'DEFAULT',
            CHANNEL_ID: 'WAP',
            ORDER_ID: '#########',
            CUST_ID: '#########',
            TXN_AMOUNT: '##',
            CALLBACK_URL: 'localhost:3000/paytm/webhook',
            INDUSTRY_TYPE_ID: 'Retail',
            url: 'https://securegw-stage.paytm.in/order/process',
            checksum: '####################################' 
        }*/
 
        //store the url and checksum
        let url = data.url;
        let checksum = data.checksum;
 
        // delete it from data object
        delete data.url;
        delete data.checksum;
 
        /* Prepare HTML Form and Submit to Paytm */
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Merchant Checkout Page</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<center><h1>Please do not refresh this page...</h1></center>');
        res.write('<form method="post" action="' + url + '" name="paytm_form">');
        for(var x in data){
            res.write('<input type="hidden" name="' + x + '" value="' + data[x] + '">');
        }
        res.write('<input type="hidden" name="CHECKSUMHASH" value="' + checksum + '">');
        res.write('</form>');
        res.write('<script type="text/javascript">');
        res.write('document.paytm_form.submit();');
        res.write('</script>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    });
}