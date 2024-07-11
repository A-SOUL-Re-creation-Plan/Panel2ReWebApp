import { formatDateCN_DateOnly } from '@/utils/dateFormatter'
function IntroGen(info) {
    let date = formatDateCN_DateOnly(info.startStr)
    let ext = info.extendedProps;
    let title_i = info.title;
    let summary = ext.live_title;
    let owner = ext.live_owner;
    let TuanBoKeyword = ["夜谈", "小剧场", "游戏室"];
    let isTuanBo = false;
    let title = "";
    let space_lr = "";
    TuanBoKeyword.forEach((element)=>{
        if (title_i.includes(element)) {
          title = "A-SOUL";
          isTuanBo = true;
        }
    })
    if(title===''){
        title = owner;
    }
    if(isTuanBo){
        space_lr = `贝拉kira
直播间：https://live.bilibili.com/22632424/
个人主页：https://space.bilibili.com/672353429/

嘉然今天吃什么
直播间：https://live.bilibili.com/22637261/
个人主页：https://space.bilibili.com/672328094/

乃琳Queen
直播间：https://live.bilibili.com/22625027/
个人主页：https://space.bilibili.com/672342685/`;
    }else{
        let owner_full = ext.live_owner_full
        space_lr = `${owner_full}\n直播间：${info.url}\n个人主页：https://space.bilibili.com/${ext.live_owner_space}`;
        if ('partner' in ext) {
            let partner = ext.partner;
            title += '&' + partner.partner_short
            space_lr += `\n\n${partner.partner_full}\n直播间：https://live.bilibili.com/${partner.partner_liveroom}\n个人主页：https://space.bilibili.com/${partner.partner_space}`;
        }
    }
    let r_0 = `直播日期：${date}\n`;
    let r_1 = `${title}【${summary}】\n`;
    let r_2 = '--------------------------------------------------------\n';
    let r_3 = space_lr;
    let r = r_0 + r_1 + r_2 + r_3;
    return r
}
export default IntroGen;
