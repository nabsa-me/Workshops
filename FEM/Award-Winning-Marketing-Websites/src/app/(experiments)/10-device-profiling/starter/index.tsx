"use client";

import { ShaderEffect } from "./logo-webgl";
import {StaticVersion} from "./logo-static"
import { useEffect, useState } from "react";
import { getGPUTier } from 'detect-gpu';
import {getSelectorsByUserAgent} from "react-device-detect"
import { DeviceType } from "@/types";
import { useBattery } from "@/hooks/use-battery";

export default function Page() {
  const shouldUseGl = useShouldRenderGl()
  return shouldUseGl ? <ShaderEffect /> : <StaticVersion/>;
}

function useShouldRenderGl(){
  const [gpuTier, setGpuTier] = useState<null | number>(null)
  const [deviceInfo, setDeviceInfo] = useState<DeviceType | null>(null)
  const battery = useBattery()

  useEffect(()=>{
    const result: DeviceType = getSelectorsByUserAgent(window.navigator.userAgent)

    //eslint-disable-next-line
    setDeviceInfo(result)

    getGPUTier().then((result) => {
      setGpuTier ( result.tier )
    })
  },[])

  if(typeof gpuTier === "number" && gpuTier < 2) {
    return false
  }

  if(deviceInfo && deviceInfo.isSafari) {
    return false
  }

  if(battery.isSupported && battery.fetched && battery.level<0.3 && !battery.charging) {
    return false
  }

  return true
}
