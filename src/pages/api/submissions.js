// Database
import firebase from 'db/server'

// Utils
import { formatSubmissionData } from 'utils/formatdata'
import dateMap from 'utils/datemap'


export default async (req, res) => {
    let queryDate = dateMap(req.query.timeline)

    firebase.collection('Submissions')
        .where('submit_date', '<', new Date())
        .where('submit_date', '>', new Date(queryDate)).get()
        .then(snapshot => {
            let data=[]
            snapshot.forEach(item => {
                let docData = item.data()
                docData.hackId = item.id
                data.push(formatSubmissionData(docData))
            })
            console.log(data)
            res.send(data)
        })
}