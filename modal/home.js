const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const { lookup } = require('geoip-lite');
const moment = require('moment')
const home= {
    trackip:(req, res) => {   

        fs.readFile('view/index.html',null,function(err,data){
            if(err){
                res.send('404 Error')
            }else{
                res.write(data)
            }
            res.end()
        })
    },
    getip: async (req, res, next) => { 
        const cokie = req.headers.cookie
       
        if(!cokie){
            var ip = req.headers['x-forwarded-for']
            var realip =req.headers['true-client-ip']
            var system = req.headers['user-agent']
            if(ip){
                ip = ip.split(',')
                const infoip = lookup(ip[0])

                if(infoip.country =='VN'){
                    res.cookie(`Some`,`Thing...`,{
                        httpOnly: true
                    });
                    let currentDate = new Date();
                    const format = "HH:mm DD/MM/YYYY"
                    let formatedDate = moment(currentDate).add(7, 'hours').format(format);

                    try {  
                        // Initialize the sheet - doc ID is the long id in the sheets URL
                        const doc = new GoogleSpreadsheet('115cMZ7BtEwqGYjD8vvjnX2hD1_pTCQvApu-qObdZn0I');
                
                        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
                        await doc.useServiceAccountAuth({
                            client_email: "track-admin@track-ip-387010.iam.gserviceaccount.com",
                            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOLY4owwziSH4j\nAp++tX7p5htfTyegM8hgjQLwm/OSuGVehVU81XWaFJ74t7j4NR+O3YOJzphcckuX\nQfZQMi5YYvmRMQk3L4jSUYRERiY5u3qxvl4DwFhlPG+kA47b+xbL9s1Iq8yOZPpE\n8NM0z/l6M/eazAc4xF8IeUSZdU99/ZZJjbESrX7wz7o2Az7DTpYEk2YpjUjcY29D\ndQ8nNROCvdk9srRV+QAU3/4lQaT+1hSSlbsULSs61fu389vRLNrliwYqHhldvhzn\nnnkO2QXm75ScGelPU/pt0PiEDNXfuWrG/N7uNDPMZJI/oAfqJ7r1CIY0q89hsgsz\nPDCqmUC/AgMBAAECggEAB3gBtmi7APcyT7Pvasep7oMJgYUmd69q0Zv+qaBADV0X\nGdYZ8QLbaGRrjh9pGLr+xuEvzimI9P2CGDbXJJ0ALhPryX52wH+q0ojA/+veVnsy\nyo/7NOJL8XUtXdxv/grC/JPN1hVPIebSZK0WGHAr+Q2pBMUGVITltvvwek3LGcBO\nf/gvuLb29JwlKQFJtxYWWE8SE2rLowMY8TFoUJp9MtHMWuvDOn9v2z1kBWVMWLQp\nsvVWVdBk3reUJh2u/9QnjlwgWaLyK116lYlTFrDGgiXka6dbK4gAxafNpW8KN44R\n819T4Vs8ixkx/caSbfTxxgRmTzpa7M7kz4fVIAzqGQKBgQDu4fFPgGtEH/yBJdNu\nWJA8pFIu0p7stU3UAA9IksINK3givcodEI/Bj34hYRqS1DV9q+NRN6SSuLTgI4Vp\nsV/dMcJJPw2XSNvBCqVQImY4ty3A5mwoQb/knG/Spoyz/LAtnp5eo2jkXVJwRm6N\nkrYLczM7junY/skIxr1ypjcPGQKBgQDc863x3lBYVJeZ9PUJnLLXdymk77Qxw8jj\npBHGJbo1EWu+Q1NGMTKsjUYHccIHm0OeRkknUhthhnqbZqLulW2wH6J1TCCSp3Mu\npD2WsdFu4XGN6h/X9M/72hUl4smMqSdI6OsxtZLLUcTQwZdvBhs9y45RjOR1s9eL\nF9jjWtpBlwKBgQDdjAUOU66oDvZTHK67fz2+UDO8IzCrnfahcLC8AQghyLfxmI1T\naWG6BYfYE0Pe+xrlA76eO3nRbaaq3abFAHFFJvnmjqjfLv5IScRJzq15WkH/znRu\n3ZPHxWJcPoTuBKOsm5iLcwg8C2UCpf+wI2ncsqnISeINkzcFgbSAGTGlOQKBgB/D\nE9U6HRiliGmEUhlAomDg62afYqrotx8qPbfbQopQZ8mhCf6EIgG2CUQWsUrAohbF\nicySPAdn+oYOWgusBWmVEpiECgaq9Z7V01ivVSj4VYeOCWfU9HUC45lfoZOL2W7c\ntLqfnGuH5KARxEAcg5v9gAbvFwRohuqi0fXU4J0fAoGBAJvMTX0x12JeDu61+lpJ\nThagiX8bAaunu/s/h2nr8Ltaz2HJFmPSoWewjoixo2g7pNBrFhPAft5LRcv+huPi\naxWfnCsiJR+hMHs0kHj+iicI08xCKoDVkaB0cQlEqMOt/DhEj9DTAjJZ205h+mAl\njPxtivkWgDkkPwqr31waN53S\n-----END PRIVATE KEY-----\n",
                        });
                
                        await doc.loadInfo(); // loads document properties and worksheets
                
                        const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
                
                        // append rows
                        await sheet.addRow(
                            {
                                "REAL_IP": realip,
                                "IP_ADDRESS": ip[0],
                                "CITY": infoip.city,
                                "TIMELOG": formatedDate,
                                "SYSTEM":system
                            });
                        next()
                    }
                    catch (e) {
                        console.log(e)
                        next()
                    }
                }else{
                    next()
                }   
            }else{
                next()
            }
        }else{
            next()
        }

    }

}

module.exports = home