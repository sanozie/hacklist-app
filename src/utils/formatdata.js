function formatSubmissionData(data, platform) {
    let sizeData = {}, tempDataMin = { eng: 0, design: 0, pm: 0 }, tempDataTotal = { eng: 0, design: 0, pm: 0 }, { limits } = data;
    for (let [key, value] of Object.entries(data.signups)) {
        let { skill } = value
        if (tempDataMin[skill] < limits[skill].min) {
            tempDataMin[skill] += 1
        }
        tempDataTotal[skill] += 1
    }
    for (let [key, value] of Object.entries(tempDataMin)) {
        sizeData[key] = {
            min_signup_num: tempDataMin[key],
            total_signup_num: tempDataTotal[key],
            width: (tempDataMin[key] / limits.min) * 100,
            circleFill: (tempDataTotal[key] / limits[key].max) * 100
        }
    }
    sizeData.overflow_width = (Object.keys(data.signups).length - limits.min) / limits.max * 100
    data.sizeData = sizeData;
    if (platform === 'server') {
        data.submit_date = data.submit_date.toDate()
    }
    return data
}

function formatSignupData(data, platform) {
    //find a way to display the min signups while also accounting for signups outside of mins (where min=0)
    let { limits } = data;
    data.circle = (Object.keys(data.signups).length / limits.max) * 100
    return formatSubmissionData(data, platform)
}

export {formatSignupData, formatSubmissionData}