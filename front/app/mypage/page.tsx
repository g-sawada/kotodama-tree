import React from "react";
import { ProgressBar } from 'primereact/progressbar';


export default function MyPage() {
  return (
    <>
    <h1 className="mt-2 ml-2">マイページ</h1>
    <div className="grid place-content-center grid-rows-1 gap-1 mt-10 m-5">
      <div className="row-span-1 border border-white rounded-lg">
          <div className="text-center">sawaD</div>
      </div>
      <div className="row-span-2 border border-white rounded-lg p-2 grid grid-cols-2">
        <img src="/キ.svg" className="h-25 w-25"></img>
        <div className="grid grid-rows-3">
          <div className="text-end rows-span-2">キのようす</div>
          <div className="text-end rows-span-1">Lv:
            <div className="grid grid-cols-12 items-center gap-2">
              <div className="col-span-2">Exp</div>
            <ProgressBar className="col-span-10" value={50} showValue={false} style={{ width: "100%", height: "10px"}}></ProgressBar>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-2 border border-white rounded-lg p-2 grid grid-cols-12">
      <img src="/コトダマ.svg" className="w-20 h-20 col-span-6"></img>
      <div className="col-span-6">
        <div>コトダマ作成数</div>
      </div>
      </div>
    </div>
    </>
  )
}
