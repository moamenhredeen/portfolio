import type {RouteProps} from "@solidjs/router";
import {Component, lazy} from "solid-js";

export const routes = [
    {
        path: '/home',
        info: {
            display: 'Home'
        },
        component: lazy(() => import("./pages/home.js")),
    },
    {
        path: '/blog',
        info: {
            display: 'Blog'
        },
        component: lazy(() => import("./pages/blog.js")),
    },
    {
        path: '/resume',
        info: {
            display: 'Resume'
        },
        component: lazy(() => import("./pages/resume.js")),
    },
]