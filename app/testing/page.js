"use client"

import { InfinitySpin } from "react-loader-spinner";

export default function Testing(){
    return (
        <div className="flex h-full m-auto pt-[40vh]">
            <div className="m-auto">
                <InfinitySpin width="200" color="#FFFFFF" className="justify-center"/>
            </div>
        </div>
    )
}