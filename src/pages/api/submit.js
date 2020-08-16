import firebase from '../../lib/db'

export default async (req, res) => {
    let body = JSON.parse(req.body)
    //Remember to generate a random hack title if there is none
    firebase.collection('Submissions').add({
        submitter_name: body.submitter_name,
        submitter: body.submitter,
        submitter_skill: body.contribution,
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
        signups: {}
        
    }).then(result => {
        res.status(200).send({msg: "Hack Submitted!"})
    }).catch(err => {
        res.status(501).send({msg: "Server-side Error. Your hack wasn't saved."})
    })
}
