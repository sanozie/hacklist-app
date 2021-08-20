import firebase from 'db/server'
import { formatSignupData, formatSubmissionData } from 'utils/data/formatdata'
import dateMap from 'utils/data/datemap'


export default async (req, res) => {
    // TODO: Convert handlers to async/await syntax
    switch(req.method) {
        case 'GET':
            getHandler()
            break
        case 'POST':
            postHandler()
            break
        case 'DELETE':
            deleteHandler()
            break
        case 'PUT':
            putHandler()
    }

    function getHandler() {
        const { type, uid, hackId } = req.query
        switch(type) {
            // Get submissions from users (indexed by submission date)
            case 'submissions':
                const queryDate = dateMap(req.query.timeline)
                firebase.collection('Submissions')
                    .where('submit_date', '<', new Date())
                    .where('submit_date', '>', new Date(queryDate)).get()
                    .then(snapshot => {
                        res.status(200).send(formatDBSubmissionData(snapshot))
                    })
                break

            // Get all submissions submitted by current user
            case 'usersubmissions':
                firebase.collection('Submissions')
                    .where('submitter', '==', uid)
                    .orderBy('submit_date', 'desc')
                    .get()
                    .then(snapshot => {
                        res.status(200).send(formatDBSubmissionData(snapshot))
                    })
                break

            // Get active and archived hacks of current user
            case 'portfolio':
                const data = { actives: {}, archive: {} }

                let activesHandler = firebase.collection('Actives')
                    .where('members', 'array-contains', uid)
                    .get()
                    .then(activeSnapshot => {
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
                    .where(`signups.${uid}.query`, '==', true)
                    .get()
                    .then(snapshot => {
                        res.status(200).send(formatDBSignupData(snapshot))
                    })
                break

            case 'submission':
                firebase.collection('Submissions')
                    .where('id', '==', hackId)
                    .get()
                    .then(snapshot => {
                        res.status(200).send(formatDBSubmissionData(snapshot))
                    })
        }
    }

    function postHandler() {
        const { type, uid } = req.query

        switch(type) {
            // Add a new submission.
            case 'submission':
                const body = JSON.parse(req.body)
                const hack = {
                    submitter_name: body.submitter_name,
                    submitter: body.submitter,
                    title: body.hackTitle,
                    submit_date: new Date(),
                    industry: body.industry,
                    limits: body.limits,
                    signups: {
                        [uid]: {
                            skill: body.contribution,
                            query: true
                        }
                    }
                }

                firebase.collection('Submissions').add(hack).then(result => {
                    const { id } = result
                    res.status(200).send({ hackId: id, hackData: formatSubmissionData(hack,'client' ) })
                }).catch(err => {
                    res.status(501).send({msg: "Server-side Error. Your hack wasn't saved."})
                })
                break;
        }
    }

    function putHandler() {
        const { type, uid } = req.query

        switch(type) {
            // Update a submission
            case 'submission':
                const body = JSON.parse(req.body)
                const hackUpdate = {
                    title: body.hackTitle,
                    industry: body.industry,
                    limits: body.limits,
                    signups: { ...body.signups, [uid]: { query: true, skill: body.contribution }}
                }

                //Remember to generate a random hack title if there is none
                firebase.collection('Submissions').doc(body.hackId).update(hackUpdate).then(() => {
                    res.status(202).send({ hackId: body.hackId, hackData: hackUpdate })
                }).catch(e => {
                    throw e
                })
                break;

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
        let { hackId } = JSON.parse(req.body)

        switch(type) {
            // Delete a submission
            case 'submission':
                firebase.collection('Submissions').doc(hackId).delete().then(() => {
                    res.status(202).send()
                }).catch(e => {
                    console.error("Error removing document: ", e);
                })
                break

            // Withdraw from a signup
            case 'signup':
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
function fetchPortfolio(data, timeframe, snapshot, uid)  {
    snapshot.forEach(doc => {
        let docData = doc.data()
        docData.date = docData.date.toDate()
        if (docData.submitter === uid) {
            docData.submitter_name = "You";
        }
        data[doc.id] = docData
    })
}

function formatDBSubmissionData(snapshot) {
    let data = {}
    snapshot.forEach(doc => {
        data[doc.id] = formatSubmissionData(doc.data(), 'server')
    })
    return data
}

function formatDBSignupData(snapshot) {
    let data = {}
    snapshot.forEach(doc => {
        data[doc.id] = formatSignupData(doc.data(), 'server')
    })
    return data
}