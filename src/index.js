function Piloto(name, velocidade, manobrabilidade, poder){
    this.name = name;
    this.velocidade = velocidade;
    this.manobrabilidade = manobrabilidade;
    this.poder = poder;
};

var Mario = new Piloto('Mario', 4, 3, 3);

var Peach = new Piloto('Peach', 2, 4, 3);

var Yoshi = new Piloto('Yoshi', 5, 3, 5);

var Bowser = new Piloto('Bowser', 3, 4, 4);

var Luigi = new Piloto('Luigi', 4, 3, 3);

var Kong = new Piloto('Kong', 2, 2, 5);

const player1 = {
    NOME: Mario.name,
    VELOCIDADE: Mario.velocidade,
    MANOBRABILIDADE: Mario.manobrabilidade,
    PODER: Mario.poder,
    PONTOS: 0,
}

const player2 = {
    NOME: Bowser.name,
    VELOCIDADE: Bowser.velocidade,
    MANOBRABILIDADE: Bowser.manobrabilidade,
    PODER: Bowser.poder,
    PONTOS: 0,
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }

    return result;
}

async function logRollResult(player, block, diceResult, attribute) {
    console.log(`${player.NOME} rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(p1, p2) {
    for(let round=1;round<=5;round++) {
        console.log(`Rodade ${round}`);

        let block = await getRandomBlock();

        console.log(`Bloco ${block}`);
        //sortear bloco

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();
    
        let totalTesteSkill1 = 0;
        let totalTesteSkill2 = 0;
    
        if (block == "RETA") {
            totalTesteSkill1 = diceResult1 + p1.VELOCIDADE;
            totalTesteSkill2 = diceResult2 + p2.VELOCIDADE;
    
            await logRollResult(p1, block, diceResult1, p1.VELOCIDADE)
            await logRollResult(p2, block, diceResult2, p2.VELOCIDADE)
        }
        if (block == "CURVA") {
            totalTesteSkill1 = diceResult1 + p1.MANOBRABILIDADE;
            totalTesteSkill2 = diceResult2 + p2.MANOBRABILIDADE;
    
            await logRollResult(p1, block, diceResult1, p1.VELOCIDADE)
            await logRollResult(p2, block, diceResult2, p2.VELOCIDADE)
        }
        if (block == "CONFRONTO") {
           let powerResult1 = diceResult1 + p1.PODER;
           let powerResult2 = diceResult2 + p2.PODER;

           await logRollResult(p1, block, diceResult1, p1.PODER)
           await logRollResult(p2, block, diceResult2, p2.PODER)

           console.log(`${p1.NOME} confrontou com ${p2.NOME}!`);

           if (powerResult1 > powerResult2) {
                console.log(`${p1.NOME} venceu o confronto! ${p2.NOME} perdeu um ponto!`);
                if (p2.PONTOS > 0){
                    p2.PONTOS--;
                }
            }else if (powerResult2 > powerResult1){
                console.log(`${p2.NOME} venceu o confronto! ${p1.NOME} perdeu um ponto!`);
                if (p1.PONTOS > 0){
                    p1.PONTOS--;
                }
            }
            
            if (powerResult2 === powerResult1){
                console.log(`Confronto empatado! Nenhum ponto foi perdido`);
            }
        }

        if (totalTesteSkill1 > totalTesteSkill2) {
            console.log(`${p1.NOME} marcou um ponto!`);

            p1.PONTOS++;
        }else if (totalTesteSkill1 < totalTesteSkill2){
            console.log(`${p2.NOME} marcou um ponto!`);

            p2.PONTOS++;
        }

        console.log(`------------------------------------------------------------`);
    }

} 

async function declareWinner(p1, p2) {
    console.log(`Resultado final:`)
    console.log(`${p1.NOME}: ${p1.PONTOS} ponto(s)`)
    console.log(`${p2.NOME}: ${p2.PONTOS} ponto(s)`)

    if (p1.PONTOS > p2.PONTOS) {
        console.log(`\n${p1.NOME} venceu a corrida! Parabéns!!`)
    } else if (p1.PONTOS < p2.PONTOS) {
        console.log(`\n${p2.NOME} venceu a corrida! Parabéns!!`)
    } else {
        console.log(`\nA corrida terminou em empate!`)
    }
}

(async function main(){
    console.log(`Corrida entre ${player1.NOME} e ${player2.NOME} começando ...\n`);

    await playRaceEngine(player1, player2);

    await declareWinner(player1, player2);
})()