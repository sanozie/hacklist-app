/**
 * Format submission data provided by database to be used on the client
 * @param data
 * @param platform
 * @returns {*}
 */
function formatHackData(data, platform) {
    // Minimums are displayed differently than maximums (totals), so they are put in different places
    const sizeData = {},
        tempDataMin = { eng: 0, design: 0, pm: 0 },
        tempDataTotal = { eng: 0, design: 0, pm: 0 },
        { limits } = data

    let hasIdeator = false
    const quotaFullSkills = {
        eng: false,
        design: false,
        pm: false
    }

    for (const value of Object.values(data.signups)) {
        let { skill } = value
        if (skill !== 'ideator') {
            if (tempDataMin[skill] < limits[skill].min) {
                tempDataMin[skill] += 1
                if (tempDataMin[skill] >= limits[skill].min) {
                    quotaFullSkills[skill] = true
                }
            }

            tempDataTotal[skill] += 1
        } else {
            hasIdeator = true
        }
    }

    for (const key of Object.keys(tempDataMin)) {
        sizeData[key] = {
            minSignups: tempDataMin[key],
            totalSignups: tempDataTotal[key],
            width: (tempDataMin[key] / limits.min) * 100,
            circleFill: (tempDataTotal[key] / limits[key].max) * 100
        }
    }

    let quotaFull = true
    Object.values(quotaFullSkills).forEach(skill => {
        if (!skill) {
            quotaFull = false
        }
    })

    data.quotaFull = quotaFull

    let sizer = Object.keys(data.signups).length - limits.min
    hasIdeator ? sizer-- : null
    sizeData.overflowWidth = sizer / limits.max * 100

    sizeData.circle = (Object.keys(data.signups).length / limits.max) * 100

    data.sizeData = sizeData

    return data
}

export { formatHackData }