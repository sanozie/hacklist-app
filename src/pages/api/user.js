import firebase from 'db/server'
import { formatSignupData, formatSubmissionData } from 'utils/formatdata';

export default async (req, res) => {
    let uid = req.query.uid

    /**
     * Schema for returned Firebase user-specific data.
     */
    let data = {
        userData: undefined,
        activeHacks: {
            active: undefined,
            past: undefined
        },
        submissions: undefined,
        signups: undefined
    }

    let userData = firebase.collection('Users').doc(uid).get().then(result => {
        // Adding user data to global data
        data.userData = {id: result.id, ...result.data()}
    })

    let submissions = firebase.collection("Submissions").where("submitter", "==", uid)
        .orderBy('submit_date', 'desc').get().then(snapshot => {
            let submissionData = {}
            snapshot.forEach(doc => {
                let docData = doc.data()
                docData.hackId = doc.id
                submissionData[doc.id] = formatSubmissionData(docData)
            })

            // Adding Submissions to global data
            data.submissions = submissionData
        })

    let activeHacks = firebase.collection("Active Hacks")
        .where('members', 'array-contains', uid).get().then(activeSnapshot => {
            fetchActives(data, 'active', activeSnapshot, uid)
        })

    let pastHacks = firebase.collection("Past Hacks")
        .where('members', 'array-contains', uid).get().then(pastSnapshot => {
            fetchActives(data, 'past', pastSnapshot, uid)
    })

    let signups = firebase.collection("Submissions")
        .where(`signups.${uid}.query`, "==", true).get().then(snapshot => {
            let signups = {}
            snapshot.forEach(doc => {
                //figure out how to only count towards those with min
                signups[doc.id] = formatSignupData(doc.data())
            })

            data.signups = signups
        })

    await Promise.all([userData, submissions, pastHacks, activeHacks, signups]).then(() => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send("Err fetching user data.")
        throw err
    })
}

/**
 * Manipulating data for active hacks.
 * @param data Object to be edited
 * @param timeframe past or active
 * @param snapshot Firebase snapshot
 * @param uid
 */
const fetchActives = (data, timeframe, snapshot, uid) => {
    let docs = {}
    snapshot.forEach(doc => {
        let docData = doc.data()
        docData.date = docData.date.toDate()
        if (docData.submitter === uid) {
            docData.submitter_name = "You";
        }
        docs[doc.id] = docData
    })

    data.activeHacks[timeframe] = docs
}