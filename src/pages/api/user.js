import firebase from 'db/server'

export default async (req, res) => {
    let { uid } = res.body
    switch(res.method) {
        case 'GET':
            firebase.collection('Users').doc(uid).get().then(result => {
                res.status(202).send({id: result.id, ...result.data()})
            })
            break
    }
}