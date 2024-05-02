import { Model, model, Schema, Document } from 'mongoose';

export interface GameBet extends Document {
    uid: string,
    email: string,
    event: number,
    fixtureId: number;
    winner?: 'team_a' | 'team_h' | 'draw';
    goalsH?: number;
    goalsA?: number;
    shotsH?: number;
    shotsA?: number;
    shotsOnGoalH?: number;
    shotsOnGoalA?: number;
    yellowCardsH?: number;
    yellowCardsA?: number;
    redCardsH?: number;
    redCardsA?: number;
    cornersH?: number;
    cornersA?: number;
}

const GameBetSchema: Schema = new Schema<GameBet>({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    fixtureId: { type: Number, required: true },
    event: {type: Number, required: true},
    winner: { type: String, enum: ['team_a', 'team_h', 'draw'], required: false },
    goalsH: { type: Number, min: 0, required: false },
    goalsA: { type: Number, min: 0, required: false },
    shotsH: { type: Number, min: 0, required: false },
    shotsA: { type: Number, min: 0, required: false },
    shotsOnGoalH: { type: Number, min: 0, required: false },
    shotsOnGoalA: { type: Number, min: 0, required: false },
    yellowCardsH: { type: Number, min: 0, required: false },
    yellowCardsA: { type: Number, min: 0, required: false },
    redCardsH: { type: Number, min: 0, required: false },
    redCardsA: { type: Number, min: 0, required: false },
    cornersH: { type: Number, min: 0, required: false },
    cornersA: { type: Number, min: 0, required: false },
});

export const GameBetModel: Model<GameBet> = model<GameBet>('GameBet', GameBetSchema);
