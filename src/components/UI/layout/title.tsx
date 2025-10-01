"use client"

import { siteConfig } from "@/config/site.config"
import { usePathname } from "next/navigation"

const Title = () =>{
    const pathname =  usePathname();

    const currentNavItem = siteConfig.navItems.find(
        (item) => item.href === pathname
    );

    const pageTitle = currentNavItem ? currentNavItem.labels : siteConfig.title;
    
    return (
        <div className = "w-full flex justify-center mt-6 md-12">
             <h1 className="text-3xl font-bold">{pageTitle}</h1>
        </div>
    )
}

export default Title;
