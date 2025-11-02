// Game State
let gameState = {
    turn: 1,
    maxTurns: 10,
    voterTurnout: 50,
    democracy: 50,
    economy: 50,
    welfare: 50,
    youthInterest: 50,
    eventHistory: [],
    choicesMade: []
};

// Events data structure
const events = [
    {
        id: 'election_low_turnout',
        title: '選挙の日',
        description: '今日は選挙の日です。しかし、若者の投票率は非常に低い状況です。あなたは投票に行きますか？',
        choices: [
            {
                text: '投票に行く（自分の意見を政治に反映させる）',
                effects: { democracy: 5, youthInterest: 10, voterTurnout: 5 }
            },
            {
                text: '投票に行かない（忙しいし、変わらないと思う）',
                effects: { democracy: -10, youthInterest: -5, voterTurnout: -10 }
            },
            {
                text: '白票を投じる（抗議の意思を示す）',
                effects: { democracy: -3, youthInterest: 5, voterTurnout: 3 }
            }
        ]
    },
    {
        id: 'proportional_election',
        title: '比例代表選挙',
        description: '今回の選挙では小選挙区制と比例代表制の両方で投票できます。どの政党・候補者に投票しますか？',
        choices: [
            {
                text: '小選挙区・比例代表の両方で自分の支持する候補・政党に投票',
                effects: { democracy: 8, youthInterest: 12, voterTurnout: 8, welfare: 3 }
            },
            {
                text: '小選挙区のみ投票し、比例代表は棄権する',
                effects: { democracy: 2, youthInterest: 3, voterTurnout: 2, economy: -2 }
            },
            {
                text: '戦略的投票：小選挙区と比例代表で異なる政党を選ぶ',
                effects: { democracy: 6, youthInterest: 8, voterTurnout: 6, economy: 2, welfare: 2 }
            },
            {
                text: '投票に行かない',
                effects: { democracy: -12, youthInterest: -8, voterTurnout: -15, welfare: -5 }
            }
        ]
    },
    {
        id: 'coalition_government',
        title: '連立政権の形成',
        description: '選挙の結果、単独過半数を獲得した政党がなく、連立政権が必要です。若者の意見を反映させるチャンスですが、どう行動しますか？',
        choices: [
            {
                text: 'SNSで若者の声を発信し、連立交渉に影響を与える',
                effects: { democracy: 10, youthInterest: 15, welfare: 5, economy: -2 }
            },
            {
                text: '様子を見守る',
                effects: { democracy: 0, youthInterest: -5, economy: 2 }
            },
            {
                text: '政治に失望して関心を失う',
                effects: { democracy: -8, youthInterest: -12, voterTurnout: -8 }
            }
        ]
    },
    {
        id: 'international_trade',
        title: '国際貿易協定',
        description: '政府が新しい国際貿易協定の締結を検討しています。経済成長が期待される一方、国内産業への影響も懸念されています。',
        choices: [
            {
                text: '賛成の声を上げる（経済成長を優先）',
                effects: { economy: 10, welfare: -5, democracy: 3, youthInterest: 5 }
            },
            {
                text: '反対の声を上げる（国内産業保護を優先）',
                effects: { economy: -5, welfare: 8, democracy: 3, youthInterest: 5 }
            },
            {
                text: '慎重な議論を求める（バランス重視）',
                effects: { economy: 3, welfare: 3, democracy: 8, youthInterest: 8 }
            },
            {
                text: '関心を持たない',
                effects: { democracy: -5, youthInterest: -8, economy: -3 }
            }
        ]
    },
    {
        id: 'global_climate_summit',
        title: '世界気候サミット',
        description: '国際的な気候変動対策会議が開かれます。日本の対応が注目されていますが、経済への影響も考慮する必要があります。',
        choices: [
            {
                text: '積極的な削減目標を支持（環境優先）',
                effects: { welfare: 10, economy: -8, democracy: 5, youthInterest: 12 }
            },
            {
                text: '段階的な目標を支持（バランス重視）',
                effects: { welfare: 5, economy: -2, democracy: 7, youthInterest: 8 }
            },
            {
                text: '経済成長を優先した目標を支持',
                effects: { welfare: -5, economy: 8, democracy: 2, youthInterest: -3 }
            },
            {
                text: '無関心',
                effects: { democracy: -7, youthInterest: -10, welfare: -5 }
            }
        ]
    },
    {
        id: 'social_media_campaign',
        title: 'SNSキャンペーン',
        description: '政治家がSNSで若者向けのキャンペーンを始めました。友達と政治について話す機会が増えています。',
        choices: [
            {
                text: '積極的に参加し、友達と政治について議論する',
                effects: { youthInterest: 15, democracy: 5, voterTurnout: 5 }
            },
            {
                text: 'フェイクニュースに注意しながら慎重に参加',
                effects: { youthInterest: 10, democracy: 8, voterTurnout: 3 }
            },
            {
                text: '興味がないので無視する',
                effects: { youthInterest: -5, democracy: -3 }
            }
        ]
    },
    {
        id: 'economic_crisis',
        title: '経済危機',
        description: '経済が悪化し、若者の雇用が不安定になっています。政府は対策を検討していますが、あなたはどうしますか？',
        choices: [
            {
                text: '政治に声を上げ、若者の雇用対策を求める',
                effects: { democracy: 5, youthInterest: 10, economy: 5, welfare: 3 }
            },
            {
                text: 'スキルアップして自分の市場価値を高める',
                effects: { economy: 8, youthInterest: 3, democracy: 0, welfare: -2 }
            },
            {
                text: '起業支援制度の拡充を求める運動に参加',
                effects: { economy: 6, democracy: 8, youthInterest: 12, welfare: 2 }
            },
            {
                text: '諦めて現状を受け入れる',
                effects: { democracy: -5, youthInterest: -10, economy: -5 }
            }
        ]
    },
    {
        id: 'welfare_reform',
        title: '社会福祉改革',
        description: '政府が社会福祉制度の見直しを発表しました。若者世代への影響が懸念されています。',
        choices: [
            {
                text: 'パブリックコメントを提出し、意見を表明する',
                effects: { welfare: 10, democracy: 5, youthInterest: 5 }
            },
            {
                text: '専門家の意見を学んでから行動する',
                effects: { welfare: 5, democracy: 7, youthInterest: 8, economy: 2 }
            },
            {
                text: '他の若者と協力して署名活動を始める',
                effects: { welfare: 8, democracy: 10, youthInterest: 15, voterTurnout: 5 }
            },
            {
                text: '関心を持たず、成り行きに任せる',
                effects: { welfare: -10, democracy: -5, youthInterest: -5 }
            }
        ]
    },
    {
        id: 'fake_news',
        title: 'フェイクニュース',
        description: 'SNSで政治に関するフェイクニュースが拡散されています。あなたはどう対応しますか？',
        choices: [
            {
                text: '事実を確認し、正しい情報を共有する',
                effects: { democracy: 10, youthInterest: 5 }
            },
            {
                text: 'ファクトチェック団体に報告する',
                effects: { democracy: 12, youthInterest: 8, welfare: 2 }
            },
            {
                text: 'メディアリテラシー講座を友達に勧める',
                effects: { democracy: 8, youthInterest: 12, voterTurnout: 3 }
            },
            {
                text: 'そのまま無視する',
                effects: { democracy: -10, youthInterest: -3 }
            }
        ]
    },
    {
        id: 'local_election',
        title: '地方選挙',
        description: '地元で選挙が行われます。候補者は若者向けの政策を掲げていますが、投票率は低いままです。',
        choices: [
            {
                text: '投票に行き、友達にも呼びかける',
                effects: { voterTurnout: 15, democracy: 5, youthInterest: 10 }
            },
            {
                text: '候補者の政策を比較検討してから投票',
                effects: { voterTurnout: 10, democracy: 10, youthInterest: 12, welfare: 3 }
            },
            {
                text: '期日前投票を利用して早めに投票',
                effects: { voterTurnout: 12, democracy: 7, youthInterest: 8 }
            },
            {
                text: '投票に行かない',
                effects: { voterTurnout: -15, democracy: -10, youthInterest: -5 }
            }
        ]
    },
    {
        id: 'youth_protest',
        title: '若者デモ',
        description: '気候変動や労働問題に対して若者がデモを行っています。参加しますか？',
        choices: [
            {
                text: 'デモに参加し、声を上げる',
                effects: { democracy: 10, youthInterest: 15, voterTurnout: 5 }
            },
            {
                text: 'オンラインで支援を表明する',
                effects: { democracy: 6, youthInterest: 10, voterTurnout: 2 }
            },
            {
                text: 'デモを見守りつつ、別の方法で行動する',
                effects: { democracy: 4, youthInterest: 5, welfare: 3 }
            },
            {
                text: '参加しない',
                effects: { democracy: -5, youthInterest: -5 }
            }
        ]
    },
    {
        id: 'political_scandal',
        title: '政治スキャンダル',
        description: '政治家の汚職が発覚しました。国民の政治不信が高まっています。',
        choices: [
            {
                text: '署名活動に参加し、説明責任を求める',
                effects: { democracy: 5, youthInterest: 5, voterTurnout: 3 }
            },
            {
                text: 'リコール運動を支援する',
                effects: { democracy: 8, youthInterest: 10, voterTurnout: 5, economy: -3 }
            },
            {
                text: '次の選挙で必ず投票することを決意',
                effects: { democracy: 6, voterTurnout: 8, youthInterest: 7 }
            },
            {
                text: 'どうせ変わらないと諦める',
                effects: { democracy: -15, youthInterest: -10, voterTurnout: -10 }
            }
        ]
    },
    {
        id: 'tax_increase',
        title: '増税案',
        description: '政府が増税を検討しています。若者世代への負担が増える可能性があります。',
        choices: [
            {
                text: '反対運動に参加し、代替案を求める',
                effects: { democracy: 5, youthInterest: 10, economy: 5 }
            },
            {
                text: '税の使い道の透明化を求める',
                effects: { democracy: 10, youthInterest: 8, welfare: 5, economy: 2 }
            },
            {
                text: '若者向け減税措置を求める運動に参加',
                effects: { democracy: 7, youthInterest: 12, economy: 3, welfare: -2 }
            },
            {
                text: '受け入れるしかないと諦める',
                effects: { democracy: -5, economy: -10, youthInterest: -5 }
            }
        ]
    },
    {
        id: 'education_reform',
        title: '教育改革',
        description: '教育制度の改革が議論されています。若者の意見を求める場が設けられました。',
        choices: [
            {
                text: '積極的に意見を述べる',
                effects: { democracy: 10, youthInterest: 10, welfare: 5 }
            },
            {
                text: '教育現場の声を集めて提案する',
                effects: { democracy: 12, youthInterest: 15, welfare: 8, economy: 3 }
            },
            {
                text: '慎重な議論を求める',
                effects: { democracy: 7, youthInterest: 5, welfare: 3 }
            },
            {
                text: '関心を持たない',
                effects: { democracy: -5, welfare: -5, youthInterest: -5 }
            }
        ]
    },
    {
        id: 'volunteer_activity',
        title: 'ボランティア活動',
        description: '地域の政治・社会問題に取り組むボランティア団体が活動しています。',
        choices: [
            {
                text: 'ボランティアに参加する',
                effects: { democracy: 5, welfare: 10, youthInterest: 10 }
            },
            {
                text: 'オンラインで支援する',
                effects: { democracy: 3, welfare: 5, youthInterest: 6 }
            },
            {
                text: '寄付で支援する',
                effects: { welfare: 8, youthInterest: 4, economy: -2 }
            },
            {
                text: '参加しない',
                effects: { democracy: -3, youthInterest: -3 }
            }
        ]
    },
    {
        id: 'media_literacy',
        title: 'メディアリテラシー講座',
        description: '大学でメディアリテラシーと政治の講座が開かれています。',
        choices: [
            {
                text: '講座に参加し、情報の見方を学ぶ',
                effects: { democracy: 10, youthInterest: 15 }
            },
            {
                text: '講座を受講し、友達にも勧める',
                effects: { democracy: 12, youthInterest: 18, voterTurnout: 5 }
            },
            {
                text: 'オンライン講座を受講する',
                effects: { democracy: 8, youthInterest: 10 }
            },
            {
                text: '興味がないので参加しない',
                effects: { democracy: -5, youthInterest: -5 }
            }
        ]
    },
    {
        id: 'pension_crisis',
        title: '年金問題',
        description: '年金制度の持続可能性が問題になっています。若者世代が最も影響を受けます。',
        choices: [
            {
                text: '政治家に若者の声を届ける活動に参加',
                effects: { democracy: 5, welfare: 5, youthInterest: 10, voterTurnout: 5 }
            },
            {
                text: '年金制度改革の議論に参加する',
                effects: { democracy: 10, welfare: 8, youthInterest: 15, voterTurnout: 3 }
            },
            {
                text: '私的年金と政治活動の両方を行う',
                effects: { democracy: 7, welfare: 3, youthInterest: 8, economy: 5 }
            },
            {
                text: '諦めて私的年金のみを検討する',
                effects: { welfare: -10, youthInterest: -10, voterTurnout: -5, economy: 3 }
            }
        ]
    },
    {
        id: 'political_party',
        title: '新しい政党',
        description: '若者中心の新しい政党が結成されました。若者の意見を政治に反映させることを目指しています。',
        choices: [
            {
                text: '支持を表明し、活動に参加する',
                effects: { democracy: 10, youthInterest: 20, voterTurnout: 10 }
            },
            {
                text: '政策をよく見てから判断する',
                effects: { democracy: 8, youthInterest: 12, voterTurnout: 5 }
            },
            {
                text: '既存政党にも若者の声を届けることを選ぶ',
                effects: { democracy: 6, youthInterest: 8, welfare: 3 }
            },
            {
                text: '様子を見る',
                effects: { democracy: 0, youthInterest: -3 }
            }
        ]
    },
    {
        id: 'climate_policy',
        title: '気候変動政策',
        description: '政府が気候変動対策の新しい政策を検討しています。若者の未来に直結する問題です。',
        choices: [
            {
                text: '積極的に意見を発信し、政策形成に参加',
                effects: { democracy: 10, youthInterest: 15, welfare: 5 }
            },
            {
                text: '科学的根拠に基づいた政策を求める',
                effects: { democracy: 12, youthInterest: 12, welfare: 8, economy: -2 }
            },
            {
                text: '経済とのバランスを考慮した政策を支持',
                effects: { democracy: 7, youthInterest: 8, welfare: 3, economy: 5 }
            },
            {
                text: '関心を持たない',
                effects: { democracy: -5, youthInterest: -10, welfare: -5 }
            }
        ]
    },
    {
        id: 'geopolitical_tension',
        title: '地政学的緊張',
        description: '近隣国との関係が緊張しています。政府は外交政策を見直す必要に迫られています。',
        choices: [
            {
                text: '対話と外交努力を支持する',
                effects: { democracy: 8, youthInterest: 10, welfare: 5, economy: -3 }
            },
            {
                text: '防衛力強化を支持する',
                effects: { democracy: 5, youthInterest: 7, welfare: -5, economy: -5 }
            },
            {
                text: 'バランスの取れたアプローチを求める',
                effects: { democracy: 10, youthInterest: 12, welfare: 2, economy: -1 }
            },
            {
                text: '関心を持たない',
                effects: { democracy: -8, youthInterest: -10 }
            }
        ]
    },
    {
        id: 'digital_transformation',
        title: 'デジタル化政策',
        description: '政府がデジタル化を推進していますが、個人情報保護の懸念もあります。',
        choices: [
            {
                text: 'プライバシー保護を優先した推進を求める',
                effects: { democracy: 10, youthInterest: 12, economy: 3, welfare: 5 }
            },
            {
                text: '積極的なデジタル化を支持する',
                effects: { democracy: 5, youthInterest: 8, economy: 10, welfare: -3 }
            },
            {
                text: '慎重な議論を求める',
                effects: { democracy: 12, youthInterest: 10, economy: 2, welfare: 2 }
            },
            {
                text: '関心を持たない',
                effects: { democracy: -5, youthInterest: -8, economy: -3 }
            }
        ]
    },
    {
        id: 'constituency_reform',
        title: '選挙区割り見直し',
        description: '一票の格差是正のため、選挙区割りの見直しが検討されています。',
        choices: [
            {
                text: '公正な選挙制度を求める声を上げる',
                effects: { democracy: 15, youthInterest: 10, voterTurnout: 8 }
            },
            {
                text: '若者の意見が反映される制度を提案',
                effects: { democracy: 12, youthInterest: 18, voterTurnout: 10, welfare: 3 }
            },
            {
                text: '専門家の議論を見守る',
                effects: { democracy: 5, youthInterest: 3 }
            },
            {
                text: '無関心',
                effects: { democracy: -10, youthInterest: -8, voterTurnout: -5 }
            }
        ]
    },
    {
        id: 'referendum_proposal',
        title: '国民投票法改正',
        description: '重要な政策について国民投票を実施しやすくする法改正が提案されています。',
        choices: [
            {
                text: '国民投票の拡充を支持する',
                effects: { democracy: 15, youthInterest: 12, voterTurnout: 8 }
            },
            {
                text: '慎重な制度設計を求める',
                effects: { democracy: 10, youthInterest: 8, welfare: 3 }
            },
            {
                text: '代議制民主主義の強化を優先すべきと主張',
                effects: { democracy: 8, youthInterest: 5, economy: 2 }
            },
            {
                text: '関心を持たない',
                effects: { democracy: -12, youthInterest: -10 }
            }
        ]
    },
    {
        id: 'youth_quota',
        title: '若者枠導入の議論',
        description: '議会に若者枠を導入する提案が議論されています。世代間の公平性を高める狙いです。',
        choices: [
            {
                text: '積極的に支持し、推進運動に参加',
                effects: { democracy: 12, youthInterest: 20, voterTurnout: 12, welfare: 5 }
            },
            {
                text: '能力主義を維持しつつ若者参加を促す別案を提案',
                effects: { democracy: 10, youthInterest: 15, voterTurnout: 8, economy: 3 }
            },
            {
                text: '慎重な議論を求める',
                effects: { democracy: 5, youthInterest: 5, voterTurnout: 2 }
            },
            {
                text: '関心を持たない',
                effects: { democracy: -8, youthInterest: -15, voterTurnout: -8 }
            }
        ]
    }
];

