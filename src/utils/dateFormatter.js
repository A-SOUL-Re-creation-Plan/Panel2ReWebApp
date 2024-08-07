//时间戳转换方法    date:时间戳数字
function formatDate_ZeroFill(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + "/";
  var MM =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "/";
  var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hh =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var mm =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + " " + hh + mm + ss;
}
function formatDateCN_DateOnly(date){
  var date = new Date(date);
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
}
export { formatDateCN_DateOnly }
export default formatDate_ZeroFill