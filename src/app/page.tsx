import Stories from "@/components/Feed/Stories/Stories";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";
import './globals.css'

export default function Home() {
  return ( 
    <div className="grid grid-cols-[244px_minmax(900px,_1fr)] box-border gap-3">
      <div className="box-border">
        <Sidebar />
      </div>
      <div className="col-span-1">
        <Feed />
      </div>
    </div>
  )
}


{/* <main className="flex w-full">

<section className="">

</section>

{/* </main> */}
// </main> */}