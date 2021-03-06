import { IMilestone } from "./IMilestone";
import { Player } from "../Player";
import { Game } from "../Game";
import { CardType } from '../cards/CardType';

export class Tycoon implements IMilestone {
    public name: string = "Tycoon";
    public description: string = "Requires that you have 15 project cards in play (blue and green cards)"
    public canClaim(player: Player, _game: Game): boolean {
        return player.playedCards
          .filter((card) => card.cardType === CardType.ACTIVE || card.cardType === CardType.AUTOMATED).length > 14;
    }   
}