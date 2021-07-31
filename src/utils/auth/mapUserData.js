export const mapUserData = async user => {
    console.log(user.providerData)
    const { uid, email, providerData: [{ displayName, photoURL }] } = user
    const token = await user.getIdToken(true)
    return {
        uid,
        email,
        token,
        displayName,
        photoURL
    }
}