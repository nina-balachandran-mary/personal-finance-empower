import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {Tracker} from "./types/Tracker";
import {Category} from "./types/Category";

interface TrackerModalProps {
    categories: Category[],
    modalMode: ModalMode,
    closeModal: () => void,
    onUpdate: () => void,
    tracker?: Tracker
}

export enum ModalMode {
    Create = 'create',
    Update = 'update'
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid grey',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
};

export const TrackerModal = ({categories, modalMode, closeModal, onUpdate, tracker}: TrackerModalProps) => {
    const [trackerName, setTrackerName] = useState('')
    const [amount, setAmount] = useState(0)
    const [trackerCategory, setTrackerCategory] = useState('')
    const [trackerId, setTrackerId] = useState(0)

    useEffect(() => {
        if (modalMode === ModalMode.Update && tracker) {
            setAmount(tracker.amount)
            setTrackerCategory(tracker.personal_finance_category)
            setTrackerName(tracker.name)
            setTrackerId(tracker.tracker_id)
        }
    }, [tracker])

    const validateForm = () => {
        return trackerName.length > 0 &&
            amount >= 0 &&
            trackerCategory.length > 0;
    }

    const updateTracker = (trackerId: number | undefined) => {
        if (!trackerId) {
            return
        }

        fetch('http://localhost:3001/tracker/update', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                tracker_id: trackerId,
                name: trackerName,
                amount,
                personal_finance_category: trackerCategory
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    onUpdate()
                    closeModal()
                }
            }, error => {
                console.error('Unable to update tracker', error)
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
                    onUpdate()
                    closeModal()
                }
            }, error => {
                console.error('Unable to create tracker', error)
            })
    }

    return (<Modal onClose={closeModal} open={true}>
        <Box sx={modalStyle}>
            <FormControl fullWidth>
                <TextField id="tracker-name" label="Name" variant="outlined" value={trackerName}
                           onChange={(e) => setTrackerName(e.target.value)}/>
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    id="tracker-amount"
                    label="Amount"
                    type="number"
                    value={amount || 0}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="tracker-category-label">Category</InputLabel>
                <Select
                    labelId="tracker-category-label"
                    id="tracker-category"
                    value={trackerCategory}
                    label="category"
                    onChange={(e) => setTrackerCategory(e.target.value)}
                >
                    {categories.map((c, i) => <MenuItem key={i} value={c.name}>{c.pretty_name}</MenuItem>)}
                </Select>
            </FormControl>

            <Box sx={{display: 'flex', gap: 2}}>{modalMode === ModalMode.Create ?
                <Button variant="contained" disabled={!validateForm()} onClick={createTracker}>Save</Button> :
                <Button variant="contained" onClick={() => updateTracker(trackerId)}>Update</Button>}
                <Button variant="outlined" onClick={closeModal}>Cancel</Button></Box>
        </Box>
    </Modal>)
}