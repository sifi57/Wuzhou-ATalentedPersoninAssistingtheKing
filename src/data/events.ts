export interface GameEventChoice {
  id: string;
  text: string;
  description: string;
  effect: (gameState: any) => void;
  nextEventId?: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  isMainStory: boolean;
  choices: GameEventChoice[];
}

export const EVENTS: Record<string, GameEvent> = {
  // Chapter 1
  'ch1_main_1': {
    id: 'ch1_main_1',
    title: '武后到访周王府',
    description: '670-674年。武后到访周王府，提问《建言十二事》有关事宜。你因文才而得武后青眼。武后向你投来注视，如果你行事不慎，将可能被武后斩杀。',
    isMainStory: true,
    choices: [
      {
        id: 'c1',
        text: '主动表明诚意',
        description: '获得武后信任。获得一张【武皇集团】卡牌。',
        effect: (state) => {
          state.setFlag('trust_wu', true);
        }
      },
      {
        id: 'c2',
        text: '谨言慎行',
        description: '保持中立。获得10点最大生命值。',
        effect: (state) => {
          state.heal(10);
        }
      }
    ]
  },
  'ch1_side_1': {
    id: 'ch1_side_1',
    title: '苏良嗣的教导',
    description: '670-674年。因你主动向武后表明诚意，引起了宰相苏良嗣的注意。他决定暗中考察你的学识。',
    isMainStory: false,
    choices: [
      {
        id: 'c1',
        text: '虚心求教',
        description: '获得一张【科举新贵】卡牌，恢复10点生命。',
        effect: (state) => {
          state.heal(10);
        }
      }
    ]
  },
  'ch1_main_2': {
    id: 'ch1_main_2',
    title: '自荐参加制举',
    description: '674年。你决定自荐参加制举，凭借文词和治国才能，你被破格招入翰林院成为待诏。',
    isMainStory: true,
    choices: [
      {
        id: 'c1',
        text: '入仕',
        description: '正式踏入朝堂。获得50资材。',
        effect: (state) => {
          state.addGold(50);
        }
      }
    ]
  },

  // Chapter 2
  'ch2_main_1': {
    id: 'ch2_main_1',
    title: '李敬业叛乱',
    description: '684年。李敬业、骆宾王等人在扬州起兵造反。武则天询问你的意见，派谁去平叛？',
    isMainStory: true,
    choices: [
      {
        id: 'c1',
        text: '推举李孝逸',
        description: '让李唐宗室去打李唐宗室。获得一张【李唐旧臣】卡牌。',
        effect: (state) => {
          state.setFlag('rebel_suppressed', true);
        }
      },
      {
        id: 'c2',
        text: '亲自随军出征',
        description: '充当军师。进入一场精英战斗。',
        effect: (state) => {
          state.startBattle(true, false);
        }
      }
    ]
  },
  'ch2_side_1': {
    id: 'ch2_side_1',
    title: '骆宾王讨武曌檄',
    description: '徐敬业在扬州起兵，骆宾王撰写《为徐敬业讨武曌檄》，天下震动。武后读后叹道：“宰相之过也。”',
    isMainStory: false,
    choices: [
      {
        id: 'c1',
        text: '暗中资助',
        description: '失去30金币，获得一张【江南士族】卡牌。',
        effect: (state) => {
          state.loseGold(30);
        }
      }
    ]
  },

  // Chapter 3
  'ch3_main_1': {
    id: 'ch3_main_1',
    title: '神龙政变',
    description: '704-705年。二张贪污，武则天想保全二张，把自己放到了大臣的对立面。张柬之等人密谋发动政变。你看到卧榻之上满头白发的武则天，失声痛哭。',
    isMainStory: true,
    choices: [
      {
        id: 'c1',
        text: '帮助张柬之联络',
        description: '联络李唐皇室与臣子。获得一张【李唐旧臣】卡牌。',
        effect: (state) => {
          state.setFlag('shenlong_coup', true);
        }
      },
      {
        id: 'c2',
        text: '暗中通知武后',
        description: '武后大势已去，但你保全了旧主情谊。失去20点生命，获得一张强力【武皇集团】卡牌。',
        effect: (state) => {
          state.takeDamage(20);
        }
      }
    ]
  },
  'ch3_side_1': {
    id: 'ch3_side_1',
    title: '请君入瓮',
    description: '有人告发酷吏周兴谋反，来俊臣奉命审理。来俊臣问周兴：“囚犯如果不肯认罪，该怎么办？”周兴说：“拿个大瓮，四周烧满炭火，把囚犯装进去，什么事不承认？”',
    isMainStory: false,
    choices: [
      {
        id: 'c1',
        text: '旁观',
        description: '获得一张【关陇集团】卡牌。',
        effect: (state) => {}
      },
      {
        id: 'c2',
        text: '干预',
        description: '失去10点生命，获得50资材。',
        effect: (state) => {
          state.takeDamage(10);
          state.addGold(50);
        }
      }
    ]
  },

  // Chapter 4
  'ch4_main_1': {
    id: 'ch4_main_1',
    title: '夫人外交',
    description: '705年。韦皇后、上官婉儿与武三思把持朝政，百官纷纷巴结。唐中宗清洗功臣，激起愤怒。',
    isMainStory: true,
    choices: [
      {
        id: 'c1',
        text: '左右逢源',
        description: '暗中结交各方势力。获得一张【韦氏外戚】卡牌。',
        effect: (state) => {
          state.setFlag('wei_diplomacy', true);
        }
      },
      {
        id: 'c2',
        text: '表达不满',
        description: '遭到打压，失去15点生命。',
        effect: (state) => {
          state.takeDamage(15);
        }
      }
    ]
  },

  // Chapter 5
  'ch5_main_1': {
    id: 'ch5_main_1',
    title: '唐隆政变',
    description: '710年。唐中宗暴毙，韦后临朝。李隆基与太平公主联手诛杀韦氏。上官婉儿用草拟的遗诏哀求李隆基，凄婉动人。',
    isMainStory: true,
    choices: [
      {
        id: 'c1',
        text: '冷眼旁观',
        description: '上官婉儿被斩。李隆基势力大增。获得一张【隆基党】卡牌。',
        effect: (state) => {
          state.setFlag('shangguan_dead', true);
        }
      },
      {
        id: 'c2',
        text: '为上官婉儿求情',
        description: '“主上，要不再等等……上官氏文才斐然出众，身为女子，更是难得一见。”获得一张【太平公主党】卡牌。',
        effect: (state) => {
          state.setFlag('shangguan_saved', true);
        }
      }
    ]
  },

  // Chapter 6
  'ch6_main_1': {
    id: 'ch6_main_1',
    title: '先天政变',
    description: '713年。太平公主散布谣言“太子不当立”，李旦登位后打压李隆基。双方势同水火。',
    isMainStory: true,
    choices: [
      {
        id: 'c1',
        text: '帮助李隆基反击',
        description: '支开太平公主，让太子李隆基监国。进入最终决战（李隆基线）。',
        effect: (state) => {
          state.setFlag('route_longji', true);
        }
      },
      {
        id: 'c2',
        text: '协助太平公主',
        description: '拥立太平公主。进入最终决战（太平线）。',
        effect: (state) => {
          state.setFlag('route_taiping', true);
        }
      }
    ]
  }
};
