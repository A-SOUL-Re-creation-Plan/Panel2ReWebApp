import { formatDateCN_DateOnly } from "@/utils/dateFormatter";

// 整体逻辑变动不大
// 极域老师写的太狠了不敢改😰

const LiveRoomListDict: string[] = ["向晚","贝拉","嘉然","乃琳","A-SOUL"]
const LiveTypeDict: string[] = ["贝拉单播","嘉然单播","乃琳单播","嘉然&贝拉双播","乃琳&贝拉双播","嘉然&乃琳双播","A-SOUL夜谈","A-SOUL小剧场","A-SOUL游戏室","其他","向晚单播","向晚&贝拉双播","向晚&乃琳双播","嘉然&向晚双播",]

const LiveDesp_Ava = "\n向晚大魔王\n直播间：https://live.bilibili.com/22625025/\n个人主页：https://space.bilibili.com/672346917/";
const LiveDesp_Bella = "\n贝拉kira\n直播间：https://live.bilibili.com/22632424/\n个人主页：https://space.bilibili.com/672353429/";
const LiveDesp_Diana = "\n嘉然今天吃什么\n直播间：https://live.bilibili.com/22637261/\n个人主页：https://space.bilibili.com/672328094/";
const LiveDesp_Eileen = "\n乃琳Queen\n直播间：https://live.bilibili.com/22625027/\n个人主页：https://space.bilibili.com/672342685/";
const LiveDespList = [LiveDesp_Ava, LiveDesp_Bella, LiveDesp_Diana, LiveDesp_Eileen];

const LiveRoomList = (member: number) => {
    switch (member) {
      case 0:
        return "https://live.bilibili.com/22625025/";
      case 1:
        return "https://live.bilibili.com/22632424/";
      case 2:
        return "https://live.bilibili.com/22637261/";
      case 3:
        return "https://live.bilibili.com/22625027/";
      default:
        return "https://live.bilibili.com/22632157/";
    }
};

interface Schedule {
    live_type: string;
    live_title: string;
    date: Date;
}

const ASOUL_InfoDict = (mem : number) => {
    switch(mem){
        case 0x1: return "向晚";
        case 0x2: return "贝拉";
        case 0x4: return "嘉然";
        case 0x8: return "乃琳";

        case 0x3: return "向晚&贝拉";
        case 0x5: return "嘉然&向晚";
        case 0x9: return "向晚&乃琳";
        case 0x6: return "嘉然&贝拉";
        case 0xA: return "乃琳&贝拉";
        case 0xC: return "嘉然&乃琳";

        case 0x10: return "A-SOUL夜谈";
        case 0x20: return "A-SOUL小剧场";
        case 0x30: return "A-SOUL游戏室";

        default: return "A-SOUL";
    }
}

function ParseLiveMember(summary: string) : number {
    let mem = 0;
    if (summary.includes("夜谈")) mem |= 0x1;
    else if (summary.includes("小剧场")) mem |= 0x2;
    else if (summary.includes("游戏室")) mem |= 0x3;
    mem <<= 4;
    if (summary.includes("向晚")) mem |= 0x1;
    if (summary.includes("贝拉")) mem |= 0x2;
    if (summary.includes("嘉然")) mem |= 0x4;
    if (summary.includes("乃琳")) mem |= 0x8;
    return mem;
}

const introGen = (info: Schedule)=>{
    // 晚晚😭
    let all_mem = 0xE;
    let intro = "";
    // 1. 拼接时间
    intro += `直播日期：${formatDateCN_DateOnly(info.date)}\n`;
    // 2. 直播信息
    let live_info = ParseLiveMember(info.live_type)
    intro += ASOUL_InfoDict(live_info) + `【${info.live_title}】\n`;
    if ((live_info & 0xF) == 0) live_info |= all_mem;
    intro += "--------------------------------------------------------";
    // 3. 成员信息
    for (const item of LiveDespList){
        if ((live_info & 1) != 0) { intro += item; intro += "\n"; }
        live_info >>>= 1;
    }
    // 4. 去尾巴输出
    return intro.trimEnd().substring(0, intro.length - 1);
}

export { introGen, LiveRoomList, LiveRoomListDict, LiveTypeDict };