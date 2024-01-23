import {useEffect, useRef, useState} from "react";
import {Tracker} from "./types/Tracker";
import {Box, Button, IconButton, LinearProgress, Modal, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Delete, Edit, SaveAlt} from "@mui/icons-material";

export enum ModalMode {
    Create = 'create',
    Update = 'update'
}

export const Trackers = () => {
    const [trackers, setTrackers] = useState<Tracker[]>([])
    const [invalidateTrackers, setInvalidateTrackers] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalMode, setModalMode] = useState(ModalMode.Create)
    const [trackerName, setTrackerName] = useState('')
    const [amount, setAmount] = useState(0)
    const [trackerCategory, setTrackerCategory] = useState('')
    const currentTrackerId = useRef(0)

    const style = {
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

    useEffect(() => {
        fetch('http://localhost:3001/tracker/get')
            .then(response => response.json())
            .then(jsonData => {
                setTrackers(jsonData)
                setInvalidateTrackers(false)
            })
    }, [invalidateTrackers])

    const deleteTracker = (id: number) => {
        fetch('http://localhost:3001/tracker/delete', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                tracker_id: id
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    setInvalidateTrackers(true)
                }
            }, error => {
                console.log('oops', error)
            })
    }

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
                    setInvalidateTrackers(true)
                    setShowModal(false)
                }
            }, error => {
                console.log('oops', error)
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
                    setInvalidateTrackers(true)
                    setShowModal(false)
                }
            }, error => {
                console.log('oops', error)
            })
    }

    const showUpdateModal = (tracker: Tracker) => {
        currentTrackerId.current = tracker.tracker_id
        setTrackerName(tracker.name)
        setAmount(tracker.amount)
        setTrackerCategory(tracker.personal_finance_category)
        setModalMode(ModalMode.Update)
        openModal()
    }

    const showCreateModal = () => {
        currentTrackerId.current = 0
        setModalMode(ModalMode.Create)
        resetTrackerForm()
        openModal()
    }

    const resetTrackerForm = () => {
        setTrackerName('')
        setAmount(0)
        setTrackerCategory('')
    }

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const getTrackerValue = () => {
        return 0
    }

    return <div>{trackers.length > 0 ? trackers.map(tracker => <div
            key={tracker.tracker_id}>{tracker.name} {tracker.amount} {tracker.personal_finance_category} {tracker.created_at}
            <Tooltip title="Update">
                <IconButton onClick={() => showUpdateModal(tracker)}>
                    <Edit/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={() => deleteTracker(tracker.tracker_id)}>
                    <Delete/>
                </IconButton>
            </Tooltip>
        </div>) :
        <p>No trackers found</p>}
        <Button onClick={showCreateModal}>Add new tracker</Button>
        <Modal onClose={closeModal} open={showModal}>
            <Box sx={style}>
                <input type="text" value={trackerName} placeholder={'Tracker name'}
                       onChange={(e) => setTrackerName(e.target.value)}/>
                <input type="number" value={amount} placeholder={'Amount'}
                       onChange={(e) => setAmount(parseInt(e.target.value))}/>
                <input type="text" value={trackerCategory}
                       placeholder={'Category'} onChange={(e) => setTrackerCategory(e.target.value)}/>
                {modalMode === ModalMode.Create ? <Button variant="contained" onClick={createTracker}>Save</Button> :
                    <Button variant="contained" onClick={() => updateTracker(currentTrackerId.current)}>Update</Button>}
                <Button variant="outlined" onClick={closeModal}>Cancel</Button>
            </Box>
        </Modal>
    </div>
}