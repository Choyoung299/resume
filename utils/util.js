// 获取页面url参数
function getPrame() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var options = currentPage.options;
  return options
}

//时间戳自定义转格式
function formatTime(timestamp, format) {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
  }
  let returnArr = [];
  let date = new Date(timestamp);
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  returnArr.push(year, month, day, hour, minute, second);
  returnArr = returnArr.map(formatNumber);
  for (var i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

// 时间函数，获取x天后日期，无参数则输出当天
function getFutureDay(num) {
  if(!num){
      num=0
  }
  let time = new Date().getTime() + 60 * 60 * 1000 * 24 * num;
  time = new Date(time).toISOString().split('T')[0];
  return time;
}

// 生成随机字母数字混合码
function getRandomCode(length) {
  if (length > 0) {
      var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      var nums = "";
      for (var i = 0; i < length; i++) {
          var r = parseInt(Math.random() * 61);
          nums += data[r];
      }
      return nums;
  } else {
      return false;
  }
}

function checkParam(param, type) {
  let output;
  const obj = {
      // phone: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,//根据工信部公布的手机号要求
      // phone: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, //手机号,1开头、11位
      phone: /^[0-9]{11}$/, //手机号,1开头、11位
      id: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证正则,15位、18位、18位最后结尾为x
      sms: /^\d{6}$/, //验证码正则,六位数字
      password: /^[a-zA-Z0-9_-]{6,20}$/, //密码、交易密码正则,字母数字下划线减号、6-20位
      money: /(^[1-9]([0-9]+)?(\.[0-9]{1,4})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9]){0,3}$)/, //数字正则,支持正数、正数小数点后四位,不支持负数
      bank: /^[1-9]\d{9,29}$/, //银行卡号正则,
      // postcode: /^[1-9]\d{9,29}$/,//邮编正则,严格按照邮编规则
      postcode: /^[0-9]{6}$/, //邮编正则,六位数字即可
      wechat: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/, //微信号，6-20位，字母开头，字母，数字，下划线
      email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, //邮箱正则
      number: /^\d{1,}$/, //纯数字，正整数，不支持小数、负数
  };
  switch (type) {
      case 'phone':
          output = obj.phone.test(param);
          break;
      case 'id':
          output = obj.id.test(param);
          break;
      case 'sms':
          output = obj.sms.test(param);
          break;
      case 'password':
          output = obj.password.test(param);
          break;
      case 'money':
          output = obj.money.test(param);
          break;
      case 'bank':
          output = obj.bank.test(param);
          break;
      case 'postcode':
          output = obj.postcode.test(param);
          break;
      case 'wechat':
          output = obj.wechat.test(param);
          break;
      case 'email':
          output = obj.email.test(param);
          break;
      case 'number':
          output = obj.number.test(param);
          break;
  }
  return output
}


module.exports = {
  formatTime: formatTime,
  getPrame: getPrame,
  getRandomCode: getRandomCode,
  checkParam: checkParam,
  getFutureDay:getFutureDay
}