export const mapUserData = async (user) => {
    const { uid, email, providerData: [{ displayName }] } = user
    const token = await user.getIdToken(true)
    return {
        uid,
        email,
        token,
        displayName
    }
}