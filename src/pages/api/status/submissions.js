import firebase from '../../../lib/db'

export default async (req, res) => {
    firebase.collection("Submissions").where("submitter", "==", `${req.query.uid}`).orderBy('submit_date', 'desc').get().then(snapshot => {
        if (snapshot.empty) {
            res.status(204).send("No Submissions")
        } else {
            let docs = []
            snapshot.forEach(doc => {
                docs.push(formatData(doc.data()))
            })
            res.status(200).json(docs)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Server-Side Error")
    })
}

function formatData(data) {
    let sizeData = {}, tempData = {eng: 0, design: 0, pm: 0};
    for(let [key, value] of Object.entries(data.signups)) {
        let {skill} = value
        tempData[skill] += 1
    }

    let { limits } = data;
    for(let [key,value] of Object.entries(tempData)) {
        sizeData[key] = {
            width: (value/limits.min)*100,
            circleFill: (value/limits[key].max)*100
        }
    }
    
    data.sizeData = sizeData;
    return data
}