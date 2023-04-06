import React from "react";

export function Toggle() {
  return (
   
          <div className="w-full max-w-sm flex flex-col mx-auto text-center">
            <div x-data="{ selected: true }" className="w-full bg-white h-auto m-auto shadow flex flex-col p-8 pt-6 rounded-xl">
              <h1 className="text-indigo-600 font-bold">AlpineJS Animated Toggle</h1>
              <div className="relative w-full mt-4 rounded-md border h-10 p-1 bg-gray-200">
                <div className="relative w-full h-full flex items-center">
                  <div className="w-full flex justify-center text-gray-400 cursor-pointer">
                    <button>U no like me?</button>
                  </div>
                  <div className="w-full flex justify-center text-gray-400 cursor-pointer">
                    <button>No choose me</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
