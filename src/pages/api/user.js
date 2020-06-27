import firebase from '../../lib/db'

export default async (req, res) => {
    firebase.collection('Users').doc('yd65yb623kPKFLYyLmqZ').get()
        .then(result => {
            let userData = { id: result.id, ...result.data() }

            //Get Submissions
            firebase.collection("Submissions").where("submitter", "==", 'yd65yb623kPKFLYyLmqZ').orderBy('submit_date', 'desc').get().then(snapshot => {
                if (snapshot.empty) {
                    res.status(204).send("No Submissions")
                } else {
                    let submissions = []
                    snapshot.forEach(doc => {
                        submissions.push(formatDataSubmissions(doc.data()))
                    })

                    //Active Hacks
                    firebase.collection("Active Hacks").where('members', 'array-contains', 'yd65yb623kPKFLYyLmqZ').get().then(activeSnapshot => {
                        let activeDocs = [], notOwnerDocsActive = [], activeNameSubmissions = [];
                        activeSnapshot.forEach(doc => {
                            let docData = doc.data()
                            docData.date = docData.date.toDate()
                            if (docData.submitter == 'yd65yb623kPKFLYyLmqZ') {
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
                                if (item.exists) {
                                    notOwnerDocsActive[nameCounter].submitter_name = item.data().name
                                } else {
                                    notOwnerDocsActive[nameCounter].submitter_name = "Unknown"
                                }
                                nameCounter++
                            })
                            let allActiveDocs = [...activeDocs, ...notOwnerDocsActive]
                            firebase.collection("Past Hacks").where('members', 'array-contains', 'yd65yb623kPKFLYyLmqZ').get().then(pastSnapshot => {
                                let pastDocs = [], notOwnerDocsPast = [], pastNameSubmissions = [];
                                pastSnapshot.forEach(doc => {
                                    let docData = doc.data()
                                    docData.date = docData.date.toDate()
                                    if (docData.submitter == 'yd65yb623kPKFLYyLmqZ') {
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
                                        if (item.exists) {
                                            notOwnerDocsPast[nameCounter].submitter_name = item.data().name
                                        } else {
                                            notOwnerDocsPast[nameCounter].submitter_name = "Unknown"
                                        }
                                        nameCounter++
                                    })
                                    let allPastDocs = [...pastDocs, ...notOwnerDocsPast]
                                    let activeHacks = { active: allActiveDocs, past: allPastDocs }

                                    
                                    //Signups
                                    firebase.collection("Submissions").where(`signups.yd65yb623kPKFLYyLmqZ.query`, "==", true).get().then(snapshot => {
                                        if (snapshot.empty) {
                                            console.log('empty')
                                            res.status(204).send("No Signups")
                                        } else {
                                            let signups = [], name_submissions = []
                                            snapshot.forEach(doc => {
                                                let docData = formatDataSignups(doc.data());
                                                //figure out how to only count towards those with min
                                                signups.push(docData)
                                                name_submissions.push(firebase.collection('Users').doc(doc.data().submitter).get())
                                            })
                                            Promise.all(name_submissions).then(snaps => {
                                                let nameCounter = 0;
                                                snaps.forEach(item => {
                                                    if(item.exists) {
                                                        signups[nameCounter].submitter_name = item.data().name
                                                    } else {
                                                        signups[nameCounter].submitter_name = "Unknown"
                                                    }
                                                    nameCounter++
                                                })

                                                //Format all data
                                                let data = {userData, activeHacks, signups, submissions}
                                                console.log(data)
                                                res.status(200).json(data)
                                            })
                                            
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        res.status(500).send("Server-Side Error")
                                    })
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
            })
                .catch(err => {
                    console.log(`Submissions err: ${err}`)
                    res.status(500).send("Server-Side Error")
                })
        })
        .catch(err => {
            res.json({ err })
        })
}




function formatDataSubmissions(data) {
    let sizeData = {}, tempDataMin = { eng: 0, design: 0, pm: 0 }, tempDataTotal = { eng: 0, design: 0, pm: 0 },{ limits } = data;
    for (let [key, value] of Object.entries(data.signups)) {
        let { skill } = value
        if(tempDataMin[skill] < limits[skill].min) {
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
    sizeData.overflow_width = (Object.keys(data.signups).length - limits.min)/limits.max * 100
    data.sizeData = sizeData;
    return data
}

function formatDataSignups(data) {
    //find a way to display the min signups while also accounting for signups outside of mins (where min=0)
    let { limits } = data;
    data.circle = (Object.keys(data.signups).length/limits.max)*100
    return data
}