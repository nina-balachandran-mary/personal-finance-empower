/**
 * Shared modal that user will be prompted to fill to create new and
 * update existing trackers
 */

import {Alert, Box, Button, IconButton, Modal, Tooltip} from "@mui/material";
import {ReactNode, useState} from "react";
import {Tracker} from "./types/Tracker";
import {Delete, Edit} from "@mui/icons-material";

export enum ModalMode {
    Create = 'create',
    Update = 'update'
}

interface TrackerModalProps {
    closeModal: () => void
    modalMode: ModalMode
    tracker?: Tracker
    children: ReactNode | null
}

export const TrackerModal = ({children, closeModal, modalMode, tracker}: TrackerModalProps) => {
    const [showModal, setShowModal] = useState(true)
    const [trackerName, setTrackerName] = useState('')
    const [amount, setAmount] = useState(0)
    const [trackerCategory, setTrackerCategory] = useState('')

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const updateTracker = (tracker_id: number | undefined) => {
        if (!tracker_id) {
            return
        }
        fetch('http://localhost:3001/tracker/update', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                tracker_id: tracker_id,
                name: trackerName,
                amount,
                personal_finance_category: trackerCategory
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setShowModal(false)
                }
            }, error => {
                console.error(error)
                // return <Alert severity="error">Unable to edit tracker {trackerName} at this time.</Alert>
            })
    }

    const createTracker = () => {
        fetch('http://localhost:3001/tracker/create', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                name: trackerName,
                amount,
                personal_finance_category: trackerCategory
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setShowModal(false)
                }
            }, error => {
                console.error(error)
                // return <Alert severity="error">Unable to create a tracker at this time.</Alert>
            })
    }

    return (<><Modal onClose={() => setShowModal(false)} open={showModal}>
        <Box sx={modalStyle}>
            <input type="text" value={trackerName} placeholder={'Tracker name'}
                   onChange={(e) => setTrackerName(e.target.value)}/>
            <input type="number" value={amount} placeholder={'Amount'}
                   onChange={(e) => setAmount(parseInt(e.target.value))}/>
            <input type="text" value={trackerCategory}
                   placeholder={'Category'} onChange={(e) => setTrackerCategory(e.target.value)}/>
            {modalMode === ModalMode.Create ? <Button variant="contained" onClick={createTracker}>Save</Button> :
                <Button variant="contained" onClick={() => updateTracker(tracker?.tracker_id)}>Update</Button>}
            <Button variant="outlined" onClick={() => setShowModal(false)}>Cancel</Button>
        </Box>
    </Modal></>)
}