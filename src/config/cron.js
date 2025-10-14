import cron from "cron";
import https from "https"
import { CronJob } from "cron";
 

const job = new cron.CronJob("*/14 * * * *", function(){
    https
    .get(process.env.API_URL,(req)=> {
        if(res.statusCode === 200){ console.log("get request send successfuly");}
        else console.log("get request filde",res.statusCode);

    })
    .on("error",(e)=> console.error("error whille send request",e));
});

export default job;
