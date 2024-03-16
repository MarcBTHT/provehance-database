"use client";

import { Suspense } from 'react'
import Dashboard from '../../components/dashboard';

export default function Page() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
          <Dashboard />
        </Suspense>
      )
}