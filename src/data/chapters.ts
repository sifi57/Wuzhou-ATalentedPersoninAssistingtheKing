export interface Chapter {
  id: string;
  name: string;
  description: string;
  bossName: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    name: '第一章：潜龙勿用',
    description: '670-684年。深恩尽。我亦飘零久，十年来，深恩负尽，死生师友。',
    bossName: '裴炎'
  },
  {
    id: 'ch2',
    name: '第二章：废唐建周',
    description: '684-690年。负萧心。沉思十五年中事，才也纵横，泪也纵横，双负萧心与剑名。',
    bossName: '徐敬业'
  },
  {
    id: 'ch3',
    name: '第三章：神龙政变',
    description: '690-705年。远山长。君臣一梦，今古空名。但远山长，云山乱，晓山青。',
    bossName: '张易之、张昌宗'
  },
  {
    id: 'ch4',
    name: '第四章：景龙政变',
    description: '705-707年。中宗复位，韦后专权，太子李重俊发难。',
    bossName: '武三思'
  },
  {
    id: 'ch5',
    name: '第五章：唐隆政变',
    description: '707-710年。中宗暴毙，韦后临朝。李隆基与太平公主联手诛杀韦氏。',
    bossName: '韦皇后'
  },
  {
    id: 'ch6',
    name: '第六章：先天政变',
    description: '710-713年。睿宗传位，太平公主与李隆基的最终决战。',
    bossName: '太平公主'
  }
];
