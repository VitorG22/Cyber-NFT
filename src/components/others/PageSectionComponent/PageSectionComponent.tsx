import {ReactNode } from "react";
import './sass/pageSectionStyle.css'


interface IPageSection{
    id: string,
    children: React.ReactElement
}


export default function PageSection({id,children}:IPageSection):ReactNode{
return(
    <main id={id} className="PageSection">
        {children}
    </main>
)
}