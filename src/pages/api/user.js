import firebase from '../../lib/db'
import { formatSignupData, formatSubmissionData } from "../../utils/formatdata";

// TODO: RETURN THE DATA FROM EACH PROMISE AND CHAIN THE NEXT PROMISE, INSTEAD OF NESTING
export default async (req, res) => {
    let uid = req.query.uid
    if(uid) {

    }
    firebase.collection('Users').doc(uid).get().then(result => {
        let userData = { id: result.id, ...result.data() }

        //Get Submissions
        firebase.collection("Submissions").where("submitter", "==", uid).orderBy('submit_date', 'desc').get().then(snapshot => {
            let submissions = []
            snapshot.forEach(doc => {
                submissions.push(formatSubmissionData(doc.data()))
            })

            //Active Hacks
            firebase.collection("Active Hacks").where('members', 'array-contains', uid).get().then(activeSnapshot => {
                let activeDocs = []
                activeSnapshot.forEach(doc => {
                    let docData = doc.data()
                    docData.date = docData.date.toDate()
                    if (docData.submitter == uid) {
                        docData.submitter_name = "You";
                    }
                    activeDocs.push(docData)
                })

                //Past Hacks
                firebase.collection("Past Hacks").where('members', 'array-contains', uid).get().then(pastSnapshot => {
                    let pastDocs = []
                    pastSnapshot.forEach(doc => {
                        let docData = doc.data()
                        docData.date = docData.date.toDate()
                        if (docData.submitter == uid) {
                            docData.submitter_name = "You";
                        }
                        pastDocs.push(docData)
                    })

                    let activeHacks = { active: activeDocs, past: pastDocs }

                    //Signups
                    firebase.collection("Submissions").where(`signups.${uid}.query`, "==", true).get().then(snapshot => {
                        let signups = []
                        snapshot.forEach(doc => {
                            let docData = formatSignupData(doc.data());
                            //figure out how to only count towards those with min
                            signups.push(docData)
                        })
                        //Format all data
                        let data = { userData, activeHacks, signups, submissions }
                        console.log(data)
                        res.status(200).json(data)
                    })
                        .catch(err => {
                            console.log(`Error getting Submission Data: ${err}`)
                            res.status(500).send("Server-Side Error")
                        })
                })
                    .catch(err => {
                        console.log(`Error getting past hacks: ${err}`)
                        res.status(500).send("Server-Side Error")
                    })
            })
                .catch(err => {
                    console.log(`Error getting active hacks: ${err}`)
                    res.status(500).send("Server-Side Error")
                })
        })
            .catch(err => {
                console.log(`Error getting Submissions: ${err}`)
                res.status(500).send("Server-Side Error")
            })
    })
}
