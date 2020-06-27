import firebase from '../../../lib/db'

// could probably refactor this to make more sense, but flow is:
// 1. Get all active hacks where user is member
// 2. If they didn't submit the hack, make another query to get submitter's name
// 3. Get all past hacks where user is member (nested in name hack)
// 4. Repeat the process of getting names if user didn't submit the hack

export default async (req, res) => {
    firebase.collection("Active Hacks").where('members', 'array-contains', req.query.uid).get().then(activeSnapshot => {
        let activeDocs = [], notOwnerDocsActive = [], activeNameSubmissions = [];
        activeSnapshot.forEach(doc => {
            let docData = doc.data()
            docData.date = docData.date.toDate()
            if(docData.submitter == req.query.uid) {
                docData.submitter_name = "You";
                activeDocs.push(docData)
            } else {
                notOwnerDocsActive.push(docData)
                activeNameSubmissions.push(firebase.collection('Users').doc(doc.data().submitter).get())
            }
        })
        Promise.all(activeNameSubmissions).then(snaps => {
            let nameCounter = 0;
            snaps.forEach(item => {
                if(item.exists) {
                    notOwnerDocsActive[nameCounter].submitter_name = item.data().name
                } else {
                    notOwnerDocsActive[nameCounter].submitter_name = "Unknown"
                }
                nameCounter++
            })
            let allActiveDocs = [...activeDocs, ...notOwnerDocsActive]
            firebase.collection("Past Hacks").where('members', 'array-contains', req.query.uid).get().then(pastSnapshot => {
                let pastDocs = [], notOwnerDocsPast = [], pastNameSubmissions = [];
                pastSnapshot.forEach(doc => {
                    let docData = doc.data()
                    docData.date = docData.date.toDate()
                    if(docData.submitter == req.query.uid) {
                        docData.submitter_name = "You";
                        pastDocs.push(docData)
                    } else {
                        notOwnerDocsPast.push(docData)
                        pastNameSubmissions.push(firebase.collection('Users').doc(doc.data().submitter).get())
                    }
                })
                Promise.all(pastNameSubmissions).then(snaps => {
                    let nameCounter = 0;
                    snaps.forEach(item => {
                        if(item.exists) {
                            notOwnerDocsPast[nameCounter].submitter_name = item.data().name
                        } else {
                            notOwnerDocsPast[nameCounter].submitter_name = "Unknown"
                        }
                        nameCounter++
                    })
                    let allPastDocs = [...pastDocs, ...notOwnerDocsPast]
                    let allDocs = {active: allActiveDocs, past: allPastDocs}
                    res.status(200).json(allDocs)
                })
            })
        })
        .catch(err => {
            console.log(`Error getting names: ${err}`)
            res.status(500).send("Server-Side Error")
        })
    })
    .catch(err => {
        console.log(`Error getting member docs: ${err}`)
        res.status(500).send("Server-Side Error")
    })    
}