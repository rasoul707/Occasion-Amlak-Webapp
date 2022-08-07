/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Zoom, List } from "@mui/material"
import * as React from 'react';
import FileItem from "../FileItem";


const FilesList = ({ files, appBar }) => {
    return (
        <Zoom in={true} mountOnEnter unmountOnExit style={{ transitionDelay: '100ms' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
                <Box sx={{ maxWidth: 400, width: 400, }}>
                    {appBar}
                    <Box sx={{ p: 3, pt: 0, pb: 0 }}>
                        <List>
                            {
                                files.map((data, index) => {
                                    return <FileItem
                                        index={index}
                                        data={data}
                                    />
                                })
                            }
                        </List>
                    </Box>
                </Box>
            </Box>
        </Zoom>
    )
}


export default FilesList