// Endings data structure
const endings = [
    {
        id: 'fascism_rise',
        title: 'ED1: ファシズムの台頭',
        condition: (state) => state.democracy < 25 && state.voterTurnout < 35,
        description: '若者が政治に無関心のまま時が流れ、民主主義が崩壊しました。強権的な政府が誕生し、自由が失われていきます。もし若者が選挙に行っていたら、この未来は避けられたかもしれません。',
        type: 'bad'
    },
    {
        id: 'economic_collapse',
        title: 'ED2: 経済崩壊',
        condition: (state) => state.economy < 20 && state.voterTurnout < 40,
        description: '経済政策への無関心が経済の悪化を招きました。若者の失業率は急上昇し、将来への希望が失われています。政治に声を上げていれば、違った未来があったかもしれません。',
        type: 'bad'
    },
    {
        id: 'social_division',
        title: 'ED3: 社会の分断',
        condition: (state) => state.democracy < 30 && state.welfare < 30,
        description: '社会福祉の削減と民主主義の低下により、社会は深く分断されました。若者と高齢者、富裕層と貧困層の対立が激化しています。対話と投票があれば、違った道があったはずです。',
        type: 'bad'
    },
    {
        id: 'apathy_future',
        title: 'ED4: 無関心の未来',
        condition: (state) => state.youthInterest < 30 && state.voterTurnout < 35,
        description: '若者の政治への無関心が常態化し、誰も未来を変えようとしなくなりました。政治は一部の人々のものとなり、若者の声は届かなくなっています。',
        type: 'bad'
    },
    {
        id: 'lost_generation',
        title: 'ED5: 失われた世代',
        condition: (state) => state.economy < 35 && state.welfare < 35 && state.youthInterest < 40,
        description: '経済と福祉の悪化により、若者世代は「失われた世代」と呼ばれるようになりました。政治に参加しなかった結果、自分たちの未来を他人に委ねてしまったのです。',
        type: 'bad'
    },
    {
        id: 'authoritarian_state',
        title: 'ED6: 権威主義国家',
        condition: (state) => state.democracy < 25 && state.youthInterest < 35,
        description: '民主主義の衰退により、権威主義的な国家が誕生しました。言論の自由が制限され、若者の声は封じられています。投票という武器を使わなかった代償は大きかったのです。',
        type: 'bad'
    },
    {
        id: 'stagnation',
        title: 'ED7: 停滞の時代',
        condition: (state) => state.economy < 40 && state.democracy < 40 && state.voterTurnout < 45,
        description: '政治への無関心が続いた結果、国全体が停滞しています。経済も民主主義も活力を失い、若者には希望が見えません。変化を起こすチャンスはあったはずなのに...',
        type: 'bad'
    },
    {
        id: 'gradual_improvement',
        title: 'ED8: 少しずつの改善',
        condition: (state) => state.democracy >= 40 && state.democracy < 60 && state.voterTurnout >= 40 && state.voterTurnout < 60,
        description: '若者が少しずつ政治に参加し始めた結果、社会は徐々に良い方向に向かっています。まだ課題は多いですが、希望が見え始めています。継続的な参加が大切です。',
        type: 'neutral'
    },
    {
        id: 'balanced_society',
        title: 'ED9: バランスの取れた社会',
        condition: (state) => state.democracy >= 50 && state.economy >= 50 && state.welfare >= 50 && state.voterTurnout >= 55,
        description: '適度な政治参加により、バランスの取れた社会が実現しました。経済、福祉、民主主義が調和し、若者にも希望がある社会です。あなたの一票が社会を変えました。',
        type: 'neutral'
    },
    {
        id: 'youth_awakening',
        title: 'ED10: 若者の目覚め',
        condition: (state) => state.youthInterest >= 70 && state.voterTurnout >= 60,
        description: '若者が政治に目覚め、積極的に選挙に参加するようになりました。政治家も若者の声を無視できなくなり、若者向けの政策が次々と実現しています。これが民主主義の力です！',
        type: 'good'
    },
    {
        id: 'democratic_revival',
        title: 'ED11: 民主主義の復活',
        condition: (state) => state.democracy >= 75 && state.voterTurnout >= 70,
        description: '高い投票率と民主主義への関心により、真の民主主義が復活しました。若者の声が政治に反映され、活発な議論が行われています。これこそがあるべき姿です！',
        type: 'good'
    },
    {
        id: 'prosperous_future',
        title: 'ED12: 繁栄する未来',
        condition: (state) => state.economy >= 70 && state.welfare >= 65 && state.voterTurnout >= 65,
        description: '政治への積極的な参加により、経済と福祉が大きく改善しました。若者が自分たちの未来を自分たちで決めた結果、繁栄する未来が実現しています。素晴らしい！',
        type: 'good'
    },
    {
        id: 'ideal_society',
        title: 'ED13: 理想の社会',
        condition: (state) => state.democracy >= 75 && state.economy >= 70 && state.welfare >= 70 && state.voterTurnout >= 75 && state.youthInterest >= 75,
        description: '若者が政治に積極的に参加し、投票率が大幅に向上した結果、理想的な社会が実現しました。民主主義、経済、福祉のすべてが高水準で、誰もが希望を持てる社会です。あなたの選択が最高の未来を作りました！',
        type: 'good'
    },
    {
        id: 'civic_engagement',
        title: 'ED14: 市民参加の時代',
        condition: (state) => state.youthInterest >= 70 && state.democracy >= 65 && state.voterTurnout >= 65,
        description: '若者を中心に市民参加が活発になり、政治が身近なものになりました。SNSやデモ、投票を通じて、多くの人が社会を変える力を持っていることを実感しています。',
        type: 'good'
    },
    {
        id: 'sustainable_future',
        title: 'ED15: 持続可能な未来',
        condition: (state) => state.welfare >= 65 && state.economy >= 60 && state.democracy >= 60 && state.youthInterest >= 60,
        description: '若者の声により、持続可能な社会政策が実現しました。環境、経済、福祉のバランスが取れ、次世代にも希望を残せる未来が築かれています。',
        type: 'good'
    },
    {
        id: 'moderate_progress',
        title: 'ED16: 穏やかな前進',
        condition: (state) => state.democracy >= 45 && state.democracy < 65 && state.economy >= 45 && state.voterTurnout >= 45 && state.voterTurnout < 65,
        description: '劇的ではないものの、着実に社会は良い方向に向かっています。若者の政治参加が少しずつ増え、政治家も無視できなくなっています。この調子で続けることが大切です。',
        type: 'neutral'
    },
    {
        id: 'uncertain_future',
        title: 'ED17: 不確かな未来',
        condition: (state) => state.democracy >= 35 && state.democracy < 55 && state.voterTurnout >= 35 && state.voterTurnout < 55,
        description: '社会の未来は不確かです。若者の政治参加は増えつつありますが、まだ十分ではありません。今後の選択次第で、良い未来にも悪い未来にもなり得ます。',
        type: 'neutral'
    },
    {
        id: 'welfare_crisis',
        title: 'ED18: 福祉危機',
        condition: (state) => state.welfare < 30 && state.voterTurnout < 45,
        description: '社会福祉制度が崩壊の危機に瀕しています。若者が政治に無関心だったため、高齢者優先の政策ばかりが実施され、若者への支援が削減されました。',
        type: 'bad'
    },
    {
        id: 'hope_remains',
        title: 'ED19: 残る希望',
        condition: (state) => state.youthInterest >= 50 && state.youthInterest < 70 && state.voterTurnout >= 45,
        description: '完璧な社会ではありませんが、若者の間に政治への関心が芽生え始めています。この小さな希望を育てていけば、未来は必ず良くなるでしょう。',
        type: 'neutral'
    },
    {
        id: 'polarized_society',
        title: 'ED21: 分極化する社会',
        condition: (state) => state.democracy >= 50 && (state.economy < 35 || state.welfare < 35),
        description: '民主主義は機能していますが、経済か福祉のどちらかが大きく悪化しました。社会は二極化し、対立が深まっています。バランスの取れた政策が必要でした。',
        type: 'mixed'
    },
    {
        id: 'economic_democracy',
        title: 'ED22: 経済優先の民主主義',
        condition: (state) => state.economy >= 70 && state.democracy >= 60 && state.welfare < 50,
        description: '経済は好調で、民主主義も維持されていますが、社会福祉が犠牲になりました。豊かさの恩恵が一部にしか行き渡らない社会となっています。',
        type: 'mixed'
    },
    {
        id: 'welfare_state',
        title: 'ED23: 福祉国家への道',
        condition: (state) => state.welfare >= 70 && state.democracy >= 55 && state.economy < 50,
        description: '充実した社会福祉制度が実現しましたが、経済成長は停滞しています。手厚い保障がある一方で、財政負担が若者世代にのしかかっています。',
        type: 'mixed'
    },
    {
        id: 'active_minority',
        title: 'ED24: 活発な少数派',
        condition: (state) => state.youthInterest >= 65 && state.voterTurnout < 55,
        description: '一部の若者は政治に非常に関心を持っていますが、全体の投票率は低いままです。熱心な少数派の声は届いていますが、大多数は無関心です。もっと広がりが必要です。',
        type: 'neutral'
    },
    {
        id: 'strategic_voters',
        title: 'ED25: 戦略的有権者の誕生',
        condition: (state) => state.voterTurnout >= 60 && state.democracy >= 60 && state.youthInterest >= 55,
        description: '若者が選挙制度を理解し、戦略的に投票するようになりました。小選挙区と比例代表を使い分け、効果的に政治に影響を与えています。民主主義が成熟しつつあります。',
        type: 'good'
    },
    {
        id: 'frustrated_generation',
        title: 'ED26: フラストレーションの時代',
        condition: (state) => state.youthInterest >= 55 && state.democracy < 45,
        description: '若者は政治に関心を持ち始めましたが、民主主義が十分に機能せず、フラストレーションが溜まっています。制度改革が必要です。',
        type: 'mixed'
    },
    {
        id: 'pragmatic_society',
        title: 'ED27: 実利主義の社会',
        condition: (state) => state.economy >= 60 && state.welfare >= 55 && state.democracy < 50 && state.youthInterest < 50,
        description: '経済と福祉はそこそこ機能していますが、民主主義と政治参加は低調です。「結果オーライ」の風潮が広がっていますが、長期的な民主主義の健全性が懸念されます。',
        type: 'mixed'
    },
    {
        id: 'burnout_activists',
        title: 'ED28: 燃え尽きた活動家たち',
        condition: (state) => state.youthInterest < 40 && state.democracy < 45 && state.voterTurnout < 45 && (state.economy >= 45 || state.welfare >= 45),
        description: '一部の熱心な活動家が頑張りましたが、広がりを欠き、燃え尽きてしまいました。経済や福祉は悪くないものの、政治参加の文化が根付きませんでした。',
        type: 'neutral'
    },
    {
        id: 'default_ending',
        title: 'ED20: 変わらない日常',
        condition: (state) => true,
        description: '特に大きな変化もなく、日常は続いていきます。良くも悪くもない平凡な未来です。しかし、若者がもっと政治に参加すれば、もっと良い未来を作れたかもしれません。',
        type: 'neutral'
    }
];

