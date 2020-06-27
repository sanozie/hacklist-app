import firebase from '../../lib/db'

export default async (req, res) => {
    firebase.auth().onAuthStateChanged()
}
