import firebase from '../../lib/db'

export default async (req, res) => {
    let uid = req.query.uid
    firebase.collection('Users').doc(uid).get().then(result => {
        let userData = { id: result.id, ...result.data() }

        //Get Submissions
        firebase.collection("Submissions").where("submitter", "==", uid).orderBy('submit_date', 'desc').get().then(snapshot => {
            let submissions = []
            snapshot.forEach(doc => {
                submissions.push(formatDataSubmissions(doc.data()))
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
                            let docData = formatDataSignups(doc.data());
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




function formatDataSubmissions(data) {
    let sizeData = {}, tempDataMin = { eng: 0, design: 0, pm: 0 }, tempDataTotal = { eng: 0, design: 0, pm: 0 }, { limits } = data;
    for (let [key, value] of Object.entries(data.signups)) {
        let { skill } = value
        if (tempDataMin[skill] < limits[skill].min) {
            tempDataMin[skill] += 1
        }
        tempDataTotal[skill] += 1
    }
    for (let [key, value] of Object.entries(tempDataMin)) {
        sizeData[key] = {
            min_signup_num: tempDataMin[key],
            total_signup_num: tempDataTotal[key],
            width: (tempDataMin[key] / limits.min) * 100,
            circleFill: (tempDataTotal[key] / limits[key].max) * 100
        }
    }
    sizeData.overflow_width = (Object.keys(data.signups).length - limits.min) / limits.max * 100
    data.sizeData = sizeData;
    return data
}

function formatDataSignups(data) {
    //find a way to display the min signups while also accounting for signups outside of mins (where min=0)
    let { limits } = data;
    data.circle = (Object.keys(data.signups).length / limits.max) * 100
    return data
}