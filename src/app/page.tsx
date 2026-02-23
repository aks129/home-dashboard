"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckSquare, ShoppingBasket, CloudSun, Clock, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Dashboard() {
  const [currentTime, setCurrentTime] = React.useState<Date | null>(null)
  
  // Tasks State
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Pay utility bill', done: false },
    { id: 2, text: 'Call Grandma', done: false },
    { id: 3, text: 'Water plants', done: true },
  ])
  const [newTask, setNewTask] = React.useState('')

  // Groceries State
  const [groceries, setGroceries] = React.useState([
    { id: 1, text: 'Milk' },
    { id: 2, text: 'Eggs' },
    { id: 3, text: 'Bananas' },
    { id: 4, text: 'Coffee Filters' },
  ])
  const [newGrocery, setNewGrocery] = React.useState('')

  React.useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }])
    setNewTask('')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const handleAddGrocery = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGrocery.trim()) return
    setGroceries([...groceries, { id: Date.now(), text: newGrocery }])
    setNewGrocery('')
  }

  const handleDeleteGrocery = (id: number) => {
    setGroceries(groceries.filter(g => g.id !== id))
  }

  if (!currentTime) return null // Prevent hydration mismatch on time

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-slate-100 p-6 text-slate-900 font-sans">
      
      {/* Top Bar: Greetings & Status */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Good Morning, Family!</h1>
          <p className="text-xl text-slate-500">{formattedDate}</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <CloudSun className="w-6 h-6 text-yellow-500" />
            <span className="text-xl font-medium">72°F</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-800 text-white px-6 py-2 rounded-full shadow-md">
            <Clock className="w-5 h-5" />
            <span className="text-2xl font-bold tracking-widest">{formattedTime}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
        
        {/* Left Column: Calendar / Schedule */}
        <div className="col-span-8 flex flex-col gap-6">
          <Card className="flex-1 bg-white border-none shadow-lg overflow-hidden flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-slate-700">
                <Calendar className="w-6 h-6 text-blue-500" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 overflow-y-auto flex-1">
              {/* Mock Events */}
              {[
                { time: "08:00 AM", title: "Kids Drop-off", color: "bg-blue-50 border-l-4 border-blue-500 text-blue-700" },
                { time: "10:30 AM", title: "Grocery Run", color: "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700" },
                { time: "04:00 PM", title: "Soccer Practice", color: "bg-orange-50 border-l-4 border-orange-500 text-orange-700" },
                { time: "06:30 PM", title: "Family Dinner", color: "bg-purple-50 border-l-4 border-purple-500 text-purple-700" },
              ].map((event, i) => (
                <div key={i} className={`flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow ${event.color}`}>
                  <span className="font-mono font-bold w-28 text-lg opacity-75">{event.time}</span>
                  <span className="text-xl font-semibold">{event.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Lists */}
        <div className="col-span-4 flex flex-col gap-6">
          
          {/* To-Do List */}
          <Card className="flex-1 bg-white border-none shadow-lg flex flex-col overflow-hidden">
            <CardHeader className="border-b border-slate-100 pb-2 bg-slate-50/50">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-700">
                <CheckSquare className="w-5 h-5 text-red-500" />
                To-Do
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3 group p-2 rounded-md hover:bg-slate-50">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={cn(
                        "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                        task.done ? "bg-red-500 border-red-500" : "border-slate-300 hover:border-red-400"
                      )}
                    >
                      {task.done && <CheckSquare className="w-4 h-4 text-white" />}
                    </button>
                    <span className={cn("text-lg flex-1", task.done ? "text-slate-400 line-through" : "text-slate-700")}>
                      {task.text}
                    </span>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddTask} className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a task..."
                  className="flex-1 px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                />
                <button type="submit" className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </form>
            </CardContent>
          </Card>

          {/* Grocery List */}
          <Card className="flex-1 bg-white border-none shadow-lg flex flex-col overflow-hidden">
            <CardHeader className="border-b border-slate-100 pb-2 bg-slate-50/50">
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-slate-700">
                <ShoppingBasket className="w-5 h-5 text-emerald-500" />
                Groceries
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {groceries.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <span className="text-lg font-medium text-slate-700">{item.text}</span>
                    <button 
                      onClick={() => handleDeleteGrocery(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddGrocery} className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={newGrocery}
                  onChange={(e) => setNewGrocery(e.target.value)}
                  placeholder="Add item..."
                  className="flex-1 px-3 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button type="submit" className="bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
