import { useDebugValue, useEffect, useState } from 'react'

function useSubmissionForm(state, uid) {
    let [industryState, setIndustry] = useState(state ? state.industry : '')
    let [industryError, setIndustryError] = useState(false)
    let [contributionState, setContribution] = useState(state ? state.signups[uid].skill : '')
    let [contributionError, setContributionError] = useState(false)
    let [hackTitleState, setHackTitle] = useState(state ? state.title : '')
    let [hackTitleError, setHackTitleError] = useState(false)
    let [engRangeState, setEngRange] = useState([
        state ? state.limits.eng.min : 1,
        state ? state.limits.eng.max : 3
    ])
    let [designRangeState, setDesignRange] = useState([
        state ? state.limits.design.min : 1,
        state ? state.limits.design.max : 3
    ])
    let [pmRangeState, setPmRange] = useState([
        state ? state.limits.pm.min : 1,
        state ? state.limits.pm.max : 3
    ])
    let [limits, setLimits] = useState({})

    // Building limit map
    useEffect(() => {
        let limitMap = {
            max: designRangeState[1] + engRangeState[1] + pmRangeState[1],
            min: designRangeState[0] + engRangeState[0] + pmRangeState[0],
            design: {
                max: designRangeState[1],
                min: designRangeState[0]
            },
            eng: {
                max: engRangeState[1],
                min: engRangeState[0]
            },
            pm: {
                max: pmRangeState[1],
                min: pmRangeState[0]
            }
        }
        setLimits(limitMap)
    }, [engRangeState, designRangeState, pmRangeState])

    // Validation
    useEffect(() => {
        setHackTitleError(false)
    }, [hackTitleState])

    useEffect(() => {
        setContributionError(false)
    }, [contributionState])

    useEffect(() => {
        setIndustryError(false)
    }, [industryState])


    let industry = {
            state: industryState,
            setIndustry
        },
        contribution = {
            state: contributionState,
            setContribution
        },
        hackTitle = {
            state: hackTitleState,
            setHackTitle
        },
        engRange = {
            state: engRangeState,
            setEngRange
        },
        designRange = {
            state: designRangeState,
            setDesignRange
        },
        pmRange = {
            state: pmRangeState,
            setPmRange
        },
        hackTitleErr = {
            state: hackTitleError,
            setHackTitleError
        },
        industryErr = {
            state: industryError,
            setIndustryError
        },
        contributionErr = {
            state: contributionError,
            setContributionError
        }

    useDebugValue({ industry, contribution, hackTitle, limits, hackTitleErr, industryErr, contributionErr })

    return { industry, contribution, hackTitle, engRange, designRange, pmRange, limits, hackTitleErr, industryErr, contributionErr }
}

export { useSubmissionForm }