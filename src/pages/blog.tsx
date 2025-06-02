import Layout from "../components/Layout";
import {A} from "@solidjs/router";

export default () => {

    const blogPosts = [
        {
            title: "Fluent API Design",
            description: "öalksf asöldkf aösldkf aösldkf aölsdkf aölskf aölsdkf aölsdkf aölskd"
        },
        {
            title: "Fluent API Design",
            description: "öalksf asöldkf aösldkf aösldkf aölsdkf aölskf aölsdkf aölsdkf aölskd"
        },
        {
            title: "Fluent API Design",
            description: "öalksf asöldkf aösldkf aösldkf aölsdkf aölskf aölsdkf aölsdkf aölskd"
        },
    ]

    return (
        <Layout>
            <ul>
                <For each={blogPosts}>
                    {item => <li class="py-4">
                        <h2 class="text-3xl font-bold py-2">
                            {item.title}
                        </h2>
                        <p>{item.description}</p>
                        <A href="/blog" class="underline">Read more</A>
                    </li>}
                </For>
            </ul>
        </Layout>
    );
}
