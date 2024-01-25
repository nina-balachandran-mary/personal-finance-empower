import React, {useEffect, useRef, useState} from "react";
import {Tracker} from "./types/Tracker";
import {
    Box,
    Button,
    Alert,
} from "@mui/material";
import {WeeklyReport} from "./types/WeeklyReport";
import {Category} from "./types/Category";
import {TrackerTable} from "./TrackerTable";
import {ModalMode, TrackerModal} from "./TrackerModal";


export const Trackers = () => {
    const [trackers, setTrackers] = useState<Tracker[]>([])
    const [invalidateTrackers, setInvalidateTrackers] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState(ModalMode.Create)
    const [report, setReport] = useState<WeeklyReport>({data: {}, iso_currency_code: null})
    const [categories, setCategories] = useState<Category[]>([])
    const currentTrackerId = useRef(0)

    useEffect(() => {
        fetch('http://localhost:3001/tracker/get')
            .then(response => response.json())
            .then(jsonData => {
                setTrackers(jsonData)
                setInvalidateTrackers(false)
            })

        fetch('http://localhost:3001/weeklyExpenses')
            .then(res => res.json())
            .then(jsonData => setReport(jsonData))
            .catch(error => {
                console.error(error)
            })
    }, [invalidateTrackers])

    useEffect(() => {
        fetch('http://localhost:3001/categories')
            .then(res => res.json())
            .then(jsonData => {
                setCategories(jsonData)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    const showUpdateModal = (tracker: Tracker) => {
        currentTrackerId.current = tracker.tracker_id
        setModalMode(ModalMode.Update)
        openModal()
    }

    const showCreateModal = () => {
        currentTrackerId.current = 0
        setModalMode(ModalMode.Create)
        openModal()
    }

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const onTrackerMutate = () => {
        setInvalidateTrackers(true)
    }

    return <Box sx={{p: 4, display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button style={{justifyContent: 'end'}} variant="contained" onClick={showCreateModal}>
                Add new tracker
            </Button>
        </Box>
        <Box marginTop={4}>
            {trackers.length > 0 ? <TrackerTable trackers={trackers} expenses={report} onMutate={onTrackerMutate}
                                                 onUpdate={showUpdateModal}/> :
                <Alert severity="info">No trackers found.</Alert>}
            {showModal && <TrackerModal categories={categories} modalMode={modalMode} closeModal={closeModal}
                                        onUpdate={onTrackerMutate}
                                        tracker={trackers.filter(t => t.tracker_id === currentTrackerId.current)[0]}/>}
        </Box>
    </Box>
}