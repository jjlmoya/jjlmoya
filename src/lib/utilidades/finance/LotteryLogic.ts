export type LotteryId = 'gordo' | 'nino' | 'euromillones' | 'primitiva' | 'bonoloto';

export interface LotteryGame {
    id: LotteryId;
    name: string;
    cost: number;
    jackpot: number;
    odds: number;
    description: string;
    payoutRate: number;
}

export const LOTTERY_DATA: Record<LotteryId, LotteryGame> = {
    gordo: {
        id: 'gordo',
        name: 'Lotería de Navidad',
        cost: 20,
        jackpot: 400000,
        odds: 100000,
        payoutRate: 70,
        description: 'El mayor reparto de premios del mundo. Probabilidad alta de ganar algo.'
    },
    nino: {
        id: 'nino',
        name: 'Lotería del Niño',
        cost: 20,
        jackpot: 200000,
        odds: 100000,
        payoutRate: 70,
        description: 'Triplica las posibilidades de reintegro respecto a Navidad.'
    },
    euromillones: {
        id: 'euromillones',
        name: 'Euromillones',
        cost: 2.5,
        jackpot: 17000000,
        odds: 139838160,
        payoutRate: 50,
        description: 'Premios astronómicos, probabilidades casi imposibles.'
    },
    primitiva: {
        id: 'primitiva',
        name: 'La Primitiva',
        cost: 1,
        jackpot: 2000000,
        odds: 139838160,
        payoutRate: 55,
        description: 'La lotería más antigua de España. Difícil pero más barata.'
    },
    bonoloto: {
        id: 'bonoloto',
        name: 'Bonoloto',
        cost: 0.5,
        jackpot: 400000,
        odds: 13983816,
        payoutRate: 55,
        description: 'La más económica. Ideal para jugar a diario con poco presupuesto.'
    }
};

export class LotteryLogic {
    static calculateStats(id: LotteryId, tickets: number) {
        const game = LOTTERY_DATA[id];
        const totalCost = tickets * game.cost;
        const winProbability = 1 - Math.pow((game.odds - 1) / game.odds, tickets);
        const expectedValue = (game.jackpot * (tickets / game.odds)) - totalCost;

        let recommendation = "";
        let optimalTickets = 1;

        if (id === 'gordo' || id === 'nino') {
            if (tickets < 5) {
                recommendation = "Para una gestión de riesgo básica, se suele buscar diversificar terminaciones. Jugar pocas unidades mantiene la ilusión con el mínimo riesgo de capital.";
                optimalTickets = 1;
            } else if (tickets < 10) {
                recommendation = "Acercarse a los 10 décimos (200€) garantiza estadísticamente un reintegro, pero recuerda que esto supone recuperar solo el 10% de lo invertido en ese nivel.";
                optimalTickets = tickets;
            } else {
                recommendation = "Has superado el umbral de diversificación básica. A partir de aquí, cada décimo extra aumenta tu exposición al riesgo sin mejorar la eficiencia de retorno.";
                optimalTickets = 10;
            }
        } else {
            if (totalCost > 15) {
                recommendation = "En juegos de probabilidad extrema, no hay 'estrategia óptima' más allá de limitar estrictamente el gasto. Reducir la cuantía es la mejor jugada.";
                optimalTickets = Math.floor(5 / game.cost);
            } else {
                recommendation = "Mantener una participación simbólica es la forma más racional de participar en sorteos con botes astronómicos.";
                optimalTickets = tickets;
            }
        }

        return {
            totalCost,
            winProbability: winProbability * 100,
            expectedValue,
            recommendation,
            optimalTickets,
            efficiency: (game.payoutRate / 100) * (tickets / totalCost)
        };
    }

    static compareGames() {
        return Object.values(LOTTERY_DATA).map(game => ({
            name: game.name,
            score: (game.payoutRate / 100) / (game.odds / 1000000),
            odds: game.odds
        })).sort((a, b) => b.score - a.score);
    }
}
