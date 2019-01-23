
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class CallistoPenalMines implements IProjectCard {
    public cost: number = 24;
    public tags: Array<Tags> = [Tags.JOVIAN, Tags.SPACE];
    public name: string = "Callisto Penal Mines";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Increase your mega credit production 3 steps. Gain 2 victory points.";
    public description: string = "You always wanted to be a warden, didn't you?";
    public play(player: Player, game: Game): Promise<void> {
        player.megaCreditProduction += 3;
        player.victoryPoints += 2;
        return Promise.resolve();
    }
}