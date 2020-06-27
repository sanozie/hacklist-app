import firebase from '../../../lib/db'

export default async (req, res) => {
    firebase.collection("Submissions").where(`signups.${req.query.uid}.query`, "==", true).get().then(snapshot => {
        if (snapshot.empty) {
            console.log('empty')
            res.status(204).send("No Signups")
        } else {
            console.log('got it')
            let docs = [], name_submissions = []
            snapshot.forEach(doc => {
                let docData = doc.data();
                docData.circle = (Object.keys(docData.signups).length/docData.limits.min)*100
                docs.push(docData)
                name_submissions.push(firebase.collection('Users').doc(doc.data().submitter).get())
            })
            Promise.all(name_submissions).then(snaps => {
                let nameCounter = 0;
                snaps.forEach(item => {
                    if(item.exists) {
                        docs[nameCounter].submitter_name = item.data().name
                    } else {
                        docs[nameCounter].submitter_name = "Unknown"
                    }
                    nameCounter++
                })
                console.log(docs)
                res.status(200).json(docs)
            })
            
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Server-Side Error")
    })
}