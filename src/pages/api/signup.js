import firebase from 'db/server'
import { formatSignupData, formatSubmissionData } from "../../utils/formatdata";

// TODO: RETURN THE DATA FROM EACH PROMISE AND CHAIN THE NEXT PROMISE, INSTEAD OF NESTING
export default async (req, res) => {
    let { hackId, skill, uid } = JSON.parse(req.body)
    firebase.collection('Submissions').doc(hackId)
        .get()
        .then(result => {
            console.log(result.data())
            firebase.collection('Submissions').doc(hackId).update({
                signups: { ...result.data().signups, [uid]: {query: true, skill} }
            }).then(() => {
                console.log('updated')
                res.status(202).send("Updated")
            }).catch(e => {
                throw e
            })
        }).catch(e => {
        throw e
    })
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}