import {For, ParentComponent} from "solid-js";
import {routes} from "../routes";
import {A} from "@solidjs/router";

const Layout: ParentComponent<{class?: string}> = (props) => {
    return (
        <div class=" w-full min-h-screen flex justify-center bg-zinc-50 box-border p-4">
            <div class="bg-white w-full flex flex-col xl:w-2/3 max-w-300 rounded-xl shadow">
                <nav class="flex justify-center p-4">
                    <ul class="flex bg-zinc-50 rounded p-1 gap-1">
                        <For each={routes}>
                            {item => <li>
                                <A activeClass="bg-white rounded shadow" class="block py-2 px-4" href={item.path}>
                                    {item.info.display}
                                </A>
                            </li>}
                        </For>
                    </ul>
                </nav>
                <main class={`p-24 flex-1 ${props.class}`}>{props.children}</main>
            </div>
        </div>
    );
}

export default Layout;