/**
 * Initialize or reset the game state to starting values
 * Resets all parameters to 50 (neutral state)
 * Clears event history and choices made
 */
function initGame() {
    gameState = {
        turn: 1,
        maxTurns: 10,
        voterTurnout: 50,
        democracy: 50,
        economy: 50,
        welfare: 50,
        youthInterest: 50,
        eventHistory: [],
        choicesMade: []
    };
    updateUI();
}

function startGame() {
    showScreen('game-screen');
    nextEvent();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function updateUI() {
    document.getElementById('turn-count').textContent = gameState.turn;
    document.getElementById('max-turns').textContent = gameState.maxTurns;
    document.getElementById('voter-turnout').textContent = Math.round(gameState.voterTurnout);
    
    updateStat('democracy', gameState.democracy);
    updateStat('economy', gameState.economy);
    updateStat('welfare', gameState.welfare);
    updateStat('youth-interest', gameState.youthInterest);
}

function updateStat(statName, value) {
    const clampedValue = Math.max(0, Math.min(100, value));
    document.getElementById(`${statName}-value`).textContent = Math.round(clampedValue);
    document.getElementById(`${statName}-bar`).style.width = clampedValue + '%';
}

/**
 * Get a random event that hasn't been shown yet
 * Prevents showing the same event twice in one playthrough
 * Falls back to any random event if all events have been used
 * @returns {Object} A random event object
 */
function getRandomEvent() {
    const availableEvents = events.filter(event => 
        !gameState.eventHistory.includes(event.id)
    );
    
    if (availableEvents.length === 0) {
        return events[Math.floor(Math.random() * events.length)];
    }
    
    return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

function nextEvent() {
    if (gameState.turn > gameState.maxTurns) {
        showEnding();
        return;
    }
    
    const event = getRandomEvent();
    gameState.eventHistory.push(event.id);
    
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-description').textContent = event.description;
    
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = '';
    
    event.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.text;
        button.addEventListener('click', () => makeChoice(choice));
        choicesContainer.appendChild(button);
    });
}

