import { NextApiRequest,NextApiResponse } from "next";

let tasks = [
  { id: '1', title: 'Take Coco to a vet', column: 'Not Started', dueDate: '2025-04-11' },
  { id: '2', title: 'Accountant contract', column: 'In Progress' },
  { id: '3', title: 'Request moving estimate', column: 'Blocked' },
  { id: '4', title: 'Nothing to be done 🙂', column: 'Done' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const newTask = { id: Date.now().toString(), ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'PUT') {
    const { id, ...updated } = req.body;
    tasks = tasks.map((t) => (t.id === id ? { ...t, ...updated } : t));
    res.status(200).json({ success: true });
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    tasks = tasks.filter((t) => t.id !== id);
    res.status(200).json({ success: true });
  }
}
