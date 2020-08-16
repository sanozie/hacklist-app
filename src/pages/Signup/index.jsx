import { useState, useEffect, useRef } from 'react'
import Router, { useRouter } from 'next/router'

//swr (data-loading module)
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//Material UI
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';

//Local
import Layout from '../../components/Layout'
import styles from './Signup.module.scss'
import TextField from "@material-ui/core/TextField";
import {DesignChip, EngChip, MaterialStyles, PMChip, Tag, HtmlTooltip} from "../../lib/MaterialStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import Hack from './Hack'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        transition: '0.2s ease-in-out',
        "& .slider-label": {
            color: "rgba(255,255,255,0.5)"
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

//Styles
let addIcon = makeStyles({
    root: {
        color: "white",
        opacity: 0.5
    }
})


let Signup = () => {
    //Style Hooks
    let classes = useStyles();
    let addIconClass = addIcon();

    //Data Hooks
    let [hacks, setHacks] = useState([])
    let [filteredHacks, setFilteredHacks] = useState([])

    //Filter Hooks
    let [industry, setIndustry] = useState(['Marketing'])
    let [newIndustry, setNewIndustry] = useState('')
    let [timeline, setTimeline] = useState('6mon')
    let [skills, setSkills] = useState([])
    let [tags, setTags] = useState(["Website", "Mobile App", "App"])
    let [newTag, setNewTag] = useState('')

    //Popover Hooks (tags)
    let addTagEl = useRef(null)
    let [openPopoverTag, setOpenPopoverTag] = useState(false)
    let [popoverAnchorTag, setPopoverAnchorTag] = useState(null)
    //Popover Hooks (industry)
    let addIndustryEl = useRef(null)
    let [openPopoverIndustry, setOpenPopoverIndustry] = useState(false)
    let [popoverAnchorIndustry, setPopoverAnchorIndustry] = useState(null)

    //Fetching initial data from Firebase
    useEffect(() => {
        fetch(`/api/submissions?timeline=${timeline}`)
            .then(res => res.json())
            .then(res => {
                setHacks(res)
                setFilteredHacks(res)
            })
    }, [])


    //Filter methods
    let handleSkill = val => {
        if(skills.includes(val)) {
            setSkills(skills.filter(item => item !== val))
        } else {
            setSkills([...skills, val])
        }
    }

    //Industry tags
    let handleAddIndustry = () => {
        setOpenPopoverIndustry(true)
        setPopoverAnchorIndustry(addIndustryEl.current)
    }
    let handleAddIndustryEnter = el => {
        //keyCode 13 is the Enter key
        if(el.keyCode === 13) {
            setIndustry([...industry, newIndustry])
            handleCloseAddIndustry()
        }
    }
    let handleCloseAddIndustry = () => {
        setOpenPopoverIndustry(false)
        setPopoverAnchorIndustry(null)
    }

    let deleteIndustry = val => {
        if(industry.includes(val)) {
            setIndustry(industry.filter(item => item !== val))
        }
    }

    //Tag methods
    let handleAddTag = () => {
        setOpenPopoverTag(true)
        setPopoverAnchorTag(addTagEl.current)
    }
    let handleAddTagEnter = el => {
        //keyCode 13 is the Enter key
        if(el.keyCode === 13) {
            setTags([...tags, el.target.value])
            handleCloseAddTag()
        }
    }
    let handleCloseAddTag = () => {
        setOpenPopoverTag(false)
        setPopoverAnchorTag(null)
    }

    let deleteTag = val => {
        if(tags.includes(val)) {
            setTags(tags.filter(item => item !== val))
        }
    }



    return (
        <Layout title="Signup | DIYHacks" nav={true}>
            <Container className={styles.body}>
                <Row className="mt-5 pt-5">
                    <Col className="text-center">
                        <h1>SUBMIT A HACK</h1>
                    </Col>
                </Row>
                <Row className="flex-grow-1">
                    <Col xs="4">
                        <Row>
                            <Col>
                                <Row className="justify-content-center">
                                    <h2>Filters</h2>
                                </Row>
                                <Row>
                                    <FormControl required variant="outlined" className={`${classes.formControl} w-100`}>
                                        <TextField
                                            className={MaterialStyles().classesInput.root}
                                            variant="outlined"
                                            value={timeline}
                                            onChange={e => { setTimeline(e.target.value) }}
                                            label="Timeline"
                                            size="small"
                                            select
                                        >
                                            <MenuItem value="week">Past Week</MenuItem>
                                            <MenuItem value="mon">Past Month</MenuItem>
                                            <MenuItem value="3mon">Past 3 Months</MenuItem>
                                            <MenuItem value="6mon">Past 6 Months</MenuItem>
                                        </TextField>
                                    </FormControl>
                                </Row>
                                <Row className="justify-content-center mt-3 mb-1">
                                    <h4>Industry</h4>
                                    <AddIcon ref={addIndustryEl} onClick={handleAddIndustry} fontSize="small" className={addIconClass.root} aria-describedby="addindustry"/>
                                    <Popover
                                        id="addindustry"
                                        open={openPopoverIndustry}
                                        anchorEl={popoverAnchorIndustry}
                                        onClose={handleCloseAddIndustry}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <FormControl required variant="outlined" className={`${classes.formControl} w-100`}>
                                            <TextField
                                                variant="outlined"
                                                value={newIndustry}
                                                onChange={e => { setNewIndustry(e.target.value) }}
                                                onKeyDown={e => {handleAddIndustryEnter(e)}}
                                                label="Industry"
                                                size="small"
                                                select
                                            >
                                                <MenuItem value='Marketing'>Marketing</MenuItem>
                                                <MenuItem value='Recruitment & Staffing'>Recruitment & Staffing</MenuItem>
                                            </TextField>
                                        </FormControl>
                                    </Popover>
                                </Row>
                                <Row>
                                    {industry.map(item => (
                                            <Tag
                                                label={item}
                                                onDelete={() => deleteIndustry(item)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )
                                    )}
                                </Row>
                                <Row className="justify-content-center mt-4">
                                    <h4>Skills</h4>
                                </Row>
                                <Row className="justify-content-center">
                                    <EngChip
                                        label="Engineering"
                                        onClick={() => handleSkill('eng')}
                                        variant="outlined"
                                        color={skills.includes('eng') || (skills === []) ? 'secondary' : 'primary'}
                                    />
                                    <DesignChip
                                        label="Design"
                                        onClick={() => handleSkill('design')}
                                        variant="outlined"
                                        color={skills.includes('design') || (skills === []) ? 'secondary' : 'primary'}
                                    />
                                    <PMChip
                                        label="Product Management"
                                        onClick={() => handleSkill('pm')}
                                        variant="outlined"
                                        color={skills.includes('pm') || (skills === []) ? 'secondary' : 'primary'}
                                    />
                                </Row>
                                <Row className="justify-content-center mt-3 mb-1">
                                    <h4>Tags</h4>
                                    <AddIcon ref = {addTagEl} onClick={handleAddTag} fontSize="small" className={addIconClass.root} aria-describedby="addtag"/>
                                    <Popover
                                        id="addtag"
                                        open={openPopoverTag}
                                        anchorEl={popoverAnchorTag}
                                        onClose={handleCloseAddTag}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <FormControl required variant="outlined" className={classes.formControl}>
                                            <TextField
                                                variant="outlined"
                                                value={newTag}
                                                onChange={e => { setNewTag(e.target.value) }}
                                                onKeyDown={e => {handleAddTagEnter(e)}}
                                                label="New Tag"
                                                size="small"
                                            />
                                        </FormControl>
                                    </Popover>
                                </Row>
                                <Row>
                                    {tags.map(item => (
                                            <Tag
                                                label={item}
                                                onDelete={() => deleteTag(item)}
                                                size="small"
                                                variant="outlined"
                                            />
                                        )
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="8">
                        <Row>
                            <Hack/>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup