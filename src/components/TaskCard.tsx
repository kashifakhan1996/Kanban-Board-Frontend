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
        <Card variant="outlined" sx={{mb:1,backgroundColor:task.dueDate?'#fffbe6' : 'white', transition: 'all 0.3s ease'}}>
            <CardContent sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                    <Typography fontWeight="bold">
                        {task.title}
                    </Typography>
                    {task.dueDate && (
                        <Typography variant="caption" color="error">
                            Due: {task.dueDate}
                        </Typography>
                    )}
                    {task.subtasks && (
                        <ul style={{ paddingLeft: '1.2em', marginTop: 4, marginBottom: 0 }}>
                        {task.subtasks.map((subtask, i) => (
                            <li key={i} style={{ fontSize: '0.8em', color: '#555' }}>{subtask}</li>
                        ))}
                        </ul>
                    )}
                </div>
                <IconButton onClick={()=>onDelete(task.id)}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </CardContent>
        </Card>
    )
}
