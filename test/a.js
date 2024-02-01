// const cheerio = require('cheerio');
const FileUtils = require('../server/utils/FileUtils');

let content = FileUtils.ReadFromFile("./out.txt")
// const $ = cheerio.load(content)
// $('a').each((index, element) => { console.log($(element).attr('href')) })

const encoder = new TextEncoder();
const string = "要转换为二进制的字符串";
const binaryArray = encoder.encode(string);
FileUtils.WriteFileWithBin("./test.txt",binaryArray)
