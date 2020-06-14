
import { expect } from "chai";
import { AerobrakedAmmoniaAsteroid } from "../../src/cards/AerobrakedAmmoniaAsteroid";
import { Ants } from "../../src/cards/Ants";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Resources } from '../../src/Resources';
import { Decomposers } from "../../src/cards/Decomposers";

describe("AerobrakedAmmoniaAsteroid", function () {
    it("Should play without microbe cards", function () {
        const card = new AerobrakedAmmoniaAsteroid();
        const player = new Player("test", Color.BLUE, false);
        player.playedCards.push(card);
        const action = card.play(player);
        expect(player.getProduction(Resources.HEAT)).to.eq(3);
        expect(player.getProduction(Resources.PLANTS)).to.eq(1);

         // It's okay to not have a card to collect Microbes on
        expect(action).to.eq(undefined); 
    });
    it("Adds microbes automatically if only 1 target", function () {
        const card = new AerobrakedAmmoniaAsteroid();
        const player = new Player("test", Color.BLUE, false);
        player.playedCards.push(card);

        const selectedCard = new Ants();
        player.playedCards.push(selectedCard);

        card.play(player);
        expect(player.getProduction(Resources.HEAT)).to.eq(3);
        expect(player.getProduction(Resources.PLANTS)).to.eq(1);
        expect(player.getResourcesOnCard(selectedCard)).to.eq(2);
    });
    it("Adds microbes to another card", function () {
        const card = new AerobrakedAmmoniaAsteroid();
        const player = new Player("test", Color.BLUE, false);
        player.playedCards.push(card);

        // Add card to collect Microbes on
        const selectedCard = new Ants();
        const otherMicrobeCard = new Decomposers();
        player.playedCards.push(selectedCard, otherMicrobeCard);

        const action = card.play(player);
        expect(player.getProduction(Resources.HEAT)).to.eq(3);
        expect(player.getProduction(Resources.PLANTS)).to.eq(1);

        expect(action).not.to.eq(undefined); 
        action!.cb([selectedCard]);

        expect(player.getResourcesOnCard(selectedCard)).to.eq(2);
    });
});
