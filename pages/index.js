import Link from "next/link"
export default function Home() {
  return (
  <>
    <div className="flex flex-row w-screen h-screen bg-slate-200 justify-center gap-5 items-center">
        <Link href="/FunctionIndex" className="p-3 bg-slate-800 text-white rounded-md"> Functional Component </Link>
        <Link href="/ClassIndex" className="p-3 bg-slate-800 text-white rounded-md"> Class Component </Link>
    </div>    
  </>
  )
}