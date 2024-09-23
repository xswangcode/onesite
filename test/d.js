
fetch(" https://0729.9p47q.com/view_video.php?viewkey=275da9ced9eb9d78bac4&page=2&c=ugiyb&viewtype=basic&category=top", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "cookie": "userId=admin; password=MTIzNDU2",
      "Referer": "http://192.168.0.23:5123/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  }).then(res=>{
      return res.text()
  }).then(text=>{
    console.log(text)
    
  })
  .catch(err=>{
      console.error(err)
  })
  