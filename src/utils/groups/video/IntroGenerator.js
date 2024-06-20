import formatDate from "@/utils/dateFormatter";
function IntroGen(info){
    let e = info.extendedProps;
    let r = "";
    if(e.live_type==0){
        r = e.live_room
    }else{
        r = 'A-SOUL'
    }
    let t = e.pure_title;
    let t_ = new Date(info.start.getTime() - 8 * 60000 * 60);
    let d = t_.getFullYear()+"年"+(t_.getMonth()+1)+"月"+t_.getDate()+"日";
    let f = e.fullname;
    let s = e.space;
    let a = `直播日期：${d}\n${r}【${t}】\n--------------------------------------------------------\n${f}\n直播间：${info.url}/\n个人主页：https://space.bilibili.com/${s}/`;
    // todo
    // 团播双播简介模板
    return a;
}
export default IntroGen