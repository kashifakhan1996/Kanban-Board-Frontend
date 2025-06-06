"use client"

import { useEffect, useState } from "react";
import { deleteTask, fetchTasks, updateTask } from "@/utils/api";
import { Task } from "@/types/types";
import { Container, Grid, Typography } from "@mui/material";
import KanbanColumns from "@/components/KanbanColumns";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';


const columns = ['Not Started', 'In Progress', 'Blocked', 'Done'] as const;

export default function Home() {
  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
);
  const [tasks,setTasks] = useState<Task[]>([])
  useEffect(()=>{
    fetchTasks().then(setTasks)
  },[])
  const handleDelete = async (id: string): Promise<void> =>{
    await deleteTask(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.data.current?.column === over.id) return;
    const updated = tasks.map(t => t.id === active.id ? { ...t, column: over.id as Task['column'] } : t);
    setTasks(updated);
    updateTask({
      ...active.data.current, column: over.id as Task['column'],
      id: "",
      title: ""
    });
  };

  return (
    <Container sx={{mt:4}}>
      <Typography variant="h4" gutterBottom>
        Personal
      </Typography>
      <span>
        A board to keep track of personal tasks
      </span>
      
        <Grid container spacing={2} sx={{mt:4,backgroundColor:'#F0F0F0',p:2,borderRadius:1}} >
           <DndContext  sensors={sensors}
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}>
           {columns.map((col) => (
              <KanbanColumns
                title={col}
                tasks={tasks.filter(t => t.column === col)}
                onDelete={handleDelete}
              />
          ))}
          </DndContext>
        </Grid>
      
    </Container>
  );
}
