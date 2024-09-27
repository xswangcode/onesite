
fetch("https://0729.9p47q.com/v.php?category=hot&viewtype=basic&page=1", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "Cookie":"CLIPSHARE=qg8is1tvije15ugn1e44pfjqt2; __utma=263323725.423823789.1727419521.1727419521.1727419521.1; __utmb=263323725.0.10.1727419521; __utmc=263323725; __utmz=263323725.1727419521.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); cf_clearance=Fc6VqFErbmhdFLGHJ1Ki1GsZmlnf4O5d8OxBhbqaO2A-1727419703-1.2.1.1-QxMva3Vbe9vVIr_Q8T_7CawJVZsmJsr1XIcDTnYu4vHH5Dw96dV6Z_HrB6ObGNhtazV7GdZfXtAdtDnzVu8Nu0mWvLjUdSWy3DSEcHhvvsJdf3MwUTYta4YHs9FX7hQj2UffaEa34Da6cboIlAeRB5LjBcGSZ42p9tcyZgsdeccPll0BcMThzaNCdJc9ofnDsav_M76zq2iCcFYgNTYaeatZb8r9upRO5E.Tp9kMSR.qFzTSsXT4PIkg1n.yRcNtpNCAyRkiEU1qFOtiGQ7PpNfcIjOWXgrgrDg_7hHxhMz99XX4dhv4eg2U8axDpk.DCmcMqvRkXLWTCWjpztdiJnAFXBagafVik1ryHXPRHUoQVRxIgRQl7Opsfk7qQYZT"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(res=>{
      return res.text()
  }).then(text=>{
    console.log(text)
    
  })
  .catch(err=>{
      console.error(err)
  })
  