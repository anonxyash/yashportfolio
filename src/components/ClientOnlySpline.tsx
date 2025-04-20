"use client";
import dynamic from "next/dynamic";
import React from "react";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function ClientOnlySpline(props: any) {
  return <Spline {...props} />;
}
