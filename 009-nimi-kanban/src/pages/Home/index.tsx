import { useState } from "react"
import Board from "../../components/Board"

export default function Home(){
  

  return (
    <main className="">
      <h1 className="pt-[90px]">Kanban Board</h1>
      
      <Board />
    </main>
  )
}
