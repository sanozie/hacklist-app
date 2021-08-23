/**
 * Format submission data provided by database to be used on the client
 * @param data
 * @param platform
 * @returns {*}
 */
function formatSubmissionData(data, platform) {
    // Minimums are displayed differently than maximums (totals), so they are put in different places
    const sizeData = {},
        tempDataMin = { eng: 0, design: 0, pm: 0 },
        tempDataTotal = { eng: 0, design: 0, pm: 0 },
        { limits } = data

    for (const value of Object.values(data.signups)) {
        let { skill } = value
        if (tempDataMin[skill] < limits[skill].min) {
            tempDataMin[skill] += 1
        }
        tempDataTotal[skill] += 1
    }

    for (const key of Object.keys(tempDataMin)) {
        sizeData[key] = {
            minSignups: tempDataMin[key],
            totalSignups: tempDataTotal[key],
            width: (tempDataMin[key] / limits.min) * 100,
            circleFill: (tempDataTotal[key] / limits[key].max) * 100
        }
    }
    sizeData.overflowWidth = (Object.keys(data.signups).length - limits.min) / limits.max * 100
    data.sizeData = sizeData;
    if (platform === 'server') {
        data.submit_date = data.submit_date.toDate()
    }
    return data
}

/**
 * Format signup data retrieved from database to be used on dashboard
 * @param data
 * @param platform
 * @returns {*}
 */
function formatSignupData(data, platform) {
    //find a way to display the min signups while also accounting for signups outside of mins (where min=0)
    let { limits } = data;
    data.circle = (Object.keys(data.signups).length / limits.max) * 100
    return formatSubmissionData(data, platform)
}

export { formatSignupData, formatSubmissionData }