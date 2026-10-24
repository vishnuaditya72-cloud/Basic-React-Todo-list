
import { useState } from 'react'

const Todolist = () => {
const [ items, setItems ] = useState([])
const [ text, setText] = useState("")
const [ editingId, setEditingId ] = useState(null)

const add = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    if(editingId){
        setItems(items.map((i) => (i.id === editingId ? { ...i, text:trimmed} : i)))
        setEditingId(null)    
    }
    else{
    setItems([...items, {id: Date.now(), text, done:false}])
    }
    setText('')
}
const toggle = (id) => {
    setItems(items.map((i) => (i.id === id ? { ...i,done: !i.done } : i)))
}
const remove = (id) => {
    setItems(items.filter((i) => (i.id !== id  )))
}
  const update = (id) => {
    const selectedItem = items.find((item) => item.id === id)
    if (!selectedItem) return
    setText(selectedItem.text)
    setEditingId(id)
  }


  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value) }/>
      <button onClick={add}>{editingId ? 'Save' : 'Add'}</button>
      {
        items.map((item) => (
            <div key={item.id}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} />
            <span>{item.text}</span>
            <button onClick={() => remove(item.id)}>delete</button>
            <button onClick={() => update(item.id)}>update</button>
            </div>
        ))
      }
    </div>
  )
}

export default Todolist