/**
 * Apply the effects of a player's choice to the game state
 * Clamps all values between 0 and 100
 * Records the choice and advances to the next turn
 * @param {Object} choice - The choice object containing effects to apply
 */
function makeChoice(choice) {
    // Apply effects
    Object.keys(choice.effects).forEach(key => {
        if (key in gameState) {
            gameState[key] = Math.max(0, Math.min(100, gameState[key] + choice.effects[key]));
        }
    });
    
    gameState.choicesMade.push(choice.text);
    gameState.turn++;
    
    updateUI();
    
    setTimeout(() => {
        nextEvent();
    }, 300);
}

/**
 * Display the appropriate ending based on final game state
 * Evaluates endings in order and uses the first matching condition
 * Falls back to default ending (ED20) if no conditions match
 */
function showEnding() {
    showScreen('ending-screen');
    
    // Find the appropriate ending
    // Endings are evaluated in priority order - first match wins
    let selectedEnding = endings[endings.length - 1]; // default ending
    
    for (let ending of endings) {
        if (ending.condition(gameState)) {
            selectedEnding = ending;
            break;
        }
    }
    
    document.getElementById('ending-title').textContent = selectedEnding.title;
    document.getElementById('ending-description').textContent = selectedEnding.description;
    
    // Create ending stats safely using DOM methods to prevent XSS vulnerabilities
    // (avoiding innerHTML with dynamic content)
    const endingStatsDiv = document.getElementById('ending-stats');
    endingStatsDiv.innerHTML = ''; // Clear previous content
    
    const h3 = document.createElement('h3');
    h3.textContent = '最終結果';
    endingStatsDiv.appendChild(h3);
    
    const createStatParagraph = (text) => {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    };
    
    endingStatsDiv.appendChild(createStatParagraph(`投票率: ${Math.round(gameState.voterTurnout)}%`));
    endingStatsDiv.appendChild(createStatParagraph(`民主主義: ${Math.round(gameState.democracy)}`));
    endingStatsDiv.appendChild(createStatParagraph(`経済: ${Math.round(gameState.economy)}`));
    endingStatsDiv.appendChild(createStatParagraph(`社会福祉: ${Math.round(gameState.welfare)}`));
    endingStatsDiv.appendChild(createStatParagraph(`若者の関心: ${Math.round(gameState.youthInterest)}`));
    
    const messageParagraph = document.createElement('p');
    messageParagraph.className = 'ending-message';
    messageParagraph.textContent = selectedEnding.type === 'good' ? 
        '素晴らしい結果です！あなたの政治参加が良い未来を作りました。' : 
        selectedEnding.type === 'bad' ? 
        '残念な結果です。政治への無関心が悪い未来を招きました。' :
        selectedEnding.type === 'mixed' ?
        '複雑な結果です。良い面もありますが、課題も残っています。' :
        'まだまだ改善の余地があります。';
    endingStatsDiv.appendChild(messageParagraph);
    
    const finalMessageParagraph = document.createElement('p');
    finalMessageParagraph.className = 'final-message';
    const strong = document.createElement('strong');
    strong.textContent = 'あなたの一票が未来を変えます。現実の選挙でも必ず投票に行きましょう！';
    finalMessageParagraph.appendChild(strong);
    endingStatsDiv.appendChild(finalMessageParagraph);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', () => {
        initGame();
        startGame();
    });
    
    document.getElementById('restart-button').addEventListener('click', () => {
        initGame();
        showScreen('start-screen');
    });
    
    initGame();
});
