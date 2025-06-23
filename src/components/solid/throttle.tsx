import type { Component } from "solid-js";
import {createSignal} from 'solid-js'
import {findCountryByName} from "@components/rest-countries.ts";

const Throttle: Component = () => {
  
  const [value, setValue] = createSignal<string>('')
  const [output, setOutput] = createSignal<string>('')
  
  async function inputHandler(event: any){
    const res = await findCountryByName(event.target.value)
    setOutput(JSON.stringify(res))
    setValue(event.target.value)
  }
  
  return <div class="flex flex-col items-center w-full p-4 gap-4">
    <input class="w-full  bg-zinc-100 p-4" type="text" placeholder="Search for a Country" value={value()} onInput={inputHandler} />
    <div class="w-full bg-white p-8 max-h-48 overflow-auto">{ output() }</div>
  </div>
}

export default Throttle;
