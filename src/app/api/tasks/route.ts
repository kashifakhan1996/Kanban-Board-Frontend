import { NextApiRequest,NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

let tasks = [
  { id: '1', title: 'Take Coco to a vet', column: 'Not Started', dueDate: '2025-04-11' },
  { id: '2', title: 'Accountant contract', column: 'In Progress' },
  { id: '3', title: 'Request moving estimate', column: 'Blocked' },
  { id: '4', title: 'Nothing to be done 🙂', column: 'Done' },
];


export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newTask = { id: Date.now().toString(), ...body };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, ...updated } = body;
  tasks = tasks.map((t) => (t.id === id ? { ...t, ...updated } : t));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  tasks = tasks.filter((t) => t.id !== body.id);
  return NextResponse.json({ success: true });
}

