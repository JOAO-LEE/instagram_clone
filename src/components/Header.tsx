import Image from "next/image";

export default function Header() {
    return (
        <aside className="sm:w-[4.5rem] lg:w-[244px] h-lvh border border-l-0">
            <div>
                <div className="cursor-pointer h-24 w-[103px] relative hidden lg:inline-grid">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Instagram Logo" layout="fill" 
                    className="object-contain"/>
                </div>
            </div>
        </aside>
    )
}
