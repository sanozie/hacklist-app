import firebase from '../../lib/db'

export default async (req, res) => {
    let date = new Date()
    let queryDate;
    switch(req.query.timeline) {
        case 'week':
            queryDate = date.setDate(date.getDate() - 7)
            break;
        case 'mon':
            queryDate = date.setDate(date.getMonth() - 1)
            break;
        case '3mon':
            queryDate = date.setDate(date.getMonth() - 3)
            break;
        case '6mon':
            queryDate = date.setDate(date.getMonth() - 6)
            break;
    }

    firebase.collection('Submissions').where('submit_date', '<', new Date()).where('submit_date', '>', new Date(queryDate)).get()
        .then(snapshot => {
            let data=[]
            snapshot.forEach(item => {
                data.push(item.data())
            })
            res.send(data)
        })
}