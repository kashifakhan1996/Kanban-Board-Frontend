import { Card,CardContent,Typography,IconButton } from "@mui/material";
import { Task } from "@/types/types";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

interface Props {
    task:Task,
    onDelete : (id: string)=> void
}

export default function TaskCard ({ task, onDelete }: Props) {
    return(
        <Card variant="outlined" sx={{mb:1,backgroundColor:task.dueDate?'#fffbe6' : '#ffffff', transition: 'all 0.3s ease'}}>
            <CardContent sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                    <Typography>
                        {task.title}
                    </Typography>
                    {task.dueDate && (
                        <Typography variant="caption" color="error">
                            Due: {task.dueDate}
                        </Typography>
                    )}
                </div>
                <IconButton onClick={()=>onDelete(task.id)}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </CardContent>
        </Card>
    )
}
