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

    static removeCard(realm, cardId) {
        let card = realm.objects('CardsList').filtered('id =' + '\"' + cardId + '\"')
        realm.write(() => {
            realm.delete(card)
        })
    }

    static getAllCars(realm) {
        let cards = realm.objects('CardsList');
        return cards.sorted('level')
    }
}


export default new Realm({schema: [CardsList]});