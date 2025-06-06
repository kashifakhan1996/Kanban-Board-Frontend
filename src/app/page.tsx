"use client"

import { useEffect, useState } from "react";
import { deleteTask, fetchTasks, updateTask } from "@/utils/api";
import { Task } from "@/types/types";
import { Container, Grid, Typography } from "@mui/material";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import KanbanColumns from "@/components/KanbanColumns";

const columns = ['Not Started', 'In Progress', 'Blocked', 'Done'] as const;

export default function Home() {
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
        Kanban Board
      </Typography>
      <DndContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
           {columns.map((col) => (
            <Grid item key={col} xs={12} sm={6} md={3}>
              <KanbanColumns
                title={col}
                tasks={tasks.filter(t => t.column === col)}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </DndContext>
    </Container>
  );
}
