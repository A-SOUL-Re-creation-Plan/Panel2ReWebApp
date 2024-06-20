import formatDate from "@/utils/dateFormatter";
function IntroGen(info){
    let e = info.extendedProps;
    let r = "";
    if(e.live_type==0){
        r = e.live_room;
    }else if(e.live_type==3){
        r = e.live_room + '&' + e.partner.shortName;
    }else{
        r = 'A-SOUL';
    }
    let t = e.pure_title;
    let t_ = new Date(info.start.getTime() - 8 * 60000 * 60);
    let d = t_.getFullYear()+"年"+(t_.getMonth()+1)+"月"+t_.getDate()+"日";
    let a = `直播日期：${d}\n${r}【${t}】\n--------------------------------------------------------\n`;
    if(e.live_type==1){
        a += `贝拉kira
直播间：https://live.bilibili.com/22632424/
个人主页：https://space.bilibili.com/672353429/

嘉然今天吃什么
直播间：https://live.bilibili.com/22637261/
个人主页：https://space.bilibili.com/672328094/

乃琳Queen
直播间：https://live.bilibili.com/22625027/
个人主页：https://space.bilibili.com/672342685/`;
    }else{
        let f = e.fullname;
        let s = e.space;
        a += `${f}\n直播间：${info.url}/\n个人主页：https://space.bilibili.com/${s}/`;
        if(e.live_type==3){
            let q = e.partner.fullname;
            let x = e.partner.space;
            let r = e.partner.liveRoom;
            a += `\n\n${q}\n直播间：https://live.bilibili.com/${r}/\n个人主页：https://space.bilibili.com/${x}/`;
        }
    }
    return a;
}
export default IntroGen