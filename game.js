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
                effects: { democracy: 5, youthInterest: 10, economy: 5 }
            },
            {
                text: '諦めて自分で何とかする',
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
                text: '諦めて私的年金を検討する',
                effects: { welfare: -10, youthInterest: -10, voterTurnout: -5 }
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
                text: '関心を持たない',
                effects: { democracy: -5, youthInterest: -10, welfare: -5 }
            }
        ]
    }
];

// Endings data structure
const endings = [
    {
        id: 'fascism_rise',
        title: 'ED1: ファシズムの台頭',
        condition: (state) => state.democracy < 20 && state.voterTurnout < 30,
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
        condition: (state) => state.democracy >= 80 && state.economy >= 75 && state.welfare >= 75 && state.voterTurnout >= 80 && state.youthInterest >= 80,
        description: '若者が政治に積極的に参加し、投票率が大幅に向上した結果、理想的な社会が実現しました。民主主義、経済、福祉のすべてが高水準で、誰もが希望を持てる社会です。あなたの選択が最高の未来を作りました！',
        type: 'good'
    },
    {
        id: 'civic_engagement',
        title: 'ED14: 市民参加の時代',
        condition: (state) => state.youthInterest >= 75 && state.democracy >= 70 && state.voterTurnout >= 70,
        description: '若者を中心に市民参加が活発になり、政治が身近なものになりました。SNSやデモ、投票を通じて、多くの人が社会を変える力を持っていることを実感しています。',
        type: 'good'
    },
    {
        id: 'sustainable_future',
        title: 'ED15: 持続可能な未来',
        condition: (state) => state.welfare >= 70 && state.economy >= 65 && state.democracy >= 65 && state.youthInterest >= 65,
        description: '若者の声により、持続可能な社会政策が実現しました。環境、経済、福祉のバランスが取れ、次世代にも希望を残せる未来が築かれています。',
        type: 'good'
    },
    {
        id: 'moderate_progress',
        title: 'ED16: 穏やかな前進',
        condition: (state) => state.democracy >= 45 && state.economy >= 45 && state.voterTurnout >= 50,
        description: '劇的ではないものの、着実に社会は良い方向に向かっています。若者の政治参加が少しずつ増え、政治家も無視できなくなっています。この調子で続けることが大切です。',
        type: 'neutral'
    },
    {
        id: 'uncertain_future',
        title: 'ED17: 不確かな未来',
        condition: (state) => state.democracy >= 35 && state.democracy < 50 && state.voterTurnout >= 40 && state.voterTurnout < 55,
        description: '社会の未来は不確かです。若者の政治参加は増えつつありますが、まだ十分ではありません。今後の選択次第で、良い未来にも悪い未来にもなり得ます。',
        type: 'neutral'
    },
    {
        id: 'welfare_crisis',
        title: 'ED18: 福祉危機',
        condition: (state) => state.welfare < 25 && state.voterTurnout < 45,
        description: '社会福祉制度が崩壊の危機に瀕しています。若者が政治に無関心だったため、高齢者優先の政策ばかりが実施され、若者への支援が削減されました。',
        type: 'bad'
    },
    {
        id: 'hope_remains',
        title: 'ED19: 残る希望',
        condition: (state) => state.youthInterest >= 55 && state.youthInterest < 70,
        description: '完璧な社会ではありませんが、若者の間に政治への関心が芽生え始めています。この小さな希望を育てていけば、未来は必ず良くなるでしょう。',
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

// Game functions
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

function showEnding() {
    showScreen('ending-screen');
    
    // Find the appropriate ending
    let selectedEnding = endings[endings.length - 1]; // default ending
    
    for (let ending of endings) {
        if (ending.condition(gameState)) {
            selectedEnding = ending;
            break;
        }
    }
    
    document.getElementById('ending-title').textContent = selectedEnding.title;
    document.getElementById('ending-description').textContent = selectedEnding.description;
    
    // Create ending stats safely using DOM methods
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
