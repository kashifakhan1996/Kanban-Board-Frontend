import { Task } from "@/types/types";
import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

interface Props{
    title: string,
    tasks:Task[],
    onDelete:(id:String)=>void
}
// Add this mapping at the top of the file
const columnStyles: Record<string, { bg: string; color: string }> = {
  'Not Started': { bg: '#e0e0e0', color: '#424242' }, // grey
  'In Progress': { bg: '#e1bee7', color: '#6a1b9a' },  // purple
  'Blocked': { bg: '#ffcdd2', color: '#c62828' },      // red
  'Done': { bg: '#c8e6c9', color: '#2e7d32' },         // green
};


export default function KanbanColumns ({title,tasks,onDelete}:Props){
  const { setNodeRef } = useDroppable({ id: title });
  return(
    <Box ref={setNodeRef} sx={{width:250,p:1,border:'1px solid #ccc', borderRadius: 2}}>
        <Box
            sx={{
            backgroundColor: columnStyles[title].bg,
            color: columnStyles[title].color,
            px: 2,
            py: 1,
            borderRadius: '30px',
            textAlign: 'center',
            fontWeight: 600,
            mb: 2,
            }}
        >
            {title}
        </Box>
        {tasks && tasks.map((task:Task)=>(
            <TaskCard task={task} onDelete={onDelete}/>
        ))}       
    </Box>
  )
}