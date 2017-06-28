import Realm from 'realm';
import UUIDGenerator from 'react-native-uuid-generator';


class CardsList extends Realm.Object {
}
CardsList.schema = {
    name: "CardsList",
    primaryKey: 'id',
    properties: {
        id: 'string',
        question: 'string',
        answer: 'string',
        level: 'int',
    }
};

export class CardsListDAO {

    static addOrUpdateCard(realm, card) {
        if (card.id) {
            realm.write(() => {
                realm.create('CardsList',
                    {
                        id: card.id,
                        question: card.question,
                        answer: card.answer,
                        level: parseInt(card.level)
                    }, true)
            })

        } else {
            UUIDGenerator.getRandomUUID((uuid) => {
                let id = uuid
                realm.write(() => {
                    realm.create('CardsList',
                        {
                            id: id,
                            question: card.question,
                            answer: card.answer,
                            level: 1
                        })
                })
            })
        }
    }

    static incrementOrRestartCardLevel(realm, card, increment) {

        if (increment) {
            realm.write(() => {
                realm.create('CardsList',
                    {
                        id: card.id,
                        question: card.question,
                        answer: card.answer,
                        level: card.level + 1
                    }, true)
            })
        } else {

            realm.write(() => {
                realm.create('CardsList',
                    {
                        id: card.id,
                        question: card.question,
                        answer: card.answer,
                        level: 1
                    }, true)
            })
        }
    }

    static removeCard(realm, cardId) {
        let card = realm.objects('CardsList').filtered('id =' + '\"' + cardId + '\"')
        realm.write(() => {
            realm.delete(card)
        })
    }

    static getCardsForStudy(realm) {
        let cards = realm.objects('CardsList').filtered('level < 7');
        // return cards
        return cards.sorted('level', false)
    }

    static getAllCardsForSetup(realm) {
        let cards = realm.objects('CardsList')
        // return cards
        return cards.sorted('level', false)
    }

}


export default new Realm({schema: [CardsList]});