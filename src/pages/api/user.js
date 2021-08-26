import { admin } from 'db/server'

export default async (req, res) => {
    switch(req.method) {
        case 'PUT':
            putHandler()
            break
    }
    function putHandler() {
        const { type } = req.query
        switch (type) {
            case 'users':
                const users = JSON.parse(req.body)
                admin.auth().getUsers(users)
                    .then(userRes => {
                        res.status(202).send(userRes.users)
                    })
                    .catch(e => {
                        throw e
                    })
        }
    }
}