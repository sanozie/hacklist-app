import firebase from 'db/server'
import { formatSignupData, formatSubmissionData } from 'utils/formatdata'
import dateMap from 'utils/datemap'


export default async (req, res) => {
    switch(req.method) {
        case 'GET':
            getHandler()
            break
        case 'POST':
            postHandler()
            break
        case 'DELETE':
            deleteHandler()
    }

    function getHandler() {
        let { type, uid } = req.query
        switch(type) {
            // Get submissions from users (indexed by submission date)
            case 'submissions':
                let queryDate = dateMap(req.query.timeline)
                firebase.collection('Submissions')
                    .where('submit_date', '<', new Date())
                    .where('submit_date', '>', new Date(queryDate)).get()
                    .then(snapshot => {
                        let data=[]
                        snapshot.forEach(item => {
                            let docData = item.data()
                            docData.hackId = item.id
                            data.push(formatSubmissionData(docData, 'server'))
                        })
                        res.status(200).send(data)
                    })
                break

            // Get submissions submitted by current user
            case 'usersubmissions':
                firebase.collection('Submissions').where('submitter', '==', uid)
                    .orderBy('submit_date', 'desc').get().then(snapshot => {
                    let submissionData = {}

                    snapshot.forEach(doc => {
                        let docData = doc.data()
                        docData.hackId = doc.id
                        submissionData[doc.id] = formatSubmissionData(docData, 'server')
                    })

                    res.status(200).send(submissionData)
                })
                break

            // Get active and archived hacks of current user
            case 'portfolio':
                let data = { actives: {}, archive: {} }

                let activesHandler = firebase.collection('Actives')
                    .where('members', 'array-contains', uid).get().then(activeSnapshot => {
                    fetchPortfolio(data.actives, 'active', activeSnapshot, uid)
                })

                let archiveHandler = firebase.collection('Archive')
                    .where('members', 'array-contains', uid).get().then(archiveSnapshot => {
                    fetchPortfolio(data.archive, 'past', archiveSnapshot, uid)
                })

                Promise.all([activesHandler, archiveHandler]).then(() => {
                    res.status(200).send(data)
                })
                break


            // Get signups of current user
            case 'usersignups':
                firebase.collection('Submissions')
                    .where(`signups.${uid}.query`, '==', true).get().then(snapshot => {
                    let signupsData = {}
                    snapshot.forEach(doc => {
                        //figure out how to only count towards those with min
                        signupsData[doc.id] = formatSignupData(doc.data(), 'server')
                    })

                    res.status(200).send(signupsData)
                })
                break
        }
    }

    function postHandler() {
        let { type, uid } = req.query

        switch(type) {
            // Add a new submission
            case 'submission':
                let body = JSON.parse(req.body)
                //Remember to generate a random hack title if there is none
                firebase.collection('Submissions').add({
                    submitter_name: body.submitter_name,
                    submitter: body.submitter,
                    title: body.hackTitle,
                    submit_date: new Date(),
                    industry: body.industry,
                    limits: {
                        max: body.engRange[1] + body.designRange[1] + body.pmRange[1],
                        min: body.engRange[0] + body.designRange[0] + body.pmRange[0],
                        eng: {
                            max: body.engRange[1],
                            min: body.engRange[0],
                        },
                        design: {
                            max: body.designRange[1],
                            min: body.designRange[0],
                        },
                        pm: {
                            max: body.pmRange[1],
                            min: body.pmRange[0],
                        }
                    },
                    signups: {
                        [uid]: body.contribution
                    }
                }).then(result => {
                    res.status(200).send({msg: "Hack Submitted!"})
                }).catch(err => {
                    res.status(501).send({msg: "Server-side Error. Your hack wasn't saved."})
                })
                break

            // Signup to a specific hack
            case 'signup':
                let { hackId, skill } = JSON.parse(req.body)
                firebase.collection('Submissions').doc(hackId).get()
                    .then(result => {
                        firebase.collection('Submissions').doc(hackId).update({
                            signups: { ...result.data().signups, [uid]: { query: true, skill }}
                        }).then(() => {
                            res.status(202).send("Updated")
                        }).catch(e => {
                            throw e
                        })
                    }).catch(e => { throw e })
        }
    }

    function deleteHandler() {
        let { type, uid } = req.query

        switch(type) {
            // Add a new submission
            case 'submission':
                break

            // Signup to a specific hack
            case 'signup':
                let { hackId } = JSON.parse(req.body)
                firebase.collection('Submissions').doc(hackId).get()
                    .then(result => {
                        let data = result.data().signups
                        delete data[uid]
                        firebase.collection('Submissions').doc(hackId).update({
                            signups: data
                        }).then(() => {
                            res.status(202).send("Updated")
                        }).catch(e => {
                            throw e
                        })
                    }).catch(e => { throw e })
        }
    }
}


/**
 * Manipulating portfolio hack data.
 * @param data Object to be edited
 * @param timeframe past or active
 * @param snapshot Firebase snapshot
 * @param uid
 */
const fetchPortfolio = (data, timeframe, snapshot, uid) => {
    snapshot.forEach(doc => {
        let docData = doc.data()
        docData.date = docData.date.toDate()
        if (docData.submitter === uid) {
            docData.submitter_name = "You";
        }
        data[doc.id] = docData
    })
}