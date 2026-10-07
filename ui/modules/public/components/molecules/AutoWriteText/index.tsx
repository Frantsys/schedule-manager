"use client"

import { useEffect, useState } from "react"
import Typewriter from "typewriter-effect"
type AutoWriteText = {
    texts: string[]
}

export function AutoWriteText({
    texts
}: AutoWriteText) {

    return(
            <Typewriter 
            onInit={(t) => {
                for (let index = 0; index < texts.length; index++) {
                    const element = texts[index];
                    t.typeString(element)
                        .pauseFor(1000) 
                        .deleteAll(50);
                    
                }
                t.start();
            }}

            options={{
                loop: true
            }}
            />
    )
}