import {Box, Tabs, Tab} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {Link} from "react-router-dom"

export const Navigation = () => {
    const [tab, setTab] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="Home" component={Link} to={"/"}/>
                    <Tab label="Accounts" component={Link} to={"/accounts"}/>
                    <Tab label="Trackers" component={Link} to={"/trackers"}/>
                </Tabs>
            </Box>
        </Box>
    );
}
