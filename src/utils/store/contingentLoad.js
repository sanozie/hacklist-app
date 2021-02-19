/**
 * Function to load data from local storage / api if Context is not available
 * @param {'submissions' | 'signpus' } key
 * @param state
 * @param dispatch
 * @param {string} api
 * @returns {Promise<void>}
 */
export default async function contingentLoad(key, state, dispatch, api) {
    let local = JSON.parse(localStorage.getItem(key))
    if (state !== null) {
        return
    } else if (local) {
        dispatch({type: 'replace', data: local })
    } else {
        //TODO: Fetch is not working, fix later
        let data = await fetch(api).json()
        dispatch({type: 'replace', data })
    }
}