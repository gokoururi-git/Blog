function urlParse(url){
  let endOfProtocol = url.indexOf('://');//返回的是原字符串的:的下标
  let startOfDomin = endOfProtocol + 3;//所以这里加3就好
  let endOfDomin = url.slice(endOfProtocol + 3).indexOf('/') + 3 + endOfProtocol;
  let endOfpath = url.indexOf('?');

  let protocol = url.slice(0, endOfProtocol);
  let domin = url.slice(startOfDomin, endOfDomin);
  let path = url.slice(endOfDomin + 1, endOfpath);
  let queryString = url.slice(endOfpath + 1);
  let query = {};
  queryString.split('&').forEach(curr => {
    let split = curr.split('=');
    query[split[0]] = split[1];
  })
  return {protocol, domin, path, query}
}

console.log(urlParse('http://www.domain.com/order?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'));